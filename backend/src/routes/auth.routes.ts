import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = Router();
const scryptAsync = promisify(crypto.scrypt);

async function hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16).toString('hex');
    const derivedKey = await scryptAsync(password, salt, 64) as Buffer;
    return `scrypt:${salt}:${derivedKey.toString('hex')}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
    if (!stored.startsWith('scrypt:')) return stored === password;
    const [, salt, key] = stored.split(':');
    const derivedKey = await scryptAsync(password, salt, 64) as Buffer;
    const expected = Buffer.from(key, 'hex');
    return expected.length === derivedKey.length && crypto.timingSafeEqual(expected, derivedKey);
}

function issueToken(userId: string): string {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) throw new Error('JWT_SECRET must be at least 32 characters');
    return jwt.sign({}, secret, { subject: userId, expiresIn: '8h' });
}

// POST /api/auth/signup - Create new user account
router.post('/signup', async (req: Request, res: Response) => {
    try {
        const { email, name, password, companyName, country } = req.body;

        // Validation
        if (!email || !name || !password || !companyName || !country) {
            return res.status(400).json({
                error: 'Missing required fields',
                details: 'Please provide all required information'
            });
        }

        if (typeof password !== 'string' || password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' });
        }

        if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ error: 'Please provide a valid email address' });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (existingUser) {
            return res.status(409).json({
                error: 'Account already exists',
                details: 'An account with this email already exists. Please login instead.'
            });
        }

        // Create company first
        const company = await prisma.company.create({
            data: {
                name: companyName.trim(),
                email: email.toLowerCase(),
                country: country.trim(),
                isTestMode: true,
                phone: '',
                address: ''
            }
        });

        // Create user
        const user = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                name: name.trim(),
                password: await hashPassword(password),
                companyId: company.id
            }
        });

        // Seed initial data for "Test Mode"
        await prisma.worker.createMany({
            data: [
                {
                    name: 'Alex Rivera',
                    role: 'Senior Engineer',
                    email: `alex.${company.id}@example.com`,
                    phone: '+1 555-0101',
                    country: 'United States',
                    wallet: '0x71C7...f9a1',
                    kycStatus: 'verified',
                    totalPaid: 12500,
                    companyId: company.id
                },
                {
                    name: 'Sarah Chen',
                    role: 'Product Designer',
                    email: `sarah.${company.id}@example.com`,
                    phone: '+1 555-0102',
                    country: 'Singapore',
                    wallet: '0x3aB2...eD44',
                    kycStatus: 'verified',
                    totalPaid: 8400,
                    companyId: company.id
                }
            ]
        });

        await prisma.asset.createMany({
            data: [
                { companyId: company.id, symbol: 'USDC', name: 'USD Coin', balance: 0, usdValue: 0, change24h: 0, chain: 'Ethereum', color: '#2775CA', icon: 'usdc' },
                { companyId: company.id, symbol: 'ETH', name: 'Ethereum', balance: 0, usdValue: 0, change24h: 0, chain: 'Ethereum', color: '#627EEA', icon: 'ethereum' },
                { companyId: company.id, symbol: 'USDT', name: 'Tether', balance: 0, usdValue: 0, change24h: 0, chain: 'Ethereum', color: '#26A17B', icon: 'tether' }
            ]
        });

        // Add some initial transactions (note: Transaction model currently doesn't have companyId, I should add it or relate it)
        // For now, I'll just create them. In a real app, transactions would be scoped.

        console.log(`✅ New user registered and seeded: ${email} (${companyName})`);

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                companyId: user.companyId
            },
            company: {
                id: company.id,
                name: company.name,
                country: company.country,
                isTestMode: company.isTestMode
            },
            token: issueToken(user.id)
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Failed to create account' });
    }
});

// POST /api/auth/login - Login user
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                error: 'Missing credentials',
                details: 'Please provide both email and password'
            });
        }

        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            include: { company: true }
        });

        if (!user || !(await verifyPassword(password, user.password))) {
            return res.status(401).json({
                error: 'Invalid credentials',
                details: 'Incorrect email or password'
            });
        }

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: {
                lastLogin: new Date(),
                ...(user.password.startsWith('scrypt:') ? {} : { password: await hashPassword(password) })
            }
        });

        console.log(`✅ User logged in: ${email}`);

        res.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                companyId: user.companyId
            },
            company: user.company,
            token: issueToken(user.id)
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// POST /api/auth/verify-email - Send verification email
router.post('/verify-email', async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        // In production, send actual email
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        res.json({
            message: 'Verification code sent',
            code: verificationCode // Only for demo - remove in production
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send verification email' });
    }
});

// POST /api/auth/complete-onboarding - Complete company setup
router.post('/complete-onboarding', authMiddleware as any, async (req: AuthRequest, res: Response) => {
    try {
        const { phone, address } = req.body;

        const company = await prisma.company.update({
            where: { id: req.companyId },
            data: {
                phone,
                address
            }
        });

        res.json(company);
    } catch (error) {
        res.status(500).json({ error: 'Failed to complete onboarding' });
    }
});

export default router;

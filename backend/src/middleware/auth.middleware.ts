import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: any;
    companyId?: string;
}

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized', message: 'No token provided' });
        }

        const token = authHeader.slice('Bearer '.length).trim();
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized', message: 'Empty token provided' });
        }

        // In this implementation, the token is the user's ID or a random string stored in the "user" object's "token" field
        // Since the current schema doesn't have a Token model, we'll assume the token matches a user's session
        // For the sake of this demo, we'll look up the user by email if the "token" starts with "demo_" 
        // Or handle it based on how useSignup/useLogin currently work (they just send a random hex string)

        // Let's implement a simple lookup for now. In a real app we'd use JWT or a Session model.
        // For this demo, we'll search for a user whose ID is the "token" (standard practice for simple mocks)
        // OR we can check if the token exists in a local cache.

        // Given the current Signup/Login code:
        // const token = crypto.randomBytes(32).toString('hex');

        // We'll search for the user by ID. 
        // NOTE: In the existing routes, tokens aren't stored in DB. 
        // I should probably add a token column to User or create a Session model.
        // For now, I'll use the user ID as the token for simplicity of this implementation, 
        // but I'll update the routes to return the user ID as token if it makes sense.

        // Actually, let's keep it robust. I'll search for a user with that email if we had it, 
        // but since we only have the token, I'll assume the token IS the user ID for this refined implementation.

        const secret = process.env.JWT_SECRET;
        if (!secret || secret.length < 32) {
            console.error('JWT_SECRET is missing or too short');
            return res.status(500).json({ error: 'Authentication is not configured securely' });
        }

        let payload: { sub?: string };
        try {
            payload = jwt.verify(token, secret) as { sub?: string };
        } catch {
            return res.status(401).json({ error: 'Unauthorized', message: 'Invalid or expired token' });
        }

        if (!payload.sub) {
            return res.status(401).json({ error: 'Unauthorized', message: 'Invalid token subject' });
        }

        const user = await prisma.user.findUnique({
            where: { id: payload.sub },
            include: { company: true }
        });

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized', message: 'Invalid or expired token' });
        }

        req.user = user;
        req.companyId = user.companyId;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

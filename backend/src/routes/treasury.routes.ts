import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware as any);

// GET /api/treasury/assets - List all assets
router.get('/assets', async (req: AuthRequest, res: Response) => {
    try {
        const assets = await prisma.asset.findMany({
            where: { companyId: req.companyId },
            orderBy: { usdValue: 'desc' }
        });

        res.json(assets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch assets' });
    }
});

// GET /api/treasury/portfolio - Portfolio summary
router.get('/portfolio', async (req: AuthRequest, res: Response) => {
    try {
        const assets = await prisma.asset.findMany({
            where: { companyId: req.companyId }
        });
        const totalValue = assets.reduce((sum, asset) => sum + asset.usdValue, 0);

        // No historical valuation model exists yet; return the persisted current
        // valuation instead of fabricating a price history.
        const history = totalValue > 0 ? [{
            date: new Date().toISOString().split('T')[0],
            value: totalValue
        }] : [];

        res.json({
            totalValue,
            assets: assets.length,
            history
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch portfolio' });
    }
});

// POST /api/treasury/swap - Execute token swap
router.post('/swap', async (req: AuthRequest, res: Response) => {
    try {
        const { fromAsset, toAsset, fromAmount, toAmount, rate, fee } = req.body;
        if (!fromAsset || !toAsset || fromAsset === toAsset || !Number.isFinite(Number(fromAmount)) || Number(fromAmount) <= 0 || !Number.isFinite(Number(toAmount)) || Number(toAmount) <= 0) {
            return res.status(400).json({ error: 'Valid, distinct assets and positive amounts are required' });
        }
        const source = await prisma.asset.findFirst({ where: { companyId: req.companyId, symbol: fromAsset } });
        const destination = await prisma.asset.findFirst({ where: { companyId: req.companyId, symbol: toAsset } });
        if (!source || !destination) return res.status(400).json({ error: 'One or more assets are not available in this treasury' });
        if (source.balance < Number(fromAmount)) return res.status(400).json({ error: 'Insufficient asset balance' });

        const swap = await prisma.swap.create({
            data: {
                companyId: req.companyId!,
                fromAsset,
                toAsset,
                fromAmount,
                toAmount,
                rate,
                fee,
                status: 'pending',
                txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
                chain: 'Ethereum'
            }
        });

        // Update asset balances
        await prisma.asset.update({
            where: {
                companyId_symbol: {
                    companyId: req.companyId!,
                    symbol: fromAsset
                }
            },
            data: {
                balance: { decrement: fromAmount },
                usdValue: { decrement: fromAmount }
            }
        });

        await prisma.asset.update({
            where: {
                companyId_symbol: {
                    companyId: req.companyId!,
                    symbol: toAsset
                }
            },
            data: {
                balance: { increment: toAmount },
                usdValue: { increment: toAmount }
            }
        });

        // Create transaction record
        await prisma.transaction.create({
            data: {
                companyId: req.companyId!,
                type: 'swap',
                description: `Swap ${fromAmount} ${fromAsset} to ${toAmount} ${toAsset}`,
                amount: fromAmount,
                currency: fromAsset,
                isIncoming: false,
                status: 'settled',
                fees: fee,
                chain: 'Ethereum',
                txHash: swap.txHash
            }
        });

        // Simulate completion
        setTimeout(async () => {
            await prisma.swap.update({
                where: { id: swap.id },
                data: { status: 'completed' }
            });
        }, 2000);

        res.status(201).json(swap);
    } catch (error) {
        res.status(500).json({ error: 'Failed to execute swap' });
    }
});

// POST /api/treasury/deposit - Deposit funds
router.post('/deposit', async (req: AuthRequest, res: Response) => {
    try {
        const { asset, amount } = req.body;
        if (!asset || !Number.isFinite(Number(amount)) || Number(amount) <= 0) return res.status(400).json({ error: 'A valid asset and positive amount are required' });
        const existingAsset = await prisma.asset.findFirst({ where: { companyId: req.companyId, symbol: asset } });
        if (!existingAsset) return res.status(400).json({ error: 'Asset is not available in this treasury' });

        // Update asset balance
        await prisma.asset.update({
            where: {
                companyId_symbol: {
                    companyId: req.companyId!,
                    symbol: asset
                }
            },
            data: {
                balance: { increment: amount },
                usdValue: { increment: amount }
            }
        });

        // Create transaction record
        const transaction = await prisma.transaction.create({
            data: {
                companyId: req.companyId!,
                type: 'deposit',
                description: `Deposit ${amount} ${asset}`,
                amount,
                currency: asset,
                isIncoming: true,
                status: 'settled',
                chain: 'Ethereum',
                txHash: `0x${Math.random().toString(16).substr(2, 64)}`
            }
        });

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to process deposit' });
    }
});

// POST /api/treasury/withdraw - Withdraw funds
router.post('/withdraw', async (req: AuthRequest, res: Response) => {
    try {
        const { asset, amount, address } = req.body;
        if (!asset || !address || !Number.isFinite(Number(amount)) || Number(amount) <= 0) return res.status(400).json({ error: 'Asset, destination address, and positive amount are required' });
        const existingAsset = await prisma.asset.findFirst({ where: { companyId: req.companyId, symbol: asset } });
        if (!existingAsset) return res.status(400).json({ error: 'Asset is not available in this treasury' });
        if (existingAsset.balance < Number(amount)) return res.status(400).json({ error: 'Insufficient asset balance' });

        // Update asset balance
        await prisma.asset.update({
            where: {
                companyId_symbol: {
                    companyId: req.companyId!,
                    symbol: asset
                }
            },
            data: {
                balance: { decrement: amount },
                usdValue: { decrement: amount }
            }
        });

        // Create transaction record
        const transaction = await prisma.transaction.create({
            data: {
                companyId: req.companyId!,
                type: 'withdrawal',
                description: `Withdraw ${amount} ${asset} to ${address.substring(0, 10)}...`,
                amount,
                currency: asset,
                isIncoming: false,
                status: 'processing',
                chain: 'Ethereum',
                txHash: `0x${Math.random().toString(16).substr(2, 64)}`
            }
        });

        // Simulate completion
        setTimeout(async () => {
            await prisma.transaction.update({
                where: { id: transaction.id },
                data: { status: 'settled' }
            });
        }, 3000);

        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: 'Failed to process withdrawal' });
    }
});

// GET /api/treasury/history - Transaction history
router.get('/history', async (req: AuthRequest, res: Response) => {
    try {
        const limit = parseInt(req.query.limit as string) || 50;
        const type = req.query.type as string;

        const where: any = { companyId: req.companyId };
        if (type) where.type = type;

        const transactions = await prisma.transaction.findMany({
            where,
            take: limit,
            orderBy: { timestamp: 'desc' }
        });

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transaction history' });
    }
});

export default router;

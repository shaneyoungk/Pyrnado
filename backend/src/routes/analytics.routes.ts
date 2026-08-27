import { Router, Response } from 'express';
import prisma from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';

const router = Router();
router.use(authMiddleware as any);

// GET /api/analytics/overview - Analytics overview
router.get('/overview', async (req: AuthRequest, res: Response) => {
    try {
        const [
            totalTransactions,
            totalVolume,
            activeUsers,
            avgTransactionValue
        ] = await Promise.all([
            prisma.transaction.count({ where: { companyId: req.companyId } }),
            prisma.transaction.aggregate({ _sum: { amount: true }, where: { companyId: req.companyId } }),
            prisma.worker.count({ where: { companyId: req.companyId, kycStatus: 'verified' } }),
            prisma.transaction.aggregate({ _avg: { amount: true }, where: { companyId: req.companyId } })
        ]);

        res.json({
            totalTransactions,
            totalVolume: totalVolume._sum.amount || 0,
            activeUsers,
            avgTransactionValue: avgTransactionValue._avg.amount || 0
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch analytics overview' });
    }
});

// GET /api/analytics/transactions - Transaction analytics
router.get('/transactions', async (req: AuthRequest, res: Response) => {
    try {
        const period = req.query.period as string || '30d';

        const start = new Date();
        start.setMonth(start.getMonth() - 11, 1);
        start.setHours(0, 0, 0, 0);
        const transactions = await prisma.transaction.findMany({
            where: { companyId: req.companyId, timestamp: { gte: start } },
            select: { amount: true, timestamp: true }
        });
        const data = Array.from({ length: 12 }, (_, index) => {
            const date = new Date(start);
            date.setMonth(start.getMonth() + index);
            const monthTransactions = transactions.filter((transaction) =>
                transaction.timestamp.getFullYear() === date.getFullYear() &&
                transaction.timestamp.getMonth() === date.getMonth()
            );
            return {
                month: date.toLocaleString('default', { month: 'short' }),
                volume: monthTransactions.reduce((sum, transaction) => sum + transaction.amount, 0),
                count: monthTransactions.length
            };
        });

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transaction analytics' });
    }
});

// GET /api/analytics/revenue - Revenue analytics
router.get('/revenue', async (req: AuthRequest, res: Response) => {
    try {
        const feeTransactions = await prisma.transaction.findMany({
            where: { companyId: req.companyId, fees: { not: null } },
            select: { fees: true, timestamp: true }
        });
        const totalFees = feeTransactions.reduce((sum, transaction) => sum + (transaction.fees || 0), 0);
        const start = new Date();
        start.setMonth(start.getMonth() - 11, 1);
        start.setHours(0, 0, 0, 0);
        const monthlyRevenue = Array.from({ length: 12 }, (_, index) => {
            const date = new Date(start);
            date.setMonth(start.getMonth() + index);
            return {
                month: date.toLocaleString('default', { month: 'short' }),
                revenue: feeTransactions
                    .filter((transaction) => transaction.timestamp.getFullYear() === date.getFullYear() && transaction.timestamp.getMonth() === date.getMonth())
                    .reduce((sum, transaction) => sum + (transaction.fees || 0), 0)
            };
        });

        res.json({
            totalFees,
            monthlyRevenue
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch revenue analytics' });
    }
});

// GET /api/analytics/geography - Geographic distribution
router.get('/geography', async (req: AuthRequest, res: Response) => {
    try {
        const remittancesByCountry = await prisma.remittance.groupBy({
            by: ['recipientCountry'],
            _count: true,
            _sum: { amount: true },
            where: { companyId: req.companyId }
        });

        const data = remittancesByCountry.map(item => ({
            country: item.recipientCountry,
            count: item._count,
            volume: item._sum.amount || 0
        }));

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch geographic analytics' });
    }
});

// GET /api/analytics/export - Export analytics data
router.get('/export', async (req: AuthRequest, res: Response) => {
    try {
        const format = req.query.format as string || 'json';
        const type = req.query.type as string || 'transactions';

        let data: any[] = [];

        switch (type) {
            case 'transactions':
                data = await prisma.transaction.findMany({
                    where: { companyId: req.companyId },
                    orderBy: { timestamp: 'desc' }
                });
                break;
            case 'remittances':
                data = await prisma.remittance.findMany({
                    where: { companyId: req.companyId },
                    include: { recipient: true }
                });
                break;
            case 'payroll':
                data = await prisma.payrollBatch.findMany({
                    where: { companyId: req.companyId },
                    include: { payments: true }
                });
                break;
            default:
                data = await prisma.transaction.findMany({ where: { companyId: req.companyId } });
        }

        if (format === 'csv') {
            // Simple CSV conversion
            const headers = Object.keys(data[0] || {}).join(',');
            const rows = data.map(row => Object.values(row).join(','));
            const csv = [headers, ...rows].join('\n');

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', `attachment; filename=${type}-export.csv`);
            res.send(csv);
        } else {
            res.json(data);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to export analytics data' });
    }
});

export default router;

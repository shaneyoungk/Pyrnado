import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Zap, TrendingUp, DollarSign, Activity } from "lucide-react";

// Rolling Counter Component
const RollingCounter = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
    const [displayValue, setDisplayValue] = useState(value);

    // Live updates removed for static demo

    return (
        <span className="font-mono font-bold text-3xl sm:text-4xl text-foreground">
            {prefix}{displayValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}{suffix}
        </span>
    );
};

// Activity Feed Item
const FeedItem = ({ type, amount, from, to }: { type: string, amount: string, from: string, to: string }) => (
    <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 mb-3"
    >
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-zinc-900">
                {type === 'pay' ? (
                    <img src="/dollar-icon.png" alt="Payout" className="w-5 h-5 object-contain" />
                ) : (
                    <img src="/swap-icon.png" alt="Swap" className="w-5 h-5 object-contain" />
                )}
            </div>
            <div>
                <p className="text-xs font-semibold text-zinc-100">{type === 'pay' ? 'Payroll Payout' : 'Instant Swap'}</p>
                <p className="text-[10px] text-zinc-500">{from} → {to}</p>
            </div>
        </div>
        <div className="text-sm font-mono font-bold text-white">{amount}</div>
    </motion.div>
);

export function UsageMetricsSection() {
    const [feed, setFeed] = useState([
        { id: 1, type: 'pay', amount: '$4,200.00', from: 'USDC', to: 'NGN' },
        { id: 2, type: 'swap', amount: '$150.00', from: 'USDT', to: 'M-Pesa' },
        { id: 3, type: 'pay', amount: '$1,850.50', from: 'USDC', to: 'KES' },
    ]);

    // Incoming transaction simulation removed for static demo

    return (
        <section className="py-24 relative overflow-hidden bg-transparent border-y border-white/5">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Metrics */}
                    <div>
                        <span className="flex items-center gap-2 text-brand-400 font-mono text-xs mb-6 tracking-[0.3em] uppercase font-black">
                            <span className="relative flex h-2 w-2">
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                            </span>
                            Network Status: Active
                        </span>

                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-12 text-zinc-50 tracking-tight">
                            Scale your <br />
                            <span className="text-brand-400">Global Finance</span>
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                            <div>
                                <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Total Volume (24h)</p>
                                <RollingCounter value={8920450} prefix="$" />
                            </div>
                            <div>
                                <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Tx Processed</p>
                                <RollingCounter value={14582} />
                            </div>
                            <div>
                                <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Avg Settlement</p>
                                <div className="flex items-center gap-2">
                                    <span className="font-black font-mono text-4xl sm:text-5xl text-brand-400">2.4s</span>
                                    <TrendingUp className="w-6 h-6 text-brand-500" />
                                </div>
                            </div>
                            <div>
                                <p className="text-muted-foreground text-sm uppercase tracking-wider mb-2">Fees Saved</p>
                                <RollingCounter value={125000} prefix="$" />
                            </div>
                        </div>

                        <div className="p-4 rounded-xl border border-zinc-800 flex items-start gap-3 bg-[#111] shadow-xl">
                            <Activity className="w-5 h-5 text-brand-400 mt-0.5" />
                            <p className="text-sm text-zinc-300">
                                <span className="font-black text-brand-500 uppercase tracking-widest text-[10px] mr-2">Network Status</span>
                                All systems operational. Polygon PoS and Base Mainnet are experiencing normal congestion levels.
                            </p>
                        </div>
                    </div>

                    {/* Right: Live Feed Visualization */}
                    <div className="relative">
                        {/* Abstract World Map / Globe Canvas placeholder or decorative element */}

                        <div className="bg-gradient-to-b from-zinc-900/50 to-zinc-950 p-6 relative z-10 min-h-[400px] border border-white/10 rounded-3xl shadow-2xl">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                                <h3 className="font-bold text-lg">Live Transactions</h3>
                                <div className="flex gap-2 opacity-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                </div>
                            </div>

                            <div className="space-y-2 max-h-[350px] overflow-hidden relative">
                                {feed.map((tx) => (
                                    <FeedItem key={tx.id} {...tx} />
                                ))}
                            </div>

                            {/* Decorative floating elements */}
                            <div className="absolute -right-8 top-1/2 p-4 bg-zinc-950 rounded-xl border border-white/10 animate-float-slow hidden md:block">
                                <p className="text-xs text-muted-foreground mb-1">Active Corridor</p>
                                <p className="text-sm font-bold text-white">🇺🇸 USD → 🇳🇬 NGN</p>
                            </div>
                            <div className="absolute -left-8 bottom-20 p-4 bg-zinc-950 rounded-xl border border-white/10 animate-float hidden md:block">
                                <p className="text-xs text-zinc-500 mb-1">Status</p>
                                <p className="text-sm font-bold text-brand-400">Live</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

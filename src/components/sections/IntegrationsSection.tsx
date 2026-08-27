import { motion } from "framer-motion";
import { Cpu, Activity, Database, Globe, Zap, ArrowRight, ShieldCheck, Box } from "lucide-react";

const nodes = [
    { name: "ER-992", provider: "ERP System", status: "Active", latency: "12ms", x: 15, y: 25 },
    { name: "BK-881", provider: "Bank Core", status: "Synced", latency: "45ms", x: 15, y: 50 },
    { name: "CW-102", provider: "Crypto Ledger", status: "Active", latency: "0.2ms", x: 15, y: 75 },
    { name: "MM-443", provider: "Mobile Rail", status: "Active", latency: "88ms", x: 85, y: 25 },
    { name: "FX-221", provider: "Cross-border", status: "Synced", latency: "1.2s", x: 85, y: 50 },
    { name: "TR-550", provider: "Treasury", status: "Protected", latency: "2ms", x: 85, y: 75 },
];

export const IntegrationsSection = () => {
    return (
        <section className="relative py-48 bg-transparent overflow-hidden">
            {/* Technical Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90(deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }} />

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                {/* Header with Technical Hierarchy */}
                <div className="max-w-6xl mx-auto mb-32 flex flex-col md:flex-row items-end justify-between gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex-1"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-[1px] bg-brand-500" />
                            <span className="text-xs font-mono font-bold text-brand-400 uppercase tracking-[0.3em]">Protocol L1.Settlement</span>
                        </div>
                        <h2 className="text-6xl sm:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase">
                            Unified <br />
                            <span className="text-brand-500">Engine.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-md"
                    >
                        <p className="text-sm font-mono text-zinc-500 leading-relaxed mb-6 uppercase tracking-wider">
                            // SYSTEM_OVERVIEW: A universal orchestration layer for multi-rail settlement. Dynamic routing across traditional, mobile and decentralized liquidity pools.
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Efficiency</span>
                                <span className="text-xl font-bold text-white">+88%</span>
                            </div>
                            <div className="w-[1px] h-8 bg-white/10" />
                            <div className="flex flex-col">
                                <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Routing nodes</span>
                                <span className="text-xl font-bold text-white">4,821</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Neural Settlement Mesh */}
                <div className="relative max-w-7xl mx-auto h-[700px] border border-white/5 bg-zinc-950/20 rounded-[2.5rem] overflow-hidden group">
                    {/* Interior Technical Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-20"
                        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />

                    {/* Central Settlement Core */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            className="relative w-64 h-64 flex items-center justify-center"
                        >
                            {/* Rotating Telemetry Rings */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border border-brand-500/20 rounded-full border-dashed"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 border border-brand-400/10 rounded-full"
                            />

                            {/* Core Shield */}
                            <div className="relative w-40 h-40 bg-zinc-950 border border-brand-500/30 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent" />
                                <Zap className="w-10 h-10 text-brand-400 mb-2 relative z-10" />
                                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1 relative z-10">Settlement</div>
                                <div className="text-2xl font-black text-white tracking-widest relative z-10">CORE</div>

                                {/* Scanning line */}
                                <motion.div
                                    animate={{ top: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-px bg-brand-500/50 z-20"
                                />
                            </div>

                            {/* Floating Telemetry Points */}
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 font-mono text-[9px] text-zinc-500 uppercase tracking-tighter whitespace-nowrap">
                                TPS: 45,210 <span className="text-brand-500 ml-2">● LIVE</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* SVG Mesh Layer */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="hsl(140, 84%, 55%)" />
                                <stop offset="100%" stopColor="transparent" />
                            </linearGradient>
                        </defs>

                        {nodes.map((node, i) => (
                            <g key={`mesh-${i}`}>
                                {/* Complex pathing to center */}
                                <motion.path
                                    d={i < 3
                                        ? `M ${node.x} ${node.y} Q ${node.x + 15} ${node.y} 50 50`
                                        : `M ${node.x} ${node.y} Q ${node.x - 15} ${node.y} 50 50`
                                    }
                                    fill="none"
                                    stroke="hsl(140, 84%, 55%)"
                                    strokeWidth="0.05"
                                    strokeOpacity="0.2"
                                />

                                {/* Pulsing data packet */}
                                <motion.circle
                                    r="0.4"
                                    fill="hsl(140, 84%, 55%)"
                                    filter="blur(1px)"
                                >
                                    <animateMotion
                                        dur={`${2 + Math.random() * 2}s`}
                                        repeatCount="indefinite"
                                        path={i < 3
                                            ? `M ${node.x} ${node.y} Q ${node.x + 15} ${node.y} 50 50`
                                            : `M 50 50 Q ${node.x - 15} ${node.y} ${node.x} ${node.y}`
                                        }
                                        keyPoints="0;1"
                                        keyTimes="0;1"
                                    />
                                </motion.circle>
                            </g>
                        ))}
                    </svg>

                    {/* Peripheral Interface Nodes */}
                    <div className="absolute inset-0 p-12 pointer-events-none">
                        {nodes.map((node, i) => (
                            <motion.div
                                key={node.name}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="absolute translate-x-[-50%] translate-y-[-50%] flex items-center gap-6"
                                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                            >
                                <div className={`flex flex-col ${i < 3 ? 'items-end' : 'items-start'} ${i < 3 ? 'order-1' : 'order-2'}`}>
                                    <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-tighter mb-0.5">{node.provider}</div>
                                    <div className="text-sm font-black text-white tracking-widest uppercase">{node.name}</div>
                                    <div className="flex items-center gap-3 mt-1.5 font-mono text-[9px] uppercase tracking-tighter">
                                        <span className="text-brand-500">{node.status}</span>
                                        <span className="text-zinc-700">|</span>
                                        <span className="text-zinc-500">{node.latency}</span>
                                    </div>
                                </div>

                                <div className={`w-12 h-12 flex items-center justify-center relative ${i < 3 ? 'order-2' : 'order-1'}`}>
                                    {i === 0 && <Database className="w-5 h-5 text-zinc-600" />}
                                    {i === 1 && <Cpu className="w-5 h-5 text-zinc-600" />}
                                    {i === 2 && <Zap className="w-5 h-5 text-zinc-600" />}
                                    {i === 3 && <Globe className="w-5 h-5 text-zinc-600" />}
                                    {i === 4 && <ShieldCheck className="w-5 h-5 text-zinc-600" />}
                                    {i === 5 && <Box className="w-5 h-5 text-zinc-600" />}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Technical Status Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 border-t border-white/10 flex items-center justify-between px-12 bg-black/40">
                        <div className="flex gap-12 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                                NET_STATUS: NOMINAL
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                RAIL_SYNC: 99.98%
                            </div>
                        </div>
                        <div className="text-brand-400 font-black text-xs tracking-widest uppercase">
                            // zapzive_settlement_layer_v.4.0
                        </div>
                    </div>
                </div>

                {/* Technical Specs Grid */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    {[
                        { label: "Ledger Update", value: "0.03s" },
                        { label: "Concurrent Ops", value: "1.2M" },
                        { label: "Routing Latency", value: "< 5ms" },
                        { label: "Network Health", value: "99.9%" },
                    ].map((spec, i) => (
                        <div key={i} className="bg-zinc-950/40 border border-white/5 p-6 rounded-2xl group">
                            <div className="text-[10px] text-zinc-600 uppercase font-black tracking-widest mb-1 group-hover:text-brand-500 transition-colors uppercase">{spec.label}</div>
                            <div className="text-2xl font-mono font-bold text-white uppercase">{spec.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

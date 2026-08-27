import { cn } from "@/lib/utils";

export function MarketDataSection() {
    const costBars = [
        { label: "Bank Swift", price: "$45", width: "100%", color: "bg-zinc-800/50" },
        { label: "PayPal", price: "$35", width: "78%", color: "bg-zinc-800/50" },
        { label: "Wise", price: "$15", width: "33%", color: "bg-zinc-800/50" },
        { label: "Zapzive", price: "$0 send", width: "8%", color: "bg-brand-500", highlight: true },
    ];

    const years = ["2021", "2022", "2023", "2024", "2025"];

    return (
        <section className="py-24 relative bg-transparent overflow-hidden">
            <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">

                    {/* Left Panel: The Inevitable Transition */}
                    <div className="flex flex-col justify-center space-y-8">
                        <div className="space-y-4">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-400">Market Evolution</span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-50 leading-[1.1]">
                                The Inevitable <br />
                                <span className="text-brand-400">Transition</span>
                            </h2>
                            <p className="text-base text-zinc-400 leading-relaxed font-light">
                                Legacy banking is failing the global workforce. Stablecoin settlement is the new standard, processing
                                <span className="text-white font-medium"> higher volume than Visa </span> while costing pennies.
                            </p>
                        </div>

                        {/* Metric Display */}
                        <div className="bg-gradient-to-b from-[#111] to-black rounded-3xl p-8 border border-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)] flex flex-col sm:flex-row items-center justify-between gap-8 h-full">
                            <div className="flex flex-col gap-1 w-full sm:w-auto text-center sm:text-left">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Global Vol. Growth</span>
                                <span className="text-3xl sm:text-5xl font-black text-brand-400 tracking-tighter mt-1">+230%</span>
                                <span className="text-[10px] text-zinc-500 font-mono mt-2 uppercase tracking-wide">STABLECOIN SETTLEMENT YOY</span>
                            </div>

                            <div className="w-px h-16 bg-white/10 hidden sm:block" />
                            <div className="h-px w-full bg-white/10 sm:hidden block" />

                            <div className="flex flex-col gap-1 w-full sm:w-auto text-center sm:text-left">
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Settlement Time</span>
                                <div className="flex items-baseline justify-center sm:justify-start gap-2 mt-1">
                                    <span className="text-3xl sm:text-5xl font-black text-white tracking-tighter">&lt;3</span>
                                    <span className="text-base sm:text-xl font-bold text-zinc-400">sec</span>
                                </div>
                                <span className="text-[10px] text-zinc-500 font-mono mt-2 uppercase tracking-wide">VS 3-5 DAYS TRADITIONAL</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Cost Per $1k Sent */}
                    <div className="bg-gradient-to-b from-[#111] to-black rounded-3xl p-8 border border-white/10 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)] relative overflow-hidden h-full flex flex-col justify-center">
                        <div className="space-y-2 mb-8">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">Capital Leakage</span>
                            <h3 className="text-3xl font-extrabold text-zinc-50 tracking-tight">Stop losing value on <span className="text-red-500">every transfer</span></h3>
                        </div>

                        <div className="space-y-6 mb-8">
                            {costBars.map((bar, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <div className="flex justify-between items-end">
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-wider",
                                            bar.highlight ? "text-brand-400" : "text-zinc-500"
                                        )}>
                                            {bar.label}
                                        </span>
                                        <span className={cn(
                                            "text-lg font-black tracking-tighter",
                                            bar.highlight ? "text-brand-400" : "text-zinc-300"
                                        )}>
                                            {bar.price}
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                                        <div
                                            style={{ width: bar.width }}
                                            className={cn(
                                                "h-full rounded-full transition-all duration-1000",
                                                bar.highlight ? "bg-brand-500" : "bg-zinc-800"
                                            )}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-white/5">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-extrabold text-zinc-400">Business Savings</span>
                                <span className="text-3xl font-black text-zinc-50 tracking-tight">Save <span className="text-brand-400">$43</span> <span className="text-[10px] text-zinc-500 font-mono">/ TX</span></span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

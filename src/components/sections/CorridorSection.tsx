import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Banknote, Landmark, Smartphone } from "lucide-react";

const corridors = [
  { from: "USD", to: "KES", rail: "Local bank payout", status: "Compliance reviewed" },
  { from: "USDC", to: "M-Pesa", rail: "Mobile money", status: "Recipient verified" },
  { from: "USD", to: "NGN", rail: "Bank transfer", status: "Settlement pending" },
  { from: "EUR", to: "KES", rail: "Treasury conversion", status: "Audit log synced" },
  { from: "Stablecoin", to: "Local cash", rail: "Agent and bank rails", status: "Payout completed" },
];

export function CorridorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden bg-[#050606]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-400">Corridor Focus</span>
            <h2 className="mt-5 text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Built first for high-friction payout corridors.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed">
              Zapzive targets corridors where traditional rails are slow, expensive, and opaque, starting with Africa-focused settlement and expanding toward global contractor, vendor, and treasury payments.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-zinc-500">
              <div className="rounded-xl border border-white/10 p-4">
                <Banknote className="w-5 h-5 text-brand-400 mb-3" />
                Transparent FX rates
              </div>
              <div className="rounded-xl border border-white/10 p-4">
                <Landmark className="w-5 h-5 text-blue-300 mb-3" />
                Local bank rails
              </div>
              <div className="rounded-xl border border-white/10 p-4">
                <Smartphone className="w-5 h-5 text-amber-300 mb-3" />
                Mobile money cash-out
              </div>
              <div className="rounded-xl border border-white/10 p-4">
                <ArrowRight className="w-5 h-5 text-zinc-300 mb-3" />
                Stablecoin settlement
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[20px] border border-white/10 bg-[#0c0e0e] overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-bold">Active corridors</p>
                <h3 className="text-white text-lg font-bold mt-1">Settlement routes</h3>
              </div>
              <span className="rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                Live map
              </span>
            </div>
            <div className="divide-y divide-white/5">
              {corridors.map((corridor, index) => (
                <div key={`${corridor.from}-${corridor.to}`} className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center px-5 py-4 hover:bg-white/[0.03] transition-colors">
                  <div>
                    <p className="text-sm font-bold text-white">{corridor.from}</p>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-600">Source</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600" />
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{corridor.to}</p>
                    <p className="text-[10px] uppercase tracking-widest text-zinc-600">{corridor.rail}</p>
                  </div>
                  <div className="col-span-3 flex items-center justify-between pt-2">
                    <span className="text-[10px] text-zinc-500">Route #{(index + 42).toString()}</span>
                    <span className="rounded-full bg-white/[0.04] border border-white/10 px-2.5 py-1 text-[10px] text-zinc-300">
                      {corridor.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRightLeft, CircleDollarSign, FileCheck2, ShieldCheck, WalletCards } from "lucide-react";

const products = [
  {
    icon: WalletCards,
    title: "Treasury",
    description: "Fund operating balances, allocate liquidity, and track cash positions across stablecoin and local payout rails.",
  },
  {
    icon: CircleDollarSign,
    title: "Payroll and payouts",
    description: "Create payout batches for teams, vendors, and contractors with approval state, recipient status, and reconciliation data.",
  },
  {
    icon: ShieldCheck,
    title: "Escrow",
    description: "Lock milestone funds, require approvals, and release only after verification or delivery confirmation.",
  },
  {
    icon: FileCheck2,
    title: "Compliance",
    description: "Review KYC, AML, risk scores, audit trails, and transaction monitoring from the same operating layer.",
  },
];

export function ProductOverviewSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="platform" ref={ref} className="py-24 sm:py-32 relative bg-[#050606] border-y border-white/5">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.28em] text-brand-400">Platform</span>
            <h2 className="mt-5 text-3xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight">
              One operating layer for global money movement.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
              Zapzive connects stablecoin settlement, local cash-out, smart escrow, approval workflows, and treasury visibility so finance teams can move money with control instead of chaos.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {products.map((product, index) => (
              <motion.div
                key={product.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-[20px] border border-white/10 bg-[#0d0f0f] p-6 hover:border-zinc-600 transition-colors"
              >
                <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <product.icon className="h-5 w-5 text-brand-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{product.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{product.description}</p>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="sm:col-span-2 rounded-[20px] border border-blue-500/20 bg-blue-500/[0.04] p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <ArrowRightLeft className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Stablecoin to local cash, with the operational record attached.</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    Every movement can carry corridor, FX rate, payment rail, counterparty, approval, compliance, and audit state.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

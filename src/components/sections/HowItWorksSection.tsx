import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wallet, ShieldCheck, Zap, Smartphone, FileCheck2 } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Wallet,
    phase: "Treasury Setup",
    title: "Liquidity Allocated",
    description: "Deposit bank or stablecoin funds and allocate treasury balances by payout corridor.",
    highlight: "Treasury funded",
    meta: "T+00:02 / USD-KES",
    reference: "TRS-5829",
    accent: "emerald",
  },
  {
    number: "02",
    icon: ShieldCheck,
    phase: "Approval & Escrow",
    title: "Controls Routed",
    description: "Route transfers through role-based approval, escrow locks, and recipient verification.",
    highlight: "Approval required",
    meta: "2 signers / escrow vault",
    reference: "APR-1142",
    accent: "blue",
  },
  {
    number: "03",
    icon: Zap,
    phase: "Settlement",
    title: "Rail Execution",
    description: "Settle through stablecoin liquidity rails with real-time tracking and FX references.",
    highlight: "Settlement pending",
    meta: "USDC rail / FX 151.42",
    reference: "STL-9007",
    accent: "amber",
  },
  {
    number: "04",
    icon: Smartphone,
    phase: "Local Cash-out",
    title: "Payout Delivered",
    description: "Cash out to M-Pesa, banks, and local payout partners with partner status attached.",
    highlight: "Local payout",
    meta: "M-Pesa / bank bridge",
    reference: "LOC-3371",
    accent: "emerald",
  },
  {
    number: "05",
    icon: FileCheck2,
    phase: "Audit & Compliance",
    title: "Evidence Synced",
    description: "Maintain audit logs, compliance review history, receipts, and settlement references.",
    highlight: "Audit synced",
    meta: "SOC2 trail / AML clear",
    reference: "AUD-7716",
    accent: "blue",
  },
];

const accentStyles = {
  emerald: {
    dot: "bg-brand-400",
    text: "text-brand-400",
    chip: "bg-brand-500/10 text-brand-300 border-brand-500/25",
    line: "from-brand-500/50",
  },
  blue: {
    dot: "bg-blue-400",
    text: "text-blue-300",
    chip: "bg-blue-500/10 text-blue-300 border-blue-500/25",
    line: "from-blue-500/50",
  },
  amber: {
    dot: "bg-amber-400",
    text: "text-amber-300",
    chip: "bg-amber-500/10 text-amber-300 border-amber-500/25",
    line: "from-amber-500/50",
  },
};

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mb-10 sm:mb-14"
        >
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-brand-500/70" />
            <span className="text-[11px] font-semibold tracking-[0.22em] text-brand-300">
              Settlement operations
            </span>
          </div>
          <h2 className="max-w-4xl text-3xl sm:text-5xl lg:text-6xl font-semibold text-white mb-5 sm:mb-6 leading-[0.96]">
            A connected control plane from treasury funding to local payout.
          </h2>
          <p className="max-w-2xl text-sm sm:text-base text-zinc-400 leading-7">
            Every transfer carries corridor metadata, approval state, FX context, payout rail status, and audit evidence through the settlement pipeline.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none absolute left-4 right-4 top-[72px] hidden h-px origin-left bg-gradient-to-r from-transparent via-white/20 to-transparent lg:block"
          />
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative min-h-[286px] overflow-hidden rounded-lg border border-white/10 bg-[#0d0f0f]/95 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-[#101313] sm:p-5"
            >
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${accentStyles[step.accent].line} to-transparent opacity-80`} />
              <div className="relative flex h-full flex-col">
                <div className="mb-5 flex min-h-12 items-start justify-between gap-4 border-b border-white/[0.07] pb-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${accentStyles[step.accent].dot} ${step.highlight.includes("pending") || step.highlight.includes("required") ? "animate-pulse-soft" : ""}`} />
                      <span className="text-[10px] font-semibold tracking-[0.18em] text-zinc-500">
                        {step.phase}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] text-zinc-600">{step.meta}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <step.icon className={`h-4 w-4 ${accentStyles[step.accent].text}`} />
                    <span className="font-mono text-xs text-zinc-500">{step.number}</span>
                  </div>
                </div>

                <div className="grid flex-1 grid-rows-[auto_1fr_auto]">
                  <div>
                    <h3 className="text-lg font-semibold leading-snug text-white">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-end">
                    <div className="w-full border-t border-dashed border-white/10 pt-3">
                      <div className="flex items-center justify-between gap-3 font-mono text-[10px] text-zinc-600">
                        <span>REF</span>
                        <span className="text-zinc-400">{step.reference}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`mt-4 inline-flex min-h-8 w-full items-center justify-between border px-3 py-2 text-[10px] font-semibold tracking-[0.12em] ${accentStyles[step.accent].chip}`}>
                    <span>{step.highlight}</span>
                    <span className="font-mono text-[9px] opacity-70">LIVE</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

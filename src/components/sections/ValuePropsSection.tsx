import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Banknote, Shield, Globe, Code, CheckCircle2, Zap, Activity, Lock, ArrowRightLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Fake UI Components for "Demo" feel
const PayrollDemo = () => {
  const transactions = [
    { name: "Sarah Chen", role: "Product Designer", amount: "$4,500.00", initials: "SC", color: "bg-purple-500" },
    { name: "Alex Morgan", role: "Frontend Dev", amount: "$3,800.00", initials: "AM", color: "bg-blue-500" },
    { name: "James Wilson", role: "Contractor", amount: "$2,200.00", initials: "JW", color: "bg-amber-500" }
  ];

  return (
    <div className="w-full bg-gradient-to-b from-zinc-900/50 to-zinc-950 border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-colors duration-500 pointer-events-none select-none">
      <div className="h-8 bg-white/[0.02] border-b border-white/5 flex items-center px-3 gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 opacity-0" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 opacity-0" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 opacity-0" />
      </div>
      <div className="p-4 space-y-3">
        {transactions.map((tx, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] transition-colors cursor-default group/item">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full ${tx.color} flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-1 ring-white/10`}>
                {tx.initials}
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-200">{tx.name}</div>
                <div className="text-[10px] text-zinc-500 font-semibold">{tx.role}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-mono text-brand-400 font-bold mb-0.5">{tx.amount}</div>
              <div className="text-[10px] text-emerald-500 flex items-center justify-end gap-1 font-medium bg-brand-500/10 px-1.5 py-0.5 rounded ml-auto w-fit">
                <CheckCircle2 className="w-3 h-3" /> Paid
              </div>
            </div>
          </div>
        ))}
        <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
          <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            Batch #2920 Confirmed
          </div>
          <div className="text-[10px] text-zinc-600 font-medium font-mono">
            POLYGON_L2
          </div>
        </div>
      </div>
    </div>
  );
};

const EscrowDemo = () => (
  <div className="w-full bg-gradient-to-b from-zinc-900/50 to-zinc-950 border border-white/10 rounded-xl p-5 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center gap-4 sm:gap-0 min-h-[220px] pointer-events-none select-none">
    <div className="flex-1 relative z-10">
      <div className="space-y-3">
        {[
          { label: "Milestone A", amount: "50,000 USDC", locked: true },
          { label: "Milestone B", amount: "25,000 USDC", locked: true },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-3">
              <Lock className="w-3.5 h-3.5 text-brand-400" />
              <span className="text-[11px] font-bold text-white">{item.label}</span>
            </div>
            <span className="text-[11px] font-mono font-medium text-zinc-400">{item.amount}</span>
          </div>
        ))}
        <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
          <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            Contract Validated
          </div>
          <div className="text-[10px] text-zinc-600 font-medium font-mono">
            SECURE_VAULT
          </div>
        </div>
      </div>
    </div>
    <div className="w-full sm:w-1/2 flex justify-center items-center relative">
      <img src="/escrow-safe.png" alt="Escrow Safe" className="w-32 h-32 sm:w-44 sm:h-44 object-contain" />
    </div>
  </div>
);

const RemittanceDemo = () => (
  <div className="w-full bg-zinc-950 rounded-xl border border-white/10 p-5 shadow-2xl relative overflow-hidden transition-colors duration-500 pointer-events-none select-none">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Transfer Funds</h4>
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-500/10 border border-brand-500/20">
        <Zap className="w-3 h-3 text-brand-400 fill-brand-400" />
        <span className="text-[10px] font-bold text-brand-400 uppercase tracking-widest">Instant</span>
      </div>
    </div>

    {/* Send Card */}
    <div className="bg-white/5 rounded-lg p-3 mb-2 border border-white/5">
      <label className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">You Send</label>
      <div className="flex items-center justify-between">
        <span className="text-xl font-mono font-bold text-white">1,000.00</span>
        <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded border border-white/10">
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] font-bold text-white">US</div>
          <span className="text-xs font-bold text-white">USD</span>
        </div>
      </div>
    </div>

    {/* Exchange Rate Connector */}
    <div className="flex items-center justify-between pl-3 pr-1 my-[-6px] relative z-10">
      <div className="h-6 sm:h-8 w-0.5 bg-white/10 mx-4"></div>
      <div className="flex items-center gap-2 text-[9px] sm:text-[10px] text-zinc-500 font-mono bg-zinc-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
        <ArrowRightLeft className="w-3 h-3 text-zinc-400" />
        1 USD = 151.50 KES
      </div>
    </div>

    {/* Receive Card */}
    <div className="bg-transparent rounded-lg p-3 mt-1 border border-white/5 relative">
      <label className="text-[10px] text-zinc-500 font-bold uppercase block mb-1">Recipient Gets</label>
      <div className="flex items-center justify-between">
        <span className="text-xl font-mono font-bold text-brand-400">151,500.00</span>
        <div className="flex items-center gap-2 bg-black/40 px-2 py-1 rounded border border-white/10">
          <div className="w-4 h-4 rounded-full bg-black flex items-center justify-center text-[8px] font-bold text-white border border-white/20">🇰🇪</div>
          <span className="text-xs font-bold text-white">KES</span>
        </div>
      </div>
      {/* Success Check */}
      <div className="absolute -right-2 -bottom-2">
        <div className="bg-brand-500 text-black rounded-full p-1 shadow-lg shadow-brand-500/40 border-2 border-[#0A0A0B]">
          <CheckCircle2 className="w-3.5 h-3.5 fill-black" />
        </div>
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap justify-between items-baseline gap-2">
      <div className="text-[10px] text-zinc-500 font-medium">Fee: <span className="text-white font-bold">$0.00</span></div>
      <div className="text-[10px] text-zinc-500 font-medium">Arrives: <span className="text-brand-400 font-bold">In 2 secs</span></div>
    </div>
  </div>
);

const ApiDemo = () => (
  <div className="w-full bg-gradient-to-b from-[#18181b] to-black border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-colors duration-500 flex flex-col h-full min-h-[220px] pointer-events-none select-none">
    {/* Editor Header */}
    <div className="h-8 bg-white/[0.02] border-b border-white/5 flex items-center px-4 justify-between">
      <div className="flex items-center gap-2 opacity-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
        </div>
      </div>
      <div className="text-[10px] font-mono text-zinc-600">payment_flow.ts</div>
    </div>

    {/* Editor Content */}
    <div className="p-4 sm:p-5 font-mono text-[9px] sm:text-[10px] leading-relaxed text-zinc-500 flex-1 overflow-x-auto">
      <div className="flex gap-2">
        <span className="text-zinc-700 select-none">1</span>
        <span><span className="text-purple-400">import</span> {"{"} Zapzive {"}"} <span className="text-purple-400">from</span> <span className="text-green-500/80">'@zapzive/sdk'</span>;</span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-700 select-none">2</span>
        <span></span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-700 select-none">3</span>
        <span><span className="text-zinc-600">// Setup instant settlement</span></span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-700 select-none">4</span>
        <span><span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> <span className="text-yellow-400">Zapzive</span>({"{"}</span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-700 select-none">5</span>
        <span>&nbsp;&nbsp;apiKey: <span className="text-blue-400">process.env.ZAP_KEY</span></span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-700 select-none">6</span>
        <span>{"}"});</span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-700 select-none">7</span>
        <span></span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-700 select-none">8</span>
        <span><span className="text-purple-400">await</span> client.transfers.<span className="text-blue-400">create</span>({"{"}</span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-700 select-none">9</span>
        <span>&nbsp;&nbsp;amount: <span className="text-brand-400">1000</span>,</span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-700 select-none">10</span>
        <span>&nbsp;&nbsp;currency: <span className="text-brand-400">"USDC"</span>,</span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-700 select-none">11</span>
        <span>&nbsp;&nbsp;network: <span className="text-brand-400">"POLYGON"</span></span>
      </div>
      <div className="flex gap-2">
        <span className="text-zinc-700 select-none">12</span>
        <span>{"}"});</span>
      </div>
    </div>
  </div>
);

const features = [
  {
    title: "One-Click Mass Payouts",
    description: "Upload one payroll file and settle hundreds of payouts across countries without SWIFT delays or manual reconciliation.",
    colSpan: "lg:col-span-2",
    demo: <PayrollDemo />,
    href: "/signup"
  },
  {
    title: "Smart Escrow",
    description: "Lock milestone-based funds and release payments only after approval, verification, or delivery confirmation.",
    colSpan: "lg:col-span-1",
    demo: <EscrowDemo />,
    href: "/signup"
  },
  {
    title: "Developer API",
    description: "Add stablecoin settlement, local cash-out, escrow, and payout automation through one API.",
    colSpan: "lg:col-span-1",
    demo: <ApiDemo />,
    href: "/signup"
  },
  {
    title: "Instant Remittances",
    description: "Convert stablecoin settlement into local mobile money or bank payouts with transparent rates and no hidden bank markup.",
    colSpan: "lg:col-span-2",
    demo: <RemittanceDemo />,
    href: "/signup"
  }
];

export function ValuePropsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 relative bg-transparent">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold mb-6 text-zinc-50 tracking-tight">
            Operating workflows for <span className="text-brand-400">real money movement</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={cn("group", feature.colSpan)}
            >
              <Link to={feature.href} className="block h-full">
                <div className="bg-gradient-to-b from-[#111] to-[#050505] h-full flex flex-col transition-all duration-500 relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 min-h-[320px] sm:min-h-0 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)] hover:border-zinc-700">
                  {/* Background Gradient on Hover - Removed */}

                  <div className="p-5 sm:p-8 pb-0 relative z-10">
                    <h3 className="text-xl sm:text-2xl font-extrabold mb-2 sm:mb-3 text-white tracking-tight">{feature.title}</h3>
                    <p className="text-sm sm:text-lg text-zinc-400 mb-4 sm:mb-8 leading-relaxed max-w-md font-medium">{feature.description}</p>
                  </div>

                  {/* Demo Area - Pushed to bottom */}
                  <div className="mt-auto px-3 sm:px-8 pb-6 sm:pb-8 relative z-10 flex items-center justify-center overflow-hidden">
                    <div className="scale-[0.85] sm:scale-100 origin-center w-full">
                      {feature.demo}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

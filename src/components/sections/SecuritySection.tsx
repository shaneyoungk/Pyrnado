import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Lock, Eye, FileCheck, Fingerprint, Globe, KeyRound } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Non-custodial treasury controls",
    description: "Configure treasury movement without giving up operational visibility or approval discipline.",
  },
  {
    icon: Lock,
    title: "Role-based approvals",
    description: "Require sign-off by amount, corridor, recipient, escrow release, or risk review state.",
  },
  {
    icon: FileCheck,
    title: "KYC and AML workflows",
    description: "Attach identity, counterparty, and review status to each payout and escrow movement.",
  },
  {
    icon: Eye,
    title: "Audit-ready records",
    description: "Keep approval logs, settlement events, FX references, receipts, and compliance notes in one trail.",
  },
  {
    icon: Fingerprint,
    title: "Multi-party approval flows",
    description: "Separate request, review, approval, and release permissions for sensitive operations.",
  },
  {
    icon: Globe,
    title: "Transaction monitoring",
    description: "Flag unusual activity, high-risk counterparties, and payout corridor exceptions before release.",
  },
  {
    icon: KeyRound,
    title: "Secure API access",
    description: "Use API keys, sandbox mode, idempotency, webhooks, and logs for controlled integration.",
  },
];

const partners = [
  { name: "Polygon", desc: "Network" },
  { name: "Circle", desc: "USDC Issuer" },
  { name: "Chainalysis", desc: "Compliance" },
  { name: "Fireblocks", desc: "Custody" },
];

export function SecuritySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-40 relative overflow-hidden">
      {/* Background glow - Removed as requested */}

      <div className="container mx-auto relative z-10 px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tag text-[10px] font-black uppercase tracking-[0.2em] bg-brand-500/10 text-brand-400 border border-brand-500/20 px-3 py-1 rounded-full mb-6 inline-block">Trust Architecture</span>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-zinc-50 mb-8 leading-tight tracking-tight uppercase">
              Built for secure
              <br />
              <span className="text-brand-500">financial operations</span>
            </h2>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Zapzive gives teams visibility and control across every payout, approval, escrow release, and remittance flow, with audit-ready records and operational safeguards built in.
            </p>

            {/* Security partners */}
            <div className="grid grid-cols-2 gap-4">
              {partners.map((partner) => (
                <div
                  key={partner.name}
                  className="bg-transparent border border-white/5 p-5 flex items-center gap-4 rounded-2xl transition-colors"
                >
                  <div className="w-12 h-12 flex items-center justify-center">
                    <span className="text-xl font-black text-brand-400">{partner.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-base font-black text-white">{partner.name}</p>
                    <p className="text-sm text-zinc-500 font-medium">{partner.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - Features grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#0d0f0f] p-6 group rounded-[20px] border border-white/10 hover:border-zinc-600 transition-all duration-500"
              >
                <feature.icon className="w-7 h-7 text-brand-500 mb-4 transition-transform group-hover:text-brand-400" />
                <h4 className="font-extrabold text-zinc-50 text-lg mb-2 tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

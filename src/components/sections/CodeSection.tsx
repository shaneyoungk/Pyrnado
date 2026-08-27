import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Copy, ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const codeExamples = {
  curl: `curl -X POST https://api.zapzive.network/v1/payouts \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Idempotency-Key: batch_2026_04_kenya" \\
  -d '{
    "amount": "421870.42",
    "currency": "USDC",
    "corridor": "USDC_KES",
    "rail": "mpesa",
    "recipient": {
      "name": "Jane Doe",
      "external_id": "worker_1042"
    },
    "metadata": {
      "type": "payroll",
      "batch": "kenya_april"
    }
  }'`,
  python: `import zapzive

client = zapzive.Client("sk_live_...")

payout = client.payouts.create(
    amount="15480.00",
    currency="USDC",
    corridor="USDC_KES",
    rail="mpesa",
    recipient_id="worker_1042",
    approvals=["finance", "compliance"]
)

print(f"Payout {payout.id}: {payout.status}")`,
  node: `import zapzive from 'zapzive';

const client = new zapzive('sk_live_...');

const payout = await client.payouts.create({
  amount: '2192.75',
  currency: 'USDC',
  corridor: 'USDC_NGN',
  rail: 'local_bank',
  recipientId: 'vendor_8821',
  approvalPolicy: 'dual_authorization'
});

console.log(payout.status);`,
};

type Lang = keyof typeof codeExamples;

const features = [
  "Create payouts, escrow releases, and recipient verification flows",
  "Webhook events for settlement, compliance, and payout status",
  "Sandbox mode, API logs, and idempotency keys",
  "Transaction tracking with corridor, rail, and FX metadata",
  "Configurable approval policies for finance operations",
  "Escrow milestone release and dispute-ready audit trails",
];

export function CodeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeLang, setActiveLang] = useState<Lang>("node");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section ref={ref} className="py-20 sm:py-32 lg:py-40 relative bg-transparent overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-8">
              <Terminal className="w-4 h-4 mr-1" />
              Developer API
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
              Built for developers,
              <br />
              <span className="text-brand-400">finance teams, and operators</span>
            </h2>
            <p className="text-xl sm:text-2xl text-zinc-400 mb-10 leading-relaxed font-light">
              Integrate stablecoin settlement, local cash-out, escrow, compliance events, and payout automation through one API.
            </p>

            {/* Feature list */}
            <ul className="space-y-4 mb-12">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-4 text-base text-zinc-300">
                  <div className="mt-1 w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-brand-400" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="w-full sm:w-auto bg-white hover:bg-zinc-200 text-black font-bold h-12 px-8 rounded-lg transition-all group">
                Get API Keys
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="w-full sm:w-auto border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-white hover:border-zinc-700 font-semibold h-12 px-8 rounded-lg transition-all">
                View Docs
              </Button>
            </div>
          </motion.div>

          {/* Right - Code block */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bg-[#0F0F10] rounded-3xl overflow-hidden border border-white/10 shadow-2xl transition-all duration-500 group">
              {/* Tabs */}
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 bg-white/5">
                <div className="flex gap-2">
                  {(["curl", "python", "node"] as Lang[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`px-4 py-2 text-xs font-mono rounded-lg transition-all font-bold uppercase tracking-wide ${activeLang === lang
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                        }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleCopy}
                  className="p-2 text-zinc-500 hover:text-white transition-colors hover:bg-white/10 rounded-lg"
                >
                  {copied ? <Check className="w-4 h-4 text-brand-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Code */}
              <div className="p-8 overflow-x-auto relative">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
                <pre className="text-sm leading-relaxed font-mono">
                  <code className="text-zinc-400">
                    {codeExamples[activeLang].split('\n').map((line, i) => (
                      <div key={i} className="hover:bg-white/5 -mx-8 px-8 transition-colors">
                        {line}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>

              {/* Response preview */}
              <div className="border-t border-white/5 px-8 py-5 bg-black/40">
                <p className="text-[10px] font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  Live Response
                </p>
                <code className="text-xs font-mono text-brand-400 font-medium opacity-90 block">
                  {`{ "id": "po_1234", "status": "settlement_pending", "risk_score": 18, "webhook": "payout.updated" }`}
                </code>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

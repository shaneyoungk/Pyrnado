import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, X, Zap, ArrowRight } from "lucide-react";

const comparisonData = {
  headers: ["Capability", "Zapzive", "Banks", "Wise", "Payoneer"],
  rows: [
    { feature: "Settlement time", zapzive: "Rail-dependent, near real-time", wise: "1-5 business days", payoneer: "Hours-days", wu: "2-5 days" },
    { feature: "Fee transparency", zapzive: "Transparent platform fee", wise: "Often opaque", payoneer: "Transparent FX", wu: "Varies by market" },
    { feature: "Bulk payout support", zapzive: true, wise: "Manual files", payoneer: true, wu: true },
    { feature: "Escrow support", zapzive: true, wise: false, payoneer: false, wu: false },
    { feature: "Developer API", zapzive: true, wise: "Limited", payoneer: true, wu: true },
    { feature: "Audit logs", zapzive: true, wise: "Bank statements", payoneer: "Reports", wu: "Reports" },
    { feature: "Stablecoin settlement", zapzive: true, wise: false, payoneer: false, wu: false },
    { feature: "Local cash-out", zapzive: true, wise: "Corridor-specific", payoneer: "Bank/card", wu: "Bank/card" },
    { feature: "Role-based approvals", zapzive: true, wise: "Limited", payoneer: "Limited", wu: "Limited" },
    { feature: "Compliance workflows", zapzive: true, wise: "Provider managed", payoneer: "Provider managed", wu: "Provider managed" },
  ],
};

function CellValue({ value, iszapzive = false }: { value: boolean | string; iszapzive?: boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <div className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${iszapzive ? "bg-brand-500/20" : "bg-muted"
        }`}>
        <Check className={`w-4 h-4 ${iszapzive ? "text-brand-400" : "text-muted-foreground"}`} />
      </div>
    ) : (
      <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted/50">
        <X className="w-4 h-4 text-zinc-500" />
      </div>
    );
  }
  return (
    <span className={`text-sm ${iszapzive ? "text-white font-bold" : "text-zinc-300 font-medium"}`}>
      {value}
    </span>
  );
}

export function ComparisonSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 lg:py-40 relative">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="tag tag-muted mb-6 inline-block">Comparison</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-50 mb-8 leading-tight tracking-tight">
            Compare operating
            <br />
            <span className="text-brand-400">control, not hype</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed">
            Banks and payout providers can move money. Zapzive adds escrow, approval, audit, API, and stablecoin settlement controls.
          </p>
        </motion.div>

        {/* Comparison table */}
        <div className="flex justify-end mb-4 sm:hidden">
          <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
            <span>Swipe to view</span>
            <ArrowRight className="w-3 h-3 animate-pulse" />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl overflow-hidden border border-zinc-700 bg-gradient-to-b from-[#111] to-black shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)]"
        >
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full min-w-[600px] sm:min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10">
                  {comparisonData.headers.map((header, index) => (
                    <th
                      key={header}
                      className={`px-8 py-6 text-left text-base font-bold ${index === 1
                        ? "text-white bg-white/[0.03] border-x border-white/5"
                        : "text-zinc-500"
                        }`}
                    >
                      {index === 1 && (
                        <div className="flex items-center gap-2.5">
                          <Zap className="w-5 h-5 text-brand-400" />
                          {header}
                        </div>
                      )}
                      {index !== 1 && header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.rows.map((row, rowIndex) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${rowIndex % 2 === 1 ? "bg-white/[0.02]" : ""
                      }`}
                  >
                    <td className="px-8 py-5 text-base font-semibold text-white">
                      {row.feature}
                    </td>
                    <td className="px-8 py-5 bg-white/[0.03] border-x border-white/5">
                      <div className="flex items-center gap-3">
                        <CellValue value={row.zapzive} iszapzive />
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <CellValue value={row.wise} />
                    </td>
                    <td className="px-8 py-5">
                      <CellValue value={row.payoneer} />
                    </td>
                    <td className="px-8 py-5">
                      <CellValue value={row.wu} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Capabilities vary by corridor, partner availability, account configuration, and compliance status.
        </motion.p>
      </div>
    </section>
  );
}

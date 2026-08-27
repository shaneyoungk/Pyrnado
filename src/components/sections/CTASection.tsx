import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Zap, Shield, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 lg:py-40 relative overflow-hidden">
      {/* Background glow - Removed */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="container mx-auto relative z-10 px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#0F0F10] border border-white/10 shadow-2xl rounded-[2.5rem] p-12 lg:p-20 text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 tag tag-accent mb-8">
            <Zap className="w-4 h-4" />
            Sandbox available for payout and escrow testing
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight">
            Start moving money globally <br />
            with fewer delays.
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Launch in sandbox. Test payouts. Move to production when ready.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/pricing">
              <Button
                size="lg"
                className="bg-white hover:bg-zinc-200 text-black font-bold px-10 py-7 text-lg group w-full sm:w-auto rounded-lg transition-all duration-300"
              >
                Create Account
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-white hover:border-zinc-700 font-semibold px-10 py-7 text-lg w-full sm:w-auto rounded-lg transition-all duration-300"
              >
                Talk to Sales
              </Button>
            </Link>
            <Link to="/docs">
              <Button
                variant="outline"
                size="lg"
                className="border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-900 hover:text-white hover:border-zinc-700 font-semibold px-10 py-7 text-lg w-full sm:w-auto rounded-lg transition-all duration-300"
              >
                Read Docs
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-10">
            {[
              { icon: Shield, label: "SOC 2 & KYC/AML" },
              { icon: Clock, label: "< 3s Settlement" },
              { icon: Globe, label: "40+ Countries" },
              { icon: Zap, label: "Polygon & Base" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-base font-bold text-zinc-500 uppercase tracking-tight text-[11px]">
                <item.icon className="w-5 h-5 text-brand-500/60" />
                {item.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ValuePropsSection } from "@/components/sections/ValuePropsSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { CodeSection } from "@/components/sections/CodeSection";
import { CTASection } from "@/components/sections/CTASection";
import { ProductOverviewSection } from "@/components/sections/ProductOverviewSection";
import { CorridorSection } from "@/components/sections/CorridorSection";
import { FAQSection } from "@/components/sections/FAQSection";
import DarkVeil from "@/components/ui/DarkVeil";
import { useEffect } from "react";
import { useMetrics } from "@/hooks/useMetrics";

const Index = () => {
  const { trackPageView } = useMetrics();

  useEffect(() => {
    trackPageView("Homepage");
  }, [trackPageView]);

  return (
    <div className="min-h-screen relative selection:bg-indigo-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <DarkVeil
          hueShift={160}
          noiseIntensity={0.02}
          scanlineIntensity={0.05}
          speed={0.2}
          scanlineFrequency={0.8}
          warpAmount={0.15}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <StatsSection />
        <ProductOverviewSection />
        <ValuePropsSection />
        <HowItWorksSection />
        <CorridorSection />
        <SecuritySection />
        <CodeSection />
        <ComparisonSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;

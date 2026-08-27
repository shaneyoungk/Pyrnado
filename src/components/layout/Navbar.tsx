import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { ZapziveLogo } from "@/components/ui/ZapziveLogo";

const navLinks = [
  { label: "Platform", href: "/features" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Developers", href: "/docs", hasDropdown: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Company", href: "/company", hasDropdown: true },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-5 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "pointer-events-auto rounded-xl bg-zinc-950/75 backdrop-blur-3xl transition-all duration-500 flex items-center justify-between border border-white/10",
            isScrolled ? "py-2 px-5 w-full max-w-6xl mx-auto shadow-[0_10px_40px_-5px_rgba(0,0,0,0.5)]" : "py-2.5 px-6 w-full container mx-auto"
          )
          }>
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2 mr-8 group">
            <ZapziveLogo size="sm" className="opacity-95 group-hover:opacity-100 transition-opacity" />
          </Link>

          {/* Center: Nav Links */}
          <div className="hidden lg:flex items-center gap-7 mr-auto">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-[11px] uppercase tracking-[0.14em] font-black text-zinc-400 hover:text-white transition-all duration-300 flex items-center gap-1.5 group/link"
              >
                {link.label}
                {link.hasDropdown && <ChevronDown className="w-3 h-3 opacity-30 group-hover/link:opacity-80 transition-opacity" />}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5">
            <Link to="/docs" className="text-[11px] uppercase tracking-widest font-black text-zinc-500 hover:text-white transition-colors">
              Docs
            </Link>
            <Link to="/login" className="text-[11px] uppercase tracking-widest font-black text-zinc-500 hover:text-white transition-colors">
              Log in
            </Link>

            <Link to="/signup">
              <Button className="bg-white hover:bg-zinc-200 text-black font-bold px-4 py-1.5 h-8 text-[10px] uppercase tracking-widest rounded-lg transition-all duration-300">
                Start Free
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white/10 bg-white/[0.03] hover:bg-white/10 text-white font-bold px-4 py-1.5 h-8 text-[10px] uppercase tracking-widest rounded-lg transition-all duration-300">
                Talk to Sales
              </Button>
            </Link>

            <button className="flex items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors ml-2">
              <Globe className="w-3.5 h-3.5" />
              <ChevronDown className="w-3 h-3 opacity-40" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-24 z-40 lg:hidden"
          >
            <div className="bg-[#111] border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 text-lg font-semibold text-zinc-300 hover:text-white transition-colors"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <div className="flex flex-col gap-3">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center py-2 text-zinc-400 font-semibold hover:text-white transition-colors">
                  Log in
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-3 rounded-xl transition-all">
                    Start Free
                  </Button>
                </Link>
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-zinc-700 bg-transparent text-white font-bold py-3 rounded-xl transition-all">
                    Talk to Sales
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { motion } from "framer-motion";
import { Tag, Calendar, User, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import DarkVeil from "@/components/ui/DarkVeil";

const articles = [
    {
        title: "Stablecoins vs. Swift: The True Cost of Global Payroll",
        category: "Industry Analysis",
        date: "Oct 12, 2025",
        author: "Sarah Chen",
        readTime: "5 min read",
        image: "bg-emerald-900/20"
    },
    {
        title: "How Smart Escrow is Replacing Letter of Credit",
        category: "Product Updates",
        date: "Oct 08, 2025",
        author: "Alex Rivera",
        readTime: "4 min read",
        image: "bg-blue-900/20"
    },
    {
        title: "Treasury Management in High-Inflation Economies",
        category: "Case Study",
        date: "Sep 29, 2025",
        author: "David Okonjo",
        readTime: "7 min read",
        image: "bg-purple-900/20"
    }
];

export default function Blog() {
    return (
        <div className="min-h-screen relative selection:bg-emerald-500/30">
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

                <main className="pt-32 pb-20 px-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-20">
                            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-zinc-50">
                                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Ledger</span>
                            </h1>
                            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                                Insights on the future of programmable money, autonomous finance, and borderless operations.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {articles.map((article, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group cursor-pointer"
                                >
                                    <div className={`h-64 rounded-2xl mb-6 ${article.image} relative overflow-hidden border border-white/5 group-hover:border-emerald-500/50 transition-colors`}>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                        <div className="absolute bottom-4 left-4">
                                            <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-white border border-white/10 flex items-center gap-2 w-fit">
                                                <Tag className="w-3 h-3 text-emerald-400" /> {article.category}
                                            </span>
                                        </div>
                                    </div>

                                    <h2 className="text-2xl font-extrabold mb-3 text-zinc-50 group-hover:text-emerald-400 transition-colors">{article.title}</h2>

                                    <div className="flex items-center gap-4 text-sm text-zinc-500 mb-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" /> {article.date}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" /> {article.author}
                                        </div>
                                    </div>

                                    <Button variant="link" className="p-0 text-white font-bold hover:text-emerald-400">
                                        Read Article <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}

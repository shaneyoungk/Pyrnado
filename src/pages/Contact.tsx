import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import DarkVeil from "@/components/ui/DarkVeil";

export default function Contact() {
    return (
        <div className="min-h-screen relative selection:bg-accent/30">
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

                <main className="pt-40 pb-20">
                    <div className="container mx-auto px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                            {/* Left Info */}
                            <div>
                                <h1 className="text-5xl lg:text-7xl font-extrabold mb-8 text-zinc-50">
                                    Get in <span className="text-gradient">touch</span>
                                </h1>
                                <p className="text-xl text-muted-foreground mb-12">
                                    Have questions about integrations, pricing, or regulations?
                                    Our team is ready to help.
                                </p>

                                <div className="space-y-8 mb-12">
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                            <Mail className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-extrabold text-lg mb-1 text-zinc-50">Email us</h3>
                                            <p className="text-muted-foreground mb-1">hello@zapzive.network</p>
                                            <p className="text-muted-foreground">partners@zapzive.network</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-extrabold text-lg mb-1 text-zinc-50">Visit us</h3>
                                            <p className="text-muted-foreground mb-1">123 Blockchain Blvd, Crypto Valley</p>
                                            <p className="text-muted-foreground">Lagos, Nigeria (HQ)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Card */}
                            <div className="bg-gradient-to-br from-[#111] via-[#050505] to-black p-8 lg:p-12 rounded-[3rem] border border-zinc-700/50 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8)]">
                                <form className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold ml-1">First Name</label>
                                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors" placeholder="John" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold ml-1">Last Name</label>
                                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold ml-1">Email</label>
                                        <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors" placeholder="john@company.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold ml-1">Message</label>
                                        <textarea className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 h-32 resize-none focus:outline-none focus:border-accent transition-colors" placeholder="Tell us about your project..." />
                                    </div>
                                    <Button className="w-full bg-white hover:bg-zinc-200 text-black font-bold py-6 text-lg rounded-xl shadow-lg">
                                        Send Message <Send className="w-5 h-5 ml-2" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}


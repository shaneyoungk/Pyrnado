import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMetrics } from '@/hooks/useMetrics';

export const CookieBanner: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { trackEvent } = useMetrics();

    useEffect(() => {
        const consent = localStorage.getItem('gp-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('gp-consent', 'true');
        setIsVisible(false);
        trackEvent({
            category: 'Compliance',
            action: 'Cookies Accepted',
            label: 'Full Consent'
        });
    };

    const handleDecline = () => {
        localStorage.setItem('gp-consent', 'false');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-[100] w-full"
                >
                    <div className="relative bg-[#0A0A0B]/95 backdrop-blur-xl border-t border-white/10 px-4 py-5 sm:px-8 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-6">

                        <div className="flex items-start gap-4 flex-1">
                            <div className="space-y-1">
                                <h4 className="text-white font-semibold text-base tracking-tight">Cookie Preferences</h4>
                                <p className="text-[13px] text-zinc-400 leading-relaxed max-w-3xl">
                                    We use cookies to enhance your experience and secure your transactions. By continuing, you agree to our
                                    <span className="text-white font-medium cursor-pointer hover:underline mx-1 transition-colors">Privacy Policy</span>.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                            <button
                                onClick={() => setIsVisible(false)}
                                className="text-[13px] font-semibold text-zinc-400 hover:text-white transition-colors px-4 py-2"
                            >
                                Decline
                            </button>

                            <Button
                                onClick={handleAccept}
                                className="bg-white hover:bg-zinc-200 text-black font-bold px-6 py-2.5 rounded-lg h-auto transition-all flex-1 md:flex-none whitespace-nowrap text-[13px]"
                            >
                                Accept All
                            </Button>
                        </div>

                        {/* Tactile Noise Texture Overlay */}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

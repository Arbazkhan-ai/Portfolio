"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
    const [lines, setLines] = useState<string[]>([]);

    const bootText = [
        "INITIALIZING NEURAL CORE...",
        "LOADING MEMORY MODULES...",
        "CONNECTING TO SATELLITE UPLINK...",
        "OPTIMIZING RENDER PIPELINE...",
        "ESTABLISHING SECURE CONNECTION...",
        "ACCESS GRANTED.",
        "WELCOME, USER."
    ];

    useEffect(() => {
        let delay = 0;
        bootText.forEach((text, index) => {
            delay += Math.random() * 300 + 100;
            setTimeout(() => {
                setLines((prev) => [...prev, text]);
                // Scroll to bottom logic if needed
            }, delay);
        });

        setTimeout(() => {
            onComplete();
        }, delay + 800);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center font-mono text-sm md:text-base cursor-wait"
        >
            {/* Branding Logo */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-12 flex flex-col items-center"
            >
                <div className="w-16 h-16 border-2 border-[var(--color-accent-blue)] rounded-xl flex items-center justify-center mb-4 rotate-45">
                    <div className="w-8 h-8 bg-[var(--color-accent-blue)] rounded-sm -rotate-45" />
                </div>
                <h2 className="text-xl font-bold tracking-[0.3em] text-gray-900">ARBAZ.AI</h2>
            </motion.div>

            <div className="w-full max-w-lg p-6 bg-gray-50/50 rounded-2xl border border-gray-100 backdrop-blur-sm">
                <div className="mb-6 border-b border-gray-200 pb-3 flex justify-between items-center text-gray-400 text-[10px] font-bold tracking-widest">
                    <span>SYSTEM_V2.0.4 // KERNEL: STABLE</span>
                    <span className="animate-pulse">BOOTING...</span>
                </div>

                <div className="flex flex-col space-y-1">
                    {lines.map((line, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[var(--color-accent-blue)]"
                        >
                            <span className="opacity-50 mr-2 text-gray-400">[{new Date().toLocaleTimeString()}]</span>
                            {line}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.div
                        className="h-full bg-[var(--color-accent-blue)]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}

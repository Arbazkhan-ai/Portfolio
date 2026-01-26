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
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center font-mono text-sm md:text-base cursor-wait"
        >
            <div className="w-full max-w-lg p-6">
                <div className="mb-4 border-b border-gray-800 pb-2 flex justify-between items-center text-gray-500 text-xs">
                    <span>TERMINAL_V1.0.4</span>
                    <span>SECURE_BOOT</span>
                </div>

                <div className="flex flex-col space-y-1">
                    {lines.map((line, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[var(--color-neon-cyan)]"
                        >
                            <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
                            {line}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-4 h-2 bg-gray-900 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.div
                        className="h-full bg-[var(--color-neon-cyan)]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}

"use client";
import React from "react";
import { motion } from "framer-motion";

export default function BackgroundText() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] select-none">
            <motion.div
                initial={{ x: "0%" }}
                animate={{ x: "-50%" }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute top-[15%] left-0 whitespace-nowrap text-[20vh] font-bold text-gray-900 opacity-[0.02] font-display uppercase leading-none"
            >
                ARTIFICIAL INTELLIGENCE // DEEP LEARNING // NEURAL NETWORKS // MACHINE LEARNING // COMPUTER VISION // NLP //
            </motion.div>

            <motion.div
                initial={{ x: "-50%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[20%] left-0 whitespace-nowrap text-[20vh] font-bold text-gray-900 opacity-[0.02] font-display uppercase leading-none"
            >
                SYSTEM ARCHITECT // FULLSTACK DEVELOPER // INNOVATOR // DESIGNER // ENGINEER // ARCHITECT //
            </motion.div>

            <div className="absolute top-1/2 left-10 -translate-y-1/2 flex flex-col gap-4 opacity-[0.05]">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="flex gap-2 text-[8px] font-mono text-gray-900">
                        <span>0x{Math.random().toString(16).slice(2, 6).toUpperCase()}</span>
                        <span>[STATUS_OK]</span>
                        <span>LINK_STABLE</span>
                    </div>
                ))}
            </div>

            <div className="absolute top-1/2 right-10 -translate-y-1/2 flex flex-col gap-4 opacity-[0.05] text-right">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="flex gap-2 text-[8px] font-mono text-gray-900 justify-end">
                        <span>SYS_LOG_V{Math.floor(Math.random() * 9)}</span>
                        <span>{new Date().toLocaleTimeString()}</span>
                        <span>BUFFER_{Math.floor(Math.random() * 100)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

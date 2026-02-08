"use client";
import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    "Python", "TensorFlow", "PyTorch", "OpenCV", "Docker", "Kubernetes", "AWS", "React", "Next.js", "TypeScript", "FastAPI", "PostgreSQL"
];

const list = [...skills, ...skills, ...skills]; // Triple for safety

const MarqueeItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="flex flex-shrink-0 space-x-12 pr-12"
        >
            {children}
        </motion.div>
    );
};

export default function SkillsMarquee() {
    return (
        <div className="relative flex overflow-x-hidden bg-[var(--color-bg-primary)] border-y border-white/5 py-4 w-full">
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--color-bg-primary)] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--color-bg-primary)] to-transparent z-10 pointer-events-none" />

            <div className="flex select-none">
                <motion.div
                    className="flex flex-shrink-0 space-x-12 pr-12"
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {list.map((skill, index) => (
                        <div key={index} className="flex items-center gap-3 text-gray-500 font-mono text-xs uppercase tracking-[0.2em] group hover:text-[var(--color-accent-blue)] transition-colors cursor-default whitespace-nowrap">
                            <span className="w-1.5 h-1.5 bg-[var(--color-accent-blue)] rounded-full opacity-30 group-hover:opacity-100 group-hover:shadow-[0_0_10px_var(--color-accent-blue)] transition-all"></span>
                            {skill}
                        </div>
                    ))}
                </motion.div>
                <motion.div
                    className="flex flex-shrink-0 space-x-12 pr-12"
                    initial={{ x: 0 }}
                    animate={{ x: "-100%" }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {list.map((skill, index) => (
                        <div key={index + 100} className="flex items-center gap-3 text-gray-500 font-mono text-xs uppercase tracking-[0.2em] group hover:text-[var(--color-accent-blue)] transition-colors cursor-default whitespace-nowrap">
                            <span className="w-1.5 h-1.5 bg-[var(--color-accent-blue)] rounded-full opacity-30 group-hover:opacity-100 group-hover:shadow-[0_0_10px_var(--color-accent-blue)] transition-all"></span>
                            {skill}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

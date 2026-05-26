"use client";
import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    { name: "Python", icon: "🐍" },
    { name: "TensorFlow", icon: "🧠" },
    { name: "PyTorch", icon: "🔥" },
    { name: "OpenCV", icon: "👁" },
    { name: "YOLO", icon: "⚡" },
    { name: "LangChain", icon: "🔗" },
    { name: "Docker", icon: "🐳" },
    { name: "AWS", icon: "☁️" },
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "TypeScript", icon: "📘" },
    { name: "FastAPI", icon: "🚀" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "HuggingFace", icon: "🤗" },
];

const list = [...skills, ...skills];

export default function SkillsMarquee() {
    return (
        <div className="relative overflow-hidden bg-[var(--color-bg-secondary)] border-y border-black/[0.05] py-5 w-full">
            {/* Gradient fade masks */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--color-bg-secondary)] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--color-bg-secondary)] to-transparent z-10 pointer-events-none" />

            {/* Marquee track */}
            <div className="flex select-none">
                {[0, 1].map((row) => (
                    <motion.div
                        key={row}
                        className="flex flex-shrink-0 gap-8 pr-8"
                        initial={{ x: 0 }}
                        animate={{ x: "-100%" }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    >
                        {list.map((skill, index) => (
                            <div
                                key={`${row}-${index}`}
                                className="flex items-center gap-2.5 px-4 py-2 rounded-xl border border-black/[0.06] bg-black/[0.03] text-[var(--color-text-secondary)] font-mono text-xs uppercase tracking-[0.15em] group hover:border-[var(--color-accent-blue)]/30 hover:text-[var(--color-text-primary)] hover:bg-black/[0.05] transition-all cursor-default whitespace-nowrap"
                            >
                                <span className="text-sm leading-none">{skill.icon}</span>
                                <span>{skill.name}</span>
                            </div>
                        ))}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

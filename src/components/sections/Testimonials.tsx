"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    { quote: "Arbaz transformed our raw data into a predictive goldmine.", author: "Sarah C., CTO", role: "FinTech Corp" },
    { quote: "The computer vision pipeline he built is 99% accurate. Insane work.", author: "David K.", role: "Security Systems" },
    { quote: "A true visionary in the AI space. Highly recommended.", author: "Elena R.", role: "HealthAI Startups" }
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-[var(--color-bg-primary)] border-t border-[var(--glass-border)] relative overflow-hidden">

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center mb-16 text-center space-y-4">
                    <span className="text-gray-500 font-mono text-xs tracking-[0.3em] uppercase opacity-80">
                        Testimonials
                    </span>
                    <h2 className="text-4xl font-bold font-scifi text-gray-900">
                        Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-cyan)]">Validation</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.2 }}
                            className="relative p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
                        >
                            <div className="absolute top-6 left-6 text-[var(--color-accent-blue)] opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                                <Quote className="w-10 h-10 rotate-180" />
                            </div>

                            <p className="text-gray-600 italic mb-8 relative z-10 pt-8 font-body leading-relaxed">
                                "{t.quote}"
                            </p>

                            <div className="flex items-center gap-4 border-t border-gray-100 pt-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent-blue)] to-[var(--color-accent-violet)] shadow-lg shadow-blue-500/20" />
                                <div>
                                    <h4 className="text-gray-900 font-bold text-sm font-scifi mb-0.5">{t.author}</h4>
                                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">{t.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

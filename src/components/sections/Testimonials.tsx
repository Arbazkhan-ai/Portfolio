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
        <section className="py-20 bg-black relative">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold font-scifi text-white mb-16 text-center">Data Validation</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="relative p-8 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:border-[var(--color-neon-violet)] transition-colors duration-300"
                        >
                            <Quote className="absolute top-4 left-4 text-[var(--color-neon-violet)] w-8 h-8 opacity-50" />
                            <p className="text-gray-300 italic mb-6 relative z-10 pt-4">"{t.quote}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-neon-cyan)] to-[var(--color-neon-violet)]" />
                                <div>
                                    <h4 className="text-white font-bold text-sm">{t.author}</h4>
                                    <span className="text-gray-500 text-xs uppercase">{t.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

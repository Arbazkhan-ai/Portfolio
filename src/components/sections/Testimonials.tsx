"use client";
import React from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
    {
        quote: "Arbaz transformed our raw data into a predictive goldmine. The model accuracy exceeded all our expectations.",
        author: "Sarah C.",
        role: "CTO",
        company: "FinTech Corp",
        rating: 5,
        color: "var(--color-accent-blue)",
    },
    {
        quote: "The computer vision pipeline he built is 99% accurate. Genuinely insane engineering under tight deadlines.",
        author: "David K.",
        role: "Head of Engineering",
        company: "Security Systems",
        rating: 5,
        color: "var(--color-accent-violet)",
    },
    {
        quote: "A true visionary in the AI space. Delivered a production-ready NLP system in record time. Highly recommended.",
        author: "Elena R.",
        role: "Founder",
        company: "HealthAI Startups",
        rating: 5,
        color: "var(--color-accent-cyan)",
    }
];

export default function Testimonials() {
    return (
        <section className="py-28 bg-[var(--color-bg-primary)] border-t border-white/[0.05] relative overflow-hidden">

            {/* Background decor */}
            <div className="orb w-[600px] h-[400px] bg-[var(--color-accent-blue)] opacity-[0.03] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center mb-16 text-center space-y-4"
                >
                    <span className="section-label">Testimonials</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
                        Client{" "}
                        <span className="text-gradient-blue">Validation</span>
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-sm">
                        What partners say about working with me.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6 }}
                            className="group relative p-7 rounded-2xl bg-[var(--color-bg-card)] border border-white/[0.06] overflow-hidden transition-all duration-400"
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = `${t.color}30`;
                                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${t.color}10`;
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = '';
                                (e.currentTarget as HTMLElement).style.boxShadow = '';
                            }}
                        >
                            {/* Top color accent line */}
                            <div
                                className="absolute top-0 left-0 right-0 h-0.5"
                                style={{ background: `linear-gradient(90deg, ${t.color}, transparent)` }}
                            />

                            {/* Quote Icon */}
                            <div
                                className="inline-flex p-2.5 rounded-xl mb-5 opacity-60 group-hover:opacity-100 transition-opacity"
                                style={{ color: t.color, background: `${t.color}15` }}
                            >
                                <Quote className="w-5 h-5" />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: t.rating }).map((_, si) => (
                                    <Star
                                        key={si}
                                        className="w-3.5 h-3.5 fill-current"
                                        style={{ color: t.color }}
                                    />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-6 italic group-hover:text-white/80 transition-colors duration-300">
                                &ldquo;{t.quote}&rdquo;
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}
                                >
                                    {t.author.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-sm">{t.author}</h4>
                                    <p className="text-[var(--color-text-muted)] text-xs font-mono">
                                        {t.role} · {t.company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

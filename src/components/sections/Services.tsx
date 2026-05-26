"use client";
import React from "react";
import { motion } from "framer-motion";
import { Cpu, Globe, Zap, Layers, Server, Code, ArrowRight } from "lucide-react";

const services = [
    {
        title: "ML Model Development",
        icon: <Cpu className="w-6 h-6" />,
        desc: "Custom neural architectures tailored for your specific problem domain — from tabular data to complex sequences.",
        color: "var(--color-accent-blue)",
    },
    {
        title: "AI Research & Prototyping",
        icon: <Zap className="w-6 h-6" />,
        desc: "Rapid iteration from academic paper to working proof-of-concept with rigorous experimentation.",
        color: "var(--color-accent-amber)",
    },
    {
        title: "NLP System Design",
        icon: <Layers className="w-6 h-6" />,
        desc: "Advanced chatbots, RAG pipelines, sentiment analysis, and semantic search engines powered by LLMs.",
        color: "var(--color-accent-violet)",
    },
    {
        title: "Computer Vision",
        icon: <Globe className="w-6 h-6" />,
        desc: "High-accuracy object detection, segmentation, and real-time tracking pipelines for production.",
        color: "var(--color-accent-cyan)",
    },
    {
        title: "Full-stack AI Integration",
        icon: <Server className="w-6 h-6" />,
        desc: "Seamless deployment of AI models into scalable web platforms with REST APIs and cloud infrastructure.",
        color: "var(--color-accent-green)",
    },
    {
        title: "Agent Automation",
        icon: <Code className="w-6 h-6" />,
        desc: "Autonomous agents performing complex, multi-step workflows using LangChain, CrewAI, and AutoGen.",
        color: "var(--color-accent-pink)",
    }
];

export default function Services() {
    return (
        <section id="services" className="py-28 bg-[var(--color-bg-secondary)] relative overflow-hidden">

            {/* Background effects */}
            <div className="orb w-[500px] h-[500px] bg-[var(--color-accent-violet)] opacity-[0.04] top-0 right-0" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center mb-16 text-center space-y-4"
                >
                    <span className="section-label" style={{ color: "var(--color-accent-violet)", borderColor: "rgba(168,85,247,0.3)", background: "rgba(168,85,247,0.08)" }}>
                        Capabilities
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mt-4">
                        Technical{" "}
                        <span className="text-gradient-violet">Arsenals</span>
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-md">
                        End-to-end AI expertise across the full model lifecycle.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6 }}
                            className="group relative p-7 rounded-2xl bg-[var(--color-bg-card)] border border-black/[0.06] overflow-hidden transition-all duration-400 cursor-default"
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = `${service.color}30`;
                                (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${service.color}10`;
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLElement).style.borderColor = '';
                                (e.currentTarget as HTMLElement).style.boxShadow = '';
                            }}
                        >
                            {/* Gradient top accent */}
                            <div
                                className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-80 transition-opacity duration-400"
                                style={{ background: `linear-gradient(90deg, ${service.color}, transparent)` }}
                            />

                            {/* Background glow */}
                            <div
                                className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                                style={{ background: `radial-gradient(circle, ${service.color}20, transparent)` }}
                            />

                            {/* Service Number watermark */}
                            <div
                                className="absolute -bottom-2 -right-2 text-8xl font-black opacity-[0.04] group-hover:opacity-[0.07] transition-opacity font-display pointer-events-none select-none"
                                style={{ color: service.color }}
                            >
                                {(idx + 1).toString().padStart(2, '0')}
                            </div>

                            {/* Icon */}
                            <div
                                className="inline-flex p-3 rounded-2xl mb-5 transition-all duration-300 group-hover:scale-110"
                                style={{ color: service.color, background: `${service.color}15` }}
                            >
                                {service.icon}
                            </div>

                            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 group-hover:translate-x-1 transition-transform duration-300">
                                {service.title}
                            </h3>

                            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-5">
                                {service.desc}
                            </p>

                            {/* Learn more hint */}
                            <div
                                className="flex items-center gap-1 text-[11px] font-mono font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                                style={{ color: service.color }}
                            >
                                EXPLORE <ArrowRight className="w-3 h-3" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";
import React from "react";
import { motion } from "framer-motion";
import { Cpu, Globe, Zap, Layers, Server, Code } from "lucide-react";

const services = [
    { title: "ML Model Development", icon: <Cpu />, desc: "Custom architectures for specific problem domains." },
    { title: "AI Research & Prototyping", icon: <Zap />, desc: "Rapid iteration from paper to working proof-of-concept." },
    { title: "NLP System Design", icon: <Layers />, desc: "Chatbots, extracting insights, and semantic search." },
    { title: "Computer Vision Pipelines", icon: <Globe />, desc: "Object detection, segmentation, and tracking." },
    { title: "Full-stack Web Apps", icon: <Server />, desc: "Integration of AI models into scalable web platforms." },
    { title: "API + Agent Automation", icon: <Code />, desc: "Autonomous agents performing complex workflows." }
];

export default function Services() {
    return (
        <section id="services" className="py-24 bg-black relative">
            {/* Circuit Lines Background (SVG or CSS) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[var(--color-neon-cyan)]" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold font-scifi text-white mb-4">System Capabilities</h2>
                    <div className="flex justify-center gap-2">
                        <div className="w-2 h-2 bg-[var(--color-neon-cyan)] rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-[var(--color-neon-cyan)] rounded-full animate-pulse delay-75" />
                        <div className="w-2 h-2 bg-[var(--color-neon-cyan)] rounded-full animate-pulse delay-150" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative group"
                        >
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 -left-6 w-6 h-[1px] bg-white/10 hidden lg:block group-hover:bg-[var(--color-neon-cyan)] transition-colors" />

                            <div className="h-full p-[1px] rounded-lg bg-gradient-to-br from-white/10 to-transparent group-hover:from-[var(--color-neon-cyan)] group-hover:to-[var(--color-neon-violet)] transition-all duration-300">
                                <div className="bg-[#050505] h-full rounded-lg p-6 relative overflow-hidden">
                                    {/* Scanning effect */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-neon-cyan)]/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out" />

                                    <div className="flex items-start justify-between mb-4">
                                        <div className="text-[var(--color-neon-cyan)] group-hover:scale-110 transition-transform duration-300">
                                            {service.icon}
                                        </div>
                                        <span className="text-[10px] font-mono text-gray-600 border border-white/10 px-2 py-1 rounded">SYS_MOD_0{idx + 1}</span>
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-2 font-scifi group-hover:text-[var(--color-neon-cyan)] transition-colors">{service.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

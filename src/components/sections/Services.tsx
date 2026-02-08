"use client";
import React from "react";
import { motion } from "framer-motion";
import { Cpu, Globe, Zap, Layers, Server, Code } from "lucide-react";

const services = [
    { title: "ML Model Development", icon: <Cpu className="w-6 h-6" />, desc: "Custom architectures tailored for specific problem domains." },
    { title: "AI Research & Prototyping", icon: <Zap className="w-6 h-6" />, desc: "Rapid iteration from academic paper to working proof-of-concept." },
    { title: "NLP System Design", icon: <Layers className="w-6 h-6" />, desc: "Advanced chatbots, insight extraction, and semantic search engines." },
    { title: "Computer Vision", icon: <Globe className="w-6 h-6" />, desc: "High-accuracy object detection, segmentation, and tracking pipelines." },
    { title: "Full-stack Integration", icon: <Server className="w-6 h-6" />, desc: "Seamless deployment of AI models into scalable web platforms." },
    { title: "Agent Automation", icon: <Code className="w-6 h-6" />, desc: "Autonomous agents performing complex, multi-step workflows." }
];

export default function Services() {
    return (
        <section id="services" className="py-24 bg-[var(--color-bg-secondary)] relative overflow-hidden">

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center mb-16 text-center space-y-4">
                    <span className="text-[var(--color-accent-violet)] font-mono text-xs tracking-[0.3em] uppercase opacity-80">
                        Capabilities
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-scifi text-gray-900">
                        Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-pink)]">Arsenals</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative p-8 glass-card rounded-2xl hover:bg-white transition-all duration-300 border border-gray-100 hover:border-[var(--color-accent-violet)]/50 shadow-sm hover:shadow-lg"
                        >
                            <div className="mb-6 inline-flex p-3 rounded-lg bg-[var(--color-accent-violet)]/10 text-[var(--color-accent-violet)] group-hover:bg-[var(--color-accent-violet)] group-hover:text-white transition-colors duration-300">
                                {service.icon}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-3 font-scifi group-hover:translate-x-1 transition-transform duration-300">
                                {service.title}
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed font-body group-hover:text-gray-800 transition-colors">
                                {service.desc}
                            </p>

                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 text-[60px] font-bold font-scifi text-[var(--color-accent-violet)] pointer-events-none transition-opacity duration-500 scale-150 origin-top-right">
                                0{idx + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

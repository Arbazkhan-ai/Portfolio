"use client";
import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Activity, Shield, Stethoscope, Search, Mic } from "lucide-react";

interface Project {
    title: string;
    category: string;
    description: string;
    icon: React.ReactNode;
    colorClass: string;
}

const projects: Project[] = [
    {
        title: "WeightGait Analysis",
        category: "ML Model",
        description: "Advanced gait analysis system utilizing machine learning to diagnose weight distribution issues.",
        icon: <Activity />,
        colorClass: "text-[var(--color-neon-cyan)]"
    },
    {
        title: "NLP Emergency Triage",
        category: "NLP System",
        description: "Intelligent emergency call processing system that prioritizes cases based on urgency.",
        icon: <Mic />,
        colorClass: "text-[var(--color-neon-violet)]"
    },
    {
        title: "Helmet Detector",
        category: "Computer Vision",
        description: "Real-time YOLOv8 implementation for safety equipment verification in construction zones.",
        icon: <Shield />,
        colorClass: "text-[var(--color-digital-blue)]"
    },
    {
        title: "Disease Prediction",
        category: "Healthcare AI",
        description: "Predictive engine aggregating patient data to forecast potential disease risks early.",
        icon: <Stethoscope />,
        colorClass: "text-[var(--color-neon-cyan)]"
    },
    {
        title: "Symptom Engine",
        category: "Prediction Engine",
        description: "Heuristic-based engine mapping complex symptom clusters to likely diagnoses.",
        icon: <Search />,
        colorClass: "text-[var(--color-neon-violet)]"
    },
    {
        title: "Patient Deterioration",
        category: "ICU AI",
        description: "Real-time monitoring system predicting patient deterioration in ICU settings.",
        icon: <Activity />,
        colorClass: "text-[var(--color-digital-blue)]"
    }
];

import TiltCard from "../ui/TiltCard";

export default function Projects() {
    return (
        <section id="projects" className="py-20 bg-[#050505] relative cursor-none-area">
            <div className="container mx-auto px-6">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-scifi text-white mb-4 text-center">MISSION LOGS</h2>
                    <div className="w-24 h-1 bg-[var(--color-neon-cyan)] animate-pulse"></div>
                    <p className="text-gray-500 font-mono mt-2 text-xs">AWAITING INPUT /// SELECT A FILE</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <TiltCard key={index} className="h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group relative bg-[#0C0C0C]/80 border border-white/10 p-6 rounded-xl hover:border-[var(--color-neon-cyan)] transition-colors duration-300 overflow-hidden h-full backdrop-blur-md"
                            >
                                {/* Holographic Scan Line */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-neon-cyan)] opacity-0 group-hover:opacity-50 group-hover:top-[120%] transition-all duration-[1.5s] ease-in-out pointer-events-none z-20 shadow-[0_0_15px_var(--color-neon-cyan)]" />

                                {/* Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-neon-cyan)] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-3 rounded-lg bg-white/5 ${project.colorClass} ring-1 ring-white/10 group-hover:ring-[var(--color-neon-cyan)] transition-all`}>
                                            {project.icon}
                                        </div>
                                        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest border border-dashed border-gray-700 px-2 py-1 rounded">
                                            {project.category}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-neon-cyan)] transition-colors font-scifi">{project.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>

                                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] text-[var(--color-neon-cyan)] font-mono uppercase">Status</span>
                                            <span className="text-[10px] text-gray-400 font-mono">COMPLETE</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button className="text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded hover:bg-[var(--color-neon-cyan)] hover:text-black"><Github className="w-4 h-4" /></button>
                                            <button className="text-[var(--color-neon-cyan)] hover:text-white transition-colors bg-[var(--color-neon-cyan)]/10 p-2 rounded hover:bg-[var(--color-neon-cyan)] hover:text-black"><ExternalLink className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

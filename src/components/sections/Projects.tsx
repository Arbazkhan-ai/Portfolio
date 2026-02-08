"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Activity, Shield, Stethoscope, Search, Mic, Brain, HeartPulse, Code } from "lucide-react";
import TiltCard from "../ui/TiltCard";

interface Project {
    id?: number;
    title: string;
    category: string;
    description: string;
    link?: string;
    color?: string;
    image?: string;
}

const getIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("vision")) return <Shield className="w-6 h-6" />;
    if (cat.includes("nlp") || cat.includes("language")) return <Mic className="w-6 h-6" />;
    if (cat.includes("health") || cat.includes("medical")) return <Stethoscope className="w-6 h-6" />;
    if (cat.includes("predict")) return <Activity className="w-6 h-6" />;
    if (cat.includes("care")) return <HeartPulse className="w-6 h-6" />;
    if (cat.includes("search") || cat.includes("engine")) return <Search className="w-6 h-6" />;
    if (cat.includes("brain") || cat.includes("neural")) return <Brain className="w-6 h-6" />;
    return <Code className="w-6 h-6" />;
};

const getColor = (index: number) => {
    const colors = ["var(--color-accent-cyan)", "var(--color-accent-violet)", "var(--color-accent-blue)", "var(--color-accent-pink)"];
    return colors[index % colors.length];
};

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('/api/content/projects')
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error("Failed to load projects", err));
    }, []);

    return (
        <section id="projects" className="py-32 bg-[var(--color-bg-primary)] relative">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center mb-24 space-y-4">
                    <span className="text-[var(--color-accent-cyan)] font-mono text-sm tracking-[0.3em] uppercase opacity-80">
                        Operational Logs
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold font-scifi text-gray-900 text-center">
                        SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-violet)]">WORKS</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <TiltCard key={project.id || index} className="h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group relative bg-white border border-gray-100 p-8 rounded-3xl hover:border-[var(--color-accent-blue)] transition-all duration-700 h-full flex flex-col justify-between overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,86,210,0.1)]"
                            >
                                {/* Shimmer Effect */}
                                <div className="shimmer absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-700" />

                                {/* Background Index Number */}
                                <div className="absolute -top-4 -right-2 text-8xl font-bold text-gray-50 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 font-display">
                                    {(index + 1).toString().padStart(2, '0')}
                                </div>

                                {/* Hover Glow */}
                                <div
                                    className="absolute -inset-24 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none blur-3xl"
                                    style={{ background: `radial-gradient(circle at center, ${project.color || getColor(index)}, transparent 70%)` }}
                                />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-8">
                                        <div
                                            className="p-4 rounded-2xl bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:shadow-lg group-hover:scale-110 transition-all duration-500"
                                            style={{ color: project.color || getColor(index) }}
                                        >
                                            {getIcon(project.category)}
                                        </div>
                                        <div className="px-4 py-1.5 rounded-full bg-blue-50/50 border border-blue-100 text-[10px] font-mono font-bold tracking-widest text-[var(--color-accent-blue)] uppercase">
                                            {project.category}
                                        </div>
                                    </div>

                                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-[var(--color-accent-blue)] transition-colors font-scifi leading-tight">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm leading-relaxed mb-8 font-body">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Image Preview if available */}
                                {project.image && (
                                    <div className="mb-8 rounded-2xl overflow-hidden h-48 w-full relative z-10 border border-gray-100 shadow-inner">
                                        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                )}

                                <div className="relative z-10 pt-6 mt-auto flex items-center justify-between">
                                    <div className="flex gap-5">
                                        <button className="text-gray-400 hover:text-[var(--color-accent-blue)] transition-all hover:scale-125 transform duration-300">
                                            <Github className="w-5 h-5" />
                                        </button>
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[var(--color-accent-blue)] transition-all hover:scale-125 transform duration-300">
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        )}
                                    </div>
                                    <a href={project.link || "#"} className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--color-accent-blue)] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                                        EXPLORE MISSION <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Activity, Shield, Stethoscope, Search, Mic, Brain, HeartPulse, Code, Camera, Dumbbell, Shirt, TrendingUp } from "lucide-react";
import TiltCard from "../ui/TiltCard";

interface Project {
    id?: number;
    title: string;
    category: string;
    description: string;
    link?: string;
    githubLink?: string;
    color?: string;
    image?: string;
    tags?: string[];
}

const getIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("vision") || cat.includes("detection")) return <Camera className="w-6 h-6" />;
    if (cat.includes("nlp") || cat.includes("language") || cat.includes("voice")) return <Mic className="w-6 h-6" />;
    if (cat.includes("health") || cat.includes("medical")) return <Stethoscope className="w-6 h-6" />;
    if (cat.includes("predict")) return <Activity className="w-6 h-6" />;
    if (cat.includes("care")) return <HeartPulse className="w-6 h-6" />;
    if (cat.includes("search") || cat.includes("engine")) return <Search className="w-6 h-6" />;
    if (cat.includes("brain") || cat.includes("neural")) return <Brain className="w-6 h-6" />;
    if (cat.includes("pose") || cat.includes("sport")) return <Dumbbell className="w-6 h-6" />;
    if (cat.includes("fabric") || cat.includes("mobile")) return <Shirt className="w-6 h-6" />;
    if (cat.includes("fintech") || cat.includes("trading")) return <TrendingUp className="w-6 h-6" />;
    if (cat.includes("shield") || cat.includes("safety")) return <Shield className="w-6 h-6" />;
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
                <div className="flex flex-col items-center mb-20 space-y-4">
                    <span className="text-sm font-semibold text-[var(--color-accent-blue)] tracking-wide">Projects</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
                        Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-violet)]">Works</span>
                    </h2>
                    <p className="text-gray-400 text-sm max-w-xl text-center">
                        Real-world AI & ML projects — live on GitHub
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <TiltCard key={project.id || index} className="h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="group relative bg-white border border-gray-100 rounded-3xl hover:border-[var(--color-accent-blue)] transition-all duration-700 h-full flex flex-col overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,86,210,0.1)]"
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

                                {/* Project Image */}
                                {project.image && (
                                    <div className="relative w-full h-44 overflow-hidden rounded-t-3xl border-b border-gray-100 flex-shrink-0">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
                                        {/* Category badge over image */}
                                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-white/60 text-[9px] font-mono font-bold tracking-widest text-[var(--color-accent-blue)] uppercase shadow-sm">
                                            {project.category}
                                        </div>
                                    </div>
                                )}

                                <div className="relative z-10 p-8 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-5">
                                        <div
                                            className="p-3 rounded-2xl bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:shadow-lg group-hover:scale-110 transition-all duration-500"
                                            style={{ color: project.color || getColor(index) }}
                                        >
                                            {getIcon(project.category)}
                                        </div>
                                        {!project.image && (
                                            <div className="px-4 py-1.5 rounded-full bg-blue-50/50 border border-blue-100 text-[10px] font-mono font-bold tracking-widest text-[var(--color-accent-blue)] uppercase">
                                                {project.category}
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-accent-blue)] transition-colors font-scifi leading-tight">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm leading-relaxed font-body flex-1">
                                        {project.description}
                                    </p>

                                    {/* Tech Tags */}
                                    {project.tags && project.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-5">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-semibold tracking-wider uppercase border"
                                                    style={{
                                                        color: project.color || getColor(index),
                                                        borderColor: `${project.color || getColor(index)}30`,
                                                        background: `${project.color || getColor(index)}08`,
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Action Row */}
                                    <div className="pt-6 mt-auto flex items-center justify-between border-t border-gray-50 mt-6">
                                        <div className="flex gap-4">
                                            {project.githubLink && (
                                                <a
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    title="View on GitHub"
                                                    className="text-gray-400 hover:text-gray-900 transition-all hover:scale-125 transform duration-300"
                                                >
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )}
                                            {project.link && project.link !== project.githubLink && (
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    title="Live Demo"
                                                    className="text-gray-400 hover:text-[var(--color-accent-blue)] transition-all hover:scale-125 transform duration-300"
                                                >
                                                    <ExternalLink className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                        <a
                                            href={project.githubLink || project.link || "#"}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex items-center gap-2 text-[10px] font-mono font-bold text-[var(--color-accent-blue)] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0"
                                        >
                                            VIEW ON GITHUB <Github className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </TiltCard>
                    ))}
                </div>

                {/* GitHub Profile CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="flex justify-center mt-20"
                >
                    <a
                        href="https://github.com/Arbazkhan-ai"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-3 px-8 py-4 rounded-2xl border border-gray-200 bg-white hover:border-[var(--color-accent-blue)] hover:shadow-[0_8px_30px_rgba(0,86,210,0.15)] transition-all duration-500 font-mono text-sm font-bold text-gray-700 hover:text-[var(--color-accent-blue)]"
                    >
                        <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
                        VIEW ALL REPOSITORIES ON GITHUB
                        <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

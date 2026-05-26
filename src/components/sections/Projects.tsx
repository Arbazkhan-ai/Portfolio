"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Activity, Shield, Stethoscope, Search, Mic, Brain, HeartPulse, Code, Camera, Dumbbell, Shirt, TrendingUp, ArrowUpRight } from "lucide-react";
import TiltCard from "../ui/TiltCard";
import Link from "next/link";

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
    if (cat.includes("vision") || cat.includes("detection")) return <Camera className="w-5 h-5" />;
    if (cat.includes("nlp") || cat.includes("language") || cat.includes("voice")) return <Mic className="w-5 h-5" />;
    if (cat.includes("health") || cat.includes("medical")) return <Stethoscope className="w-5 h-5" />;
    if (cat.includes("predict")) return <Activity className="w-5 h-5" />;
    if (cat.includes("care")) return <HeartPulse className="w-5 h-5" />;
    if (cat.includes("search") || cat.includes("engine")) return <Search className="w-5 h-5" />;
    if (cat.includes("brain") || cat.includes("neural")) return <Brain className="w-5 h-5" />;
    if (cat.includes("pose") || cat.includes("sport")) return <Dumbbell className="w-5 h-5" />;
    if (cat.includes("fabric") || cat.includes("mobile")) return <Shirt className="w-5 h-5" />;
    if (cat.includes("fintech") || cat.includes("trading")) return <TrendingUp className="w-5 h-5" />;
    if (cat.includes("shield") || cat.includes("safety")) return <Shield className="w-5 h-5" />;
    return <Code className="w-5 h-5" />;
};

const ACCENT_COLORS = [
    "var(--color-accent-blue)",
    "var(--color-accent-violet)",
    "var(--color-accent-cyan)",
    "var(--color-accent-pink)",
    "var(--color-accent-amber)",
    "var(--color-accent-green)",
];
const getColor = (index: number) => ACCENT_COLORS[index % ACCENT_COLORS.length];

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        fetch('/api/content/projects')
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error("Failed to load projects", err));
    }, []);

    return (
        <section id="projects" className="py-32 bg-[var(--color-bg-primary)] relative overflow-hidden">

            {/* Background elements */}
            <div className="orb w-[500px] h-[500px] bg-[var(--color-accent-blue)] opacity-[0.04] top-1/4 -left-40" />
            <div className="orb w-[400px] h-[400px] bg-[var(--color-accent-violet)] opacity-[0.04] bottom-1/4 -right-40" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center mb-20 space-y-4 text-center"
                >
                    <span className="section-label">Portfolio</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mt-4">
                        Selected{" "}
                        <span className="text-gradient-aurora">Works</span>
                    </h2>
                    <p className="text-[var(--color-text-secondary)] text-base max-w-xl">
                        Real-world AI & ML projects — from research to production
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => {
                        const color = project.color || getColor(index);
                        return (
                            <TiltCard key={project.id || index} className="h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="group relative bg-[var(--color-bg-card)] border border-black/[0.06] rounded-2xl h-full flex flex-col overflow-hidden transition-all duration-500"
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = `${color}30`;
                                        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${color}12`;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = '';
                                        (e.currentTarget as HTMLElement).style.boxShadow = '';
                                    }}
                                >
                                    <Link href={`/projects/${project.id}`} scroll={true} className="absolute inset-0 z-20" aria-label={`View details of ${project.title}`} />
                                    {/* Top gradient line */}
                                    <div
                                        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                                        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                                    />

                                    {/* Hover glow */}
                                    <div
                                        className="absolute -inset-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl"
                                        style={{ background: `radial-gradient(circle at center, ${color}08, transparent 70%)` }}
                                    />

                                    {/* Project Image */}
                                    {project.image && (
                                        <div className="relative w-full h-44 overflow-hidden flex-shrink-0">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] via-transparent to-transparent opacity-60" />
                                            {/* Category badge over image */}
                                            <div
                                                className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold tracking-widest uppercase backdrop-blur-sm border"
                                                style={{ color: color, background: `${color}15`, borderColor: `${color}30` }}
                                            >
                                                {project.category}
                                            </div>
                                        </div>
                                    )}

                                    <div className="relative z-10 p-6 flex flex-col flex-1">
                                        {/* Icon + Category (shown when no image) */}
                                        <div className="flex justify-between items-center mb-5">
                                            <div
                                                className="p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110"
                                                style={{ color: color, background: `${color}15` }}
                                            >
                                                {getIcon(project.category)}
                                            </div>
                                            {!project.image && (
                                                <span
                                                    className="px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold tracking-widest uppercase border"
                                                    style={{ color: color, background: `${color}10`, borderColor: `${color}25` }}
                                                >
                                                    {project.category}
                                                </span>
                                            )}
                                        </div>

                                        {/* Index number watermark */}
                                        <div
                                            className="absolute top-4 right-5 text-7xl font-black opacity-[0.04] group-hover:opacity-[0.07] transition-opacity font-display pointer-events-none select-none"
                                            style={{ color: color }}
                                        >
                                            {(index + 1).toString().padStart(2, '0')}
                                        </div>

                                        <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 leading-snug group-hover:text-[var(--color-text-primary)] transition-colors">
                                            {project.title}
                                        </h3>

                                        <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed flex-1">
                                            {project.description}
                                        </p>

                                        {/* Tags */}
                                        {project.tags && project.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-4">
                                                {project.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="tech-tag"
                                                        style={{
                                                            color: color,
                                                            borderColor: `${color}25`,
                                                            background: `${color}08`,
                                                            border: `1px solid ${color}25`,
                                                        }}
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Action Row */}
                                        <div className="pt-5 mt-auto flex items-center justify-between border-t border-black/[0.06] relative z-30">
                                            <div className="flex gap-3">
                                                {project.githubLink && (
                                                    <a
                                                        href={project.githubLink}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        title="View on GitHub"
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-black/[0.05] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-black/10 transition-all"
                                                    >
                                                        <Github className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {project.link && project.link !== project.githubLink && (
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        title="Live Demo"
                                                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-black/[0.05] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-black/10 transition-all"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                            <Link
                                                href={`/projects/${project.id}`}
                                                scroll={true}
                                                className="flex items-center gap-1.5 text-[10px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0"
                                                style={{ color: color }}
                                            >
                                                VIEW PROJECT <ArrowUpRight className="w-3 h-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            </TiltCard>
                        );
                    })}
                </div>

                {/* GitHub CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-16"
                >
                    <a
                        href="https://github.com/Arbazkhan-ai"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-3 px-8 py-4 rounded-2xl border border-black/[0.08] bg-[var(--color-bg-card)] hover:border-[var(--color-accent-blue)]/30 hover:bg-[var(--color-bg-card-hover)] hover:shadow-[0_8px_30px_rgba(79,141,255,0.15)] transition-all duration-400 font-mono text-sm font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                    >
                        <Github className="w-5 h-5 group-hover:rotate-12 transition-transform duration-500" />
                        VIEW ALL REPOSITORIES
                        <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

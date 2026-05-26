import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github, Target, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import projectsData from '@/data/projects.json';

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const project = projectsData.find((p: { id: number | string }) => p.id.toString() === resolvedParams.id);
    
    if (!project) {
        notFound();
    }

    const color = project.color || 'var(--color-accent-blue)';
    const details = project.details || {};

    return (
        <main className="min-h-screen bg-[var(--color-bg-primary)] pt-24 pb-24 relative overflow-hidden font-sans">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[150px] opacity-[0.08] pointer-events-none" style={{ backgroundColor: color }} />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.05] pointer-events-none" style={{ backgroundColor: color }} />

            <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                {/* Back Link */}
                <div className="mb-12">
                    <Link href="/#projects" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/[0.03] hover:bg-black/[0.08] border border-black/[0.05] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-all duration-300 font-mono text-xs font-bold tracking-wider">
                        <ArrowLeft size={14} /> BACK TO PORTFOLIO
                    </Link>
                </div>

                {/* Header Section */}
                <div className="flex flex-col md:flex-row gap-8 items-start justify-between mb-16">
                    <div className="max-w-3xl">
                        <div className="inline-block px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-widest uppercase mb-6 backdrop-blur-md border shadow-lg" style={{ color: color, background: `${color}15`, borderColor: `${color}30` }}>
                            {project.category}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--color-text-primary)] mb-6 leading-[1.1] tracking-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 shrink-0 mt-4 md:mt-0">
                        {project.githubLink && (
                            <a href={project.githubLink} target="_blank" rel="noreferrer" className="group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#111] hover:bg-[#1a1a1a] border border-black/[0.1] hover:border-black/[0.2] text-[var(--color-text-primary)] transition-all shadow-xl font-medium">
                                <Github size={20} className="group-hover:rotate-12 transition-transform" /> 
                                <span>Source Code</span>
                            </a>
                        )}
                        {project.link && project.link !== project.githubLink && (
                            <a href={project.link} target="_blank" rel="noreferrer" className="group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl transition-all font-medium text-[var(--color-text-primary)] shadow-xl hover:shadow-2xl hover:-translate-y-1" style={{ backgroundColor: color, boxShadow: `0 10px 30px -10px ${color}` }}>
                                <span>Live Demo</span>
                                <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Main Content Grid (Bento Box Style) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left Column: Image & Features */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        
                        {/* Featured Image */}
                        {project.image && (
                            <div className="rounded-3xl overflow-hidden border border-black/[0.08] bg-[var(--color-bg-card)] shadow-2xl relative group">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ boxShadow: `inset 0 0 100px ${color}20` }} />
                                <img src={project.image} alt={project.title} className="w-full h-[400px] object-cover" />
                            </div>
                        )}

                        {/* Why I Used This (Tech Stack Rationale) */}
                        {details.whyIUsedThis && (
                            <div className="rounded-3xl p-8 md:p-10 border border-black/[0.06] bg-[var(--color-bg-card)] relative overflow-hidden group hover:border-black/[0.1] transition-colors">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity" style={{ color: color }}>
                                    <Cpu size={120} strokeWidth={1} />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2.5 rounded-xl" style={{ background: `${color}15`, color: color }}>
                                            <Cpu size={24} />
                                        </div>
                                        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Why I Used This Tech Stack</h2>
                                    </div>
                                    <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
                                        {details.whyIUsedThis}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Problem & Features */}
                    <div className="flex flex-col gap-6">
                        
                        {/* The Problem */}
                        {details.problem && (
                            <div className="rounded-3xl p-8 border border-black/[0.06] bg-[var(--color-bg-card)] hover:border-black/[0.1] transition-colors">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2.5 rounded-xl bg-black/[0.05] text-[var(--color-text-primary)]">
                                        <Target size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">The Problem</h2>
                                </div>
                                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                                    {details.problem}
                                </p>
                            </div>
                        )}

                        {/* Key Features */}
                        {details.features && details.features.length > 0 && (
                            <div className="rounded-3xl p-8 border border-black/[0.06] bg-gradient-to-b from-[var(--color-bg-card)] to-[var(--color-bg-primary)] flex-1">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-2.5 rounded-xl" style={{ background: `${color}15`, color: color }}>
                                        <Sparkles size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Key Features</h2>
                                </div>
                                <ul className="space-y-4">
                                    {details.features.map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-3 text-[var(--color-text-secondary)]">
                                            <CheckCircle2 size={20} className="mt-0.5 shrink-0" style={{ color: color }} />
                                            <span className="leading-relaxed">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Tech Tags */}
                        {project.tags && project.tags.length > 0 && (
                            <div className="rounded-3xl p-8 border border-black/[0.06] bg-[var(--color-bg-card)]">
                                <h3 className="text-sm font-mono text-[var(--color-text-muted)] mb-5">TECHNOLOGIES</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag: string) => (
                                        <span key={tag} className="px-3 py-1.5 rounded-lg text-sm bg-black/[0.03] border border-black/[0.08] text-[var(--color-text-primary)] hover:border-black/[0.2] transition-colors cursor-default">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </main>
    );
}

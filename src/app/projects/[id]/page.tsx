import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import projectsData from '@/data/projects.json';

export default async function ProjectDetails({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const project = projectsData.find((p: any) => p.id.toString() === resolvedParams.id);
    
    if (!project) {
        notFound();
    }

    const color = project.color || 'var(--color-accent-blue)';

    return (
        <main className="min-h-screen bg-[var(--color-bg-primary)] pt-24 pb-16 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.1]" style={{ backgroundColor: color }} />
            <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] rounded-full blur-[120px] opacity-[0.05]" style={{ backgroundColor: color }} />

            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                <Link href="/#projects" className="inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-white transition-colors mb-8 font-mono text-sm">
                    <ArrowLeft size={16} /> BACK TO PROJECTS
                </Link>

                <div className="bg-[var(--color-bg-card)] border border-white/[0.06] rounded-3xl overflow-hidden shadow-2xl">
                    {project.image && (
                        <div className="w-full h-64 md:h-[400px] relative">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] to-transparent" />
                        </div>
                    )}
                    
                    <div className="p-8 md:p-12 relative z-10 -mt-16 md:-mt-24">
                        <div className="inline-block px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-widest uppercase mb-4 backdrop-blur-md border" style={{ color: color, background: `${color}15`, borderColor: `${color}30` }}>
                            {project.category}
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {project.title}
                        </h1>

                        <div className="flex flex-wrap gap-4 mb-8">
                            {project.githubLink && (
                                <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.05] hover:border-white/[0.1] text-white transition-all text-sm font-medium">
                                    <Github size={18} /> View Source Code
                                </a>
                            )}
                            {project.link && project.link !== project.githubLink && (
                                <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all text-sm font-medium text-white shadow-lg" style={{ backgroundColor: color, boxShadow: `0 8px 20px ${color}40` }}>
                                    <ExternalLink size={18} /> Live Demo
                                </a>
                            )}
                        </div>

                        <div className="prose prose-invert max-w-none text-[var(--color-text-secondary)] text-lg leading-relaxed">
                            <p className="whitespace-pre-wrap">{project.description}</p>
                        </div>

                        {project.tags && project.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-white/[0.06]">
                                <h3 className="text-sm font-mono text-[var(--color-text-muted)] mb-4">TECHNOLOGIES USED</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag: string) => (
                                        <span key={tag} className="px-3 py-1.5 rounded-lg text-sm bg-white/[0.03] border border-white/[0.06] text-[var(--color-text-secondary)]">
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

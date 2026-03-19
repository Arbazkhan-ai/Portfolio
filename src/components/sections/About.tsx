"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Database, Network, MessageSquare, Bot, Terminal, Layers, CheckCircle } from "lucide-react";

const skills = [
    { name: "Machine Learning", icon: <Brain className="w-6 h-6" />, desc: "TensorFlow, PyTorch, Scikit-learn", color: "var(--color-accent-blue)" },
    { name: "Deep Learning", icon: <Network className="w-6 h-6" />, desc: "Neural Architectures, CNNs, RNNs", color: "var(--color-accent-violet)" },
    { name: "NLP & LLMs", icon: <MessageSquare className="w-6 h-6" />, desc: "Transformers, GPT, BERT, RAG", color: "var(--color-accent-cyan)" },
    { name: "Computer Vision", icon: <Cpu className="w-6 h-6" />, desc: "YOLO, OpenCV, Detectron2", color: "var(--color-accent-pink)" },
    { name: "Agent Systems", icon: <Bot className="w-6 h-6" />, desc: "LangChain, AutoGPT, CrewAI", color: "var(--color-accent-amber)" },
    { name: "Big Data", icon: <Database className="w-6 h-6" />, desc: "Spark, PostgreSQL, Pinecone", color: "var(--color-accent-green)" },
    { name: "Backend APIs", icon: <Terminal className="w-6 h-6" />, desc: "Django, FastAPI, Node.js", color: "var(--color-accent-blue)" },
    { name: "Full-Stack", icon: <Layers className="w-6 h-6" />, desc: "React, Next.js, TypeScript", color: "var(--color-accent-violet)" },
];

const highlights = [
    "Research to Production pipelines",
    "Scalable AI system architecture",
    "Real-time inference optimization",
    "End-to-end ML workflows",
];

export default function About() {
    const [profile, setProfile] = useState({
        name: "Arbaz Khan",
        title: "AI Systems Architect",
        bio: "I operate at the intersection of Research and Deployment. My focus is not just on training models, but on building robust, scalable AI systems that solve real-world problems.",
        avatar: "/profilee.png"
    });

    useEffect(() => {
        fetch('/api/content/profile')
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) setProfile(prev => ({ ...prev, ...data }));
            })
            .catch(err => console.error("Failed to load profile", err));
    }, []);

    return (
        <section id="about" className="py-32 bg-[var(--color-bg-primary)] relative overflow-hidden">

            {/* Background Orbs */}
            <div className="orb w-[500px] h-[500px] bg-[var(--color-accent-violet)] opacity-[0.04] top-0 right-0" />
            <div className="orb w-[400px] h-[400px] bg-[var(--color-accent-blue)] opacity-[0.04] bottom-0 left-0" />

            <div className="container relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 space-y-4"
                >
                    <div className="flex justify-center">
                        <span className="section-label">About Me</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                        Engineering{" "}
                        <span className="text-gradient-violet">Intelligence.</span>
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto text-base leading-relaxed">
                        Turning data into decisions, models into products, and ideas into intelligent systems.
                    </p>
                </motion.div>

                {/* Profile + Bio Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-24">

                    {/* Profile Image Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative group">
                            {/* Glowing border frame */}
                            <div className="absolute -inset-1 bg-gradient-to-br from-[var(--color-accent-blue)] via-[var(--color-accent-violet)] to-[var(--color-accent-pink)] rounded-3xl opacity-30 blur-sm group-hover:opacity-60 transition-opacity duration-500" />
                            <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[var(--color-bg-card)]">
                                <img
                                    src={profile.avatar}
                                    alt={profile.name}
                                    className="w-full h-[420px] object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                                {/* Image gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] via-transparent to-transparent" />

                                {/* Name badge */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="glass rounded-2xl px-5 py-4">
                                        <h3 className="text-white font-bold text-xl">{profile.name}</h3>
                                        <p className="text-[var(--color-accent-blue)] text-sm font-mono">{profile.title}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bio Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center space-y-8"
                    >
                        <p className="text-2xl md:text-3xl font-semibold text-white leading-[1.5]">
                            {profile.bio}
                        </p>

                        {/* Highlights */}
                        <ul className="space-y-3">
                            {highlights.map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3 text-[var(--color-text-secondary)]"
                                >
                                    <CheckCircle className="w-5 h-5 text-[var(--color-accent-blue)] flex-shrink-0" />
                                    <span className="text-base">{item}</span>
                                </motion.li>
                            ))}
                        </ul>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
                            {[
                                { value: "5+", label: "Years Exp.", color: "var(--color-accent-blue)" },
                                { value: "50+", label: "Models Built", color: "var(--color-accent-violet)" },
                                { value: "99%", label: "Uptime", color: "var(--color-accent-pink)" },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center p-4 rounded-2xl bg-[var(--color-bg-card)] border border-white/[0.06]"
                                >
                                    <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                                    <div className="text-[var(--color-text-muted)] text-xs font-mono uppercase tracking-wide">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Skills Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="space-y-10"
                >
                    <div className="text-center space-y-3">
                        <span className="section-label">Core Expertise</span>
                        <h3 className="text-3xl font-bold text-white mt-4">What I Work With</h3>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08, duration: 0.5 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="group relative p-6 rounded-2xl bg-[var(--color-bg-card)] border border-white/[0.06] flex flex-col items-center text-center gap-4 overflow-hidden transition-all duration-300 cursor-default"
                                style={{
                                    boxShadow: `0 0 0 0 ${skill.color}00`,
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = `${skill.color}40`;
                                    (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px ${skill.color}12`;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = '';
                                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                                }}
                            >
                                {/* Shimmer on hover */}
                                <div className="shimmer absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />

                                {/* Icon */}
                                <div
                                    className="p-3 rounded-xl transition-all duration-500 group-hover:scale-110"
                                    style={{
                                        color: skill.color,
                                        background: `${skill.color}15`,
                                    }}
                                >
                                    {skill.icon}
                                </div>

                                <div className="space-y-1 relative z-10">
                                    <h4 className="text-sm font-semibold text-white">{skill.name}</h4>
                                    <p className="text-[10px] text-[var(--color-text-muted)] font-mono">{skill.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

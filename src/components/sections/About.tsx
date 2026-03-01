"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Database, Network, MessageSquare, Code, Bot, Terminal, Layers } from "lucide-react";
import TiltCard from "../ui/TiltCard";

const skills = [
    { name: "Machine Learning", icon: <Brain className="w-8 h-8" />, desc: "TensorFlow, PyTorch" },
    { name: "Deep Learning", icon: <Network className="w-8 h-8" />, desc: "Neural Architectures" },
    { name: "NLP", icon: <MessageSquare className="w-8 h-8" />, desc: "Transformers, LLMs" },
    { name: "Computer Vision", icon: <Cpu className="w-8 h-8" />, desc: "YOLO, OpenCV" },
    { name: "Agent Systems", icon: <Bot className="w-8 h-8" />, desc: "LangChain, AutoGPT" },
    { name: "Big Data", icon: <Database className="w-8 h-8" />, desc: "Spark, PostgreSQL" },
    { name: "Backend", icon: <Terminal className="w-8 h-8" />, desc: "Django, FastAPI" },
    { name: "Fullstack", icon: <Layers className="w-8 h-8" />, desc: "React, Next.js" },
];

export default function About() {
    const [profile, setProfile] = useState({
        name: "Arbaz Khan",
        title: "System Architect",
        bio: "I operate at the intersection of Research and Deployment. My focus is not just on training models, but on building robust, scalable AI systems that solve real-world problems.",
        avatar: "/profilee.png"
    });

    useEffect(() => {
        fetch('/api/content/profile')
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) {
                    setProfile(prev => ({ ...prev, ...data }));
                }
            })
            .catch(err => console.error("Failed to load profile", err));
    }, []);

    return (
        <section id="about" className="py-32 bg-[var(--color-bg-primary)] relative">

            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--color-accent-violet)] opacity-[0.03] blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[var(--color-accent-blue)] opacity-[0.03] blur-[150px] pointer-events-none" />

            {/* Technical Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: `radial-gradient(var(--color-accent-blue) 0.5px, transparent 0.5px)`, backgroundSize: '30px 30px' }} />

            <div className="container relative z-10">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto space-y-20 text-center"
                >
                    <div className="space-y-6">
                        <span className="text-sm font-semibold text-[var(--color-accent-blue)] tracking-wide">About Me</span>
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                            Engineering{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-violet)]">Intelligence.</span>
                        </h2>
                    </div>

                    <div className="relative max-w-5xl mx-auto">

                        <div className="absolute -inset-8 bg-gradient-to-tr from-[var(--color-accent-blue)] to-[var(--color-accent-violet)] opacity-[0.02] blur-3xl group-hover:opacity-[0.05] transition-opacity duration-1000 pointer-events-none rounded-[4rem]" />

                        <div className="relative glass p-16 md:p-24 rounded-[4rem] border-white/60 shadow-[0_30px_100px_rgba(0,0,0,0.02)] hover:shadow-[0_50px_100px_rgba(0,86,210,0.06)] transition-all duration-1000 overflow-hidden">
                            {/* Inner Shimmer */}
                            <div className="absolute inset-0 shimmer opacity-[0.03] pointer-events-none" />

                            <p className="whitespace-pre-line leading-[1.6] text-3xl md:text-4xl text-gray-800 font-display font-semibold max-w-4xl mx-auto relative z-10">
                                {profile.bio}
                            </p>

                            {/* Technical Stats Reveal */}
                            <div className="mt-16 pt-12 border-t border-gray-100/50 flex flex-wrap justify-center gap-12 md:gap-24">
                                <div className="text-center group/stat">
                                    <div className="text-4xl md:text-5xl font-bold text-[var(--color-accent-blue)] mb-1">5+</div>
                                    <div className="text-xs font-medium text-gray-400">Years Experience</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl md:text-5xl font-bold text-[var(--color-accent-violet)] mb-1">50+</div>
                                    <div className="text-xs font-medium text-gray-400">Models Deployed</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl md:text-5xl font-bold text-[var(--color-accent-pink)] mb-1">99%</div>
                                    <div className="text-xs font-medium text-gray-400">System Uptime</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Skills Header */}
                    <div className="pt-20 space-y-3">
                        <span className="text-sm font-semibold text-[var(--color-accent-blue)] tracking-wide">Skills</span>
                        <h3 className="text-3xl font-bold text-gray-900">What I Work With</h3>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                whileHover={{ y: -15, scale: 1.02 }}
                                className="p-10 border border-gray-100/80 bg-white/5 backdrop-blur-md rounded-[3rem] flex flex-col items-center justify-center gap-6 hover:bg-white hover:shadow-2xl hover:shadow-[var(--color-accent-blue)]/10 transition-all duration-500 group text-center relative overflow-hidden"
                            >
                                <div className="shimmer absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity" />

                                <div className="text-[var(--color-accent-blue)] group-hover:text-[var(--color-accent-violet)] transition-all duration-500 transform scale-150 group-hover:rotate-[360deg] group-hover:scale-[1.7]">
                                    {skill.icon}
                                </div>
                                <div className="space-y-1.5 relative z-10">
                                    <h4 className="text-base font-semibold text-gray-900">{skill.name}</h4>
                                    <p className="text-xs text-gray-400">{skill.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

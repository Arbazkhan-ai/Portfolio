"use client";
import React from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, Database, Network, MessageSquare, Code, Bot, Terminal } from "lucide-react";
import Image from "next/image";

const skills = [
    { name: "Machine Learning", icon: <Brain className="w-6 h-6" /> },
    { name: "Deep Learning", icon: <Network className="w-6 h-6" /> },
    { name: "NLP", icon: <MessageSquare className="w-6 h-6" /> },
    { name: "Computer Vision", icon: <Cpu className="w-6 h-6" /> },
    { name: "Agents", icon: <Bot className="w-6 h-6" /> },
    { name: "Data Science", icon: <Database className="w-6 h-6" /> },
    { name: "Python", icon: <Terminal className="w-6 h-6" /> },
    { name: "Django", icon: <Code className="w-6 h-6" /> },
];

import TiltCard from "../ui/TiltCard";


export default function About() {
    return (
        <section id="about" className="py-20 bg-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-neon-violet)] opacity-5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[var(--color-neon-cyan)] opacity-5 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-col lg:flex-row items-center gap-16"
                >
                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-8">
                        <div className="inline-block">
                            <h2 className="text-4xl md:text-5xl font-bold font-scifi text-white mb-2">My Mission</h2>
                            <div className="h-1 w-full bg-gradient-to-r from-[var(--color-neon-cyan)] to-transparent"></div>
                        </div>

                        <p className="text-xl text-gray-300 leading-relaxed">
                            On a quest to push intelligence forward. I am an <span className="text-[var(--color-neon-cyan)] font-semibold">AI Engineer</span> dedicated to building systems that bridge the gap between human creativity and machine precision.
                        </p>
                        <p className="text-gray-400 leading-relaxed h-full min-h-[100px]">
                            With a deep focus on machine learning architectures and autonomous agents, I construct digital environments where data transforms into actionable intelligence. My work spans from computer vision to complex NLP architectures, always aiming for the bleeding edge of innovation.
                        </p>

                        {/* Skills Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    whileHover={{ y: -5, boxShadow: "0 0 15px rgba(0, 247, 255, 0.3)" }}
                                    className="p-4 bg-white/5 border border-white/10 rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-colors cursor-pointer group backdrop-blur-sm"
                                >
                                    <div className="text-[var(--color-neon-cyan)] group-hover:text-[var(--color-neon-violet)] transition-colors">{skill.icon}</div>
                                    <span className="text-sm font-medium text-gray-300 font-scifi text-center">{skill.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* 3D/Visual Content */}
                    <div className="lg:w-1/2 relative flex justify-center perspective-1000">
                        <TiltCard className="relative w-80 h-96 md:w-96 md:h-[500px]">
                            <div className="w-full h-full bg-gradient-to-br from-[#0C0C0C] to-black border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden group relative">
                                {/* Scanner Line */}
                                <div className="absolute top-0 w-full h-[2px] bg-[var(--color-neon-cyan)] shadow-[0_0_15px_var(--color-neon-cyan)] animate-[scan_4s_ease-in-out_infinite] z-20 opacity-50" />

                                {/* Placeholder for Profile */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0 opacity-80" />

                                {/* Holographic Overlay Effects */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,247,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,247,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
                                <div className="absolute inset-0 border-2 border-[var(--color-neon-cyan)] opacity-30 rounded-2xl md:translate-x-4 md:translate-y-4 transition-transform z-0" />

                                <div className="relative z-10 p-6 text-center transform transition-transform group-hover:scale-105 duration-500">
                                    <div className="relative w-32 h-32 mx-auto mb-4">
                                        <div className="absolute inset-0 rounded-full border-2 border-[var(--color-neon-cyan)] border-dashed animate-spin-slow opacity-50"></div>
                                        <div className="absolute inset-1 rounded-full border border-[var(--color-neon-violet)] animate-reverse-spin opacity-50"></div>
                                        <div className="w-full h-full rounded-full bg-gray-800 overflow-hidden flex items-center justify-center relative z-10 border-2 border-[var(--color-neon-cyan)]/50 bg-black">
                                            <Image
                                                src="/profilee.png"
                                                alt="Arbaz Khan"
                                                width={128}
                                                height={128}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold font-scifi text-white relative">
                                        Arbaz Khan
                                        <span className="absolute -top-2 -right-4 text-[10px] text-[var(--color-neon-cyan)] font-mono animate-pulse">V2.0</span>
                                    </h3>
                                    <p className="text-[var(--color-neon-cyan)] text-sm tracking-widest uppercase mt-1">AI Architect</p>

                                    <div className="mt-6 flex justify-center space-x-4">
                                        <div className="p-2 border border-white/10 rounded bg-white/5 font-mono text-xs text-[var(--color-neon-cyan)]">LVL. 99</div>
                                        <div className="p-2 border border-white/10 rounded bg-white/5 font-mono text-xs text-[var(--color-neon-violet)]">INT. MAX</div>
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

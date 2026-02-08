"use client";
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, GraduationCap } from "lucide-react";

const experiences = [
    {
        year: "2024 - Present",
        title: "Senior AI Engineer",
        company: "TechNexus Solutions",
        description: "Leading a team of 5 engineers to deploy large-scale NLP models. improved inference latency by 40%.",
        type: "work"
    },
    {
        year: "2022 - 2024",
        title: "Machine Learning Engineer",
        company: "DataFlow Systems",
        description: "Developed computer vision pipelines for automated quality control in manufacturing.",
        type: "work"
    },
    {
        year: "2020 - 2022",
        title: "M.S. in Computer Science",
        company: "Stanford University",
        description: "Specialized in Artificial Intelligence and Deep Learning. Thesis on Generative Adversarial Networks.",
        type: "education"
    },
    {
        year: "2018 - 2020",
        title: "Junior Data Scientist",
        company: "Alpha Analytics",
        description: "Built predictive models for customer churn and lifetime value analysis.",
        type: "work"
    }
];

export default function Experience() {
    return (
        <section id="experience" className="py-24 bg-[var(--color-bg-secondary)] relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[var(--glass-border)] -translate-x-1/2 md:block hidden" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center mb-20 text-center space-y-4">
                    <span className="text-[var(--color-accent-pink)] font-mono text-xs tracking-[0.3em] uppercase opacity-80">
                        TIMELINE
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-scifi text-gray-900">
                        Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-pink)] to-purple-500">Trajectory</span>
                    </h2>
                </div>

                <div className="relative">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.15, duration: 0.6 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className={`flex flex-col md:flex-row items-center mb-16 last:mb-0 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Content Side */}
                            <div className="md:w-1/2 w-full p-4">
                                <div className={`glass-card p-8 rounded-2xl relative border-l-4 ${idx % 2 === 0 ? 'md:text-left border-[var(--color-accent-blue)]' : 'md:text-right border-[var(--color-accent-pink)]'} hover:bg-[var(--glass-highlight)] transition-colors duration-300`}>
                                    <div className={`flex flex-col gap-2 ${idx % 2 === 0 ? 'items-start' : 'md:items-end items-start'}`}>
                                        <span className="text-xs font-mono text-gray-500 flex items-center gap-2">
                                            <Calendar className="w-3 h-3" /> {exp.year}
                                        </span>
                                        <h3 className="text-xl font-bold text-gray-900 font-scifi">{exp.title}</h3>
                                        <span className="text-sm text-[var(--color-accent-blue)] font-medium uppercase tracking-wider mb-2">{exp.company}</span>
                                        <p className="text-gray-600 text-sm leading-relaxed font-body">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--color-bg-primary)] border-2 border-[var(--color-accent-cyan)] z-10 md:flex items-center justify-center hidden shadow-[0_0_15px_var(--color-accent-cyan)]">
                                <div className="w-2 h-2 bg-white rounded-full" />
                            </div>

                            {/* Spacer side */}
                            <div className="md:w-1/2" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

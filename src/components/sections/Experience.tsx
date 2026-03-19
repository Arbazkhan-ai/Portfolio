"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, GraduationCap, Award, BookOpen } from "lucide-react";

const experiences = [
    {
        year: "2021 – 2025",
        title: "Bachelor of Science in Artificial Intelligence",
        company: "Iqra University, Karachi",
        description: "Studied core AI disciplines including Machine Learning, Deep Learning, Computer Vision, Natural Language Processing, and Data Science. Hands-on projects in AI-powered systems and real-world applications.",
        type: "education",
        icon: "graduation",
        color: "var(--color-accent-blue)",
        tags: ["Machine Learning", "Deep Learning", "Computer Vision", "NLP"],
    },
    {
        year: "2024",
        title: "IBM AI Engineering Professional Certificate",
        company: "Coursera — IBM",
        description: "Completed the IBM AI Engineering specialization covering Machine Learning with Python, Deep Learning & Neural Networks, Computer Vision, NLP, and deploying AI applications at scale.",
        type: "certification",
        icon: "award",
        color: "var(--color-accent-violet)",
        tags: ["Neural Networks", "Python", "CV", "Deployment"],
    }
];

const IconBox = ({ icon, color }: { icon: string; color: string }) => (
    <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center border flex-shrink-0"
        style={{
            background: `${color}15`,
            borderColor: `${color}30`,
            color: color,
        }}
    >
        {icon === "award" ? <Award className="w-6 h-6" /> : icon === "graduation" ? <GraduationCap className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
    </div>
);

export default function Experience() {
    return (
        <section id="experience" className="py-28 bg-[var(--color-bg-secondary)] relative overflow-hidden">

            {/* Subtle background glow */}
            <div className="orb w-[600px] h-[400px] bg-[var(--color-accent-blue)] opacity-[0.03] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center mb-20 text-center space-y-4"
                >
                    <span className="section-label">Education & Certifications</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
                        My{" "}
                        <span className="text-gradient-violet">Background</span>
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-md">
                        A foundation built on rigorous academics and industry-recognized credentials.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto relative">

                    {/* Center vertical line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 md:block hidden">
                        <div className="h-full w-full bg-gradient-to-b from-transparent via-[var(--color-accent-blue)]/30 to-transparent" />
                    </div>

                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2, duration: 0.7 }}
                            viewport={{ once: true, margin: "-50px" }}
                            className={`flex flex-col md:flex-row items-center mb-12 last:mb-0 gap-8 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                        >
                            {/* Content Card */}
                            <div className="md:w-5/12 w-full">
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="group relative rounded-2xl p-7 bg-[var(--color-bg-card)] border border-white/[0.06] transition-all duration-400 overflow-hidden"
                                    style={{}}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = `${exp.color}30`;
                                        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${exp.color}10`;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.borderColor = '';
                                        (e.currentTarget as HTMLElement).style.boxShadow = '';
                                    }}
                                >
                                    {/* Top color accent bar */}
                                    <div
                                        className="absolute top-0 left-0 right-0 h-0.5 opacity-60"
                                        style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }}
                                    />

                                    <div className="flex items-start gap-4 mb-5">
                                        <IconBox icon={exp.icon} color={exp.color} />
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Calendar className="w-3 h-3 text-[var(--color-text-muted)]" />
                                                <span className="text-xs text-[var(--color-text-muted)] font-mono">{exp.year}</span>
                                            </div>
                                            <span
                                                className="text-xs font-semibold px-2 py-0.5 rounded-md"
                                                style={{ color: exp.color, background: `${exp.color}15` }}
                                            >
                                                {exp.type.toUpperCase()}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-white mb-1 leading-snug">{exp.title}</h3>
                                    <p className="text-sm font-semibold mb-3" style={{ color: exp.color }}>{exp.company}</p>
                                    <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-5">{exp.description}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {exp.tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="tech-tag"
                                                style={{ color: exp.color, background: `${exp.color}10`, border: `1px solid ${exp.color}25` }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Center Dot */}
                            <div className="md:w-2/12 flex justify-center relative z-10">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ delay: idx * 0.2 + 0.3, type: "spring" }}
                                    className="w-10 h-10 rounded-full border-2 flex items-center justify-center shadow-lg md:flex hidden"
                                    style={{
                                        borderColor: exp.color,
                                        background: `${exp.color}15`,
                                        boxShadow: `0 0 20px ${exp.color}30`,
                                        color: exp.color,
                                    }}
                                >
                                    {exp.icon === "award" ? <Award className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                                </motion.div>
                            </div>

                            {/* Spacer */}
                            <div className="md:w-5/12 hidden md:block" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

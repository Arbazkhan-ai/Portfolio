"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, GraduationCap, Award } from "lucide-react";

const experiences = [
    {
        year: "2021 - 2025",
        title: "Bachelor of Science in Artificial Intelligence",
        company: "Iqra University, Karachi",
        description: "Studied core AI disciplines including Machine Learning, Deep Learning, Computer Vision, Natural Language Processing, and Data Science. Hands-on projects in AI-powered systems and real-world applications.",
        type: "education",
        icon: "graduation"
    },
    {
        year: "2024",
        title: "IBM AI Engineering Professional Certificate",
        company: "Coursera — IBM",
        description: "Completed the IBM AI Engineering specialization covering Machine Learning with Python, Deep Learning & Neural Networks, Computer Vision, NLP, and deploying AI applications at scale.",
        type: "education",
        icon: "award"
    }
];

export default function Experience() {
    return (
        <section id="experience" className="py-24 bg-[var(--color-bg-secondary)] relative overflow-hidden">
            {/* Decorative center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 -translate-x-1/2 md:block hidden" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center mb-20 text-center space-y-4">
                    <span className="text-sm font-semibold text-[var(--color-accent-blue)] tracking-wide">
                        Education &amp; Certifications
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        My{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-violet)]">
                            Background
                        </span>
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
                            className={`flex flex-col md:flex-row items-center mb-16 last:mb-0 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                        >
                            {/* Content Card */}
                            <div className="md:w-1/2 w-full p-4">
                                <div
                                    className={`bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[var(--color-accent-blue)] transition-all duration-300 border-l-4 ${idx % 2 === 0
                                            ? "md:text-left border-l-[var(--color-accent-blue)]"
                                            : "md:text-right border-l-[var(--color-accent-violet)]"
                                        }`}
                                >
                                    <div className={`flex flex-col gap-2 ${idx % 2 === 0 ? "items-start" : "md:items-end items-start"}`}>
                                        <span className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                                            <Calendar className="w-3 h-3" /> {exp.year}
                                        </span>

                                        <div
                                            className={`inline-flex items-center gap-2 ${idx % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                                        >
                                            <div
                                                className={`p-1.5 rounded-lg ${exp.icon === "award"
                                                        ? "bg-violet-50 text-[var(--color-accent-violet)]"
                                                        : "bg-blue-50 text-[var(--color-accent-blue)]"
                                                    }`}
                                            >
                                                {exp.icon === "award" ? (
                                                    <Award className="w-4 h-4" />
                                                ) : (
                                                    <GraduationCap className="w-4 h-4" />
                                                )}
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 leading-tight">{exp.title}</h3>
                                        <span className="text-sm text-[var(--color-accent-blue)] font-semibold mb-1">{exp.company}</span>
                                        <p className="text-gray-500 text-sm leading-relaxed">{exp.description}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Center Dot */}
                            <div className="absolute left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-white border-2 border-[var(--color-accent-blue)] z-10 md:flex items-center justify-center hidden shadow-sm">
                                <div className="w-2 h-2 bg-[var(--color-accent-blue)] rounded-full" />
                            </div>

                            {/* Spacer */}
                            <div className="md:w-1/2" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";
import React from "react";
import HeroScene from "@/components/scene/HeroScene";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "circOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.5
        }
    }
};

export default function Hero() {
    const [heroData, setHeroData] = React.useState({
        role: "AI Engineer & Developer",
        headlineHighlight: "Architecting",
        headlineMain: "Intelligence",
        subheadlineStart: "Solving complex problems with",
        subheadlineHighlight1: "Deep Learning",
        subheadlineHighlight2: "Computer Vision",
        ctaProject: "View Projects",
        ctaContact: "Get in Touch"
    });

    React.useEffect(() => {
        fetch('/api/content/hero')
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) setHeroData(data);
            })
            .catch(err => console.error("Failed to fetch hero content", err));
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-[var(--color-bg-primary)]">

            {/* 3D Background Layer */}
            <div className="absolute inset-0 z-0">
                <HeroScene />
            </div>

            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/80 z-10 pointer-events-none" />

            {/* Main Content */}
            <div className="relative z-20 h-full container mx-auto px-6 flex flex-col justify-center items-center pt-20">

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="text-center space-y-8 max-w-3xl"
                >
                    {/* Role tag */}
                    <motion.div variants={variants} className="flex items-center justify-center gap-2">
                        <span className="px-4 py-1.5 rounded-full bg-blue-50 text-[var(--color-accent-blue)] text-xs font-semibold tracking-wide border border-blue-100">
                            {heroData.role}
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        variants={variants}
                        className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.05] text-gray-900"
                    >
                        {heroData.headlineHighlight}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-violet)]">
                            {heroData.headlineMain}
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p variants={variants} className="text-lg md:text-xl text-gray-500 font-normal leading-relaxed max-w-xl mx-auto">
                        {heroData.subheadlineStart}{" "}
                        <span className="text-gray-800 font-medium">{heroData.subheadlineHighlight1}</span>
                        {" and "}
                        <span className="text-gray-800 font-medium">{heroData.subheadlineHighlight2}</span>.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div variants={variants} className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="#projects"
                            className="px-7 py-3.5 bg-[var(--color-accent-blue)] text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 group"
                        >
                            {heroData.ctaProject}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href="#contact"
                            className="px-7 py-3.5 bg-white text-gray-800 border border-gray-200 font-semibold rounded-xl hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] transition-all duration-300 shadow-sm"
                        >
                            {heroData.ctaContact}
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

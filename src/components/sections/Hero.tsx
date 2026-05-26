"use client";
import React from "react";
import HeroScene from "@/components/scene/HeroScene";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Sparkles, Github, Linkedin } from "lucide-react";

const variants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.4 }
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
            .then(data => { if (data && !data.error) setHeroData(data); })
            .catch(err => console.error("Failed to fetch hero content", err));
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-[var(--color-bg-primary)]">

            {/* Large Orb Glows */}
            <div className="orb w-[700px] h-[700px] bg-[var(--color-accent-blue)] opacity-[0.06] top-[-200px] left-[-100px]" />
            <div className="orb w-[600px] h-[600px] bg-[var(--color-accent-violet)] opacity-[0.05] bottom-[-200px] right-[-100px]" />

            {/* 3D Background Layer */}
            <div className="absolute inset-0 z-0">
                <HeroScene />
            </div>

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-[var(--color-bg-primary)]/70 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-transparent to-[var(--color-bg-primary)]/80 z-10 pointer-events-none" />

            {/* Main Content */}
            <div className="relative z-20 h-full container mx-auto px-6 flex flex-col justify-center items-center pt-20">

                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="text-center space-y-8 max-w-4xl"
                >
                    {/* Role badge */}
                    <motion.div variants={variants} className="flex items-center justify-center gap-2">
                        <span className="section-label">
                            <Sparkles className="w-3 h-3" />
                            {heroData.role}
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        variants={variants}
                        className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.0] text-[var(--color-text-primary)]"
                    >
                        {heroData.headlineHighlight}{" "}
                        <br className="hidden md:block" />
                        <span className="text-gradient-aurora">
                            {heroData.headlineMain}
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p variants={variants} className="text-lg md:text-xl text-[var(--color-text-secondary)] font-normal leading-relaxed max-w-2xl mx-auto">
                        {heroData.subheadlineStart}{" "}
                        <span className="text-[var(--color-text-primary)] font-medium border-b border-[var(--color-accent-blue)]/40 pb-0.5">{heroData.subheadlineHighlight1}</span>
                        {" & "}
                        <span className="text-[var(--color-text-primary)] font-medium border-b border-[var(--color-accent-violet)]/40 pb-0.5">{heroData.subheadlineHighlight2}</span>.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div variants={variants} className="pt-2 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="#projects" className="btn-primary group">
                            {heroData.ctaProject}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                        <a href="#contact" className="btn-outline">
                            {heroData.ctaContact}
                        </a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div variants={variants} className="flex items-center justify-center gap-4 pt-2">
                        <a
                            href="https://github.com/Arbazkhan-ai"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors text-sm"
                        >
                            <Github className="w-4 h-4" />
                            GitHub
                        </a>
                        <div className="w-px h-4 bg-black/10" />
                        <a
                            href="https://www.linkedin.com/in/arbaz-khan-3az/"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors text-sm"
                        >
                            <Linkedin className="w-4 h-4" />
                            LinkedIn
                        </a>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[var(--color-text-muted)] text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="w-px h-8 bg-gradient-to-b from-[var(--color-accent-blue)] to-transparent"
                    />
                </motion.div>
            </div>
        </section>
    );
}

"use client";
import React from "react";
import HeroScene from "@/components/scene/HeroScene";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import TypewriterText from "@/components/ui/TypewriterText";

// Re-using simplified Magnetic Button logic inline or keeping component ref if it exists.
// Assuming MagneticButton exists as per previous file view.
import MagneticButton from "@/components/ui/MagneticButton";

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
        role: "System Architect",
        headlineHighlight: "Architecting",
        headlineMain: "Intelligence",
        subheadlineStart: "Solving complex problems with",
        subheadlineHighlight1: "Deep Learning",
        subheadlineHighlight2: "Autonomous Systems",
        ctaProject: "Explore Projects",
        ctaContact: "Contact Me"
    });

    const [profile, setProfile] = React.useState({ avatar: "/profilee.png" });

    React.useEffect(() => {
        // Fetch Content
        fetch('/api/content/hero')
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) setHeroData(data);
            })
            .catch(err => console.error("Failed to fetch hero content", err));

        // Fetch Profile for Avatar
        fetch('/api/content/profile')
            .then(res => res.json())
            .then(data => {
                if (data && !data.error && data.avatar) setProfile(prev => ({ ...prev, avatar: data.avatar }));
            })
            .catch(err => console.error("Failed to fetch profile", err));
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-[var(--color-bg-primary)]">

            {/* 3D Background Layer */}
            <div className="absolute inset-0 z-0">
                <HeroScene />
            </div>

            {/* Gradient Overlay for Text Readability - Enhanced */}
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/80 z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-transparent to-white/40 z-10 pointer-events-none" />

            {/* Main Content */}
            <div className="relative z-20 h-full container mx-auto px-6 flex flex-col justify-center items-center pt-20">

                {/* Text Content */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="flex-1 text-center space-y-8 z-10 max-w-4xl flex flex-col justify-center"
                >
                    {/* Role Label */}
                    <motion.div variants={variants} className="flex items-center justify-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full bg-blue-50 text-[var(--color-accent-blue)] font-mono text-xs tracking-widest uppercase border border-blue-100">
                            {heroData.role}
                        </span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        variants={variants}
                        className="text-6xl md:text-8xl lg:text-9xl font-bold font-scifi tracking-tight leading-[1] perspective-text"
                    >
                        <span className="block text-gray-900 drop-shadow-sm">
                            {heroData.headlineHighlight.split('').map((char, i) => (
                                <span key={i} style={{ transitionDelay: `${i * 30}ms` }}>{char}</span>
                            ))}
                        </span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-violet)] drop-shadow-md">
                            {heroData.headlineMain.split('').map((char, i) => (
                                <span key={i} style={{ transitionDelay: `${(i + 10) * 30}ms` }}>{char}</span>
                            ))}
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.div variants={variants} className="flex justify-center pt-2">
                        <p className="text-xl md:text-2xl text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto">
                            {heroData.subheadlineStart} <span className="text-gray-900 font-medium">{heroData.subheadlineHighlight1}</span> and <span className="text-gray-900 font-medium">{heroData.subheadlineHighlight2}</span>.
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div variants={variants} className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a href="#projects" className="px-8 py-4 bg-[var(--color-accent-blue)] text-white font-medium rounded-full shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 group transform hover:-translate-y-1">
                            {heroData.ctaProject}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a href="#contact" className="px-8 py-4 bg-white text-gray-900 border border-gray-200 font-medium rounded-full hover:border-[var(--color-accent-blue)] hover:text-[var(--color-accent-blue)] transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1">
                            {heroData.ctaContact}
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right: Hero Image - REMOVED as per user request */}
                {/* 
                <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex-1 flex justify-center lg:justify-end relative z-10 mt-12 lg:mt-0"
                >
                    <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px] flex items-center justify-center">
                        <img
                            src={profile.avatar}
                            alt="Arbaz Khan"
                            className="w-full h-full object-contain drop-shadow-[-10px_10px_30px_rgba(0,0,0,0.2)] filter hover:brightness-110 transition-all duration-500"
                        />
                    </div>
                </motion.div> 
                */}

            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Scroll to Navigate</span>
                <ChevronDown className="w-6 h-6 text-[var(--color-accent-blue)] animate-bounce" />
            </motion.div>

        </section>
    );
}

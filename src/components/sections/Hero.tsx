"use client";
import React from "react";
import HeroScene from "@/components/scene/HeroScene";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GlitchText from "@/components/ui/GlitchText";
import MagneticButton from "@/components/ui/MagneticButton";
import TypewriterText from "@/components/ui/TypewriterText";

export default function Hero() {
    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black text-white pointer-events-auto">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <HeroScene />
            </div>

            {/* Decorative Grid Lines */}
            <div className="absolute inset-x-0 top-1/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-neon-cyan)]/20 to-transparent w-full" />
            <div className="absolute inset-x-0 bottom-1/4 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-neon-violet)]/20 to-transparent w-full" />

            {/* Content Overlay */}
            <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center h-full text-center">

                {/* Floating Top Label */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mb-8 relative"
                >
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--color-neon-cyan)] rounded-full animate-pulse" />
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--color-neon-cyan)] rounded-full animate-pulse" />
                    <h2 className="text-[var(--color-neon-cyan)] tracking-[0.3em] text-xs md:text-sm font-bold uppercase border border-[var(--color-neon-cyan)]/30 py-2 px-6 rounded-full backdrop-blur-md bg-black/20">
                        System Online // Neural Core Active
                    </h2>
                </motion.div>

                {/* Main Title Area */}
                <div
                    className="relative mb-6"
                >
                    {/* Decorative Brackets */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="absolute -left-8 md:-left-16 top-0 h-full w-4 border-l-2 border-t-2 border-b-2 border-white/20 hidden md:block"
                    />
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="absolute -right-8 md:-right-16 top-0 h-full w-4 border-r-2 border-t-2 border-b-2 border-white/20 hidden md:block"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-scifi tracking-tight relative z-10">
                            <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] group-hover:opacity-50 transition-opacity">ARBAZ</span>
                            <span className="block text-[var(--color-neon-cyan)] drop-shadow-[0_0_20px_rgba(0,247,255,0.4)] glitch-layers" data-text="KHAN">KHAN</span>
                        </h1>
                    </motion.div>
                </div>

                {/* Subheading & Typewriter */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="max-w-2xl mx-auto mb-10 space-y-4"
                >
                    <div className="flex items-center justify-center gap-2 text-xl md:text-2xl text-gray-300 font-light">
                        <span className="text-[var(--color-neon-violet)] font-mono">{">"}</span>
                        <span className="font-bold">AI Engineer & Innovator</span>
                    </div>

                    <div className="h-12 flex items-center justify-center">
                        <TypewriterText
                            text="Building intelligent systems with vision, precision, and imagination."
                            className="text-sm md:text-lg text-[var(--color-neon-cyan)]/80 font-mono tracking-wide"
                            speed={30}
                        />
                    </div>
                </motion.div>

                {/* Magnetic CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="flex flex-col md:flex-row gap-6 justify-center items-center relative z-20"
                >
                    <MagneticButton>
                        <a href="#projects" className="group relative px-8 py-4 bg-transparent border border-[var(--color-neon-cyan)] text-[var(--color-neon-cyan)] font-bold uppercase tracking-wider overflow-hidden hover:text-black transition-colors inline-block clip-corner">
                            <span className="absolute inset-0 w-full h-full bg-[var(--color-neon-cyan)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out origin-left"></span>
                            <span className="relative z-10 flex items-center gap-2">View Mission Logs <ArrowRight className="w-5 h-5" /></span>
                        </a>
                    </MagneticButton>

                    <MagneticButton>
                        <a href="#about" className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[var(--color-neon-violet)] text-gray-300 hover:text-[var(--color-neon-violet)] font-bold uppercase tracking-wider transition-all inline-block clip-corner">
                            Initialize Profile
                        </a>
                    </MagneticButton>
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-10 pointer-events-none"></div>
        </section>
    );
}

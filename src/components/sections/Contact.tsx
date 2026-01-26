"use client";
import React from "react";
import { Send, Mail, Linkedin, Github } from "lucide-react";

import MagneticButton from "../ui/MagneticButton";

export default function Contact() {
    return (
        <section id="contact" className="py-24 bg-[#050505] relative overflow-hidden">
            {/* Decorative Grid */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(rgba(153,85,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(153,85,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto bg-black/50 border border-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,247,255,0.05)]">
                    <div className="flex flex-col md:flex-row gap-12">

                        {/* Contact Info */}
                        <div className="md:w-1/3 space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold font-scifi text-white mb-2">Initialize Comms</h2>
                                <div className="h-1 w-12 bg-[var(--color-neon-cyan)]" />
                            </div>
                            <p className="text-gray-400 text-sm">
                                Ready to deploy advanced AI solutions? Transmit your project data and I will respond with a strategic imperative.
                            </p>

                            <div className="space-y-4">
                                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-[var(--color-neon-cyan)] transition-colors group">
                                    <div className="p-2 rounded bg-white/5 group-hover:bg-[var(--color-neon-cyan)]/20 transition-colors"><Mail className="w-5 h-5" /></div>
                                    <span>arbaz@ai-engineer.com</span>
                                </a>
                                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-[var(--color-neon-cyan)] transition-colors group">
                                    <div className="p-2 rounded bg-white/5 group-hover:bg-[var(--color-neon-cyan)]/20 transition-colors"><Github className="w-5 h-5" /></div>
                                    <span>github.com/arbazkhan</span>
                                </a>
                                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-[var(--color-neon-cyan)] transition-colors group">
                                    <div className="p-2 rounded bg-white/5 group-hover:bg-[var(--color-neon-cyan)]/20 transition-colors"><Linkedin className="w-5 h-5" /></div>
                                    <span>linkedin.com/in/arbazkhan</span>
                                </a>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="md:w-2/3 bg-white/5 rounded-xl p-6 border border-white/5">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-gray-500 uppercase">Identity Name</label>
                                        <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-neon-cyan)] focus:shadow-[0_0_10px_rgba(0,247,255,0.2)] transition-all" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono text-gray-500 uppercase">Contact Frequency (Email)</label>
                                        <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-neon-cyan)] focus:shadow-[0_0_10px_rgba(0,247,255,0.2)] transition-all" placeholder="john@example.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-mono text-gray-500 uppercase">Mission Objective</label>
                                    <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[var(--color-neon-cyan)] focus:shadow-[0_0_10px_rgba(0,247,255,0.2)] transition-all resize-none" placeholder="Describe your project requirements..."></textarea>
                                </div>

                                <MagneticButton>
                                    <button type="button" className="w-full py-4 bg-[var(--color-neon-cyan)]/10 border border-[var(--color-neon-cyan)] text-[var(--color-neon-cyan)] font-bold uppercase tracking-widest hover:bg-[var(--color-neon-cyan)] hover:text-black transition-all flex items-center justify-center gap-2 group">
                                        Execute Transmission <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </MagneticButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

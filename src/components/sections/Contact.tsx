"use client";
import React, { useState } from "react";
import { Send, Mail, Linkedin, Github, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-[var(--color-bg-primary)] relative overflow-hidden">

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto backdrop-blur-3xl bg-white border border-gray-100 rounded-3xl p-8 md:p-14 shadow-2xl shadow-[var(--color-accent-blue)]/5">

                    <div className="flex flex-col md:flex-row gap-16">

                        {/* Text Side */}
                        <div className="md:w-5/12 space-y-8">
                            <div>
                                <h2 className="text-4xl font-bold font-scifi text-gray-900 mb-2 leading-none">
                                    Iniate <br />
                                    <span className="text-[var(--color-accent-blue)]">Protocol</span>
                                </h2>
                                <div className="h-1 w-12 bg-gray-200 mt-4" />
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed font-body">
                                Ready to deploy advanced AI solutions? Transmit your project data and I will respond with a strategic imperative.
                            </p>

                            <div className="space-y-6 pt-4">

                                <a href="https://github.com/Arbazkhan-ai" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-600 hover:text-[var(--color-accent-blue)] transition-colors group">
                                    <div className="p-3 rounded-full bg-gray-50 border border-gray-100 group-hover:bg-[var(--color-accent-blue)] group-hover:text-white transition-all">
                                        <Github className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm tracking-wide">github.com/arbazkhan</span>
                                </a>
                                <a href="https://www.linkedin.com/in/arbaz-khan-3az/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-600 hover:text-[var(--color-accent-blue)] transition-colors group">
                                    <div className="p-3 rounded-full bg-gray-50 border border-gray-100 group-hover:bg-[var(--color-accent-blue)] group-hover:text-white transition-all">
                                        <Linkedin className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm tracking-wide">linkedin.com/in/arbazkhan</span>
                                </a>
                            </div>
                        </div>

                        {/* Form Side */}
                        <div className="md:w-7/12">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-1">Identity ID</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[var(--color-accent-blue)] focus:bg-white transition-all text-sm font-body"
                                            placeholder="ENTER NAME"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-1">Comm Channel</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[var(--color-accent-blue)] focus:bg-white transition-all text-sm font-body"
                                            placeholder="ENTER EMAIL"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-1">Transmission Data</label>
                                    <textarea
                                        rows={5}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[var(--color-accent-blue)] focus:bg-white transition-all resize-none text-sm font-body"
                                        placeholder="ENTER MESSAGE..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 bg-[var(--color-accent-blue)] text-white font-bold font-scifi uppercase tracking-widest hover:bg-[var(--color-accent-violet)] transition-colors rounded-lg flex items-center justify-center gap-3 mt-4 shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
                                    {loading ? "Transmitting..." : "Transmit Data"}
                                </button>

                                <AnimatePresence>
                                    {status === "success" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="p-3 bg-green-50 text-green-700 text-sm rounded-lg text-center"
                                        >
                                            Transmission successful. Protocol initiated.
                                        </motion.div>
                                    )}
                                    {status === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="p-3 bg-red-50 text-red-700 text-sm rounded-lg text-center"
                                        >
                                            Transmission failed. Check connection.
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Minimal */}
            <div className="absolute bottom-6 w-full text-center">
                <p className="text-[10px] text-gray-400 font-mono tracking-widest">
                    SYSTEM V2.0 // ALL RIGHTS RESERVED 2026
                </p>
            </div>
        </section>
    );
}

"use client";
import React, { useState } from "react";
import { Send, Linkedin, Github, Loader2, Mail, MessageCircle, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const contactLinks = [
    {
        icon: <Github className="w-5 h-5" />,
        label: "GitHub",
        value: "github.com/Arbazkhan-ai",
        href: "https://github.com/Arbazkhan-ai",
        color: "var(--color-accent-blue)",
    },
    {
        icon: <Linkedin className="w-5 h-5" />,
        label: "LinkedIn",
        value: "linkedin.com/in/arbaz-khan-3az",
        href: "https://www.linkedin.com/in/arbaz-khan-3az/",
        color: "var(--color-accent-violet)",
    },
    {
        icon: <Mail className="w-5 h-5" />,
        label: "Email",
        value: "arbazkhanofficial140@gmail.com",
        href: "mailto:arbazkhanofficial140@gmail.com",
        color: "var(--color-accent-cyan)",
    },
];

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
        <section id="contact" className="py-28 bg-[var(--color-bg-primary)] relative overflow-hidden">

            {/* Background glows */}
            <div className="orb w-[400px] h-[400px] bg-[var(--color-accent-blue)] opacity-[0.05] bottom-0 right-0" />
            <div className="orb w-[300px] h-[300px] bg-[var(--color-accent-violet)] opacity-[0.05] top-0 left-0" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <span className="section-label">
                        <MessageCircle className="w-3 h-3" />
                        Get in Touch
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mt-4">
                        Let&apos;s Build{" "}
                        <span className="text-gradient-aurora">Together</span>
                    </h2>
                    <p className="text-[var(--color-text-secondary)] max-w-md mx-auto">
                        Ready to deploy advanced AI solutions? Reach out and let&apos;s discuss your project.
                    </p>
                </motion.div>

                {/* Main Grid */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <div className="p-7 rounded-2xl bg-[var(--color-bg-card)] border border-black/[0.06] space-y-3">
                            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">Contact Details</h3>
                            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                                Whether you have a project idea or just want to connect — my inbox is always open.
                            </p>
                        </div>

                        {contactLinks.map((link, i) => (
                            <motion.a
                                key={i}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                whileHover={{ x: 6 }}
                                className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--color-bg-card)] border border-black/[0.06] group transition-all duration-300"
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = `${link.color}30`;
                                    (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 30px ${link.color}10`;
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLElement).style.borderColor = '';
                                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                                }}
                            >
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                                    style={{ color: link.color, background: `${link.color}15` }}
                                >
                                    {link.icon}
                                </div>
                                <div>
                                    <p className="text-[var(--color-text-muted)] text-[10px] font-mono uppercase tracking-widest mb-0.5">{link.label}</p>
                                    <p className="text-[var(--color-text-primary)] text-sm font-medium group-hover:text-[var(--color-text-primary)] transition-colors">{link.value}</p>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        <div className="p-8 rounded-2xl bg-[var(--color-bg-card)] border border-black/[0.06] relative overflow-hidden">
                            {/* Top gradient line */}
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--color-accent-blue)] via-[var(--color-accent-violet)] to-[var(--color-accent-pink)]" />

                            <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Send a Message</h3>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">Your Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-[var(--color-bg-primary)] border border-black/[0.08] rounded-xl px-4 py-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-blue)]/50 focus:shadow-[0_0_0_3px_rgba(79,141,255,0.1)] transition-all text-sm"
                                            placeholder="Arbaz Khan"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-[var(--color-bg-primary)] border border-black/[0.08] rounded-xl px-4 py-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-blue)]/50 focus:shadow-[0_0_0_3px_rgba(79,141,255,0.1)] transition-all text-sm"
                                            placeholder="hello@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase tracking-widest">Your Message</label>
                                    <textarea
                                        rows={5}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-[var(--color-bg-primary)] border border-black/[0.08] rounded-xl px-4 py-3 text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-blue)]/50 focus:shadow-[0_0_0_3px_rgba(79,141,255,0.1)] transition-all resize-none text-sm"
                                        placeholder="Tell me about your project or idea..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-4 rounded-xl font-bold text-sm text-[var(--color-text-primary)] flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                    style={{
                                        background: `linear-gradient(135deg, var(--color-accent-blue), var(--color-accent-violet))`,
                                        boxShadow: `0 4px 20px rgba(79,141,255,0.25)`,
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!loading) (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px rgba(79,141,255,0.4)`;
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(79,141,255,0.25)`;
                                    }}
                                >
                                    {loading ? <Loader2 className="animate-spin w-4 h-4" /> : <Send className="w-4 h-4" />}
                                    {loading ? "Sending..." : "Send Message"}
                                </button>

                                <AnimatePresence>
                                    {status === "success" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-3 p-4 rounded-xl text-sm border"
                                            style={{
                                                color: "var(--color-accent-green)",
                                                background: "rgba(34, 211, 238, 0.08)",
                                                borderColor: "rgba(34, 211, 238, 0.2)",
                                            }}
                                        >
                                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                                            Message sent! I&apos;ll get back to you shortly.
                                        </motion.div>
                                    )}
                                    {status === "error" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-3 p-4 rounded-xl text-sm border"
                                            style={{
                                                color: "var(--color-accent-pink)",
                                                background: "rgba(244, 114, 182, 0.08)",
                                                borderColor: "rgba(244, 114, 182, 0.2)",
                                            }}
                                        >
                                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                            Something went wrong. Please try again or email directly.
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

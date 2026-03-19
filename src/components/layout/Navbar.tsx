"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled
                    ? "backdrop-blur-xl border-b border-white/[0.07] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)] bg-[rgba(4,7,17,0.85)]"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent-blue)] to-[var(--color-accent-violet)] flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
                        <Zap className="w-4 h-4 text-white" fill="currentColor" />
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight font-display group-hover:text-[var(--color-accent-blue)] transition-colors">
                        Arbaz<span className="text-[var(--color-accent-blue)]">.</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setActiveLink(link.name)}
                            className={cn(
                                "relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg group",
                                activeLink === link.name
                                    ? "text-[var(--color-accent-blue)]"
                                    : "text-[var(--color-text-secondary)] hover:text-white"
                            )}
                        >
                            <span className="relative z-10">{link.name}</span>
                            <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/[0.05] transition-colors duration-200" />
                            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-violet)] group-hover:w-2/3 transition-all duration-300 rounded-full" />
                        </Link>
                    ))}
                </div>

                {/* CTA + Mobile Toggle */}
                <div className="flex items-center gap-3">
                    <a
                        href="#contact"
                        className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-violet)] text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        Hire Me
                    </a>
                    <button
                        className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-[var(--color-text-secondary)] hover:text-white hover:border-white/20 hover:bg-white/[0.05] transition-all"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-white/[0.06] overflow-hidden bg-[rgba(4,7,17,0.95)] backdrop-blur-xl"
                    >
                        <div className="flex flex-col py-6 px-6 space-y-1">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-3 py-3 px-4 rounded-xl text-[var(--color-text-secondary)] hover:text-white hover:bg-white/[0.05] transition-all font-medium"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-blue)]" />
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <div className="pt-4">
                                <a
                                    href="#contact"
                                    className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-[var(--color-accent-blue)] to-[var(--color-accent-violet)] text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Hire Me
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GlitchText from "../ui/GlitchText";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between relative">
                {/* HUD Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--color-neon-cyan)] opacity-50" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--color-neon-cyan)] opacity-50" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--color-neon-cyan)] opacity-50" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--color-neon-cyan)] opacity-50" />

                <Link href="/" className="text-2xl font-bold font-scifi bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-violet)] hover:opacity-80 transition-opacity pl-4">
                    <GlitchText text="ARBAZ KHAN" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 pr-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="relative text-sm font-medium tracking-wider text-gray-300 hover:text-[var(--color-neon-cyan)] transition-colors uppercase group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--color-neon-cyan)] group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white hover:text-[var(--color-neon-cyan)] transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col items-center py-8 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-gray-300 hover:text-[var(--color-neon-cyan)] transition-colors uppercase"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

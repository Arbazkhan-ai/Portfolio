"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import SkillsMarquee from "@/components/ui/SkillsMarquee";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import BootSequence from "@/components/ui/BootSequence";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] selection:bg-[var(--color-accent-blue)] selection:text-white">
      <AnimatePresence>
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${booted ? 'opacity-100' : 'opacity-0'}`}>
        {/* Global Background Layers */}
        <div className="grid-bg" />
        <div className="radial-glow-bg" />
        <div className="noise-overlay" />

        <Navbar />
        <Hero />
        <SkillsMarquee />
        <About />
        <Experience />
        <Projects />
        <Services />
        <Testimonials />
        <Contact />

        {/* Global Footer */}
        <footer className="py-8 border-t border-white/[0.06] bg-[var(--color-bg-primary)] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent-blue)]/[0.03] to-transparent pointer-events-none" />
          <p className="text-[var(--color-text-muted)] text-sm font-mono relative z-10">
            © {new Date().getFullYear()} <span className="text-[var(--color-text-secondary)]">Arbaz Khan</span>
            <span className="mx-2 text-[var(--color-accent-blue)]">—</span>
            <span className="text-gradient-blue">AI Engineer & Developer</span>
          </p>
          <p className="text-[var(--color-text-muted)] text-xs font-mono mt-2 tracking-widest uppercase opacity-40 relative z-10">
            Crafted with precision · Deployed with purpose
          </p>
        </footer>
      </div>
    </main>
  );
}

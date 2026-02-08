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
    <main className="min-h-screen bg-[var(--color-bg-primary)] text-black selection:bg-[var(--color-accent-blue)] selection:text-white">
      <AnimatePresence>
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${booted ? 'opacity-100' : 'opacity-0'}`}>
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
        <footer className="py-6 border-t border-gray-100 bg-[var(--color-bg-primary)] text-center">
          <p className="text-gray-500 text-sm font-mono">© {new Date().getFullYear()} ARBAZ KHAN // AI SYSTEMS ACTIVE</p>
        </footer>
      </div>
    </main>
  );
}

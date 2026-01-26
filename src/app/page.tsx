"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import BootSequence from "@/components/ui/BootSequence";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-[var(--color-neon-cyan)] selection:text-black">
      <AnimatePresence>
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-1000 ${booted ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Services />
        <Testimonials />
        <Contact />

        {/* Global Footer */}
        <footer className="py-6 border-t border-white/10 bg-black text-center">
          <p className="text-gray-500 text-sm font-mono">© {new Date().getFullYear()} ARBAZ KHAN // AI SYSTEMS ACTIVE</p>
        </footer>
      </div>
    </main>
  );
}

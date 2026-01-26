"use client";
import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

interface GlitchTextProps {
    text: string;
    className?: string;
    as?: React.ElementType;
}

export default function GlitchText({ text, className = "", as: Component = "span" }: GlitchTextProps) {
    const controls = useAnimationControls();
    const [displayText, setDisplayText] = useState(text);
    const chars = "!<>-_\\/[]{}—=+*^?#________";

    const triggerGlitch = async () => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText((prev) =>
                text.split("").map((letter, index) => {
                    if (index < iterations) {
                        return text[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            )

            if (iterations >= text.length) {
                clearInterval(interval);
                setDisplayText(text);
            }

            iterations += 1 / 3;
        }, 30);
    };

    return (
        <Component
            className={`relative inline-block group ${className}`}
            onMouseEnter={triggerGlitch}
        >
            <span className="relative z-10">{displayText}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-[var(--color-neon-violet)] opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 ease-in-out select-none" aria-hidden="true">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-[var(--color-neon-cyan)] opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 ease-in-out select-none" aria-hidden="true">{text}</span>
        </Component>
    );
}

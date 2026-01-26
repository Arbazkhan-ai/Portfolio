"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TypewriterTextProps {
    text: string;
    speed?: number;
    className?: string;
    cursorColor?: string;
}

export default function TypewriterText({ text, speed = 50, className = "", cursorColor = "var(--color-neon-cyan)" }: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentStringIndex, setCurrentStringIndex] = useState(0);

    useEffect(() => {
        if (currentStringIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentStringIndex]);
                setCurrentStringIndex((prev) => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [currentStringIndex, speed, text]);

    return (
        <span className={className}>
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                style={{ color: cursorColor, display: "inline-block", marginLeft: "2px" }}
            >
                _
            </motion.span>
        </span>
    );
}

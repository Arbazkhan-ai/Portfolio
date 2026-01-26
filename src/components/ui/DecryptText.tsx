"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export default function DecryptText({ text, className = "" }: { text: string; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [displayText, setDisplayText] = useState("");

    useEffect(() => {
        if (isInView) {
            let iteration = 0;
            const interval = setInterval(() => {
                setDisplayText(
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return characters[Math.floor(Math.random() * characters.length)];
                        })
                        .join("")
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 2; // Slow down decrypt
            }, 30);

            return () => clearInterval(interval);
        }
    }, [isInView, text]);

    return (
        <span ref={ref} className={className}>
            {displayText}
        </span>
    );
}

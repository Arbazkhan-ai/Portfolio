"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CyberCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);

    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mousedown", onMouseDown);
            document.addEventListener("mouseup", onMouseUp);

            // Add hover listeners to interactive elements
            const linkElements = document.querySelectorAll("a, button, .cursor-hover");
            linkElements.forEach((el) => {
                el.addEventListener("mouseenter", () => setLinkHovered(true));
                el.addEventListener("mouseleave", () => setLinkHovered(false));
            });
        };

        const removeEventListeners = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);

            const linkElements = document.querySelectorAll("a, button, .cursor-hover");
            linkElements.forEach((el) => {
                el.removeEventListener("mouseenter", () => setLinkHovered(true));
                el.removeEventListener("mouseleave", () => setLinkHovered(false));
            });
        };

        const onMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const onMouseDown = () => setClicked(true);
        const onMouseUp = () => setClicked(false);

        addEventListeners();
        return () => removeEventListeners();
    }, []);

    return (
        <>
            {/* Main Reticle */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                animate={{
                    x: position.x - 16,
                    y: position.y - 16,
                    scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
                }}
                transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.2 }}
            >
                <div className="relative w-8 h-8">
                    <div className="absolute inset-0 border border-[var(--color-neon-cyan)] rounded-full animate-[spin_4s_linear_infinite]" />
                    <div className="absolute inset-2 border border-[var(--color-neon-violet)] rounded-full animate-[spin_2s_linear_infinite_reverse]" />
                    <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                </div>
            </motion.div>

            {/* Trailing Glow */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block"
                animate={{
                    x: position.x - 100, // offset for size 200
                    y: position.y - 100,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <div className={`w-[200px] h-[200px] bg-[var(--color-neon-cyan)] rounded-full blur-[80px] transition-opacity duration-300 ${clicked ? 'opacity-40' : 'opacity-10'}`} />
            </motion.div>
        </>
    );
}

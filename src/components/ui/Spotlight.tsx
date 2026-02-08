"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function Spotlight() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-[1] opacity-50"
            style={{
                background: `radial-gradient(600px circle at var(--x) var(--y), rgba(0, 86, 210, 0.05), transparent 80%)`,
            }}
        >
            <motion.div
                className="absolute inset-0"
                style={{
                    background: `radial-gradient(400px circle at ${springX}px ${springY}px, rgba(0, 86, 210, 0.08), transparent 80%)`,
                }}
            />
        </motion.div>
    );
}

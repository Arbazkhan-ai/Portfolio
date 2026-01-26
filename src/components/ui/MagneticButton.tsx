"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { playHoverSound, playClickSound } from "@/lib/sfx";

export default function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x * 0.2, y: y * 0.2 }); // Magnetic strength
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            className="inline-block"
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            onMouseEnter={() => playHoverSound()}
            onClick={() => playClickSound()}
        >
            {children}
        </motion.div>
    );
}

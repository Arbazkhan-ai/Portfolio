"use client";
import React from "react";
import { motion } from "framer-motion";

export default function BackgroundText() {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] select-none">
            <motion.div
                initial={{ x: "0%" }}
                animate={{ x: "-50%" }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute top-[15%] left-0 whitespace-nowrap text-[20vh] font-bold text-gray-900 opacity-[0.018] uppercase leading-none"
            >
                ARTIFICIAL INTELLIGENCE &nbsp;// DEEP LEARNING &nbsp;// NEURAL NETWORKS &nbsp;// MACHINE LEARNING &nbsp;// COMPUTER VISION &nbsp;// NLP &nbsp;//&nbsp;
            </motion.div>

            <motion.div
                initial={{ x: "-50%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[20%] left-0 whitespace-nowrap text-[20vh] font-bold text-gray-900 opacity-[0.018] uppercase leading-none"
            >
                SYSTEM ARCHITECT &nbsp;// FULLSTACK DEVELOPER &nbsp;// INNOVATOR &nbsp;// DESIGNER &nbsp;// ENGINEER &nbsp;// ARCHITECT &nbsp;//&nbsp;
            </motion.div>
        </div>
    );
}

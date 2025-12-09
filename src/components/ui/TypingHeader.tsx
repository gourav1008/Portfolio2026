"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { profileData } from "@/lib/profileData";

export default function TypingHeader() {
    const text = profileData.typingText;
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 100); // Typing speed

        return () => clearInterval(timer);
    }, [text]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute top-8 left-8 z-40 pointer-events-none"
        >
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white tracking-tight">
                {displayedText}
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="text-neon-cyan"
                >
                    |
                </motion.span>
            </h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="font-mono text-neon-purple mt-2 text-lg"
            >
                {profileData.title}
            </motion.p>
        </motion.div>
    );
}

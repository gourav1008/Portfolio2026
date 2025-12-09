"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const techTerms = [
    "INITIALIZING CORE SYSTEMS...",
    "LOADING WEBGPU SHADERS...",
    "CALIBRATING HOLOGRAPHIC MATRIX...",
    "ESTABLISHING NEURAL LINK...",
    "RENDERING 3D ASSETS...",
    "OPTIMIZING GEOMETRY...",
    "SYSTEM ONLINE"
];

import { useProgress } from "@react-three/drei";

export default function CinematicLoader() {
    const { progress, active } = useProgress();
    const [textIndex, setTextIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [displayProgress, setDisplayProgress] = useState(0);

    useEffect(() => {
        // Smooth progress interpolation
        if (progress > displayProgress) {
            const timer = setTimeout(() => {
                setDisplayProgress(prev => Math.min(progress, prev + 1));
            }, 20);
            return () => clearTimeout(timer);
        }
    }, [progress, displayProgress]);

    useEffect(() => {
        if (displayProgress >= 100) {
            setTimeout(() => setIsComplete(true), 500);
        }
    }, [displayProgress]);

    useEffect(() => {
        const textInterval = setInterval(() => {
            setTextIndex(prev => (prev + 1) % techTerms.length);
        }, 800);

        return () => clearInterval(textInterval);
    }, []);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
                    exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
                >
                    {/* Central Logo / Loader */}
                    <div className="relative w-64 h-64 flex items-center justify-center">
                        {/* Spinning Rings */}
                        <motion.div
                            className="absolute inset-0 border-2 border-neon-cyan/30 rounded-full border-t-transparent"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div
                            className="absolute inset-4 border-2 border-neon-purple/30 rounded-full border-b-transparent"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Percentage */}
                        <div className="font-display font-bold text-4xl text-white tracking-widest">
                            {Math.min(100, Math.floor(displayProgress))}%
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-64 h-1 bg-white/10 mt-8 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-neon-cyan shadow-[0_0_10px_#00F0FF]"
                            style={{ width: `${displayProgress}%` }}
                        />
                    </div>

                    {/* Tech Text */}
                    <div className="mt-4 font-mono text-xs text-neon-cyan/70 tracking-widest h-4">
                        {displayProgress < 100 ? techTerms[textIndex] : "SYSTEM READY"}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

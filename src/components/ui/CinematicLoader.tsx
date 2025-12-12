"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/hooks/useStore";

export default function CinematicLoader() {
    const { isLoaded, setIsLoaded } = useStore();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoaded(true), 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [setIsLoaded]);

    return (
        <AnimatePresence>
            {!isLoaded && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.5 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#020205] via-[#0a0a0f] to-[#050508] text-white"
                >
                    {/* Animated Grid Background */}
                    <div className="absolute inset-0 overflow-hidden opacity-20">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwRjBGRiIgb3BhY2l0eT0iMC4xIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] animate-pulse" />
                    </div>

                    {/* Main Logo/Icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 1, type: "spring", stiffness: 100 }}
                        className="relative mb-8"
                    >
                        {/* Outer Rotating Ring */}
                        <motion.div
                            className="w-40 h-40 border-4 border-transparent border-t-neon-cyan border-r-neon-purple rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Inner Counter-Rotating Ring */}
                        <motion.div
                            className="absolute inset-4 border-4 border-transparent border-b-neon-pink border-l-neon-cyan rounded-full"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Center Hexagon */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <motion.div
                                className="w-16 h-16 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-lg transform rotate-45"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [45, 90, 45]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="w-full h-full bg-void rounded-lg m-1" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Loading Text with Glitch Effect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-center"
                    >
                        <motion.h1
                            className="text-5xl font-display font-bold mb-4 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent"
                            animate={{
                                textShadow: [
                                    "0 0 10px rgba(0,240,255,0.5)",
                                    "0 0 20px rgba(147,51,234,0.5)",
                                    "0 0 10px rgba(0,240,255,0.5)"
                                ]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            INITIALIZING
                        </motion.h1>

                        <p className="text-neon-cyan font-mono text-sm tracking-widest">
                            NEURAL INTERFACE v3.0
                        </p>
                    </motion.div>

                    {/* Progress Bar */}
                    <div className="mt-12 w-96 max-w-[90vw]">
                        <div className="h-2 bg-glass-20 rounded-full overflow-hidden border border-neon-cyan/30 shadow-lg shadow-neon-cyan/20">
                            <motion.div
                                className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink relative"
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Animated shimmer */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                            </motion.div>
                        </div>

                        {/* Progress Percentage */}
                        <div className="flex justify-between mt-3 text-sm font-mono">
                            <span className="text-neon-purple">{progress}%</span>
                            <span className="text-neon-cyan">LOADING ASSETS...</span>
                        </div>
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-neon-cyan rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                    y: [0, -30, 0],
                                    opacity: [0, 1, 0],
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}
                    </div>

                    {/* Bottom Text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-10 text-gray-500 text-xs font-mono"
                    >
                        Powered by WebGPU & Three.js
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

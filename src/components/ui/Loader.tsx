"use client";

import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
    const { progress, active } = useProgress();

    return (
        <AnimatePresence>
            {active && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void text-white"
                >
                    <div className="w-64 space-y-4">
                        {/* Glitchy Text Effect */}
                        <h2 className="text-4xl font-display font-bold text-center animate-pulse text-neon-cyan">
                            INITIALIZING...
                        </h2>

                        {/* Progress Bar Container */}
                        <div className="h-2 w-full bg-glass-20 rounded-full overflow-hidden border border-neon-purple/30">
                            {/* Progress Bar Fill */}
                            <motion.div
                                className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>

                        {/* Percentage Text */}
                        <p className="text-right font-mono text-neon-purple text-sm">
                            {progress.toFixed(0)}%
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

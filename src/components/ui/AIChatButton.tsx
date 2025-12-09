"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { useStore } from "@/hooks/useStore";

export default function AIChatButton() {
    const { isChatOpen, toggleChat } = useStore();

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            onClick={toggleChat}
            className="fixed bottom-8 right-8 z-[60] p-4 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple hover:from-neon-purple hover:to-neon-cyan shadow-[0_0_30px_rgba(0,240,255,0.5)] hover:shadow-[0_0_40px_rgba(0,240,255,0.8)] transition-all duration-300 group"
            aria-label="Toggle AI Chat"
        >
            <Bot className="w-7 h-7 text-white group-hover:animate-pulse" />

            {/* Tooltip */}
            {!isChatOpen && (
                <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-2 rounded-md bg-black/90 text-white text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-neon-cyan/30">
                    Ask AI Assistant
                </span>
            )}
        </motion.button>
    );
}

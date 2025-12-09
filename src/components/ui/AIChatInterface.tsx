"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, User } from "lucide-react";

interface Message {
    role: "user" | "ai";
    content: string;
}

import { useStore } from "@/hooks/useStore";

export default function AIChatInterface() {
    const { isChatOpen, setChatOpen } = useStore();
    const isOpen = isChatOpen;
    const onClose = () => setChatOpen(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "ai", content: "Greetings. I am the portfolio assistant. How can I assist you today?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({ message: userMsg }),
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();

            setMessages(prev => [...prev, { role: "ai", content: data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: "ai", content: "Error: Connection interrupted." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="fixed bottom-24 right-8 w-80 md:w-96 h-[500px] bg-black/80 backdrop-blur-xl border border-neon-cyan/30 rounded-2xl overflow-hidden z-[100] flex flex-col shadow-[0_0_30px_rgba(0,240,255,0.2)]"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                        <div className="flex items-center gap-2">
                            <Bot className="w-5 h-5 text-neon-cyan" />
                            <span className="font-display font-bold text-white tracking-wider">AI ASSISTANT</span>
                        </div>
                        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neon-cyan/20 scrollbar-track-transparent">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "ai" ? "bg-neon-cyan/20 text-neon-cyan" : "bg-neon-purple/20 text-neon-purple"
                                    }`}>
                                    {msg.role === "ai" ? <Bot size={16} /> : <User size={16} />}
                                </div>
                                <div className={`p-3 rounded-lg text-sm max-w-[80%] ${msg.role === "ai"
                                    ? "bg-white/5 text-gray-200 border border-white/10"
                                    : "bg-neon-purple/20 text-white border border-neon-purple/30"
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center shrink-0">
                                    <Bot size={16} className="text-neon-cyan animate-pulse" />
                                </div>
                                <div className="flex items-center gap-1 h-10 px-3">
                                    <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="p-4 border-t border-white/10 bg-white/5">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                placeholder="Ask about projects..."
                                className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-neon-cyan/50 transition-colors"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={isLoading || !input.trim()}
                                className="p-2 rounded-lg bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

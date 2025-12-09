"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function ContactForm() {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setFormState({ name: "", email: "", message: "" });
            setTimeout(() => setStatus("idle"), 3000);
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-lg mx-auto bg-void/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl"
        >
            <h3 className="font-display text-2xl font-bold text-white mb-6 text-center">
                SEND A <span className="text-neon-cyan">MESSAGE</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none text-white transition-all"
                        placeholder="Your Name"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none text-white transition-all"
                        placeholder="your@email.com"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                    <textarea
                        id="message"
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none text-white transition-all resize-none"
                        placeholder="Project details..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "submitting" || status === "success"}
                    className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all duration-300 ${status === "success"
                            ? "bg-green-500/20 text-green-400 border border-green-500/50"
                            : "bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50 hover:bg-neon-cyan hover:text-void"
                        }`}
                >
                    {status === "idle" && (
                        <>
                            TRANSMIT <Send size={18} />
                        </>
                    )}
                    {status === "submitting" && "TRANSMITTING..."}
                    {status === "success" && (
                        <>
                            SENT <CheckCircle size={18} />
                        </>
                    )}
                    {status === "error" && (
                        <>
                            ERROR <AlertCircle size={18} />
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
}

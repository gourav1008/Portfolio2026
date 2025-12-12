"use client";

import { motion } from "framer-motion";
import { Home, User, Lightbulb, Folder, Mail } from "lucide-react";

const navItems = [
    { id: "hero", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "skills", icon: Lightbulb, label: "Skills" },
    { id: "work", icon: Folder, label: "Projects" },
    { id: "contact", icon: Mail, label: "Contact" },
];

export default function NavIcons() {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed right-8 top-[32%] -translate-y-1/2 z-40 flex flex-col gap-3"
        >
            {navItems.map((item) => (
                <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => scrollToSection(item.id)}
                    className="group relative p-3 rounded-full bg-glass-10 border border-white/10 hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-colors backdrop-blur-md"
                >
                    <item.icon className="w-8 h-8 text-gray-400 group-hover:text-neon-cyan transition-colors" />

                    {/* Tooltip */}
                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md bg-black/80 text-white text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                        {item.label}
                    </span>
                </motion.button>
            ))}
        </motion.div>
    );
}

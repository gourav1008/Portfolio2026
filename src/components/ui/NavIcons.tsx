"use client";

import { motion } from "framer-motion";
import { useResponsive } from "@/hooks/useResponsive";
import { Home, User, Lightbulb, Folder, Mail } from "lucide-react";

const navItems = [
    { id: "hero", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "skills", icon: Lightbulb, label: "Skills" },
    { id: "work", icon: Folder, label: "Projects" },
    { id: "contact", icon: Mail, label: "Contact" },
];

export default function NavIcons() {
    const { isMobile, isTablet } = useResponsive();
    
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Responsive positioning and sizing
    const positionRight = isMobile ? 'right-4' : 'right-8';
    const iconSize = isMobile ? 'w-6 h-6' : 'w-8 h-8';
    const padding = isMobile ? 'p-2' : 'p-3';
    const tooltipText = isMobile ? 'text-xs' : 'text-xs sm:text-sm';
    const tooltipDistance = isMobile ? 'mr-2' : 'mr-4';

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className={`fixed ${positionRight} top-[32%] -translate-y-1/2 z-40 flex flex-col gap-2 sm:gap-3`}
        >
            {navItems.map((item) => (
                <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`group relative ${padding} rounded-full bg-glass-10 border border-white/10 hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-colors backdrop-blur-md`}
                    aria-label={item.label}
                >
                    <item.icon className={`${iconSize} text-gray-400 group-hover:text-neon-cyan transition-colors`} />

                    {/* Tooltip - Hidden on mobile, shown on larger screens */}
                    {!isMobile && (
                        <span className={`absolute right-full ${tooltipDistance} top-1/2 -translate-y-1/2 px-3 py-1 rounded-md bg-black/80 text-white ${tooltipText} font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10`}>
                            {item.label}
                        </span>
                    )}
                </motion.button>
            ))}
        </motion.div>
    );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { useSoundEffects } from "@/hooks/useSoundEffects";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { playHover, playClick } = useSoundEffects();

    const toggleMenu = () => {
        playClick();
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full h-20 z-50 flex items-center justify-between px-8 md:px-16 glass-effect">
                {/* Logo */}
                <div className="flex items-center gap-2" onMouseEnter={playHover}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple animate-pulse" />
                    <span className="font-display font-bold text-xl tracking-wider text-white">
                        DEV<span className="text-neon-cyan">.PORTFOLIO</span>
                    </span>
                </div>

                {/* Desktop Navigation Links */}
                <ul className="hidden md:flex items-center gap-8">
                    {["WORK", "SKILLS", "ABOUT", "CONTACT"].map((item) => (
                        <li key={item}>
                            <a
                                href={`#${item.toLowerCase()}`}
                                className="font-body text-sm font-medium text-gray-300 hover:text-neon-cyan transition-colors duration-300 tracking-wide"
                                onMouseEnter={playHover}
                                onClick={playClick}
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <a
                    href="#contact"
                    className="hidden md:block px-6 py-2 rounded-full border border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan font-display font-bold text-sm tracking-widest hover:bg-neon-cyan hover:text-void hover:neon-glow transition-all duration-300 cursor-pointer"
                    onMouseEnter={playHover}
                    onClick={playClick}
                >
                    HIRE ME
                </a>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white hover:text-neon-cyan transition-colors"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="fixed inset-0 z-40 bg-void/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
                    >
                        <ul className="flex flex-col items-center gap-8">
                            {["WORK", "SKILLS", "ABOUT", "CONTACT"].map((item) => (
                                <motion.li
                                    key={item}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <a
                                        href={`#${item.toLowerCase()}`}
                                        onClick={toggleMenu}
                                        className="font-display text-3xl font-bold text-white hover:text-neon-cyan transition-colors tracking-widest"
                                    >
                                        {item}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>

                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-12 px-8 py-3 rounded-full border border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan font-display font-bold text-lg tracking-widest hover:bg-neon-cyan hover:text-void hover:neon-glow transition-all duration-300"
                        >
                            HIRE ME
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

"use client";

import { motion } from "framer-motion";
import { Code, Database, Globe, Server } from "lucide-react";
import { skillsData } from "@/lib/skillsData";

const skillHighlights = [
    { icon: Globe, label: "ReactJS", color: "text-neon-cyan" },
    { icon: Server, label: "NodeJS", color: "text-neon-purple" },
    { icon: Database, label: "MongoDB", color: "text-white" },
    { icon: Code, label: "JavaScript", color: "text-neon-pink" },
];

export default function WorkshopCard() {
    // Get total skill count
    const totalSkills = skillsData.reduce((acc, category) => acc + category.items.length, 0);
    const categories = skillsData.length;

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-1 rounded-2xl bg-gradient-to-bl from-neon-cyan/50 to-neon-purple/50"
        >
            <div className="relative p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 overflow-hidden max-w-md">
                {/* Glow Effect */}
                <div className="absolute -top-25 -left-25 w-40 h-40 bg-neon-cyan/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-25 -right-35 w-40 h-40 bg-neon-purple/30 rounded-full blur-3xl pointer-events-none" />

                <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-2">
                    TECH <span className="text-neon-cyan">STACK</span>
                </h2>
                <p className="font-mono text-xs text-neon-purple tracking-[0.2em] mb-6">
                    MERN STACK // FULL STACK DEVELOPER
                </p>

                <p className="font-body text-gray-300 leading-relaxed mb-6">
                    Crafting elegant digital experiences with the MERN stack. From responsive frontends to robust backends,
                    I build scalable web applications that blend creativity with functionality.
                </p>

                {/* Stats */}
                <div className="flex gap-4 mb-6">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-white">{totalSkills}</span>
                        <span className="text-xs text-gray-400 uppercase tracking-wider">Technologies</span>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-white">{categories}</span>
                        <span className="text-xs text-gray-400 uppercase tracking-wider">Categories</span>
                    </div>
                </div>

                {/* Skill Highlights Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {skillHighlights.map((skill) => (
                        <div key={skill.label} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <skill.icon className={`w-5 h-5 ${skill.color}`} />
                            <span className="font-display font-bold text-sm text-gray-200">{skill.label}</span>
                        </div>
                    ))}
                </div>

                {/* Skill Categories Preview */}
                <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider">Skill Categories</p>
                    <div className="flex flex-wrap gap-2">
                        {skillsData.map((category) => (
                            <span
                                key={category.category}
                                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-mono"
                            >
                                {category.category}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

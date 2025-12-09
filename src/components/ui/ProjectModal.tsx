"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ProjectData {
    title: string;
    description: string;
    thumbnail?: string;
    techStack: string[];
    githubUrl?: string;
    liveUrl?: string;
}

import { useStore } from "@/hooks/useStore";

interface ProjectModalProps {
    project: ProjectData | null;
}

export default function ProjectModal({ project }: ProjectModalProps) {
    const { selectedProjectId, setSelectedProjectId } = useStore();
    const isOpen = !!selectedProjectId;
    const onClose = () => setSelectedProjectId(null);
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-4xl glass-effect rounded-2xl p-8 md:p-12"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full bg-glass-20 hover:bg-glass-30 transition-colors"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {/* Content */}
                        <div className="space-y-6">
                            {/* Title */}
                            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                                {project.title}
                            </h2>

                            {/* Description */}
                            <p className="font-body text-lg text-gray-300">
                                {project.description}
                            </p>

                            {/* Tech Stack */}
                            <div className="space-y-3">
                                <h3 className="font-display text-xl font-semibold text-neon-cyan">
                                    TECH STACK
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 rounded-full bg-glass-20 border border-neon-purple/30 text-sm font-medium text-white"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Links */}
                            <div className="flex gap-4 pt-4">
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 rounded-full border border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan font-display font-bold text-sm tracking-widest hover:bg-neon-cyan hover:text-void hover:neon-glow transition-all duration-300"
                                    >
                                        VIEW CODE
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 rounded-full border border-neon-purple/50 bg-neon-purple/10 text-neon-purple font-display font-bold text-sm tracking-widest hover:bg-neon-purple hover:text-white transition-all duration-300"
                                    >
                                        LIVE DEMO
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

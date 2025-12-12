"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import { ProjectData } from "@/lib/projectsData";

interface ProjectCardProps {
    project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group relative w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden hover:border-neon-cyan/50 transition-colors duration-300 flex flex-col h-full"
        >
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Project Thumbnail */}
            <div className="relative w-full h-32 sm:h-48 overflow-hidden">
                <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-3 sm:p-6 flex flex-col flex-grow relative z-10">
                <h3 className="text-base sm:text-xl font-display font-bold text-white mb-1 sm:mb-2 group-hover:text-neon-cyan transition-colors">
                    {project.title}
                </h3>

                <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 flex-grow">
                    {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-6">
                    {project.techStack.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-mono text-neon-cyan bg-neon-cyan/10 rounded-md border border-neon-cyan/20"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 3 && (
                        <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-mono text-gray-400 bg-white/5 rounded-md border border-white/10">
                            +{project.techStack.length - 3}
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-auto">
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/50 rounded-lg hover:bg-neon-cyan hover:text-black transition-all duration-300 font-medium text-xs sm:text-sm group/btn"
                    >
                        <ExternalLink size={14} className="sm:w-4 sm:h-4 group-hover/btn:rotate-45 transition-transform" />
                        <span className="hidden sm:inline">Live Demo</span>
                        <span className="sm:hidden">Demo</span>
                    </a>
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-white/5 text-white border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 font-medium text-xs sm:text-sm"
                    >
                        <Github size={14} className="sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Code</span>
                        <span className="sm:hidden">GitHub</span>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

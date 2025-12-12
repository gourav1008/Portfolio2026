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
            className="group relative w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-neon-cyan/50 transition-colors duration-300 flex flex-col h-full"
        >
            {/* Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Project Thumbnail */}
            <div className="relative w-full h-48 overflow-hidden">
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
            <div className="p-6 flex flex-col flex-grow relative z-10">
                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
                    {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                    {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.slice(0, 4).map((tech) => (
                        <span
                            key={tech}
                            className="px-2 py-1 text-xs font-mono text-neon-cyan bg-neon-cyan/10 rounded-md border border-neon-cyan/20"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.techStack.length > 4 && (
                        <span className="px-2 py-1 text-xs font-mono text-gray-400 bg-white/5 rounded-md border border-white/10">
                            +{project.techStack.length - 4}
                        </span>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/50 rounded-lg hover:bg-neon-cyan hover:text-black transition-all duration-300 font-medium text-sm group/btn"
                    >
                        <ExternalLink size={16} className="group-hover/btn:rotate-45 transition-transform" />
                        Live Demo
                    </a>
                    <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/5 text-white border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 font-medium text-sm"
                    >
                        <Github size={16} />
                        Code
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

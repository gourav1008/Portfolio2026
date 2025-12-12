"use client";

import { projectsData } from "@/lib/projectsData";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

export default function ProjectsSection() {
    return (
        <section id="work" className="relative w-full py-4 sm:py-6 px-3 sm:px-4 md:px-8 lg:px-16 z-10">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-6 sm:mb-10 text-center"
                >
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-1">
                        Featured <span className="text-neon-cyan">Projects</span>
                    </h2>
                    <div className="h-1 w-16 sm:w-24 bg-neon-cyan mx-auto rounded-full shadow-[0_0_10px_#00F0FF]" />
                    <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto px-2">
                        A collection of my recent work, showcasing my skills in full-stack development, 3D graphics, and UI/UX design.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {projectsData.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { useStore } from "@/hooks/useStore";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { projectsData } from "@/lib/projectsData";
import { skillsData } from "@/lib/skillsData";

import HUDOverlay from "@/components/ui/HUDOverlay";
import WorkshopCard from "@/components/ui/WorkshopCard";
import ContactForm from "@/components/ui/ContactForm";
import AboutCard from "@/components/ui/AboutCard";
import ProjectsSection from "@/components/ui/ProjectsSection";

// Lazy load heavy components for better performance
const Scene = dynamic(() => import("@/scenes/MainScene"), {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-void" />
});

const ProjectModal = dynamic(() => import("@/components/ui/ProjectModal"), {
    ssr: false
});


export default function Home() {
    const { selectedProjectId, isLoaded } = useStore();

    const selectedProject = selectedProjectId
        ? projectsData.find(p => p.id === selectedProjectId) || null
        : null;

    return (
        <motion.main
            className="relative w-full min-h-screen bg-void text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 1 }}
        >
            <HUDOverlay />

            {/* 3D Scene Background (Fixed) */}
            <div className="fixed inset-0 z-[5]">
                <Scene />
            </div>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
            />

            {/* Main Content - Fades in after loader */}
            <div className="relative z-[15] w-full">

                {/* Section 1: Hero (Handled by HUD TypingHeader) */}
                <section id="hero" className="h-screen pointer-events-none" />

                {/* Section 2: About */}
                <section id="about" className="h-screen flex items-center justify-start px-8 md:px-20 pointer-events-none">
                    <div className="max-w-2xl pointer-events-auto">
                        <AboutCard />
                    </div>
                </section>

                {/* Section 3: Skills (Handled by 3D Scene) */}
                <section id="skills" className="h-screen flex items-center justify-end px-8 md:px-20 md:mr-10 pointer-events-none">
                    <div className="text-right max-w-md pointer-events-auto">
                        <WorkshopCard />
                    </div>
                </section>

                {/* Section 4: Projects */}
                <ProjectsSection />

                {/* Section 5: Contact */}
                <section id="contact" className="h-screen flex items-center justify-center pointer-events-none">
                    <div className="pointer-events-auto w-full px-4">
                        <div className="text-center mb-6">
                            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-2">
                                INITIATE <span className="text-neon-pink">UPLINK</span>
                            </h2>
                            <p className="text-gray-400 max-w-md mx-auto">
                                Ready to bring your vision to life? Establish a connection below.
                            </p>
                        </div>
                        <ContactForm />
                    </div>
                </section>

            </div>

            {/* Screen Reader Only Content */}
            <section className="sr-only">
                <h2>Projects</h2>
                <ul>
                    {projectsData.map((project) => (
                        <li key={project.id}>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <a href={project.githubUrl}>GitHub</a>
                            {project.liveUrl && <a href={project.liveUrl}>Live Demo</a>}
                        </li>
                    ))}
                </ul>
                <h2>Skills</h2>
                <ul>
                    {skillsData.map((category) => (
                        <li key={category.category}>
                            <h3>{category.category}</h3>
                            <ul>
                                {category.items.map((skill) => (
                                    <li key={skill.name}>{skill.name}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </section>

        </motion.main>
    );
}

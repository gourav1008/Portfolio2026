"use client";

import { useState } from "react";
import { useStore } from "@/hooks/useStore";
import Scene from "@/scenes/MainScene";
import ProjectModal from "@/components/ui/ProjectModal";
import { projectsData } from "@/lib/projectsData";
import { skillsData } from "@/lib/skillsData";

import HUDOverlay from "@/components/ui/HUDOverlay";
import WorkshopCard from "@/components/ui/WorkshopCard";
import ContactForm from "@/components/ui/ContactForm";
import AboutCard from "@/components/ui/AboutCard";

import AIChatInterface from "@/components/ui/AIChatInterface";
import AIChatButton from "@/components/ui/AIChatButton";

export default function Home() {
    const { selectedProjectId, setSelectedProjectId, isChatOpen, setChatOpen } = useStore();

    const selectedProject = selectedProjectId
        ? projectsData.find(p => p.id === selectedProjectId) || null
        : null;

    return (
        <main className="relative w-full min-h-screen bg-void text-white">
            <HUDOverlay />
            <AIChatInterface />
            <AIChatButton />

            {/* 3D Scene Background (Fixed) */}
            <div className="fixed inset-0 z-[5]">
                <Scene />
            </div>

            {/* Project Modal */}
            <ProjectModal
                project={selectedProject}
            />

            {/* Scrollable Content Overlay */}
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
                <section id="skills" className="h-screen flex items-center justify-end px-8 md:px-20 pointer-events-none">
                    <div className="text-right max-w-md pointer-events-auto">
                        <WorkshopCard />
                    </div>
                </section>

                {/* Section 4: Projects (Handled by 3D Scene) */}
                <section id="work" className="h-screen flex items-center justify-center pointer-events-none">
                    <div className="text-center pointer-events-auto">
                        <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-6">
                            FEATURED <span className="text-neon-cyan">PROJECTS</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Explore my work through interactive 3D hologram cards. Click on any project to learn more.
                        </p>
                    </div>
                </section>

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

        </main>
    );
}

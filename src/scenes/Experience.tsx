"use client";

import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

import SolarSystemBackground from "@/components/3d/SolarSystemBackground";
import SkillsHologram from "@/components/3d/SkillsHologram";
import { projectsData } from "@/lib/projectsData";
import { useScene3D } from "@/hooks/useScene3D";

interface ExperienceProps {
    onProjectClick?: (projectId: string) => void;
    dpr?: number;
}

export default function Experience({ onProjectClick, dpr = 1.5 }: ExperienceProps) {
    const scroll = useScroll();
    const { camera } = useThree();
    const { config } = useScene3D();
    const timeline = useRef<gsap.core.Timeline | null>(null);

    // Refs for objects to animate
    const heroRef = useRef<THREE.Group>(null);
    const projectsGroupRef = useRef<THREE.Group>(null);

    useLayoutEffect(() => {
        if (!config) return;
        
        timeline.current = gsap.timeline({
            paused: true,
            defaults: { ease: "power1.inOut" }
        });

        // Initial Camera State - Hero position
        // 0 -> 0.33 (Hero to Skills)
        timeline.current
            .to(camera.position, {
                x: config.skills.position[0],
                y: config.skills.position[1],
                z: config.skills.position[2],
                duration: 1
            }, 0);

        // 0.33 -> 0.66 (Skills to Projects)
        timeline.current
            .to(camera.position, {
                x: config.projects.position[0],
                y: config.projects.position[1],
                z: config.projects.position[2],
                duration: 1
            }, 1);

        // 0.66 -> 1.0 (Projects to Contact)
        timeline.current
            .to(camera.position, {
                x: config.contact.position[0],
                y: config.contact.position[1],
                z: config.contact.position[2],
                duration: 1
            }, 2);

        return () => {
            timeline.current?.kill();
        };
    }, [camera, config]);

    useFrame(() => {
        if (timeline.current) {
            const t = scroll.offset * timeline.current.duration();
            timeline.current.seek(t);

            if (projectsGroupRef.current) {
                projectsGroupRef.current.visible = true;
            }
        }

        // Dynamic LookAt based on scroll sections and config
        if (!config) return;
        
        if (scroll.offset < 0.33) {
            camera.lookAt(...config.hero.lookAt);
        } else if (scroll.offset < 0.66) {
            camera.lookAt(...config.skills.lookAt);
        } else if (scroll.offset < 0.9) {
            camera.lookAt(...config.projects.lookAt);
        } else {
            camera.lookAt(...config.contact.lookAt);
        }
    });

    return (
        <>


            {/* Solar System Background (Visible in Section 1) */}
            <group ref={heroRef}>
                <SolarSystemBackground />
            </group>



            {/* Skills Hologram (Section 2) - Centered with Sun */}
            <group position={[0, 0, 0]} visible={true}>
                <SkillsHologram />
            </group>

            {/* Projects Gallery (Section 3) - Handled by DOM ProjectCards now */}
            <group ref={projectsGroupRef} position={[0, 0, 0]}>
                {/* 3D Projects removed in favor of DOM UI */}
            </group>
        </>
    );
}

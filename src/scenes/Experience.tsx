"use client";

import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";

import SolarSystemBackground from "@/components/3d/SolarSystemBackground";
import SkillsHologram from "@/components/3d/SkillsHologram";
import { projectsData } from "@/lib/projectsData";

export default function Experience({ onProjectClick, dpr = 1.5 }: { onProjectClick?: (projectId: string) => void, dpr?: number }) {
    const scroll = useScroll();
    const { camera } = useThree();
    const timeline = useRef<gsap.core.Timeline | null>(null);

    // Refs for objects to animate
    // Refs for objects to animate
    const heroRef = useRef<THREE.Group>(null);
    const projectsGroupRef = useRef<THREE.Group>(null);

    useLayoutEffect(() => {
        timeline.current = gsap.timeline({
            paused: true,
            defaults: { ease: "power1.inOut" }
        });

        // Initial Camera State (Hero)
        // Position: [0, 3, 18], LookAt: [0, 0, 0] - Zoomed closer view of Solar System

        // 0 -> 0.33 (Hero to Skills)
        timeline.current
            .to(camera.position, {
                x: 0,
                y: 0,
                z: 6, // Very close-up view of skills hologram
                duration: 1
            }, 0)
            .to(camera.rotation, {
            }, 0);

        // 0.33 -> 0.66 (Skills to Projects)
        timeline.current
            .to(camera.position, {
                x: 0,
                y: -5,
                z: 30, // Keep distance to see background
                duration: 1
            }, 1);

        // 0.66 -> 1.0 (Projects to Contact)
        timeline.current
            .to(camera.position, {
                x: 0,
                y: 5,
                z: 20,
                duration: 1
            }, 2);

        return () => {
            timeline.current?.kill();
        };
    }, [camera]);

    useFrame(() => {
        if (timeline.current) {
            // Sync GSAP timeline with scroll offset
            // scroll.offset is 0 to 1
            // timeline duration is 3 seconds (3 sections)
            const t = scroll.offset * timeline.current.duration();
            timeline.current.seek(t);

            // Toggle visibility of projects based on timeline position
            // Projects are focused at t=2 (range 1.5 to 2.5)
            // DEBUG: Removed visibility logic to verify rendering
            if (projectsGroupRef.current) {
                projectsGroupRef.current.visible = true;
            }
        }

        // Dynamic LookAt logic based on scroll sections
        // This ensures the camera always points at the interesting subject
        if (scroll.offset < 0.33) {
            // Hero: Look at center
            camera.lookAt(0, 0, 0);
        } else if (scroll.offset < 0.66) {
            // Skills: Still looking at center, but from side
            camera.lookAt(0, 0, 0);
        } else if (scroll.offset < 0.9) {
            // Projects: Look at cards (at z=0, camera at z=8)
            camera.lookAt(0, 0, 0); // Look at the cards at origin
        } else {
            // Contact: Look up slightly
            camera.lookAt(0, 10, 20);
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

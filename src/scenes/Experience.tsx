"use client";

import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import HologramCard from "@/components/3d/HologramCard";
import HeroObject from "@/components/3d/HeroObject";
import SkillsHologram from "@/components/3d/SkillsHologram";
import FloatingDebris from "@/components/3d/FloatingDebris";
import { projectsData } from "@/lib/projectsData";

export default function Experience({ onProjectClick, dpr = 1.5 }: { onProjectClick?: (projectId: string) => void, dpr?: number }) {
    const scroll = useScroll();
    const { camera } = useThree();
    const timeline = useRef<gsap.core.Timeline | null>(null);

    // Refs for objects to animate
    const heroRef = useRef<THREE.Group>(null);
    const projectsGroupRef = useRef<THREE.Group>(null);

    // Adjust debris count based on performance (dpr)
    const debrisCount = dpr < 1 ? 100 : 300;

    useLayoutEffect(() => {
        timeline.current = gsap.timeline({
            paused: true,
            defaults: { ease: "power1.inOut" }
        });

        // Initial Camera State (Hero)
        // Position: [0, 2, 8], LookAt: [0, 0, 0]

        // 0 -> 0.33 (Hero to Skills)
        timeline.current
            .to(camera.position, {
                x: 5,
                y: 0,
                z: 5,
                duration: 1
            }, 0)
            .to(camera.rotation, {
                // Approximate rotation for looking at 0,0,0 from 5,0,5
                // We'll use lookAt in useFrame for precision, but GSAP helps interpolate
            }, 0);

        // 0.33 -> 0.66 (Skills to Projects)
        timeline.current
            .to(camera.position, {
                x: 0,
                y: -2,
                z: 10, // Camera positioned for better card grid view
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


            {/* Instanced Debris for Performance Demo */}
            <FloatingDebris count={debrisCount} />

            {/* Hero Object (Visible in Section 1) */}
            <group ref={heroRef}>
                <HeroObject />
            </group>



            {/* Skills Placeholder (Section 2) */}
            <group position={[0, 0, 0]} visible={true}>
                <SkillsHologram />
            </group>

            {/* Projects Gallery (Section 3) */}
            <group ref={projectsGroupRef} position={[0, 0, 0]}>
                {/* DEBUG MESH */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial color="red" wireframe />
                </mesh>

                {projectsData.map((project, index) => {
                    // 2-row grid layout (3 cards per row)
                    const row = Math.floor(index / 3); // 0 for top row, 1 for bottom row
                    const col = index % 3; // 0, 1, 2 for column position

                    const spacing = 4.5; // Space between cards
                    const x = (col - 1) * spacing; // -4.5, 0, +4.5 for each row
                    const y = 1.5 - row * 4; // 1.5 for top row, -2.5 for bottom row (centered view)
                    const z = 0; // Position cards at origin (camera at z=10)

                    return (
                        <group key={project.id}>
                            <HologramCard
                                title={project.title}
                                description={project.description}
                                thumbnail={project.thumbnail}
                                position={[x, y, z]}
                                rotation={[0, 0, 0]} // Face forward towards camera
                                onClick={() => onProjectClick?.(project.id)}
                            />
                            {/* Test sphere to verify position visibility */}
                            <mesh key={`sphere-${project.id}`} position={[x, y + 3, z]}>
                                <sphereGeometry args={[0.3]} />
                                <meshStandardMaterial
                                    color="#FF00FF"
                                    emissive="#FF00FF"
                                    emissiveIntensity={2}
                                />
                            </mesh>
                        </group>
                    );
                })}
            </group>
        </>
    );
}

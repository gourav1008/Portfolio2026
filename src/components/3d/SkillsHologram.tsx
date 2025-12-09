"use client";

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { skillsData } from "@/lib/skillsData";
import { useHolographicMaterial } from "./HolographicProjection";

export default function SkillsHologram() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    const allSkills = skillsData.flatMap(category => category.items);

    return (
        <group ref={groupRef}>
            {allSkills.map((skill, index) => {
                // Spherical distribution (Fibonacci Sphere)
                const phi = Math.acos(-1 + (2 * index) / allSkills.length);
                const theta = Math.sqrt(allSkills.length * Math.PI) * phi;
                const radius = 4;

                const x = radius * Math.cos(theta) * Math.sin(phi);
                const y = radius * Math.sin(theta) * Math.sin(phi);
                const z = radius * Math.cos(phi);

                return (
                    <group key={skill.name} position={[x, y, z]} lookAt={[0, 0, 0]}>
                        <HolographicText
                            text={skill.name}
                            position={[0, 0, 0]}
                            fontSize={0.3}
                            color={skill.color}
                            hoverable
                        />
                    </group>
                );
            })}
        </group>
    );
}

interface HolographicTextProps {
    text: string;
    position: [number, number, number];
    fontSize?: number;
    color?: string;
    hoverable?: boolean;
}

function HolographicText({
    text,
    position,
    fontSize = 0.5,
    color = "#ffffff",
    hoverable = false
}: HolographicTextProps) {
    const [hovered, setHovered] = useState(false);
    const { material, materialRef } = useHolographicMaterial({
        color: hovered ? "#ffffff" : color,
        intensity: hovered ? 2.0 : 1.2,
        gridScale: 50.0,
        alphaStrength: 1.0
    });

    return (
        <Text
            position={position}
            fontSize={fontSize}
            // font="/fonts/Inter-Bold.ttf" // Defaulting to system font as public/fonts is missing
            anchorX="center"
            anchorY="middle"
            onPointerOver={() => hoverable && setHovered(true)}
            onPointerOut={() => hoverable && setHovered(false)}
        >
            {text}
            <primitive object={material} ref={materialRef} attach="material" />
        </Text>
    );
}

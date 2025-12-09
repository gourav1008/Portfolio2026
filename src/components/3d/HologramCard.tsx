"use client";

import { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Text, RoundedBox } from "@react-three/drei";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface HologramCardProps {
    title: string;
    thumbnail?: string;
    description: string;
    position: [number, number, number];
    rotation?: [number, number, number];
    onClick: () => void;
}

export default function HologramCard({
    title,
    thumbnail,
    description,
    position,
    rotation = [0, 0, 0],
    onClick
}: HologramCardProps) {
    const groupRef = useRef<THREE.Group>(null);
    const borderRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const { playHover, playClick } = useSoundEffects();
    const timeRef = useRef(0);

    // Animate time for effects
    useFrame((state, delta) => {
        timeRef.current += delta;
        if (groupRef.current) {
            // Subtle floating animation
            groupRef.current.position.y = position[1] + Math.sin(timeRef.current * 2) * 0.1;

            // Gentle rotation on hover
            if (hovered) {
                groupRef.current.rotation.y = Math.sin(timeRef.current * 3) * 0.05;
            } else {
                groupRef.current.rotation.y *= 0.95; // Smooth return
            }
        }

        // Animated border glow
        if (borderRef.current) {
            const material = borderRef.current.material as THREE.MeshBasicMaterial;
            const pulse = Math.sin(timeRef.current * 2) * 0.3 + 0.7;
            material.opacity = hovered ? 1 : pulse * 0.6;
        }
    });

    const handlePointerOver = () => {
        setHovered(true);
        playHover();
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        setHovered(false);
        document.body.style.cursor = 'default';
    };

    const handleClick = () => {
        playClick();
        onClick();
    };

    // Truncate description for preview
    const shortDescription = description.length > 120
        ? description.substring(0, 120) + "..."
        : description;

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            {/* Main card body with glassmorphic effect */}
            <RoundedBox
                args={[3.2, 4.5, 0.15]}
                radius={0.1}
                smoothness={4}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={handleClick}
                castShadow
            >
                <meshPhysicalMaterial
                    color={hovered ? "#0A1929" : "#050C14"}
                    metalness={0.9}
                    roughness={0.1}
                    transmission={0.1}
                    thickness={0.5}
                    envMapIntensity={1.5}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </RoundedBox>

            {/* Holographic animated border */}
            <RoundedBox
                ref={borderRef}
                args={[3.3, 4.6, 0.05]}
                radius={0.12}
                smoothness={4}
                position={[0, 0, -0.11]}
            >
                <meshBasicMaterial
                    color={hovered ? "#00F0FF" : "#7000FF"}
                    transparent
                    opacity={0.6}
                />
            </RoundedBox>

            {/* Glowing accent lines */}
            <mesh position={[0, 2.1, 0.08]}>
                <boxGeometry args={[2.8, 0.02, 0.01]} />
                <meshBasicMaterial
                    color="#00F0FF"
                    transparent
                    opacity={hovered ? 1 : 0.6}
                />
            </mesh>

            <mesh position={[0, -2.1, 0.08]}>
                <boxGeometry args={[2.8, 0.02, 0.01]} />
                <meshBasicMaterial
                    color="#7000FF"
                    transparent
                    opacity={hovered ? 1 : 0.6}
                />
            </mesh>

            {/* Project Title */}
            <Text
                position={[0, 1.8, 0.09]}
                fontSize={0.28}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
                maxWidth={2.8}
                textAlign="center"
                letterSpacing={0.05}
            >
                {title.toUpperCase()}
            </Text>

            {/* Description */}
            <Text
                position={[0, 0.3, 0.09]}
                fontSize={0.13}
                color="#B0C4DE"
                anchorX="center"
                anchorY="middle"
                maxWidth={2.6}
                textAlign="center"
                lineHeight={1.3}
            >
                {shortDescription}
            </Text>

            {/* Thumbnail placeholder icon (geometric shape) */}
            <group position={[0, 1.1, 0.1]}>
                <mesh>
                    <octahedronGeometry args={[0.3]} />
                    <meshStandardMaterial
                        color="#00F0FF"
                        emissive="#00F0FF"
                        emissiveIntensity={hovered ? 2 : 1}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>
                {/* Rotating ring around icon */}
                <mesh rotation={[Math.PI / 2, 0, timeRef.current]}>
                    <torusGeometry args={[0.45, 0.02, 16, 32]} />
                    <meshBasicMaterial
                        color="#7000FF"
                        transparent
                        opacity={0.5}
                    />
                </mesh>
            </group>

            {/* "View Project" indicator */}
            {hovered && (
                <group position={[0, -1.7, 0.09]}>
                    <mesh>
                        <boxGeometry args={[1.8, 0.35, 0.02]} />
                        <meshBasicMaterial
                            color="#00F0FF"
                            transparent
                            opacity={0.2}
                        />
                    </mesh>
                    <Text
                        position={[0, 0, 0.02]}
                        fontSize={0.15}
                        color="#00F0FF"
                        anchorX="center"
                        anchorY="middle"
                        letterSpacing={0.1}
                    >
                        VIEW PROJECT →
                    </Text>
                </group>
            )}

            {/* Corner accents for futuristic look */}
            {[
                [-1.5, 2.15],
                [1.5, 2.15],
                [-1.5, -2.15],
                [1.5, -2.15]
            ].map((pos, i) => (
                <mesh key={i} position={[pos[0], pos[1], 0.08]}>
                    <boxGeometry args={[0.15, 0.15, 0.01]} />
                    <meshBasicMaterial
                        color={hovered ? "#00F0FF" : "#7000FF"}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            ))}

            {/* Particle effect on hover */}
            {hovered && (
                <>
                    {[...Array(12)].map((_, i) => {
                        const angle = (i / 12) * Math.PI * 2;
                        const radius = 1.8 + Math.sin(timeRef.current * 3 + i) * 0.2;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius * 0.8;

                        return (
                            <mesh key={i} position={[x, y, 0.15]}>
                                <sphereGeometry args={[0.03]} />
                                <meshBasicMaterial
                                    color="#00F0FF"
                                    transparent
                                    opacity={0.6}
                                />
                            </mesh>
                        );
                    })}
                </>
            )}
        </group>
    );
}

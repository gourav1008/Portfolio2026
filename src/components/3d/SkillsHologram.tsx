"use client";

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { skillsData } from "@/lib/skillsData";

export default function SkillsHologram() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    const allSkills = skillsData.flatMap(category => category.items);

    return (
        <group ref={groupRef}>
            {/* Cosmic Energy Core */}
            <CosmicEnergyCore />

            {/* Orbit Path Rings */}
            {skillsData.map((category, categoryIndex) => {
                const categoryRadius = 5.5 + categoryIndex * 1.6;
                return (
                    <mesh key={`orbit-${category.category}`} rotation={[-Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[categoryRadius - 0.03, categoryRadius + 0.03, 128]} />
                        <meshBasicMaterial
                            color="#00F0FF"
                            transparent
                            opacity={0.15}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                );
            })}

            {/* Energy Rings removed for cleaner look */}

            {/* Skill Orbs */}
            {skillsData.map((category, categoryIndex) =>
                category.items.map((skill, skillIndex) => {
                    const categoryRadius = 5.5 + categoryIndex * 1.6;
                    const angleStep = (Math.PI * 2) / category.items.length;
                    const angle = skillIndex * angleStep;

                    return (
                        <SkillOrb
                            key={skill.name}
                            skill={skill}
                            orbitRadius={categoryRadius}
                            initialAngle={angle}
                            orbitSpeed={0.1 + categoryIndex * 0.05}
                        />
                    );
                })
            )}

            {/* Ambient Particles */}
            <AmbientParticles count={200} />
        </group>
    );
}

// Cosmic Energy Core Component
function CosmicEnergyCore() {
    const coreRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (coreRef.current) {
            // Pulsing effect
            const scale = 1 + Math.sin(t * 0.5) * 0.02;
            coreRef.current.scale.set(scale, scale, scale);
            coreRef.current.rotation.y = t * 0.05;
        }
        if (glowRef.current) {
            glowRef.current.rotation.y = -t * 0.03;
        }
    });

    return (
        <group>
            {/* Core Sphere */}
            <mesh ref={coreRef}>
                <icosahedronGeometry args={[0.5, 2]} />
                <meshStandardMaterial
                    color="#7000FF"
                    emissive="#00F0FF"
                    emissiveIntensity={2.0}
                    roughness={0.3}
                    metalness={0.8}
                />
            </mesh>

            {/* Outer Glow Layers */}
            <mesh ref={glowRef} scale={[2, 2, 2]}>
                <icosahedronGeometry args={[0.5, 1]} />
                <meshBasicMaterial
                    color="#7000FF"
                    transparent
                    opacity={0.15}
                    side={THREE.BackSide}
                />
            </mesh>

            <mesh scale={[3, 3, 3]}>
                <icosahedronGeometry args={[0.5, 1]} />
                <meshBasicMaterial
                    color="#00F0FF"
                    transparent
                    opacity={0.08}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Core Point Light */}
            <pointLight position={[0, 0, 0]} intensity={3} color="#00F0FF" distance={15} decay={2} />
        </group>
    );
}

// Category Ring Component
interface CategoryRingProps {
    radius: number;
    index: number;
    totalCategories: number;
}

function CategoryRing({ radius, index, totalCategories }: CategoryRingProps) {
    const ringRef = useRef<THREE.Mesh>(null);

    // Adjust radius for closer view
    const adjustedRadius = radius * 0.6;

    const colors = [
        "#FF00AA", // Magenta
        "#00D4FF", // Cyan
        "#7000FF", // Purple
        "#00FF9F", // Green
        "#FF6B9D", // Pink
    ];

    useFrame((state) => {
        if (ringRef.current) {
            const t = state.clock.getElapsedTime();
            ringRef.current.rotation.x = Math.sin(t * 0.1 + index) * 0.3;
            ringRef.current.rotation.z = Math.cos(t * 0.08 + index) * 0.2;
            ringRef.current.rotation.y += 0.002 * (index % 2 === 0 ? 1 : -1);
        }
    });

    return (
        <mesh ref={ringRef} rotation={[Math.PI / 4, 0, index * 0.3]}>
            <torusGeometry args={[adjustedRadius, 0.02, 16, 64]} />
            <meshBasicMaterial
                color={colors[index % colors.length]}
                transparent
                opacity={0.4}
            />
        </mesh>
    );
}

// Skill Orb Component
interface SkillOrbProps {
    skill: { name: string; level: number; color: string };
    orbitRadius: number;
    initialAngle: number;
    orbitSpeed: number;
}

function SkillOrb({ skill, orbitRadius, initialAngle, orbitSpeed }: SkillOrbProps) {
    const orbRef = useRef<THREE.Group>(null);
    const sphereRef = useRef<THREE.Mesh>(null);
    const textRef = useRef<any>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        if (orbRef.current) {
            // Orbital motion
            const angle = initialAngle + t * orbitSpeed;
            const x = Math.cos(angle) * orbitRadius;
            const z = Math.sin(angle) * orbitRadius;
            const y = Math.sin(t * 0.5 + initialAngle) * 0.2; // Gentle bobbing (reduced)

            orbRef.current.position.set(x, y, z);
        }

        if (sphereRef.current) {
            // Planetary self-rotation (slower for realism)
            sphereRef.current.rotation.y += delta * 0.3;

            // Subtle pulsing based on skill level
            const pulseIntensity = skill.level / 100;
            const scale = 1 + Math.sin(t * 1.5 + initialAngle) * 0.03 * pulseIntensity;
            sphereRef.current.scale.set(scale, scale, scale);
        }

        // Billboard text to face camera
        if (textRef.current) {
            textRef.current.lookAt(state.camera.position);
        }
    });

    // Size based on skill level - planetary scale
    const baseSize = 0.2 + (skill.level / 100) * 0.3;
    const size = hovered ? baseSize * 1.2 : baseSize;

    // High-level skills get rings (like Saturn)
    const hasRings = skill.level >= 90;

    return (
        <group ref={orbRef}>
            {/* Main Planet Sphere */}
            <mesh
                ref={sphereRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[size, 32, 32]} />
                <meshStandardMaterial
                    color={skill.color}
                    emissive={skill.color}
                    emissiveIntensity={hovered ? 2.5 : 1.2}
                    roughness={0.4}
                    metalness={0.6}
                />
            </mesh>

            {/* Inner Atmospheric Glow */}
            <mesh scale={1.3}>
                <sphereGeometry args={[size, 24, 24]} />
                <meshBasicMaterial
                    color={skill.color}
                    transparent
                    opacity={hovered ? 0.25 : 0.15}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Outer Atmospheric Halo */}
            <mesh scale={1.6}>
                <sphereGeometry args={[size, 16, 16]} />
                <meshBasicMaterial
                    color={skill.color}
                    transparent
                    opacity={hovered ? 0.15 : 0.08}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Planetary Rings (for high-level skills >= 90) */}
            {hasRings && (
                <mesh rotation={[-Math.PI / 3, 0, Math.PI / 6]}>
                    <ringGeometry args={[size * 1.5, size * 2.0, 64]} />
                    <meshStandardMaterial
                        color={skill.color}
                        transparent
                        opacity={hovered ? 0.6 : 0.4}
                        side={THREE.DoubleSide}
                        emissive={skill.color}
                        emissiveIntensity={0.3}
                    />
                </mesh>
            )}

            {/* Skill Name Text */}
            <Text
                ref={textRef}
                position={[0, size + 0.35, 0]}
                fontSize={0.28}
                color={hovered ? "#ffffff" : skill.color}
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.015}
                outlineColor="#000000"
                outlineOpacity={1.0}
                fontWeight="bold"
            >
                {skill.name}
            </Text>

            {/* Planet Point Light */}
            <pointLight
                position={[0, 0, 0]}
                intensity={hovered ? 2.5 : 1.0}
                color={skill.color}
                distance={3}
                decay={2}
            />
        </group>
    );
}

// Ambient Particles Component
function AmbientParticles({ count }: { count: number }) {
    const particlesRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const colorPalette = [
            new THREE.Color("#FFFFFF"),
            new THREE.Color("#00F0FF"),
            new THREE.Color("#7000FF"),
            new THREE.Color("#FF00AA"),
        ];

        for (let i = 0; i < count; i++) {
            // Random spherical distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            const radius = 3 + Math.random() * 4;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] = Math.random() * 0.02 + 0.01;
        }

        return { positions, colors, sizes };
    }, [count]);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particles.positions, 3]}
                    count={count}
                />
                <bufferAttribute
                    attach="attributes-color"
                    args={[particles.colors, 3]}
                    count={count}
                />
                <bufferAttribute
                    attach="attributes-size"
                    args={[particles.sizes, 1]}
                    count={count}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                vertexColors
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Stars, Trail } from "@react-three/drei";
import * as THREE from "three";
import { useScene3D } from "@/hooks/useScene3D";

export default function SolarSystemBackground() {
    const { config } = useScene3D();

    return (
        <group>
            {/* Ambient Stars - Background Layer */}
            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />
            {/* Ambient Stars - Foreground Layer (Subtle) */}
            <Stars radius={100} depth={50} count={2000} factor={3} saturation={0} fade speed={1} />

            {/* The Sun - Now the center for skill-planets */}
            <Sun sunScale={config.background.sunScale} />

            {/* Earth and Moon - Real celestial bodies */}
            <EarthMoonSystem 
              orbitRadius={config.background.earthOrbitRadius}
              earthScale={config.background.earthScale}
            />

            {/* Planets removed - Skills now act as orbiting planets */}
        </group>
    );
}

function Sun({ sunScale = 1.0 }: { sunScale: number }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Pulsing effect (more subtle)
            const scale = sunScale + Math.sin(state.clock.elapsedTime * 0.5) * 0.01 * sunScale;
            meshRef.current.scale.set(scale, scale, scale);
            // Rotation
            meshRef.current.rotation.y += 0.002;
        }
        if (glowRef.current) {
            glowRef.current.rotation.y = -state.clock.elapsedTime * 0.03;
        }
    });

    return (
        <group>
            {/* Core Sun - More realistic */}
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <sphereGeometry args={[1.2 * sunScale, 64, 64]} />
                <meshStandardMaterial
                    color="#FFA500"
                    emissive="#FFD700"
                    emissiveIntensity={3.0}
                    roughness={0.8}
                    metalness={0.1}
                />
            </mesh>

            {/* Sun Corona/Atmosphere - Reduced */}
            <mesh ref={glowRef} scale={[1.4 * sunScale, 1.4 * sunScale, 1.4 * sunScale]}>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshBasicMaterial color="#FF8C00" transparent opacity={0.2} side={THREE.BackSide} />
            </mesh>

            {/* Outer Glow - Reduced to 1.8× (was 3×) */}
            <mesh scale={[1.8 * sunScale, 1.8 * sunScale, 1.8 * sunScale]}>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshBasicMaterial color="#FF4500" transparent opacity={0.08} side={THREE.BackSide} />
            </mesh>

            {/* Sun Point Lights - Adjusted */}
            <pointLight position={[0, 0, 0]} intensity={2.5} color="#FFD700" distance={120} decay={2} />
            <pointLight position={[0, 0, 0]} intensity={4} color="#FF6B35" distance={25} decay={2} />
        </group>
    );
}

// Earth and Moon Component
function EarthMoonSystem({ 
  orbitRadius = 2.8, 
  earthScale = 0.25 
}: { 
  orbitRadius: number;
  earthScale: number;
}) {
    const earthGroupRef = useRef<THREE.Group>(null);
    const earthRef = useRef<THREE.Mesh>(null);
    const moonRef = useRef<THREE.Group>(null);

    // Earth's orbital parameters
    const orbitSpeed = 0.3;
    const moonSize = 0.07;
    const moonOrbitRadius = 0.6;

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Earth orbits the sun
        if (earthGroupRef.current) {
            const angle = t * orbitSpeed;
            const x = Math.cos(angle) * orbitRadius;
            const z = Math.sin(angle) * orbitRadius;
            earthGroupRef.current.position.set(x, 0, z);
        }

        // Earth rotates
        if (earthRef.current) {
            earthRef.current.rotation.y += 0.01;
        }

        // Moon orbits Earth
        if (moonRef.current) {
            const moonAngle = t * 1.2; // Moon orbits faster
            const mx = Math.cos(moonAngle) * moonOrbitRadius;
            const mz = Math.sin(moonAngle) * moonOrbitRadius;
            moonRef.current.position.set(mx, 0, mz);
        }
    });

    return (
        <>
            {/* Earth's Orbit Path */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[orbitRadius - 0.02, orbitRadius + 0.02, 128]} />
                <meshBasicMaterial color="#2E8BC0" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>

            {/* Earth Group */}
            <group ref={earthGroupRef}>
                {/* Earth */}
                <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.15}>
                    <mesh ref={earthRef}>
                        <sphereGeometry args={[earthScale, 32, 32]} />
                        <meshStandardMaterial
                            color="#1E5F8C"
                            emissive="#2E8BC0"
                            emissiveIntensity={0.4}
                            roughness={0.7}
                            metalness={0.2}
                        />
                    </mesh>

                    {/* Earth's Atmosphere */}
                    <mesh scale={1.15}>
                        <sphereGeometry args={[earthScale, 24, 24]} />
                        <meshBasicMaterial
                            color="#4A90E2"
                            transparent
                            opacity={0.15}
                            side={THREE.BackSide}
                        />
                    </mesh>
                </Float>

                {/* Moon */}
                <group ref={moonRef}>
                    <mesh>
                        <sphereGeometry args={[moonSize, 16, 16]} />
                        <meshStandardMaterial
                            color="#C0C0C0"
                            roughness={0.9}
                            metalness={0.1}
                        />
                    </mesh>
                </group>
            </group>
        </>
    );
}

interface PlanetProps {
    name: string;
    distance: number;
    size: number;
    color: string;
    speed: number;
    orbitColor?: string;
    hasMoon?: boolean;
    hasRings?: boolean;
}

function Planet({ name, distance, size, color, speed, orbitColor = "#ffffff", hasMoon, hasRings }: PlanetProps) {
    const planetRef = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);

    // Random starting angle
    const initialAngle = useMemo(() => Math.random() * Math.PI * 2, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed * 0.2 + initialAngle;
        const x = Math.cos(t) * distance;
        const z = Math.sin(t) * distance;

        if (planetRef.current) {
            planetRef.current.position.set(x, 0, z);
        }

        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <>
            {/* Orbit Path */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[distance - 0.05, distance + 0.05, 128]} />
                <meshBasicMaterial color={orbitColor} transparent opacity={0.1} side={THREE.DoubleSide} />
            </mesh>

            {/* Planet Group */}
            <group ref={planetRef}>
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                    <mesh ref={meshRef}>
                        <sphereGeometry args={[size, 32, 32]} />
                        <meshStandardMaterial
                            color={color}
                            roughness={0.7}
                            metalness={0.2}
                        />
                    </mesh>

                    {/* Rings for Saturn */}
                    {hasRings && (
                        <mesh rotation={[-Math.PI / 3, 0, 0]}>
                            <ringGeometry args={[size * 1.4, size * 2.2, 64]} />
                            <meshStandardMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
                        </mesh>
                    )}

                    {/* Moon for Earth */}
                    {hasMoon && (
                        <mesh position={[size * 2, 0, 0]}>
                            <sphereGeometry args={[size * 0.25, 16, 16]} />
                            <meshStandardMaterial color="#888888" />
                        </mesh>
                    )}
                </Float>
            </group>
        </>
    );
}

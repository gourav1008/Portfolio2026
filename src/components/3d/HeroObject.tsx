"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";

export default function HeroObject() {
    const meshRef = useRef<THREE.Mesh>(null);
    const wireframeRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.2;
            meshRef.current.rotation.z = t * 0.1;
        }
        if (wireframeRef.current) {
            wireframeRef.current.rotation.y = t * 0.2;
            wireframeRef.current.rotation.z = t * 0.1;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <group>
                {/* Core Shape */}
                <Icosahedron ref={meshRef} args={[1.5, 0]} castShadow receiveShadow>
                    <MeshDistortMaterial
                        color="#000000"
                        emissive="#00F0FF"
                        emissiveIntensity={0.5}
                        roughness={0.1}
                        metalness={1}
                        distort={0.4}
                        speed={2}
                    />
                </Icosahedron>

                {/* Wireframe Overlay */}
                <Icosahedron ref={wireframeRef} args={[1.6, 0]}>
                    <meshBasicMaterial
                        color="#7000FF"
                        wireframe
                        transparent
                        opacity={0.3}
                    />
                </Icosahedron>

                {/* Orbiting Particles */}
                <OrbitingParticles count={20} radius={2.5} color="#00F0FF" speed={0.5} />
                <OrbitingParticles count={15} radius={3.5} color="#FF00AA" speed={-0.3} />
            </group>
        </Float>
    );
}

function OrbitingParticles({ count, radius, color, speed }: { count: number; radius: number; color: string; speed: number }) {
    const particles = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (particles.current) {
            particles.current.rotation.y = state.clock.getElapsedTime() * speed;
            particles.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
        }
    });

    return (
        <group ref={particles}>
            {Array.from({ length: count }).map((_, i) => {
                const angle = (i / count) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const y = (Math.random() - 0.5) * 2;
                return (
                    <mesh key={i} position={[x, y, z]}>
                        <sphereGeometry args={[0.05]} />
                        <meshBasicMaterial color={color} />
                    </mesh>
                );
            })}
        </group>
    );
}

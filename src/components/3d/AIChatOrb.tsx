"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface AIChatOrbProps {
    onClick: () => void;
    isChatOpen: boolean;
}

export default function AIChatOrb({ onClick, isChatOpen }: AIChatOrbProps) {
    const orbRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (orbRef.current) {
            // Gentle floating animation
            orbRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;

            // Rotation
            orbRef.current.rotation.y += 0.01;
            orbRef.current.rotation.z += 0.005;
        }
    });

    return (
        <group position={[2, -1.5, 0]}> {/* Fixed position relative to camera or scene */}
            <Sphere
                ref={orbRef}
                args={[0.4, 64, 64]}
                onClick={onClick}
                onPointerOver={() => {
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
            >
                <MeshDistortMaterial
                    color={isChatOpen ? "#00F0FF" : hovered ? "#FF00E6" : "#4A00E0"}
                    emissive={isChatOpen ? "#00F0FF" : "#220044"}
                    emissiveIntensity={isChatOpen ? 2 : hovered ? 1.5 : 0.5}
                    distort={isChatOpen ? 0.6 : 0.3}
                    speed={isChatOpen ? 4 : 2}
                    roughness={0.1}
                    metalness={0.8}
                />
            </Sphere>

            {/* Glow Halo */}
            <mesh scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshBasicMaterial
                    color={isChatOpen ? "#00F0FF" : "#4A00E0"}
                    transparent
                    opacity={0.2}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
}

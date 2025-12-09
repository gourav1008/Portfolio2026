"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FloatingDebris({ count = 200 }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    // Generate random data for instances
    const { positions, rotations, scales } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const rotations = new Float32Array(count * 3);
        const scales = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Spread debris in a large volume
            positions[i * 3] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

            rotations[i * 3] = Math.random() * Math.PI;
            rotations[i * 3 + 1] = Math.random() * Math.PI;
            rotations[i * 3 + 2] = Math.random() * Math.PI;

            const s = Math.random() * 0.2 + 0.05;
            scales[i * 3] = s;
            scales[i * 3 + 1] = s;
            scales[i * 3 + 2] = s;
        }

        return { positions, rotations, scales };
    }, [count]);

    // Update instances
    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();
        const dummy = new THREE.Object3D();

        for (let i = 0; i < count; i++) {
            dummy.position.set(
                positions[i * 3],
                positions[i * 3 + 1] + Math.sin(time * 0.5 + positions[i * 3]) * 0.5, // Gentle floating
                positions[i * 3 + 2]
            );

            dummy.rotation.set(
                rotations[i * 3] + time * 0.1,
                rotations[i * 3 + 1] + time * 0.1,
                rotations[i * 3 + 2]
            );

            dummy.scale.set(
                scales[i * 3],
                scales[i * 3],
                scales[i * 3]
            );

            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
                color="#444"
                roughness={0.4}
                metalness={0.8}
                transparent
                opacity={0.6}
            />
        </instancedMesh>
    );
}

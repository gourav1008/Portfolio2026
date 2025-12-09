"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// @ts-ignore - shader imports
import vertexShader from "@/lib/shaders/holographicProjection.vert";
// @ts-ignore - shader imports
import fragmentShader from "@/lib/shaders/holographicProjection.frag";

interface HolographicMaterialProps {
    color?: string;
    intensity?: number;
    gridScale?: number;
    alphaStrength?: number;
    waveStrength?: number;
}

export function useHolographicMaterial({
    color = "#00F0FF",
    intensity = 1.5,
    gridScale = 20.0,
    alphaStrength = 0.8,
    waveStrength = 0.1
}: HolographicMaterialProps = {}) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // Animate uniforms
    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    // Create shader material with uniforms
    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(color) },
            uIntensity: { value: intensity },
            uGridScale: { value: gridScale },
            uAlphaStrength: { value: alphaStrength },
            uWaveStrength: { value: waveStrength }
        },
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    // Store ref for animation
    if (materialRef.current === null) {
        materialRef.current = material;
    }

    return { material: materialRef.current || material, materialRef };
}

// Component wrapper for easy use
interface HolographicProjectionProps extends HolographicMaterialProps {
    position?: [number, number, number];
    scale?: [number, number, number];
    rotation?: [number, number, number];
}

export default function HolographicProjection({
    position = [0, 0, 0],
    scale = [2, 3, 0.1],
    rotation = [0, 0, 0],
    ...materialProps
}: HolographicProjectionProps) {
    const { material, materialRef } = useHolographicMaterial(materialProps);

    return (
        <mesh position={position} scale={scale} rotation={rotation}>
            <planeGeometry />
            <primitive object={material} ref={materialRef} attach="material" />
        </mesh>
    );
}

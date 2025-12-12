"use client";

import { Canvas } from "@react-three/fiber";
import {
    PerformanceMonitor,
    Environment,
    ScrollControls
} from "@react-three/drei";
import { Suspense, useState, useRef } from "react";
import { EffectComposer, Bloom, ChromaticAberration, GodRays } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import Experience from "./Experience";

import { useStore } from "@/hooks/useStore";
import { useScene3D } from "@/hooks/useScene3D";

export default function MainScene() {
    const { setSelectedProjectId } = useStore();
    const { config } = useScene3D();
    const [dpr, setDpr] = useState(config.performance.dpr);
    const sunRef = useRef<THREE.Mesh>(null);

    return (
        <Canvas
            className="absolute top-0 left-0 w-full h-full -z-10"
            dpr={dpr}
            gl={{ antialias: false, powerPreference: "high-performance" }}
            shadows
            camera={{ position: config.hero.position, fov: config.hero.fov }}
        >
            <Suspense fallback={null}>
                <PerformanceMonitor
                    onDecline={() => setDpr(config.performance.dpr * 0.75)}
                    onIncline={() => setDpr(config.performance.dpr)}
                    flipflops={3}
                    onFallback={() => setDpr(config.performance.dpr * 0.5)}
                >

                    <ScrollControls pages={config.scroll.pages} damping={config.scroll.damping}>
                        <Experience onProjectClick={setSelectedProjectId} dpr={dpr} />
                    </ScrollControls>

                    {/* Environment - Deep Space Theme */}
                    <color attach="background" args={["#020205"]} />
                    <fog attach="fog" args={["#020205", 10, 100]} />
                    <Environment preset="night" />

                    {/* Lighting */}
                    <ambientLight intensity={0.2} />

                    {/* Sun mesh for God Rays */}
                    <mesh ref={sunRef} position={[0, 0, 0]}>
                        <sphereGeometry args={[2.5]} />
                        <meshBasicMaterial color="#FFD700" transparent opacity={0} />
                    </mesh>

                    {/* Additional lights for the scene */}
                    <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />

                    {/* Post Processing - No blur effects for clarity */}
                    <EffectComposer>
                        <>
                            {/* Enhanced Bloom for hologram glow and Sun */}
                            <Bloom
                                luminanceThreshold={0.8}
                                luminanceSmoothing={0.9}
                                intensity={1.0}
                                mipmapBlur
                            />

                            {/* Subtle Chromatic Aberration */}
                            <ChromaticAberration
                                blendFunction={BlendFunction.NORMAL}
                                offset={new THREE.Vector2(0.001, 0.001)}
                            />

                            {/* God Rays from the Sun */}
                            {sunRef.current && (
                                <GodRays
                                    sun={sunRef.current}
                                    blendFunction={BlendFunction.SCREEN}
                                    samples={60}
                                    density={0.96}
                                    decay={0.9}
                                    weight={0.4}
                                    exposure={0.6}
                                    clampMax={1}
                                    blur={true}
                                />
                            )}
                        </>
                    </EffectComposer>

                    {/* Debug: FPS indicator removed for production builds */}
                </PerformanceMonitor>
            </Suspense>
        </Canvas>
    );
}
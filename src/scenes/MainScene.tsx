"use client";

import { Canvas } from "@react-three/fiber";
import {
    PerformanceMonitor,
    Environment,
    ScrollControls,
    Stars,
    Hud,
    PerspectiveCamera,
    Stats
} from "@react-three/drei";
import { Suspense, useState, useRef } from "react";
import { EffectComposer, Bloom, DepthOfField, ChromaticAberration, GodRays } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import Experience from "./Experience";
import AIChatOrb from "@/components/3d/AIChatOrb";

import { useStore } from "@/hooks/useStore";

export default function MainScene() {
    const { setSelectedProjectId, isChatOpen, toggleChat } = useStore();
    const [dpr, setDpr] = useState(1.5);
    const sunRef = useRef<THREE.Mesh>(null);

    return (
        <Canvas
            className="absolute top-0 left-0 w-full h-full -z-10"
            dpr={dpr}
            gl={{ antialias: false, powerPreference: "high-performance" }}
            shadows
            camera={{ position: [0, 2, 8], fov: 50 }}
        >
            <Suspense fallback={null}>
                <PerformanceMonitor
                    onDecline={() => setDpr(0.5)} // Reduce resolution on performance drop
                    onIncline={() => setDpr(1.5)} // Increase resolution when stable
                    flipflops={3} // Threshold for stability
                    onFallback={() => setDpr(0.5)} // Fallback for persistent low fps
                >

                    <ScrollControls pages={5} damping={0.2}>
                        <Experience onProjectClick={setSelectedProjectId} dpr={dpr} />
                    </ScrollControls>

                    {/* Environment */}
                    <color attach="background" args={["#050505"]} />
                    <fog attach="fog" args={["#050505", 5, 20]} />
                    <Environment preset="city" />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                    {/* Lighting */}
                    <ambientLight intensity={0.5} />

                    {/* Sun mesh for God Rays */}
                    <mesh ref={sunRef} position={[10, 10, 5]}>
                        <sphereGeometry args={[0.3]} />
                        <meshBasicMaterial color="#ffffff" />
                    </mesh>

                    <directionalLight
                        position={[10, 10, 5]}
                        intensity={1}
                        castShadow
                        shadow-mapSize={[1024, 1024]}
                    />
                    <pointLight position={[-5, 5, -5]} intensity={5} color="#00F0FF" distance={20} />
                    <pointLight position={[5, -5, 5]} intensity={5} color="#7000FF" distance={20} />

                    {/* Floor Reflection */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
                        <planeGeometry args={[50, 50]} />
                        <meshStandardMaterial
                            color="#050505"
                            roughness={0.1}
                            metalness={0.8}
                        />
                    </mesh>

                    {/* Cinematic Post Processing */}
                    <EffectComposer>
                        {/* Enhanced Bloom for hologram glow */}
                        <Bloom
                            luminanceThreshold={0.8}
                            luminanceSmoothing={0.9}
                            intensity={2.5}
                            mipmapBlur
                        />

                        {/* Depth of Field - subtle cinematic focus */}
                        <DepthOfField
                            focusDistance={0}
                            focalLength={0.02}
                            bokehScale={2}
                        />

                        {/* Chromatic Aberration - subtle futuristic distortion */}
                        <ChromaticAberration
                            blendFunction={BlendFunction.NORMAL} // Use NORMAL or OFFSET
                            offset={new THREE.Vector2(0.002, 0.002)}
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
                    </EffectComposer>

                    {/* Debug */}
                    <Stats />

                    {/* AI Assistant Orb (HUD Layer) */}
                    <Hud renderPriority={1}>
                        <ambientLight intensity={1} />
                        <pointLight position={[10, 10, 10]} intensity={1} />
                        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                        <AIChatOrb onClick={toggleChat} isChatOpen={isChatOpen} />
                    </Hud>
                </PerformanceMonitor>
            </Suspense>
        </Canvas>
    );
}
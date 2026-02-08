"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function Geometries() {
    // Abstract geometric composition
    return (
        <group position={[0, 0, 0]}>
            {/* Central Focal Point - Icosahedron */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1.2}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshPhysicalMaterial
                        color="#0056D2" // Corporate Blue
                        roughness={0.1}
                        metalness={0.1}
                        transmission={0.5} // Glass-like
                        thickness={2}
                        transparent
                        opacity={0.8}
                        clearcoat={1}
                    />
                </mesh>
            </Float>

            {/* Orbiting Ring */}
            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={0.5}>
                <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[2.2, 0.05, 16, 100]} />
                    <meshStandardMaterial color="#8B5CF6" metalness={0.8} roughness={0.2} />
                </mesh>
            </Float>

            {/* Floating Satellite Shapes - Left */}
            <Float speed={2.5} rotationIntensity={1} floatIntensity={2}>
                <mesh position={[-2.5, 1.5, -1]} scale={0.4}>
                    <octahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#0056D2" roughness={0.2} />
                </mesh>
            </Float>

            <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
                <mesh position={[-3, -1, 0.5]} scale={0.3}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshStandardMaterial color="#8B5CF6" roughness={0.2} metalness={0.5} />
                </mesh>
            </Float>

            {/* Floating Satellite Shapes - Right */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <mesh position={[2.5, -1.5, -1]} scale={0.5}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshPhysicalMaterial
                        color="#ffffff"
                        roughness={0.1}
                        metalness={0.1}
                        transmission={0.2}
                        transparent
                        opacity={0.5}
                    />
                </mesh>
            </Float>
            <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.2}>
                <mesh position={[3, 1.2, 0.5]} scale={0.25}>
                    <dodecahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#0056D2" roughness={0.2} />
                </mesh>
            </Float>
        </group>
    );
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
            <Canvas gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#0056D2" />

                {/* Scene Content */}
                <Geometries />

                {/* Environment Reflections */}
                <Environment preset="city" />

                {/* Shadows to ground the objects superficially if needed, though they are floating */}
                {/* <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4} color="#0056D2" /> */}
            </Canvas>
        </div>
    );
}

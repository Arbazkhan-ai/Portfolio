"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Stars } from "@react-three/drei";
import * as random from "maath/random";
import * as THREE from "three";

function Particles(props: any) {
    const ref = useRef<any>(null);
    // Generate points in a sphere
    const sphere = useMemo(() => {
        // @ts-ignore
        return random.inSphere(new Float32Array(3000), { radius: 2.5 });
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#00F7FF"
                    size={0.003}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

function CoreMesh() {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.2;
    });

    return (
        <mesh ref={meshRef} scale={[0.8, 0.8, 0.8]}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial color="#9955FF" wireframe transparent opacity={0.15} />
        </mesh>
    )
}

function InnerCore() {
    const meshRef = useRef<THREE.Mesh>(null!);
    useFrame((state, delta) => {
        meshRef.current.rotation.x -= delta * 0.4;
        meshRef.current.rotation.y -= delta * 0.4;
    });

    return (
        <mesh ref={meshRef} scale={[0.4, 0.4, 0.4]}>
            <icosahedronGeometry args={[1, 2]} />
            <meshStandardMaterial
                color="#00F7FF"
                emissive="#00F7FF"
                emissiveIntensity={2}
                toneMapped={false}
            />
        </mesh>
    )
}

function DataStream() {
    // Conceptual data stream using moving particles or lines could be added here
    // For now keeping it cleaner with the core
    return null;
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
            <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }} gl={{ alpha: true }}>
                <color attach="background" args={['#000000']} />
                <fog attach="fog" args={['#000000', 5, 15]} />
                <ambientLight intensity={0.5} />

                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <CoreMesh />
                    <InnerCore />
                </Float>

                <Particles />
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                {/* Cinematic Lighting */}
                <pointLight position={[10, 10, 10]} intensity={1} color="#9955FF" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#00F7FF" />
            </Canvas>
        </div>
    );
}

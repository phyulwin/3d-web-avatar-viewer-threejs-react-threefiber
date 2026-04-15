"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import AvatarModel from "./AvatarModel";

export default function AvatarCanvas() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 1.5, 3] }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 2, 2]} />
        <AvatarModel />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
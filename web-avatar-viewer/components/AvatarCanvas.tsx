"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import AvatarModel from "./AvatarModel";

const models = [
  "/avatars/flower.glb",
  "/avatars/flowers.glb",
  "/avatars/guitar.glb",
  "/avatars/birds.glb",
  "/avatars/clock.glb",
];

export default function AvatarCanvas() {
  const [modelPath, setModelPath] = useState(models[0]);

  const handleRandom = () => {
    const random = models[Math.floor(Math.random() * models.length)];
    setModelPath(random);
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      
      <Canvas camera={{ position: [0, 1.5, 3] }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 2, 2]} />

        {/* background */}
        <Environment files="/avatars/sky.hdr" background />

        {/* dynamic model */}
        <AvatarModel path={modelPath} />

        {/* ground */}
        {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial />
        </mesh> */}

        <OrbitControls minDistance={1} maxDistance={50} />
      </Canvas>

      {/* RANDOM BUTTON */}
      <button
        onClick={handleRandom}
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "Times New Roman",
          color: "black",
          background: "transparent",
          border: "none",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Random
      </button>
    </div>
  );
}
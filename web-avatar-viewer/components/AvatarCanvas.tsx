"use client";

import { useState, useEffect } from "react";
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
    let random = modelPath;
      while (random === modelPath) {
        random = models[Math.floor(Math.random() * models.length)];
      }
      setModelPath(random);
    };

  

    useEffect(() => {
      const audio = new Audio("/audio/bg.mp3");
      audio.loop = true;
      audio.volume = 0.5;

      let hasPlayed = false;
      const playAudio = () => {
        if (!hasPlayed) {
          audio.play().catch(() => {});
          hasPlayed = true;
        }
      };

      window.addEventListener("click", playAudio);

      return () => {
        window.removeEventListener("click", playAudio);
        audio.pause();
      };
    }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <style>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

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

      <span
        style={{
          position: "absolute",
          bottom: 60,
          left: 20,
          fontFamily: "Times New Roman",
          color: "black",
          fontSize: "18px",
          animation: "blink 1s infinite",
        }}
      >
        Press Spacebar to Stop
        </span>
    </div>
  );
}
"use client";

import { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function AvatarModel({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  const ref = useRef<any>();
  const [paused, setPaused] = useState(false);

  // listen for spacebar press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") setPaused(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") setPaused(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // rotate only if not paused
  useFrame(() => {
    if (ref.current && !paused) {
      ref.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={ref} object={scene} scale={1.5} />;
}

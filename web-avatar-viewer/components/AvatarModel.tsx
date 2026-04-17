"use client";

import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function AvatarModel({ path }: { path: string }) {
  const { scene } = useGLTF(path);
  const ref = useRef<any>();

  // runs every frame → rotates model slowly
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.005; // adjust speed here
    }
  });

  return <primitive ref={ref} object={scene} scale={0.5} />;
}
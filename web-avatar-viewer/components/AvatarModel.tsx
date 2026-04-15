"use client";
import { useGLTF } from "@react-three/drei";

export default function AvatarModel() {
  const { scene } = useGLTF("/avatars/sample.glb");
  return <primitive object={scene} scale={1.5} />;
}
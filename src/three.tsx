// src/components/GLBViewer.tsx
import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  useAnimations,
  Center,
} from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  url: string;
}

function Model({ url }: ModelProps) {
  const group = useRef<THREE.Group>(null);

  const { scene, animations } = useGLTF(url) as unknown as {
    scene: THREE.Group;
    animations: THREE.AnimationClip[];
  };

  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            mat.transparent = true;
            mat.needsUpdate = true;
          });
        } else if (mesh.material) {
          mesh.material.transparent = true;
          mesh.material.needsUpdate = true;
        }
      }
    });

    Object.values(actions).forEach((action) => {
      action?.reset().play();
    });
  }, [actions, scene]);

  return (
    <group ref={group}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

interface GLBViewerProps {
  url: string;
}

export default function GLBViewer({ url }: GLBViewerProps) {
  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Model url={url} />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/seu-modelo.glb");

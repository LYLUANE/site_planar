import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  Html,
  OrbitControls,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { Box } from "@mui/material";
import type { ResponsiveStyleValue } from "@mui/system";
import * as THREE from "three";
import { CORES } from "./theme";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const { material } = child as THREE.Mesh;
      const materiais = Array.isArray(material) ? material : [material];
      materiais.forEach((mat) => {
        mat.transparent = true;
        mat.needsUpdate = true;
      });
    });
  }, [scene]);

  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

// <Html> renderiza fora da árvore do MUI (sem tema), por isso estilos inline
function Carregando() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div
        style={{
          width: 200,
          textAlign: "center",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <span style={{ color: CORES.dourado, fontSize: "0.75rem" }}>
          Carregando holograma… {Math.round(progress)}%
        </span>
        <div style={{ marginTop: 8, height: 4, background: CORES.borda }}>
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: CORES.dourado,
              transition: "width 0.2s",
            }}
          />
        </div>
      </div>
    </Html>
  );
}

interface GLBViewerProps {
  url: string;
  height?: ResponsiveStyleValue<number | string>;
}

export default function GLBViewer({
  url,
  height = { xs: 360, md: 500 },
}: GLBViewerProps) {
  return (
    <Box sx={{ width: "100%", height, position: "relative" }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 2, 5], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Suspense fallback={<Carregando />}>
          <Model url={url} />
        </Suspense>
        <OrbitControls enableZoom minDistance={1.5} maxDistance={10} />
      </Canvas>
    </Box>
  );
}

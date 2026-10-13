import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Center, OrbitControls, useGLTF, useProgress } from "@react-three/drei";
import { Box, LinearProgress, Typography } from "@mui/material";
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

// Fica fora do <Canvas> (overlay comum): o <Html> do drei dentro do Suspense
// gerava erro de desmontagem no React 19 quando o modelo terminava de carregar
function Carregando() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        pointerEvents: "none",
      }}
    >
      <Box sx={{ width: 200, textAlign: "center" }}>
        <Typography variant="caption" sx={{ color: "primary.main" }}>
          Carregando holograma… {Math.round(progress)}%
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ mt: 1, bgcolor: CORES.borda }}
        />
      </Box>
    </Box>
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
        <Suspense fallback={null}>
          <Model url={url} />
        </Suspense>
        <OrbitControls enableZoom minDistance={1.5} maxDistance={10} />
      </Canvas>
      <Carregando />
    </Box>
  );
}

import { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  Bounds,
  Center,
  OrbitControls,
  useBounds,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { Box, LinearProgress, Typography } from "@mui/material";
import type { ResponsiveStyleValue } from "@mui/system";
import * as THREE from "three";
import { CORES } from "./theme";

const DIRECAO_INICIAL = new THREE.Vector3(0, 2, 5).normalize();

const ZOOM_MAX = 0.6;
const ZOOM_MIN = 1.5;

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

function RecentralizarNoDuploClique() {
  const bounds = useBounds();
  const gl = useThree((s) => s.gl);

  useEffect(() => {
    const recentralizar = () => {
      const { center, distance } = bounds.refresh().getSize();
      bounds.to({
        position: center
          .clone()
          .addScaledVector(DIRECAO_INICIAL, distance)
          .toArray(),
        target: center.toArray(),
      });
    };
    gl.domElement.addEventListener("dblclick", recentralizar);
    return () => gl.domElement.removeEventListener("dblclick", recentralizar);
  }, [bounds, gl]);

  return null;
}

function Cena({
  url,
  onEnquadrar,
}: {
  url: string;
  onEnquadrar: (distancia: number) => void;
}) {
  return (
    <Bounds
      fit
      clip
      observe
      margin={1}
      maxDuration={0.5}
      onFit={({ distance }) => onEnquadrar(distance)}
    >
      <Model url={url} />
      <RecentralizarNoDuploClique />
    </Bounds>
  );
}

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
  height = { xs: 260, md: 300 },
}: GLBViewerProps) {
  const [distancia, setDistancia] = useState<number | null>(null);

  return (
    <Box
      sx={{
        width: "100%",
        height,
        position: "relative",
        "& canvas": { touchAction: "pan-y !important" },
      }}
    >
      <Canvas
        dpr={[1, 2]}
        camera={{
          position: DIRECAO_INICIAL.clone().multiplyScalar(1.5).toArray(),
          fov: 50,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Suspense fallback={null}>
          <Cena url={url} onEnquadrar={setDistancia} />
        </Suspense>
        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={distancia ? distancia * ZOOM_MAX : 0}
          maxDistance={distancia ? distancia * ZOOM_MIN : Infinity}
          minPolarAngle={Math.PI * 0.15}
          maxPolarAngle={Math.PI * 0.5}
        />
      </Canvas>
      <Carregando />
    </Box>
  );
}

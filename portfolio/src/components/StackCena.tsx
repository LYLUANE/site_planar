import { Environment, Lightformer, MeshReflectorMaterial, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { techs, type Tech } from "../data";

// Estado escrito pelo ScrollTrigger e lido a cada frame (sem re-render do React)
export type EstadoStack = { montagem: number; anel: number };

const N = techs.length;
const PASSO = (Math.PI * 2) / N;
const suave = THREE.MathUtils.damp;

// Transforma o path SVG (24×24) do logo em um objeto sólido com bisel
function geometriaDoLogo(path: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="${path}"/></svg>`;
  const formas = new SVGLoader().parse(svg).paths.flatMap((p) => SVGLoader.createShapes(p));
  const geo = new THREE.ExtrudeGeometry(formas, {
    depth: 2.4,
    bevelEnabled: true,
    bevelThickness: 0.35,
    bevelSize: 0.12,
    bevelSegments: 5,
    curveSegments: 24,
  });
  geo.center();
  geo.rotateX(Math.PI); // SVG tem o eixo Y para baixo
  geo.scale(0.062, 0.062, 0.062);
  geo.computeVertexNormals();
  return geo;
}

function pontoEspalhado(i: number) {
  // posições "explodidas" de onde cada logo voa até o palco
  const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i;
  const r = 13;
  return new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi) * 0.6 + 2, r * Math.sin(phi) * Math.sin(theta) - 4);
}

function Logo({ tech, i, estado }: { tech: Tech; i: number; estado: React.RefObject<EstadoStack> }) {
  const grupo = useRef<THREE.Group>(null!);
  const malha = useRef<THREE.Mesh>(null!);
  const material = useRef<THREE.MeshPhysicalMaterial>(null!);
  const geo = useMemo(() => geometriaDoLogo(tech.path), [tech.path]);
  const origem = useMemo(() => pontoEspalhado(i), [i]);
  const giroAlvo = useRef(0);
  const alvo = useMemo(() => new THREE.Vector3(), []);
  const { size } = useThree();

  useFrame((st, dt) => {
    const { montagem, anel } = estado.current;
    const raio = size.width < 700 ? 2.5 : 3.7;
    const a = (i - anel) * PASSO;
    const frente = Math.pow((Math.cos(a) + 1) / 2, 4); // 1 no logo da frente, ~0 atrás
    const t = st.clock.elapsedTime;

    alvo.set(Math.sin(a) * raio, 0.85 + Math.sin(t * 1.2 + i) * 0.12 + frente * 0.35, Math.cos(a) * raio);
    alvo.lerpVectors(origem, alvo, montagem);
    grupo.current.position.lerp(alvo, 1 - Math.exp(-7 * dt));

    const escala = THREE.MathUtils.lerp(0.72, 1.65, frente) * (0.4 + 0.6 * montagem);
    grupo.current.scale.setScalar(suave(grupo.current.scale.x, escala, 6, dt));

    // de frente para fora do anel, balançando de leve; o hover dá uma volta completa
    const caos = (1 - montagem) * (i + 1) * 1.7;
    grupo.current.rotation.y = a + Math.sin(t * 0.8 + i) * 0.35 + caos;
    grupo.current.rotation.x = Math.sin(t * 0.6 + i * 2) * 0.12 + caos * 0.5;
    malha.current.rotation.y = suave(malha.current.rotation.y, giroAlvo.current, 3.5, dt);
    material.current.emissiveIntensity = 0.08 + frente * 0.55;
  });

  return (
    <group ref={grupo} position={origem}>
      <mesh
        ref={malha}
        geometry={geo}
        castShadow
        onPointerOver={(e) => {
          e.stopPropagation();
          giroAlvo.current += Math.PI * 2;
          document.body.style.cursor = "grab";
        }}
        onPointerOut={() => (document.body.style.cursor = "")}
        onClick={() => (giroAlvo.current += Math.PI * 2)}
      >
        <meshPhysicalMaterial
          ref={material}
          color={tech.cor}
          emissive={tech.cor}
          metalness={0.45}
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.06}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[200, 900]}
        />
      </mesh>
    </group>
  );
}

function Palco() {
  const aneis = useRef<THREE.Group>(null!);
  useFrame((_, dt) => (aneis.current.rotation.y += dt * 0.25));

  return (
    <group position={[0, -0.6, 0]}>
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <cylinderGeometry args={[4.8, 5.1, 0.3, 96]} />
        <meshStandardMaterial color="#120a33" metalness={0.8} roughness={0.25} />
      </mesh>
      <group ref={aneis}>
        <mesh rotation-x={Math.PI / 2} position-y={0.02}>
          <torusGeometry args={[4.82, 0.035, 16, 160]} />
          <meshBasicMaterial color={[4, 0.6, 2.4]} toneMapped={false} />
        </mesh>
        <mesh rotation-x={Math.PI / 2} position-y={0.02}>
          <torusGeometry args={[4.2, 0.02, 16, 160]} />
          <meshBasicMaterial color={[0.6, 2.2, 4]} toneMapped={false} />
        </mesh>
        <mesh rotation-x={Math.PI / 2} position-y={0.02}>
          <torusGeometry args={[3.5, 0.015, 16, 160, Math.PI * 1.2]} />
          <meshBasicMaterial color={[2.4, 1, 4]} toneMapped={false} />
        </mesh>
      </group>
      {/* feixe de luz vindo de cima, como um holofote de palco */}
      <mesh position={[0, 4.6, 0]}>
        <cylinderGeometry args={[1.3, 4.7, 9.2, 64, 1, true]} />
        <meshBasicMaterial color="#b98cff" transparent opacity={0.05} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={-0.32}>
        <planeGeometry args={[80, 80]} />
        <MeshReflectorMaterial
          blur={[400, 120]}
          resolution={512}
          mixBlur={1}
          mixStrength={30}
          roughness={1}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#07041a"
          metalness={0.6}
          mirror={0}
        />
      </mesh>
    </group>
  );
}

function Camera() {
  const { size } = useThree();
  useFrame((st, dt) => {
    // tela em pé (celular) precisa da câmera bem mais longe para caber o anel
    const longe = size.width < size.height ? 19 : 11.5;
    const c = st.camera;
    c.position.x = suave(c.position.x, st.pointer.x * 1.2, 2, dt);
    c.position.y = suave(c.position.y, 2.4 + st.pointer.y * 0.6, 2, dt);
    c.position.z = suave(c.position.z, longe, 2, dt);
    c.lookAt(0, 0.9, 0);
  });
  return null;
}

// Carregado sob demanda (React.lazy): three.js só baixa quando a página já abriu
export default function StackCanvas({ estado, visivel }: { estado: React.RefObject<EstadoStack>; visivel: boolean }) {
  return (
    <Canvas
      className="stack-canvas"
      frameloop={visivel ? "always" : "never"}
      dpr={[1, 1.75]}
      shadows
      camera={{ position: [0, 3, 14], fov: 38 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <Cena estado={estado} />
    </Canvas>
  );
}

function Cena({ estado }: { estado: React.RefObject<EstadoStack> }) {
  return (
    <>
      <color attach="background" args={["#07041a"]} />
      <fog attach="fog" args={["#07041a", 11, 30]} />
      <Camera />
      <ambientLight intensity={0.25} />
      <spotLight position={[0, 10, 4]} angle={0.45} penumbra={1} intensity={260} color="#ffffff" castShadow />
      <pointLight position={[-6, 2.5, 3]} intensity={70} color="#7b2ff7" />
      <pointLight position={[6, 2.5, 3]} intensity={70} color="#ff3ea5" />
      <pointLight position={[0, 3, -6]} intensity={60} color="#5ad1ff" />

      {techs.map((t, i) => (
        <Logo key={t.nome} tech={t} i={i} estado={estado} />
      ))}

      <Palco />
      <Sparkles count={90} scale={[16, 7, 12]} position={[0, 2.5, 0]} size={4} speed={0.4} color="#ffc8e8" />
      <Sparkles count={60} scale={[14, 6, 10]} position={[0, 2.5, 0]} size={3} speed={0.3} color="#5ad1ff" />

      <Environment resolution={256}>
        <Lightformer form="ring" intensity={4} color="#ff3ea5" position={[0, 4, -7]} scale={6} />
        <Lightformer intensity={3} color="#5ad1ff" position={[-7, 1, 0]} rotation-y={Math.PI / 2} scale={[12, 3, 1]} />
        <Lightformer intensity={3} color="#7b2ff7" position={[7, 1, 0]} rotation-y={-Math.PI / 2} scale={[12, 3, 1]} />
        <Lightformer intensity={5} color="#ffffff" position={[0, 7, 4]} rotation-x={Math.PI / 2} scale={[8, 1.5, 1]} />
      </Environment>

      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.85} intensity={0.9} radius={0.7} />
      </EffectComposer>
    </>
  );
}

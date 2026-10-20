import { useEffect, useRef } from "react";
import { reduzMovimento } from "../lib/gsap";

const CORES = ["#ffffff", "#ffc8e8", "#ff3ea5", "#5ad1ff", "#a77bff"];

// Céu estrelado em canvas 2D, fixo atrás de todo o site, com parallax leve no scroll
export default function Estrelas() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current!;
    const ctx = cv.getContext("2d")!;
    const parado = reduzMovimento();
    const dpr = Math.min(window.devicePixelRatio, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    const estrelas = Array.from({ length: window.innerWidth < 700 ? 70 : 150 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      z: Math.random() * 0.6 + 0.2,
      fase: Math.random() * Math.PI * 2,
      vel: Math.random() * 1.5 + 0.5,
      cor: CORES[Math.floor(Math.random() * CORES.length)],
    }));

    const medir = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const desenhar = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const sy = window.scrollY;
      for (const e of estrelas) {
        const x = e.x * w;
        const y = (((e.y * h - sy * e.z * 0.25) % h) + h) % h;
        const brilho = parado ? 0.7 : 0.35 + 0.65 * Math.abs(Math.sin(t * 0.001 * e.vel + e.fase));
        ctx.globalAlpha = brilho;
        ctx.fillStyle = e.cor;
        ctx.beginPath();
        ctx.arc(x, y, e.r, 0, Math.PI * 2);
        ctx.fill();
        if (e.r > 1.4 && brilho > 0.85) {
          // brilho em cruz nas estrelas maiores
          ctx.globalAlpha = brilho * 0.5;
          ctx.fillRect(x - e.r * 4, y - 0.4, e.r * 8, 0.8);
          ctx.fillRect(x - 0.4, y - e.r * 4, 0.8, e.r * 8);
        }
      }
      if (!parado) raf = requestAnimationFrame(desenhar);
    };

    medir();
    raf = requestAnimationFrame(desenhar);
    window.addEventListener("resize", medir);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", medir);
    };
  }, []);

  return <canvas ref={canvas} className="estrelas" aria-hidden />;
}

import { useEffect, useRef } from "react";
import { ehToque, gsap } from "../lib/gsap";

// Ponto + aura em gradiente que segue o mouse e cresce sobre itens interativos
export default function Cursor() {
  const ponto = useRef<HTMLDivElement>(null);
  const aura = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ehToque()) return;
    document.documentElement.classList.add("cursor-custom");
    const px = gsap.quickTo(ponto.current, "x", { duration: 0.1 });
    const py = gsap.quickTo(ponto.current, "y", { duration: 0.1 });
    const ax = gsap.quickTo(aura.current, "x", { duration: 0.6, ease: "power3" });
    const ay = gsap.quickTo(aura.current, "y", { duration: 0.6, ease: "power3" });

    const mover = (e: PointerEvent) => {
      px(e.clientX);
      py(e.clientY);
      ax(e.clientX);
      ay(e.clientY);
      const alvo = (e.target as HTMLElement).closest("a, button, .card3d, .momento, canvas");
      aura.current?.classList.toggle("ativa", !!alvo);
    };
    window.addEventListener("pointermove", mover);
    return () => {
      window.removeEventListener("pointermove", mover);
      document.documentElement.classList.remove("cursor-custom");
    };
  }, []);

  return (
    <>
      <div ref={aura} className="cursor-aura" aria-hidden />
      <div ref={ponto} className="cursor-ponto" aria-hidden />
    </>
  );
}

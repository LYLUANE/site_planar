import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

// Uma única instância do Lenis (scroll suave) compartilhada pelo site
let lenis: Lenis | null = null;

export function iniciarScrollSuave() {
  lenis = new Lenis({ lerp: 0.085 });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (t: number) => lenis?.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export function rolarPara(alvo: string | number) {
  if (lenis) lenis.scrollTo(alvo, { duration: 1.6 });
  else if (typeof alvo === "number") window.scrollTo({ top: alvo, behavior: "smooth" });
  else document.querySelector(alvo)?.scrollIntoView({ behavior: "smooth" });
}

export function travarScroll(travar: boolean) {
  if (travar) lenis?.stop();
  else lenis?.start();
  document.documentElement.classList.toggle("travado", travar);
}

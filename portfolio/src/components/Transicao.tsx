import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";

// A palavra gigante cresce até "engolir" a tela e virar o fundo da seção de contato
export default function Transicao() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: { trigger: raiz.current, start: "top top", end: "+=220%", scrub: 0.8, pin: true },
        })
        .from(".transicao-palavra", { yPercent: 40, opacity: 0, duration: 0.25 }, 0)
        .from(".transicao-pre", { y: 30, opacity: 0, duration: 0.2 }, 0.05)
        .to(".transicao-pre", { y: -40, opacity: 0, duration: 0.2 }, 0.35)
        .to(".transicao-palavra", { scale: 32, ease: "power3.in", duration: 0.65 }, 0.35)
        .to(".transicao-veu", { opacity: 1, ease: "power1.in", duration: 0.3 }, 0.7);
    },
    { scope: raiz },
  );

  return (
    <section className="transicao" ref={raiz} aria-hidden>
      <p className="transicao-pre serif">do back ao front, eu sou</p>
      <h2 className="transicao-palavra grad-text">DEV</h2>
      <div className="transicao-veu" />
    </section>
  );
}

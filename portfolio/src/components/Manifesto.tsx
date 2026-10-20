import { useRef } from "react";
import { useIdioma } from "../i18n/idioma";
import { pintarGradiente } from "../lib/efeitos";
import { gsap, SplitText, useGSAP } from "../lib/gsap";

// Texto que "acende" palavra por palavra enquanto a seção fica fixada na tela
export default function Manifesto() {
  const raiz = useRef<HTMLElement>(null);
  const { t } = useIdioma();

  useGSAP(
    () => {
      const split = SplitText.create(".manifesto-texto", { type: "words" });
      raiz.current!.querySelectorAll("b").forEach((b) => pintarGradiente([...b.querySelectorAll("div")]));
      gsap.fromTo(
        split.words,
        { opacity: 0.1, y: 12 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          ease: "power1.out",
          scrollTrigger: { trigger: raiz.current, start: "top top", end: "+=160%", scrub: 0.6, pin: true },
        },
      );
      gsap.to(".manifesto-orbe", {
        scale: 1.6,
        rotate: 120,
        scrollTrigger: { trigger: raiz.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: raiz },
  );

  return (
    <section className="manifesto" ref={raiz}>
      <div className="manifesto-orbe" aria-hidden />
      <p className="manifesto-texto">
        {t.manifesto.map((trecho, i) => (typeof trecho === "string" ? trecho : <b key={i}>{trecho.d}</b>))}
      </p>
    </section>
  );
}

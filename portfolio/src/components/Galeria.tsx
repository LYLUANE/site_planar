import { useRef } from "react";
import { foto, momentos } from "../data";
import { useIdioma } from "../i18n/idioma";
import { revelarTitulo } from "../lib/efeitos";
import { gsap, useGSAP } from "../lib/gsap";

// Galeria fixada na tela que corre na horizontal enquanto se rola para baixo
export default function Galeria() {
  const raiz = useRef<HTMLElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const { t } = useIdioma();

  useGSAP(
    () => {
      revelarTitulo(".galeria .titulo", raiz.current!);
      const distancia = () => trilho.current!.scrollWidth - window.innerWidth;
      const corrida = gsap.to(trilho.current, {
        x: () => -distancia(),
        ease: "none",
        scrollTrigger: {
          trigger: raiz.current,
          start: "top top",
          end: () => `+=${distancia()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".momento").forEach((el) => {
        const gatilho = { trigger: el, containerAnimation: corrida, scrub: true };
        gsap.fromTo(
          el.querySelector("img"),
          { xPercent: -10 },
          { xPercent: 10, ease: "none", scrollTrigger: { ...gatilho, start: "left right", end: "right left" } },
        );
        gsap.from(el, {
          rotateY: -40,
          scale: 0.8,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { ...gatilho, start: "left right", end: "left 55%" },
        });
      });

      gsap.to(".galeria-fundo", {
        xPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: raiz.current, start: "top top", end: () => `+=${distancia()}`, scrub: true },
      });
    },
    { scope: raiz },
  );

  return (
    <section id="momentos" className="galeria" ref={raiz}>
      <span className="galeria-fundo" aria-hidden>
        momentos momentos
      </span>
      <div className="galeria-trilho" ref={trilho}>
        <div className="galeria-intro">
          <p className="eyebrow">{t.galeria.eyebrow}</p>
          <h2 className="titulo">
            {t.galeria.titulo} <em className="serif">{t.galeria.destaque}</em>
          </h2>
          <p>{t.galeria.texto}</p>
        </div>
        {momentos.map((m, i) => (
          <figure key={m} className={`momento m${i % 3}`}>
            <div className="momento-img">
              <img src={foto(m)} alt={t.momentos[m]} loading="lazy" />
            </div>
            <figcaption>
              <span>{String(i + 1).padStart(2, "0")}</span> {t.momentos[m]}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

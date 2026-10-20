import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { techs } from "../data";
import { useIdioma } from "../i18n/idioma";
import { pintarGradiente, revelarTitulo } from "../lib/efeitos";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "../lib/gsap";
import type { EstadoStack } from "./StackCena";

const StackCanvas = lazy(() => import("./StackCena"));

export default function Stack() {
  const raiz = useRef<HTMLElement>(null);
  const info = useRef<HTMLDivElement>(null);
  const { t } = useIdioma();
  const estado = useRef<EstadoStack>({ montagem: 0, anel: 0 });
  const [ativo, setAtivo] = useState(0);
  const [visivel, setVisivel] = useState(false);

  // Só renderiza o 3D quando a seção está perto da tela
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { rootMargin: "200px" });
    obs.observe(raiz.current!);
    return () => obs.disconnect();
  }, []);

  useGSAP(
    () => {
      revelarTitulo(".stack-cabeca h2", raiz.current!);
      // os logos voam das posições espalhadas até o palco enquanto a seção chega
      ScrollTrigger.create({
        trigger: raiz.current,
        start: "top 85%",
        end: "top top",
        onUpdate: (s) => (estado.current.montagem = gsap.parseEase("power2.inOut")(s.progress)),
      });
      // depois, o anel gira e cada tecnologia vem para o centro do palco
      ScrollTrigger.create({
        trigger: raiz.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (s) => {
          const anel = s.progress * (techs.length - 1);
          estado.current.anel = anel;
          setAtivo(Math.round(anel));
        },
      });
    },
    { scope: raiz },
  );

  // troca animada do nome/descrição da tecnologia em destaque
  useGSAP(
    () => {
      const split = SplitText.create(".stack-nome", { type: "chars", mask: "chars" });
      pintarGradiente(split.chars);
      gsap
        .timeline()
        .from(split.chars, { yPercent: 110, rotateX: -80, stagger: 0.03, duration: 0.8, ease: "expo.out" })
        .from(".stack-frase, .stack-area, .stack-idx", { y: 20, opacity: 0, stagger: 0.06, duration: 0.6, ease: "power3.out" }, 0.1);
    },
    { scope: info, dependencies: [ativo], revertOnUpdate: true },
  );

  const tech = techs[ativo];
  const txt = t.techs[tech.nome];

  return (
    <>
    <section id="stack" className="stack" ref={raiz}>
      <div className="stack-fixo">
        <Suspense fallback={null}>
          <StackCanvas estado={estado} visivel={visivel} />
        </Suspense>

        <div className="stack-cabeca">
          <p className="eyebrow">{t.stack.eyebrow}</p>
          <h2 className="titulo">
            {t.stack.titulo} <em className="serif">{t.stack.destaque}</em>
          </h2>
        </div>

        <div className="stack-info" ref={info} aria-live="polite">
          <span className="stack-idx">
            {String(ativo + 1).padStart(2, "0")} <i>/ {String(techs.length).padStart(2, "0")}</i>
          </span>
          <h3 className="stack-nome" key={tech.nome}>
            {tech.nome}
          </h3>
          <p className="stack-frase serif">{txt.frase}</p>
          <span className="stack-area" style={{ "--cor": tech.cor } as React.CSSProperties}>
            {txt.area}
          </span>
        </div>

        <ol className="stack-pontos" aria-label={t.stack.aria}>
          {techs.map((t, i) => (
            <li key={t.nome} className={i === ativo ? "ativo" : ""} title={t.nome} />
          ))}
        </ol>
        <p className="stack-dica">{t.stack.dica}</p>
      </div>
    </section>

      <div className="marquee" aria-hidden>
        {[0, 1].map((linha) => (
          <div key={linha} className={`marquee-faixa ${linha ? "reversa" : ""}`}>
            {[...techs, ...techs].map((t, i) => (
              <span key={i}>
                {t.nome} <b>✦</b>
              </span>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

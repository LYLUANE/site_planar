import { useRef } from "react";
import { foto, perfil } from "../data";
import { useIdioma } from "../i18n/idioma";
import { pintarGradiente } from "../lib/efeitos";
import { gsap, SplitText, useGSAP } from "../lib/gsap";

export default function Hero({ pronto }: { pronto: boolean }) {
  const raiz = useRef<HTMLElement>(null);
  const { t } = useIdioma();

  // Parallax ao rolar: o nome se abre para os lados e a foto sobe girando
  useGSAP(
    () => {
      gsap
        .timeline({ scrollTrigger: { trigger: raiz.current, start: "top top", end: "bottom top", scrub: true } })
        .to(".l1", { xPercent: -22 }, 0)
        .to(".l2", { xPercent: 22 }, 0)
        .to(".hero-foto", { yPercent: -30, scale: 0.82, rotate: -6 }, 0)
        .to(".aurora", { opacity: 0.25, scale: 1.3 }, 0)
        .to(".hero-rodape", { opacity: 0, y: -40 }, 0);
    },
    { scope: raiz },
  );

  // Entrada mágica, disparada quando o loader termina
  useGSAP(
    () => {
      const l1 = SplitText.create(".l1", { type: "chars", mask: "chars" });
      const l2 = SplitText.create(".l2", { type: "chars", mask: "chars" });
      pintarGradiente(l2.chars);
      const anima = ".hero-anima";
      if (!pronto) {
        gsap.set([l1.chars, l2.chars, anima, ".arco"], { autoAlpha: 0 });
        return;
      }
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(
          [...l1.chars, ...l2.chars],
          { yPercent: 120, rotateX: -90, autoAlpha: 0 },
          { yPercent: 0, rotateX: 0, autoAlpha: 1, stagger: 0.05, duration: 1.5 },
        )
        .fromTo(
          ".arco",
          { clipPath: "inset(100% 0% 0% 0% round 999px 999px 28px 28px)", scale: 1.25, autoAlpha: 1 },
          { clipPath: "inset(0% 0% 0% 0% round 999px 999px 28px 28px)", scale: 1, duration: 1.8 },
          0.25,
        )
        .fromTo(".arco img", { scale: 1.5 }, { scale: 1, duration: 2.2 }, 0.25)
        .fromTo(anima, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, duration: 1.2 }, 0.8);
    },
    { scope: raiz, dependencies: [pronto], revertOnUpdate: true },
  );

  return (
    <section className="hero" ref={raiz}>
      <div className="aurora" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <h1 className="hero-nome">
        <span className="hero-linha l1">{perfil.nome}</span>
        <span className="hero-linha l2">{perfil.sobrenome}</span>
      </h1>

      <div className="hero-foto">
        <div className="arco-brilho" aria-hidden />
        <div className="arco">
          <img src={foto("hero")} alt={t.hero.alt} />
        </div>
        <svg className="selo hero-anima" viewBox="0 0 200 200" aria-hidden>
          <defs>
            <path id="circulo" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <text>
            {/* textLength estica o texto para fechar o círculo em qualquer idioma */}
            <textPath href="#circulo" textLength={488} lengthAdjust="spacing">
              {t.hero.selo}
            </textPath>
          </text>
          <text x="100" y="112" textAnchor="middle" className="selo-estrela">
            ✦
          </text>
        </svg>
      </div>

      <div className="hero-rodape">
        <p className="hero-papel hero-anima">
          <span className="serif">{t.hero.ola}</span> {t.hero.papel} <em className="serif grad-text">&</em>{" "}
          {t.hero.papel2}
        </p>
        <div className="hero-scroll hero-anima">
          {t.hero.scroll} <i />
        </div>
      </div>
    </section>
  );
}

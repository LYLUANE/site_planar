import { useRef } from "react";
import { useIdioma } from "../i18n/idioma";
import type { Idioma } from "../i18n/textos";
import { gsap, useGSAP } from "../lib/gsap";
import { guardarPosicao, rolarPara } from "../lib/scroll";

const IDIOMAS: Idioma[] = ["pt", "en"];

export default function Nav() {
  const barra = useRef<HTMLDivElement>(null);
  const { idioma, t, setIdioma } = useIdioma();
  const links = [
    ["#sobre", t.nav.sobre],
    ["#stack", t.nav.stack],
    ["#momentos", t.nav.momentos],
    ["#contato", t.nav.contato],
  ];

  useGSAP(() => {
    gsap.to(barra.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
  });

  return (
    <header className="nav">
      <div className="nav-progresso" ref={barra} />
      <a
        href="#topo"
        className="nav-logo"
        onClick={(e) => {
          e.preventDefault();
          rolarPara(0);
        }}
      >
        E<span className="grad-text">L</span>
      </a>
      <nav>
        {links.map(([href, rotulo]) => (
          <a
            key={href}
            href={href}
            onClick={(e) => {
              e.preventDefault();
              rolarPara(href);
            }}
          >
            {rotulo}
          </a>
        ))}
      </nav>
      <div className="nav-idioma" role="group" aria-label={t.nav.idioma}>
        {IDIOMAS.map((i) => (
          <button
            key={i}
            type="button"
            aria-pressed={i === idioma}
            onClick={() => {
              if (i === idioma) return;
              guardarPosicao();
              setIdioma(i);
            }}
          >
            {i.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );
}

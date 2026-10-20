import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { rolarPara } from "../lib/scroll";

const LINKS = [
  ["#sobre", "Sobre"],
  ["#stack", "Stack"],
  ["#momentos", "Momentos"],
  ["#contato", "Contato"],
];

export default function Nav() {
  const barra = useRef<HTMLDivElement>(null);

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
        {LINKS.map(([href, rotulo]) => (
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
    </header>
  );
}

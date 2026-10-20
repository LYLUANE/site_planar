import { useRef } from "react";
import { perfil } from "../data";
import { pintarGradiente } from "../lib/efeitos";
import { gsap, reduzMovimento, useGSAP } from "../lib/gsap";

// onRevelar: a cortina começa a subir (a hero já anima por baixo); onFim: pode desmontar
export default function Loader({ onRevelar, onFim }: { onRevelar: () => void; onFim: () => void }) {
  const raiz = useRef<HTMLDivElement>(null);
  const contador = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      pintarGradiente(gsap.utils.toArray(".loader-letra", raiz.current));
      if (reduzMovimento()) {
        onRevelar();
        onFim();
        return;
      }
      const n = { v: 0 };
      gsap
        .timeline({ onComplete: onFim })
        .from(".loader-letra", { yPercent: 120, rotate: 12, stagger: 0.06, duration: 0.9, ease: "expo.out" })
        .to(
          n,
          {
            v: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate: () => {
              if (contador.current) contador.current.textContent = String(Math.round(n.v)).padStart(3, "0");
            },
          },
          0,
        )
        .to(".loader-barra i", { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
        .to(".loader-letra", { yPercent: -120, stagger: 0.04, duration: 0.6, ease: "expo.in" }, ">-0.1")
        .call(onRevelar, [], "-=0.3")
        .to(raiz.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, "-=0.25");
    },
    { scope: raiz },
  );

  return (
    <div className="loader" ref={raiz} aria-hidden>
      <div className="loader-nome">
        {perfil.nome.split("").map((l, i) => (
          <span key={i} className="loader-mascara">
            <span className="loader-letra">{l}</span>
          </span>
        ))}
      </div>
      <div className="loader-rodape">
        <span className="serif">preparando a magia</span>
        <span className="loader-barra">
          <i />
        </span>
        <span ref={contador} className="loader-num">
          000
        </span>
      </div>
    </div>
  );
}

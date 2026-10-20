import { useRef } from "react";
import { fatos, foto, perfil } from "../data";
import { inclinar, revelarTitulo, soltar } from "../lib/efeitos";
import { gsap, useGSAP } from "../lib/gsap";

export default function Sobre() {
  const raiz = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revelarTitulo(".sobre .titulo");
      gsap.from(".sobre-intro, .sobre .eyebrow", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".sobre-topo", start: "top 80%" },
      });
      gsap.from(".card3d", {
        y: 180,
        rotateX: -55,
        rotateZ: (i) => (i % 2 ? 6 : -6),
        opacity: 0,
        stagger: 0.14,
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: ".cards", start: "top 85%" },
      });
      gsap.from(".fato-numero", {
        textContent: 0,
        snap: { textContent: 1 },
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: ".cards", start: "top 75%" },
      });
    },
    { scope: raiz },
  );

  return (
    <section id="sobre" className="sobre secao" ref={raiz}>
      <div className="sobre-topo">
        <p className="eyebrow">01 — Sobre mim</p>
        <h2 className="titulo">
          Prazer, <em className="serif">{perfil.nome}</em>
        </h2>
        <p className="sobre-intro">
          Engenheira da computação e desenvolvedora fullstack. Amo construir produtos completos — da API robusta à
          interface que encanta — cuidando de cada detalhe, animação e experiência.
        </p>
      </div>

      <div className="cards">
        {fatos.map((f) => (
          <article key={f.id} className="card3d" onPointerMove={(e) => inclinar(e)} onPointerLeave={soltar}>
            <div className="card3d-inner">
              <img src={foto(f.foto)} alt="" loading="lazy" />
              <div className="card3d-holo" aria-hidden />
              <div className="card3d-conteudo">
                {f.numero !== undefined && <span className="fato-numero grad-text">{f.numero}</span>}
                <h3>
                  {f.titulo}
                  {f.destaque && <em className="serif"> {f.destaque}</em>}
                </h3>
                <p>{f.texto}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

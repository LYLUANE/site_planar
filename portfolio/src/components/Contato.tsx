import { useRef } from "react";
import { foto, perfil } from "../data";
import { useIdioma } from "../i18n/idioma";
import { revelarTitulo } from "../lib/efeitos";
import { ehToque, gsap, useGSAP } from "../lib/gsap";

export default function Contato() {
  const raiz = useRef<HTMLElement>(null);
  const botao = useRef<HTMLAnchorElement>(null);
  const { t } = useIdioma();

  useGSAP(
    () => {
      revelarTitulo(".contato-titulo");
      gsap.from(".contato-polaroid", {
        y: 200,
        rotate: (i) => (i ? 30 : -30),
        opacity: 0,
        duration: 1.6,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: { trigger: raiz.current, start: "top 60%" },
      });
      gsap.from(".botao-magnetico, .contato .eyebrow, .contato-rodape", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: raiz.current, start: "top 50%" },
      });
    },
    { scope: raiz },
  );

  // botão "magnético": é puxado em direção ao cursor
  const { contextSafe } = useGSAP({ scope: raiz });
  const atrair = contextSafe((e: React.PointerEvent<HTMLAnchorElement>) => {
    if (ehToque()) return;
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(botao.current, {
      x: (e.clientX - r.left - r.width / 2) * 0.35,
      y: (e.clientY - r.top - r.height / 2) * 0.45,
      duration: 0.5,
      ease: "power3.out",
    });
  });
  const largar = contextSafe(() => {
    gsap.to(botao.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.35)" });
  });

  return (
    <section id="contato" className="contato" ref={raiz}>
      <img className="contato-polaroid p1" src={foto("pet2")} alt="" loading="lazy" />
      <img className="contato-polaroid p2" src={foto("sorriso")} alt="" loading="lazy" />

      <p className="eyebrow">{t.contato.eyebrow}</p>
      <h2 className="contato-titulo">
        {t.contato.titulo} <em className="serif">{t.contato.destaque}</em> {t.contato.fim}
      </h2>
      <a
        ref={botao}
        className="botao-magnetico"
        href={perfil.github}
        target="_blank"
        rel="noreferrer"
        onPointerMove={atrair}
        onPointerLeave={largar}
      >
        <span>{t.contato.botao}</span>
        <b aria-hidden>↗</b>
      </a>

      <footer className="contato-rodape">
        <span>
          © {new Date().getFullYear()} {perfil.nome} {perfil.sobrenome}
        </span>
        <span>{t.contato.feito}</span>
      </footer>
    </section>
  );
}

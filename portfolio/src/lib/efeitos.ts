import { gsap, SplitText } from "./gsap";

// background-clip: text não atravessa letras com transform próprio, então cada letra
// recebe sua "fatia" do gradiente: juntas, formam um gradiente contínuo
export function pintarGradiente(els: Element[]) {
  const n = els.length;
  els.forEach((el, i) => {
    const s = (el as HTMLElement).style;
    el.classList.add("grad-letra");
    s.backgroundSize = `${n * 100}% 100%`;
    s.backgroundPosition = `${n > 1 ? (i / (n - 1)) * 100 : 0}% 50%`;
  });
}

// Título que sobe letra a letra, de dentro de uma máscara, quando entra na tela
export function revelarTitulo(alvo: Element | string, gatilho?: Element | string) {
  const split = SplitText.create(alvo, { type: "words,chars", mask: "words", charsClass: "char-split" });
  // trechos em gradiente (<em>) passam a ser pintados letra a letra
  split.elements.forEach((el) =>
    el.querySelectorAll("em").forEach((em) => {
      em.classList.add("dividido");
      pintarGradiente([...em.querySelectorAll(".char-split")]);
    }),
  );
  gsap.from(split.chars, {
    yPercent: 110,
    rotate: 8,
    stagger: 0.025,
    duration: 1.1,
    ease: "expo.out",
    scrollTrigger: { trigger: gatilho ?? alvo, start: "top 85%" },
  });
  return split;
}

// Inclinação 3D + reflexo seguindo o mouse (valores em variáveis CSS)
export function inclinar(e: React.PointerEvent<HTMLElement>, forca = 14) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width;
  const y = (e.clientY - r.top) / r.height;
  el.style.setProperty("--ry", `${(x - 0.5) * forca}deg`);
  el.style.setProperty("--rx", `${(0.5 - y) * forca}deg`);
  el.style.setProperty("--mx", `${x * 100}%`);
  el.style.setProperty("--my", `${y * 100}%`);
}

export function soltar(e: React.PointerEvent<HTMLElement>) {
  const s = e.currentTarget.style;
  s.setProperty("--ry", "0deg");
  s.setProperty("--rx", "0deg");
}

import type { IdFato, Momento, NomeTech } from "../data";

export type Idioma = "pt" | "en";

// Trecho de texto rico: string comum ou { d: "..." } para palavra em destaque (gradiente)
type Rico = (string | { d: string })[];

type Textos = {
  meta: { titulo: string; descricao: string };
  loader: string;
  nav: { sobre: string; stack: string; momentos: string; contato: string; idioma: string };
  hero: { selo: string; ola: string; papel: string; papel2: string; scroll: string; alt: string };
  manifesto: Rico;
  sobre: { eyebrow: string; titulo: string; intro: string };
  fatos: Record<IdFato, { titulo: string; destaque?: string; texto: string }>;
  stack: { eyebrow: string; titulo: string; destaque: string; dica: string; aria: string };
  techs: Record<NomeTech, { area: string; frase: string }>;
  galeria: { eyebrow: string; titulo: string; destaque: string; texto: string };
  momentos: Record<Momento, string>;
  transicao: string;
  contato: { eyebrow: string; titulo: string; destaque: string; fim: string; botao: string; feito: string };
};

// O tipo Textos faz o TypeScript acusar qualquer tradução que esteja faltando
export const textos: Record<Idioma, Textos> = {
  pt: {
    meta: {
      titulo: "Evelyn Luane · Dev Fullstack",
      descricao: "Evelyn Luane — Engenheira da Computação e Dev Fullstack.",
    },
    loader: "preparando a magia",
    nav: { sobre: "Sobre", stack: "Stack", momentos: "Momentos", contato: "Contato", idioma: "Idioma" },
    hero: {
      selo: "ENGENHEIRA DA COMPUTAÇÃO ✦ DEV FULLSTACK ✦ ",
      ola: "Olá, mundo! Eu sou",
      papel: "Engenheira da Computação",
      papel2: "Dev Fullstack.",
      scroll: "role para descobrir",
      alt: "Evelyn sorrindo em frente à turbina de um avião",
    },
    manifesto: [
      "Eu transformo ",
      { d: "café," },
      " lógica e uma pitada de ",
      { d: "magia" },
      " em interfaces que as pessoas ",
      { d: "sentem" },
      " — do banco de dados ao último ",
      { d: "pixel." },
    ],
    sobre: {
      eyebrow: "01 — Sobre mim",
      titulo: "Prazer,",
      intro:
        "Engenheira da computação e desenvolvedora fullstack. Amo construir produtos completos — da API robusta à interface que encanta — cuidando de cada detalhe, animação e experiência.",
    },
    fatos: {
      idade: { titulo: "anos", texto: "de curiosidade infinita e vontade de criar." },
      eng: { titulo: "Engenheira", destaque: "da Computação", texto: "Do hardware ao software, da lógica ao design." },
      casada: { titulo: "Casada", texto: "e muito bem acompanhada nessa jornada." },
      pet: { titulo: "Mãe de pet", texto: "dos meus companheiros de quatro patas." },
    },
    stack: {
      eyebrow: "02 — Stack fullstack",
      titulo: "Meu",
      destaque: "palco",
      dica: "passe o mouse nos ícones para girá-los ✦",
      aria: "Tecnologias",
    },
    techs: {
      React: { area: "Front-end", frase: "Interfaces vivas, componentizadas e rápidas." },
      TypeScript: { area: "Linguagem", frase: "Tipagem que deixa o código seguro e elegante." },
      JavaScript: { area: "Linguagem", frase: "A linguagem que dá movimento à web." },
      Angular: { area: "Front-end", frase: "Aplicações corporativas, robustas e escaláveis." },
      "Material UI": { area: "Design system", frase: "Componentes consistentes, acessíveis e bonitos." },
      Tailwind: { area: "Estilo", frase: "Estilo ágil, utilitário e pixel-perfect." },
      NestJS: { area: "Back-end", frase: "APIs modulares, organizadas e prontas para escalar." },
      "Progress 4GL": { area: "Back-end corporativo", frase: "Sistemas de negócio e dados que movem empresas." },
      Python: { area: "Linguagem", frase: "Automação, dados e scripts que resolvem." },
      "C++": { area: "Linguagem", frase: "Performance e a base da engenharia." },
    },
    galeria: {
      eyebrow: "03 — Fora do código",
      titulo: "Pequenos",
      destaque: "momentos",
      texto: "Aviões, arte, praia e muito amor de pet: o que me inspira longe do teclado.",
    },
    momentos: {
      embraer: "Ex-aluna do Colégio Embraer · V turma",
      aviao: "Apaixonada por aviação",
      "praia-pet": "Sol, mar e amor de pet",
      arte: "Arte que inspira interfaces",
      faceart: "Cor na pele",
      pet1: "Mãe de pet em tempo integral",
      aviao2: "Hangar dos sonhos",
      praia: "Recarregando a criatividade",
      pet2: "Amor de quatro patas",
      bone: "Dias de sol",
      arte2: "Cor por todo lado",
      carro: "Sempre em movimento",
    },
    transicao: "do back ao front, eu sou",
    contato: {
      eyebrow: "04 — Contato",
      titulo: "Vamos criar algo",
      destaque: "mágico",
      fim: "juntos?",
      botao: "Ver meu GitHub",
      feito: "feito com React, Three.js & GSAP ✦",
    },
  },

  en: {
    meta: {
      titulo: "Evelyn Luane · Fullstack Dev",
      descricao: "Evelyn Luane — Computer Engineer and Fullstack Developer.",
    },
    loader: "preparing the magic",
    nav: { sobre: "About", stack: "Stack", momentos: "Moments", contato: "Contact", idioma: "Language" },
    hero: {
      selo: "COMPUTER ENGINEER ✦ FULLSTACK DEVELOPER ✦ ",
      ola: "Hello, world! I'm a",
      papel: "Computer Engineer",
      papel2: "Fullstack Dev.",
      scroll: "scroll to discover",
      alt: "Evelyn smiling in front of an airplane engine",
    },
    manifesto: [
      "I turn ",
      { d: "coffee," },
      " logic and a pinch of ",
      { d: "magic" },
      " into interfaces people can ",
      { d: "feel" },
      " — from the database to the very last ",
      { d: "pixel." },
    ],
    sobre: {
      eyebrow: "01 — About me",
      titulo: "Hi, I'm",
      intro:
        "Computer engineer and fullstack developer. I love building complete products — from a solid API to an interface that delights — caring about every detail, animation and experience.",
    },
    fatos: {
      idade: { titulo: "years old", texto: "of endless curiosity and the urge to create." },
      eng: { titulo: "Computer", destaque: "Engineer", texto: "From hardware to software, from logic to design." },
      casada: { titulo: "Married", texto: "and in great company on this journey." },
      pet: { titulo: "Pet mom", texto: "to my four-legged companions." },
    },
    stack: {
      eyebrow: "02 — Fullstack stack",
      titulo: "My",
      destaque: "stage",
      dica: "hover the icons to spin them ✦",
      aria: "Technologies",
    },
    techs: {
      React: { area: "Front-end", frase: "Living, component-based and fast interfaces." },
      TypeScript: { area: "Language", frase: "Types that keep code safe and elegant." },
      JavaScript: { area: "Language", frase: "The language that sets the web in motion." },
      Angular: { area: "Front-end", frase: "Robust, scalable enterprise applications." },
      "Material UI": { area: "Design system", frase: "Consistent, accessible and beautiful components." },
      Tailwind: { area: "Styling", frase: "Fast, utility-first and pixel-perfect styling." },
      NestJS: { area: "Back-end", frase: "Modular, organized APIs ready to scale." },
      "Progress 4GL": { area: "Enterprise back-end", frase: "Business systems and data that keep companies running." },
      Python: { area: "Language", frase: "Automation, data and scripts that get things done." },
      "C++": { area: "Language", frase: "Performance and the foundation of engineering." },
    },
    galeria: {
      eyebrow: "03 — Beyond the code",
      titulo: "Little",
      destaque: "moments",
      texto: "Airplanes, art, the beach and lots of pet love: what inspires me away from the keyboard.",
    },
    momentos: {
      embraer: "Colégio Embraer alumna · Class V",
      aviao: "In love with aviation",
      "praia-pet": "Sun, sea and pet love",
      arte: "Art that inspires interfaces",
      faceart: "Colors on my skin",
      pet1: "Full-time pet mom",
      aviao2: "Hangar of dreams",
      praia: "Recharging creativity",
      pet2: "Four-legged love",
      bone: "Sunny days",
      arte2: "Color everywhere",
      carro: "Always on the move",
    },
    transicao: "from back to front, I'm a",
    contato: {
      eyebrow: "04 — Contact",
      titulo: "Let's create",
      destaque: "magic",
      fim: "together?",
      botao: "See my GitHub",
      feito: "made with React, Three.js & GSAP ✦",
    },
  },
};

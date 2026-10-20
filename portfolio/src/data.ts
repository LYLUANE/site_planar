import {
  siAngular,
  siCplusplus,
  siJavascript,
  siMui,
  siNestjs,
  siProgress,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
} from "simple-icons";

export const perfil = {
  nome: "Evelyn",
  sobrenome: "Luane",
  idade: 24,
  github: "https://github.com/LYLUANE",
};

export type Tech = {
  nome: string;
  path: string;
  cor: string;
  area: string;
  frase: string;
};

// path = desenho SVG oficial (24×24) de cada logo, extrudado em 3D na cena da stack
export const techs: Tech[] = [
  { nome: "React", path: siReact.path, cor: "#61DAFB", area: "Front-end", frase: "Interfaces vivas, componentizadas e rápidas." },
  { nome: "TypeScript", path: siTypescript.path, cor: "#3178C6", area: "Linguagem", frase: "Tipagem que deixa o código seguro e elegante." },
  { nome: "JavaScript", path: siJavascript.path, cor: "#F7DF1E", area: "Linguagem", frase: "A linguagem que dá movimento à web." },
  { nome: "Angular", path: siAngular.path, cor: "#DD0031", area: "Front-end", frase: "Aplicações corporativas, robustas e escaláveis." },
  { nome: "Material UI", path: siMui.path, cor: "#007FFF", area: "Design system", frase: "Componentes consistentes, acessíveis e bonitos." },
  { nome: "Tailwind", path: siTailwindcss.path, cor: "#38BDF8", area: "Estilo", frase: "Estilo ágil, utilitário e pixel-perfect." },
  { nome: "NestJS", path: siNestjs.path, cor: "#E0234E", area: "Back-end", frase: "APIs modulares, organizadas e prontas para escalar." },
  { nome: "Progress 4GL", path: siProgress.path, cor: "#5CE500", area: "Back-end corporativo", frase: "Sistemas de negócio e dados que movem empresas." },
  { nome: "Python", path: siPython.path, cor: "#FFD43B", area: "Linguagem", frase: "Automação, dados e scripts que resolvem." },
  { nome: "C++", path: siCplusplus.path, cor: "#659AD2", area: "Linguagem", frase: "Performance e a base da engenharia." },
];

export const fatos = [
  { id: "idade", foto: "sorriso", numero: perfil.idade, titulo: "anos", texto: "de curiosidade infinita e vontade de criar." },
  { id: "eng", foto: "campus", titulo: "Engenheira", destaque: "da Computação", texto: "Do hardware ao software, da lógica ao design." },
  { id: "casada", foto: "casal", titulo: "Casada", texto: "e muito bem acompanhada nessa jornada." },
  { id: "pet", foto: "pet3", titulo: "Mãe de pet", texto: "dos meus companheiros de quatro patas." },
];

export const momentos = [
  { foto: "aviao", legenda: "Apaixonada por aviação" },
  { foto: "hackathon", legenda: "Hackathons, café e código" },
  { foto: "praia-pet", legenda: "Sol, mar e amor de pet" },
  { foto: "arte", legenda: "Arte que inspira interfaces" },
  { foto: "faceart", legenda: "Cor na pele" },
  { foto: "pet1", legenda: "Mãe de pet em tempo integral" },
  { foto: "aviao2", legenda: "Hangar dos sonhos" },
  { foto: "praia", legenda: "Recarregando a criatividade" },
  { foto: "pet2", legenda: "Amor de quatro patas" },
  { foto: "bone", legenda: "Dias de sol" },
  { foto: "arte2", legenda: "Cor por todo lado" },
  { foto: "carro", legenda: "Sempre em movimento" },
];

export const foto = (nome: string) => `${import.meta.env.BASE_URL}fotos/${nome}.webp`;

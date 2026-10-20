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

// Só dados que não mudam com o idioma; os textos ficam em src/i18n/textos.ts
export const perfil = {
  nome: "Evelyn",
  sobrenome: "Luane",
  idade: 24,
  github: "https://github.com/LYLUANE",
};

export type Tech = { nome: string; path: string; cor: string };

// path = desenho SVG oficial (24×24) de cada logo, extrudado em 3D na cena da stack
export const techs = [
  { nome: "React", path: siReact.path, cor: "#61DAFB" },
  { nome: "TypeScript", path: siTypescript.path, cor: "#3178C6" },
  { nome: "JavaScript", path: siJavascript.path, cor: "#F7DF1E" },
  { nome: "Angular", path: siAngular.path, cor: "#DD0031" },
  { nome: "Material UI", path: siMui.path, cor: "#007FFF" },
  { nome: "Tailwind", path: siTailwindcss.path, cor: "#38BDF8" },
  { nome: "NestJS", path: siNestjs.path, cor: "#E0234E" },
  { nome: "Progress 4GL", path: siProgress.path, cor: "#5CE500" },
  { nome: "Python", path: siPython.path, cor: "#FFD43B" },
  { nome: "C++", path: siCplusplus.path, cor: "#659AD2" },
] as const satisfies readonly Tech[];

export type NomeTech = (typeof techs)[number]["nome"];

export const fatos = [
  { id: "idade", foto: "sorriso", numero: perfil.idade },
  { id: "eng", foto: "hackathon" },
  { id: "casada", foto: "casal" },
  { id: "pet", foto: "pet3" },
] as const;

export type IdFato = (typeof fatos)[number]["id"];

export const momentos = [
  "embraer",
  "aviao",
  "praia-pet",
  "arte",
  "faceart",
  "pet1",
  "aviao2",
  "praia",
  "pet2",
  "bone",
  "arte2",
  "carro",
] as const;

export type Momento = (typeof momentos)[number];

export const foto = (nome: string) => `${import.meta.env.BASE_URL}fotos/${nome}.webp`;

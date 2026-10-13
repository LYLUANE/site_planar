import type { Produto } from "../types";

import criado_mudo from "../assets/produtos/criado_mudo.jpeg";
import escada from "../assets/produtos/escada.jpeg";
import mesa from "../assets/produtos/mesa.jpeg";
import quadro from "../assets/produtos/quadro.jpeg";
import estante from "../assets/produtos/estante.jpeg";
import mesa_reta from "../assets/produtos/mesa-reta.jpeg";

export const PRODUTOS: Produto[] = [
  {
    id: 1,
    nome: "Criado-mudo",
    imagem: criado_mudo,
    legenda:
      "Criado-mudo de medidas 45cm x 35cm x 55cm, madeira pinus envernizada e estrutura de metalon.",
    preco: 280,
  },
  {
    id: 2,
    nome: "Escada Auxiliar",
    imagem: escada,
    legenda:
      "Escada auxiliar de 2 degraus de medidas 40cm x 40cm x 45cm, madeira pinus envernizada e estrutura de metalon.",
    preco: 190,
  },
  {
    id: 3,
    nome: "Mesa de Escritório",
    imagem: mesa,
    legenda:
      "Mesa de escritório/estudo de medidas 120cm x 60cm x 75cm, madeira pinus envernizada e estrutura de metalon.",
    preco: 580,
  },
  {
    id: 4,
    nome: "Moldura Decorativa",
    imagem: quadro,
    legenda:
      "Moldura de quadro decorativo de medidas 30cm x 30cm, estrutura minimalista em metalon.",
    preco: 95,
  },
  {
    id: 5,
    nome: "Estante",
    imagem: estante,
    legenda:
      "Estante de medidas 90cm x 180cm x 34cm, três planos de madeira maciça de 30mm apoiados em colunas de aço escovado.",
    preco: 1450,
  },
  {
    id: 6,
    nome: "Mesa Industrial",
    imagem: mesa_reta,
    legenda:
      "Mesa Industrial de medidas 160cm x 78cm x 80cm, tampo maciço sobre base tubular de aço escovado.",
    preco: 1890,
  },
];

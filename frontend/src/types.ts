export interface Medidas {
  largura: number;
  profundidade: number;
  altura: number;
}

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  precoCentavos: number;
  medidas: Medidas;
  imagem: string;
  imagemUrl: string;
  traducoes?: Partial<Record<"en", { nome: string; descricao: string }>>;
}

export interface ItemCarrinho {
  chave: string;
  produto: Produto;
  medidas: Medidas;
  quantidade: number;
}

export type Papel = "admin" | "cliente";

export interface UsuarioPublico {
  id: number;
  login: string;
  papel: Papel;
}

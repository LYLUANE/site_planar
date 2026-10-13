/** Medidas em centímetros */
export interface Medidas {
  largura: number;
  profundidade: number;
  altura: number;
}

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  /** Preço em centavos (189000 = R$ 1.890,00) */
  precoCentavos: number;
  /** Medidas padrão do produto */
  medidas: Medidas;
  /** Nome do arquivo no backend */
  imagem: string;
  /** URL completa da imagem */
  imagemUrl: string;
}

export interface ItemCarrinho {
  /** Identifica produto + medidas (o mesmo produto em medidas diferentes são itens separados) */
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

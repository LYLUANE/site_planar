export interface Produto {
  id: number;
  nome: string;
  imagem: string;
  legenda: string;
  preco: number;
}

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}

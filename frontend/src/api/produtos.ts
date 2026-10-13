import type { Medidas, Produto } from "../types";
import { API_URL, requisicao } from "./cliente";

// Formato que vem do backend (imagemUrl é relativa à API)
interface ProdutoApi extends Omit<Produto, "imagemUrl"> {
  imagemUrl: string;
}

export interface DadosProduto extends Medidas {
  nome: string;
  descricao: string;
  precoCentavos: number;
  imagem: string;
}

const normalizar = (p: ProdutoApi): Produto => ({
  ...p,
  imagemUrl: `${API_URL}${p.imagemUrl}`,
});

export async function listarProdutos() {
  const produtos = await requisicao<ProdutoApi[]>("/produtos");
  return produtos.map(normalizar);
}

export async function criarProduto(dados: DadosProduto) {
  const produto = await requisicao<ProdutoApi>("/produtos", {
    metodo: "POST",
    corpo: dados,
    autenticado: true,
  });
  return normalizar(produto);
}

export async function atualizarProduto(
  id: number,
  dados: Partial<DadosProduto>,
) {
  const produto = await requisicao<ProdutoApi>(`/produtos/${id}`, {
    metodo: "PATCH",
    corpo: dados,
    autenticado: true,
  });
  return normalizar(produto);
}

export function removerProduto(id: number) {
  return requisicao<void>(`/produtos/${id}`, {
    metodo: "DELETE",
    autenticado: true,
  });
}

/** Envia a foto e devolve o nome do arquivo para usar em `imagem`. */
export async function enviarImagem(arquivo: File) {
  const form = new FormData();
  form.append("arquivo", arquivo);
  const { imagem } = await requisicao<{ imagem: string }>("/uploads/imagens", {
    metodo: "POST",
    corpo: form,
    autenticado: true,
  });
  return imagem;
}

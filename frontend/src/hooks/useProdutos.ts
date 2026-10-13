import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  atualizarProduto,
  criarProduto,
  enviarImagem,
  listarProdutos,
  removerProduto,
  type DadosProduto,
} from "../api/produtos";

const CHAVE_PRODUTOS = ["produtos"] as const;

export function useProdutos() {
  return useQuery({
    queryKey: CHAVE_PRODUTOS,
    queryFn: listarProdutos,
    staleTime: 60_000,
  });
}

interface SalvarProduto {
  id?: number;
  dados: Omit<DadosProduto, "imagem"> & { imagem?: string };
  arquivo?: File | null;
}

export function useSalvarProduto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, dados, arquivo }: SalvarProduto) => {
      const imagem = arquivo ? await enviarImagem(arquivo) : dados.imagem;
      if (id !== undefined) {
        return atualizarProduto(id, { ...dados, imagem });
      }
      if (!imagem) throw new Error("Escolha uma foto para o produto.");
      return criarProduto({ ...dados, imagem });
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: CHAVE_PRODUTOS }),
  });
}

export function useRemoverProduto() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removerProduto,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: CHAVE_PRODUTOS }),
  });
}

import { useEffect, useMemo, useState } from "react";
import type { ItemCarrinho, Medidas, Produto } from "../types";
import { useProdutos } from "./useProdutos";

const STORAGE_KEY = "planar:carrinho:v2";

interface LinhaCarrinho {
  produtoId: number;
  medidas: Medidas;
  quantidade: number;
}

const chaveDe = (produtoId: number, m: Medidas) =>
  `${produtoId}-${m.largura}x${m.profundidade}x${m.altura}`;

function ehLinhaValida(valor: unknown): valor is LinhaCarrinho {
  const l = valor as LinhaCarrinho;
  return (
    Number.isInteger(l?.produtoId) &&
    Number.isInteger(l?.quantidade) &&
    l.quantidade > 0 &&
    [l.medidas?.largura, l.medidas?.profundidade, l.medidas?.altura].every(
      (n) => Number.isInteger(n) && n > 0,
    )
  );
}

function carregar(): LinhaCarrinho[] {
  try {
    const salvo: unknown = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? "[]",
    );
    return Array.isArray(salvo) ? salvo.filter(ehLinhaValida) : [];
  } catch {
    return [];
  }
}

export function useCarrinho() {
  const { data: produtos } = useProdutos();
  const [linhas, setLinhas] = useState<LinhaCarrinho[]>(carregar);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(linhas));
    } catch {}
  }, [linhas]);

  const itens = useMemo<ItemCarrinho[]>(() => {
    if (!produtos) return [];
    const porId = new Map(produtos.map((p) => [p.id, p]));
    return linhas.flatMap((linha) => {
      const produto = porId.get(linha.produtoId);
      return produto
        ? [
            {
              chave: chaveDe(linha.produtoId, linha.medidas),
              produto,
              medidas: linha.medidas,
              quantidade: linha.quantidade,
            },
          ]
        : [];
    });
  }, [linhas, produtos]);

  const totalItens = itens.reduce((soma, item) => soma + item.quantidade, 0);

  const adicionar = (produto: Produto, medidas: Medidas, quantidade = 1) => {
    const chave = chaveDe(produto.id, medidas);
    setLinhas((prev) =>
      prev.some((l) => chaveDe(l.produtoId, l.medidas) === chave)
        ? prev.map((l) =>
            chaveDe(l.produtoId, l.medidas) === chave
              ? { ...l, quantidade: l.quantidade + quantidade }
              : l,
          )
        : [...prev, { produtoId: produto.id, medidas, quantidade }],
    );
  };

  const alterarQuantidade = (chave: string, quantidade: number) => {
    setLinhas((prev) =>
      quantidade <= 0
        ? prev.filter((l) => chaveDe(l.produtoId, l.medidas) !== chave)
        : prev.map((l) =>
            chaveDe(l.produtoId, l.medidas) === chave
              ? { ...l, quantidade }
              : l,
          ),
    );
  };

  const remover = (chave: string) => alterarQuantidade(chave, 0);

  return { itens, totalItens, adicionar, alterarQuantidade, remover };
}

export type Carrinho = ReturnType<typeof useCarrinho>;

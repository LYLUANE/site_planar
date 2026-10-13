import { useEffect, useState } from "react";
import Header from "./Header";
import Head from "./Head";
import Major from "./Major";
import Signboard from "./Signboard";
import Footer from "./Footer";
import { PRODUTOS } from "./data/produtos";
import type { ItemCarrinho, Produto } from "./types";

const STORAGE_KEY = "planar:carrinho";

// Salva apenas id + quantidade; o produto é reconstruído a partir do catálogo,
// assim preço e imagem estão sempre atualizados.
function carregarCarrinho(): ItemCarrinho[] {
  try {
    const salvo = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as {
      id: number;
      quantidade: number;
    }[];
    return salvo.flatMap(({ id, quantidade }) => {
      const produto = PRODUTOS.find((p) => p.id === id);
      return produto && quantidade > 0 ? [{ produto, quantidade }] : [];
    });
  } catch {
    return [];
  }
}

function Home() {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>(carregarCarrinho);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          carrinho.map(({ produto, quantidade }) => ({
            id: produto.id,
            quantidade,
          })),
        ),
      );
    } catch {
      // localStorage indisponível (modo privado, etc.) — segue sem persistir
    }
  }, [carrinho]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho((prev) =>
      prev.some((item) => item.produto.id === produto.id)
        ? prev.map((item) =>
            item.produto.id === produto.id
              ? { ...item, quantidade: item.quantidade + 1 }
              : item,
          )
        : [...prev, { produto, quantidade: 1 }],
    );
  };

  const alterarQuantidade = (produto: Produto, quantidade: number) => {
    setCarrinho((prev) =>
      quantidade <= 0
        ? prev.filter((item) => item.produto.id !== produto.id)
        : prev.map((item) =>
            item.produto.id === produto.id ? { ...item, quantidade } : item,
          ),
    );
  };

  const removerDoCarrinho = (produto: Produto) => {
    alterarQuantidade(produto, 0);
  };

  return (
    <>
      <Header
        carrinho={carrinho}
        carrinhoAberto={carrinhoAberto}
        onOpenCarrinho={() => setCarrinhoAberto(true)}
        onCloseCarrinho={() => setCarrinhoAberto(false)}
        onAlterarQuantidade={alterarQuantidade}
        onRemoverDoCarrinho={removerDoCarrinho}
      />
      <Head />
      <Signboard />
      <Major onAdicionarAoCarrinho={adicionarAoCarrinho} />
      <Signboard />
      <Footer />
    </>
  );
}

export default Home;

import { useState } from "react";
import Head from "./Head";
import Major from "./Major";
import type { Produto } from "./Major";
import Signboard from "./Signboard";
import Footer from "./Footer";

function Home() {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState<boolean>(false);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho((prev) => [...prev, produto]);
  };

  const removerDoCarrinho = (produtoRemover: Produto) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== produtoRemover.id));
  };

  const handleOpenCarrinho = () => {
    setCarrinhoAberto(true);
  };

  const handleCloseCarrinho = () => {
    setCarrinhoAberto(false);
  };

  return (
    <>
      <Head
        carrinho={carrinho}
        carrinhoAberto={carrinhoAberto}
        onOpenCarrinho={handleOpenCarrinho}
        onCloseCarrinho={handleCloseCarrinho}
        onRemoverDoCarrinho={removerDoCarrinho}
      />
      <Signboard />
      <Major onAdicionarAoCarrinho={adicionarAoCarrinho} />
      <Signboard />
      <Footer />
    </>
  );
}

export default Home;

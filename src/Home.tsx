import { useState } from "react";
import Head from "./Head";
import Major from "./Major";
import type { Produto } from "./Major";
import Signboard from "./Signboard";

function Home() {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [carrinhoAberto, setCarrinhoAberto] = useState<boolean>(false);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho((prev) => [...prev, produto]);
  };

  const handleOpenCarrinho = () => {
    setCarrinhoAberto(true);
    //  abrir o Drawer ou Drawer/Modal do carrinho
  };

  return (
    <>
      <Head carrinho={carrinho} onOpenCarrinho={handleOpenCarrinho} />
      <Major onAdicionarAoCarrinho={adicionarAoCarrinho} />
      <Signboard />
    </>
  );
}

export default Home;

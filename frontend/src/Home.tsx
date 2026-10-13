import { useState } from "react";
import Header from "./Header";
import Head from "./Head";
import Major from "./Major";
import Signboard from "./Signboard";
import Footer from "./Footer";
import { useCarrinho } from "./hooks/useCarrinho";

function Home() {
  const carrinho = useCarrinho();
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);

  return (
    <>
      <Header
        carrinho={carrinho}
        carrinhoAberto={carrinhoAberto}
        onOpenCarrinho={() => setCarrinhoAberto(true)}
        onCloseCarrinho={() => setCarrinhoAberto(false)}
      />
      <Head />
      <Signboard />
      <Major onAdicionarAoCarrinho={carrinho.adicionar} />
      <Signboard />
      <Footer />
    </>
  );
}

export default Home;

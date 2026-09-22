import { useState } from "react";
import Head from "./Head";
import Major from "./Major";
import Signboard from "./Signboard";


export interface Produto {
  id: number;
  nome: string;
  legenda: string;
}

function Home() {


  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  const adicionarAoCarrinho = (produto: Produto) => {
    setCarrinho((prev) => [...prev, produto]);
  };
  return (
    <>
      <Head carrinho={carrinho}/>
      <Major AddCarrinho={adicionarAoCarrinho}/>
      <Signboard />
      <Major />
    </>
  );
}

export default Home;

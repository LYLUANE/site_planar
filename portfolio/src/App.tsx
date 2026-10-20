import { useEffect, useState } from "react";
import Contato from "./components/Contato";
import Cursor from "./components/Cursor";
import Estrelas from "./components/Estrelas";
import Galeria from "./components/Galeria";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import Manifesto from "./components/Manifesto";
import Nav from "./components/Nav";
import Sobre from "./components/Sobre";
import Stack from "./components/Stack";
import Transicao from "./components/Transicao";
import { reduzMovimento } from "./lib/gsap";
import { iniciarScrollSuave, travarScroll } from "./lib/scroll";

export default function App() {
  const [pronto, setPronto] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const parar = reduzMovimento() ? () => {} : iniciarScrollSuave();
    travarScroll(true);
    return parar;
  }, []);

  useEffect(() => {
    if (pronto) travarScroll(false);
  }, [pronto]);

  return (
    <>
      <Estrelas />
      <Cursor />
      {carregando && <Loader onRevelar={() => setPronto(true)} onFim={() => setCarregando(false)} />}
      <Nav />
      <main id="topo">
        <Hero pronto={pronto} />
        <Manifesto />
        <Sobre />
        <Stack />
        <Galeria />
        <Transicao />
        <Contato />
      </main>
    </>
  );
}

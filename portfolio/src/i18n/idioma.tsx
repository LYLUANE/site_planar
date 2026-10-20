import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { textos, type Idioma } from "./textos";

const CHAVE = "portfolio-idioma";

// Prioridade: ?lang= na URL → escolha salva → idioma do navegador
function idiomaInicial(): Idioma {
  const daUrl = new URLSearchParams(location.search).get("lang");
  if (daUrl === "pt" || daUrl === "en") return daUrl;
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo === "pt" || salvo === "en") return salvo;
  } catch {
    /* navegação privada: segue sem preferência salva */
  }
  return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
}

type Ctx = { idioma: Idioma; t: (typeof textos)[Idioma]; setIdioma: (i: Idioma) => void };
const IdiomaCtx = createContext<Ctx | null>(null);

export function IdiomaProvider({ children }: { children: ReactNode }) {
  const [idioma, setIdiomaState] = useState(idiomaInicial);
  const t = textos[idioma];

  useEffect(() => {
    document.documentElement.lang = idioma === "pt" ? "pt-BR" : "en";
    document.title = t.meta.titulo;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.descricao);
  }, [idioma, t]);

  const setIdioma = (i: Idioma) => {
    setIdiomaState(i);
    try {
      localStorage.setItem(CHAVE, i);
    } catch {
      /* ignora */
    }
    const url = new URL(location.href);
    url.searchParams.set("lang", i);
    history.replaceState(null, "", url);
  };

  return <IdiomaCtx.Provider value={{ idioma, t, setIdioma }}>{children}</IdiomaCtx.Provider>;
}

export function useIdioma() {
  const ctx = useContext(IdiomaCtx);
  if (!ctx) throw new Error("useIdioma precisa estar dentro de <IdiomaProvider>");
  return ctx;
}

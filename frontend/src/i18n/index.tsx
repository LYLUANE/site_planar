import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Produto } from "../types";
import { ignorarErro } from "../utils";
import { TEXTOS, type Idioma, type Textos } from "./textos";

export type { Idioma } from "./textos";

const CHAVE = "planar:idioma";

function idiomaInicial(): Idioma {
  const daUrl = new URLSearchParams(window.location.search).get("lang");
  if (daUrl === "pt" || daUrl === "en") return daUrl;
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo === "pt" || salvo === "en") return salvo;
  } catch {
    return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
  }
  return navigator.language.toLowerCase().startsWith("pt") ? "pt" : "en";
}

interface IdiomaContexto {
  idioma: Idioma;
  setIdioma: (idioma: Idioma) => void;
  t: Textos;
  textoDoProduto: (produto: Produto) => { nome: string; descricao: string };
}

const Contexto = createContext<IdiomaContexto | null>(null);

export function IdiomaProvider({ children }: { children: ReactNode }) {
  const [idioma, setIdiomaEstado] = useState<Idioma>(idiomaInicial);

  useEffect(() => {
    document.documentElement.lang = idioma === "pt" ? "pt-BR" : "en";
    document.title = TEXTOS[idioma].tituloPagina;
  }, [idioma]);

  const setIdioma = useCallback((novo: Idioma) => {
    setIdiomaEstado(novo);
    ignorarErro(() => localStorage.setItem(CHAVE, novo));
  }, []);

  const valor = useMemo<IdiomaContexto>(
    () => ({
      idioma,
      setIdioma,
      t: TEXTOS[idioma],
      textoDoProduto: (produto) => {
        const traducao =
          idioma === "pt" ? undefined : produto.traducoes?.[idioma];
        return {
          nome: traducao?.nome ?? produto.nome,
          descricao: traducao?.descricao ?? produto.descricao,
        };
      },
    }),
    [idioma, setIdioma],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useIdioma() {
  const contexto = useContext(Contexto);
  if (!contexto) {
    throw new Error("useIdioma precisa estar dentro de <IdiomaProvider>");
  }
  return contexto;
}

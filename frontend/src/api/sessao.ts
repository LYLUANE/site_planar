import type { UsuarioPublico } from "../types";
import { ignorarErro } from "../utils";

const CHAVE = "planar:sessao";

export interface Sessao {
  token: string;
  usuario: UsuarioPublico;
}

export function lerSessao(): Sessao | null {
  try {
    const salvo = sessionStorage.getItem(CHAVE);
    return salvo ? (JSON.parse(salvo) as Sessao) : null;
  } catch {
    return null;
  }
}

export function salvarSessao(sessao: Sessao) {
  ignorarErro(() => sessionStorage.setItem(CHAVE, JSON.stringify(sessao)));
}

export function limparSessao() {
  ignorarErro(() => sessionStorage.removeItem(CHAVE));
  window.dispatchEvent(new Event("planar:sessao-expirada"));
}

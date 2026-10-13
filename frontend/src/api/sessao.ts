import type { UsuarioPublico } from "../types";

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
  try {
    sessionStorage.setItem(CHAVE, JSON.stringify(sessao));
  } catch {}
}

export function limparSessao() {
  try {
    sessionStorage.removeItem(CHAVE);
  } catch {}
  window.dispatchEvent(new Event("planar:sessao-expirada"));
}

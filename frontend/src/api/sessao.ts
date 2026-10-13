import type { UsuarioPublico } from "../types";

// Sessão do admin no sessionStorage: some ao fechar a aba e não é
// compartilhada entre abas. O token expira em 1h no backend de qualquer forma.
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
  } catch {
    // armazenamento indisponível: a sessão vale só enquanto a página estiver aberta
  }
}

export function limparSessao() {
  try {
    sessionStorage.removeItem(CHAVE);
  } catch {
    // ignora
  }
  window.dispatchEvent(new Event("planar:sessao-expirada"));
}

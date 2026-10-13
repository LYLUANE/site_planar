import type { UsuarioPublico } from "../types";
import { requisicao } from "./cliente";

export function login(login: string, senha: string) {
  return requisicao<{ accessToken: string; usuario: UsuarioPublico }>(
    "/auth/login",
    { metodo: "POST", corpo: { login, senha } },
  );
}

export function buscarUsuarioAtual() {
  return requisicao<UsuarioPublico>("/auth/me", { autenticado: true });
}

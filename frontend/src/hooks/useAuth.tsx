import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { buscarUsuarioAtual, login } from "../api/auth";
import {
  lerSessao,
  limparSessao,
  salvarSessao,
  type Sessao,
} from "../api/sessao";
import type { UsuarioPublico } from "../types";

interface AuthContexto {
  usuario: UsuarioPublico | null;
  verificando: boolean;
  ehAdmin: boolean;
  entrar: (login: string, senha: string) => Promise<void>;
  entrando: boolean;
  erroLogin: Error | null;
  sair: () => void;
}

const Contexto = createContext<AuthContexto | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [sessao, setSessao] = useState<Sessao | null>(lerSessao);

  useEffect(() => {
    const aoExpirar = () => setSessao(null);
    window.addEventListener("planar:sessao-expirada", aoExpirar);
    return () =>
      window.removeEventListener("planar:sessao-expirada", aoExpirar);
  }, []);

  const { data: usuarioConfirmado, isPending } = useQuery({
    queryKey: ["auth", "me", sessao?.token],
    queryFn: buscarUsuarioAtual,
    enabled: sessao !== null,
    retry: false,
    staleTime: 5 * 60_000,
  });

  const mutacaoLogin = useMutation({
    mutationFn: ({ login: l, senha }: { login: string; senha: string }) =>
      login(l, senha),
    onSuccess: ({ accessToken, usuario }) => {
      const nova = { token: accessToken, usuario };
      salvarSessao(nova);
      setSessao(nova);
    },
  });

  const { mutateAsync: loginAsync } = mutacaoLogin;
  const entrar = useCallback(
    async (l: string, senha: string) => {
      await loginAsync({ login: l, senha });
    },
    [loginAsync],
  );

  const sair = useCallback(() => {
    limparSessao();
    setSessao(null);
    queryClient.removeQueries({ queryKey: ["auth"] });
  }, [queryClient]);

  const valor = useMemo<AuthContexto>(() => {
    const usuario = sessao ? (usuarioConfirmado ?? null) : null;
    return {
      usuario,
      verificando: sessao !== null && isPending,
      ehAdmin: usuario?.papel === "admin",
      entrar,
      entrando: mutacaoLogin.isPending,
      erroLogin: mutacaoLogin.error,
      sair,
    };
  }, [
    sessao,
    usuarioConfirmado,
    isPending,
    entrar,
    mutacaoLogin.isPending,
    mutacaoLogin.error,
    sair,
  ]);

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const contexto = useContext(Contexto);
  if (!contexto)
    throw new Error("useAuth precisa estar dentro de <AuthProvider>");
  return contexto;
}

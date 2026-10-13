import { lerSessao, limparSessao } from "./sessao";

export const API_URL = (
  import.meta.env.VITE_API_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, mensagem: string) {
    super(mensagem);
    this.status = status;
  }
}

const MENSAGENS_PADRAO: Record<number, string> = {
  400: "Dados inválidos. Confira os campos e tente novamente.",
  401: "Sua sessão expirou. Faça login novamente.",
  403: "Você não tem permissão para isso.",
  404: "Não encontrado.",
  413: "Arquivo grande demais.",
  429: "Muitas tentativas. Aguarde um minuto e tente de novo.",
};

// Mensagem do backend pode vir como string ou lista (erros de validação)
function extrairMensagem(status: number, corpo: unknown): string {
  const mensagem = (corpo as { message?: unknown } | null)?.message;
  if (typeof mensagem === "string") return mensagem;
  if (Array.isArray(mensagem) && typeof mensagem[0] === "string") {
    return mensagem.join(" • ");
  }
  return MENSAGENS_PADRAO[status] ?? "Erro inesperado. Tente novamente.";
}

interface Opcoes {
  metodo?: "GET" | "POST" | "PATCH" | "DELETE";
  corpo?: unknown;
  autenticado?: boolean;
}

/** Faz a chamada à API e devolve o JSON já tipado (ou lança ApiError). */
export async function requisicao<T>(
  caminho: string,
  { metodo = "GET", corpo, autenticado = false }: Opcoes = {},
): Promise<T> {
  const headers: Record<string, string> = {};
  const ehArquivo = corpo instanceof FormData;
  if (corpo !== undefined && !ehArquivo) {
    headers["Content-Type"] = "application/json";
  }

  const sessao = autenticado ? lerSessao() : null;
  if (sessao) headers.Authorization = `Bearer ${sessao.token}`;

  let resposta: Response;
  try {
    resposta = await fetch(`${API_URL}/api${caminho}`, {
      method: metodo,
      headers,
      body: ehArquivo
        ? corpo
        : corpo !== undefined
          ? JSON.stringify(corpo)
          : undefined,
    });
  } catch {
    throw new ApiError(0, "Não foi possível conectar ao servidor.");
  }

  if (resposta.status === 204) return undefined as T;

  const dados: unknown = await resposta.json().catch(() => null);
  if (!resposta.ok) {
    // token vencido/inválido: encerra a sessão para o app mandar ao login
    if (resposta.status === 401 && sessao) limparSessao();
    throw new ApiError(
      resposta.status,
      extrairMensagem(resposta.status, dados),
    );
  }
  return dados as T;
}

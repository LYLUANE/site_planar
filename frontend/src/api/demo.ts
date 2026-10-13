import aparador from "../assets/produtos/aparador.jpeg";
import criadoMudo from "../assets/produtos/criado_mudo.jpeg";
import escada from "../assets/produtos/escada.jpeg";
import estante from "../assets/produtos/estante.jpeg";
import mesaEscritorio from "../assets/produtos/mesa.jpeg";
import mesaIndustrial from "../assets/produtos/mesa-reta.jpeg";
import moldura from "../assets/produtos/quadro.jpeg";
import type { Medidas, UsuarioPublico } from "../types";
import { ApiError, CREDENCIAIS_DEMO } from "./cliente";

const { login: LOGIN_DEMO, senha: SENHA_DEMO } = CREDENCIAIS_DEMO;

const TOKEN_DEMO = "token-demonstracao";
const USUARIO_DEMO: UsuarioPublico = {
  id: 1,
  login: LOGIN_DEMO,
  papel: "admin",
};
const CHAVE = "planar:demo:v2";
const LADO_MAXIMO_FOTO = 900;

interface ProdutoDemo {
  id: number;
  nome: string;
  descricao: string;
  precoCentavos: number;
  medidas: Medidas;
  imagem: string;
}

interface Estado {
  produtos: ProdutoDemo[];
  proximoId: number;
  imagens: Record<string, string>;
}

const FOTOS_INICIAIS: Record<string, string> = {
  "criado-mudo.jpeg": criadoMudo,
  "escada.jpeg": escada,
  "mesa-escritorio.jpeg": mesaEscritorio,
  "moldura.jpeg": moldura,
  "estante.jpeg": estante,
  "mesa-industrial.jpeg": mesaIndustrial,
  "aparador.jpeg": aparador,
};

const PRODUTOS_INICIAIS: ProdutoDemo[] = [
  {
    id: 1,
    nome: "Criado-mudo",
    descricao:
      "Criado-mudo em madeira pinus envernizada com estrutura de metalon.",
    precoCentavos: 28000,
    medidas: { largura: 45, profundidade: 35, altura: 55 },
    imagem: "criado-mudo.jpeg",
  },
  {
    id: 2,
    nome: "Escada Auxiliar",
    descricao:
      "Escada auxiliar de 2 degraus em madeira pinus envernizada com estrutura de metalon.",
    precoCentavos: 19000,
    medidas: { largura: 40, profundidade: 40, altura: 45 },
    imagem: "escada.jpeg",
  },
  {
    id: 3,
    nome: "Mesa de Escritório",
    descricao:
      "Mesa de escritório/estudo em madeira pinus envernizada com estrutura de metalon.",
    precoCentavos: 58000,
    medidas: { largura: 120, profundidade: 60, altura: 75 },
    imagem: "mesa-escritorio.jpeg",
  },
  {
    id: 4,
    nome: "Moldura Decorativa",
    descricao:
      "Moldura de quadro decorativo com estrutura minimalista em metalon.",
    precoCentavos: 9500,
    medidas: { largura: 30, profundidade: 2, altura: 30 },
    imagem: "moldura.jpeg",
  },
  {
    id: 5,
    nome: "Estante",
    descricao:
      "Estante com três planos de madeira maciça de 30mm apoiados em colunas de aço escovado.",
    precoCentavos: 145000,
    medidas: { largura: 90, profundidade: 34, altura: 180 },
    imagem: "estante.jpeg",
  },
  {
    id: 6,
    nome: "Mesa Industrial",
    descricao:
      "Mesa Industrial com tampo maciço sobre base tubular de aço escovado.",
    precoCentavos: 189000,
    medidas: { largura: 160, profundidade: 78, altura: 80 },
    imagem: "mesa-industrial.jpeg",
  },
  {
    id: 7,
    nome: "Aparador",
    descricao:
      "Aparador de churrasqueira, perfeito para colocar os espetos e a grelha apoiados.",
    precoCentavos: 25000,
    medidas: { largura: 72, profundidade: 5, altura: 35 },
    imagem: "aparador.jpeg",
  },
];

const estadoInicial = (): Estado => ({
  produtos: structuredClone(PRODUTOS_INICIAIS),
  proximoId: PRODUTOS_INICIAIS.length + 1,
  imagens: {},
});

function ler(): Estado {
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo) return JSON.parse(salvo) as Estado;
  } catch {
    return estadoInicial();
  }
  return estadoInicial();
}

function gravar(estado: Estado) {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(estado));
  } catch {
    throw new ApiError(
      413,
      "Sem espaço no navegador para mais fotos. Remova algum produto ou restaure a demonstração.",
    );
  }
}

export function restaurarDemo() {
  try {
    localStorage.removeItem(CHAVE);
  } catch {
    return;
  }
}

const paraResposta = (p: ProdutoDemo, estado: Estado) => ({
  ...p,
  imagemUrl: FOTOS_INICIAIS[p.imagem] ?? estado.imagens[p.imagem] ?? "",
});

const imagemExiste = (nome: string, estado: Estado) =>
  nome in FOTOS_INICIAIS || nome in estado.imagens;

function removerImagemOrfa(nome: string, estado: Estado) {
  if (!estado.produtos.some((p) => p.imagem === nome)) {
    delete estado.imagens[nome];
  }
}

async function reduzirFoto(arquivo: File) {
  const bitmap = await createImageBitmap(arquivo);
  const escala = Math.min(
    1,
    LADO_MAXIMO_FOTO / Math.max(bitmap.width, bitmap.height),
  );
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * escala);
  canvas.height = Math.round(bitmap.height * escala);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.82);
}

interface DadosProdutoDemo {
  nome?: string;
  descricao?: string;
  precoCentavos?: number;
  largura?: number;
  profundidade?: number;
  altura?: number;
  imagem?: string;
}

function aplicar(produto: ProdutoDemo, dados: DadosProdutoDemo): ProdutoDemo {
  return {
    ...produto,
    nome: dados.nome ?? produto.nome,
    descricao: dados.descricao ?? produto.descricao,
    precoCentavos: dados.precoCentavos ?? produto.precoCentavos,
    imagem: dados.imagem ?? produto.imagem,
    medidas: {
      largura: dados.largura ?? produto.medidas.largura,
      profundidade: dados.profundidade ?? produto.medidas.profundidade,
      altura: dados.altura ?? produto.medidas.altura,
    },
  };
}

interface RequisicaoDemo {
  metodo: "GET" | "POST" | "PATCH" | "DELETE";
  corpo?: unknown;
  token?: string;
}

const esperar = () =>
  new Promise((ok) => setTimeout(ok, 200 + Math.random() * 250));

export async function responderDemo<T>(
  caminho: string,
  { metodo, corpo, token }: RequisicaoDemo,
): Promise<T> {
  await esperar();
  const estado = ler();
  const rota = `${metodo} ${caminho.replace(/\/\d+$/, "/:id")}`;
  const id = Number(caminho.match(/\/(\d+)$/)?.[1]);

  const exigirLogin = () => {
    if (token !== TOKEN_DEMO) {
      throw new ApiError(401, "Sua sessão expirou. Faça login novamente.");
    }
  };

  const buscar = () => {
    const produto = estado.produtos.find((p) => p.id === id);
    if (!produto) throw new ApiError(404, "Produto não encontrado");
    return produto;
  };

  switch (rota) {
    case "POST /auth/login": {
      const { login, senha } = corpo as { login: string; senha: string };
      if (login !== LOGIN_DEMO || senha !== SENHA_DEMO) {
        throw new ApiError(401, "Login ou senha incorretos");
      }
      return { accessToken: TOKEN_DEMO, usuario: USUARIO_DEMO } as T;
    }

    case "GET /auth/me":
      exigirLogin();
      return USUARIO_DEMO as T;

    case "GET /produtos":
      return estado.produtos.map((p) => paraResposta(p, estado)) as T;

    case "GET /produtos/:id":
      return paraResposta(buscar(), estado) as T;

    case "POST /produtos": {
      exigirLogin();
      const dados = corpo as DadosProdutoDemo;
      if (!dados.imagem || !imagemExiste(dados.imagem, estado)) {
        throw new ApiError(400, "Imagem não encontrada: envie-a primeiro");
      }
      const novo = aplicar(
        {
          id: estado.proximoId,
          nome: "",
          descricao: "",
          precoCentavos: 0,
          medidas: { largura: 1, profundidade: 1, altura: 1 },
          imagem: dados.imagem,
        },
        dados,
      );
      estado.produtos.push(novo);
      estado.proximoId += 1;
      gravar(estado);
      return paraResposta(novo, estado) as T;
    }

    case "PATCH /produtos/:id": {
      exigirLogin();
      const dados = corpo as DadosProdutoDemo;
      const atual = buscar();
      if (dados.imagem && !imagemExiste(dados.imagem, estado)) {
        throw new ApiError(400, "Imagem não encontrada: envie-a primeiro");
      }
      const atualizado = aplicar(atual, dados);
      estado.produtos = estado.produtos.map((p) =>
        p.id === id ? atualizado : p,
      );
      if (atual.imagem !== atualizado.imagem) {
        removerImagemOrfa(atual.imagem, estado);
      }
      gravar(estado);
      return paraResposta(atualizado, estado) as T;
    }

    case "DELETE /produtos/:id": {
      exigirLogin();
      const produto = buscar();
      estado.produtos = estado.produtos.filter((p) => p.id !== id);
      removerImagemOrfa(produto.imagem, estado);
      gravar(estado);
      return undefined as T;
    }

    case "POST /uploads/imagens": {
      exigirLogin();
      const arquivo = (corpo as FormData).get("arquivo");
      if (!(arquivo instanceof File)) {
        throw new ApiError(400, "Envie um arquivo de imagem");
      }
      let foto: string;
      try {
        foto = await reduzirFoto(arquivo);
      } catch {
        throw new ApiError(400, "Formato inválido: use JPG, PNG ou WEBP");
      }
      const nome = `demo-${crypto.randomUUID()}.jpg`;
      estado.imagens[nome] = foto;
      gravar(estado);
      return { imagem: nome, url: foto } as T;
    }

    default:
      throw new ApiError(404, "Não encontrado.");
  }
}

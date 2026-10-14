export type Idioma = "pt" | "en";

interface LinhaPedido {
  quantidade: number;
  nome: string;
  medidas: string;
  personalizado: boolean;
  subtotal: string;
}

interface Dica {
  acao: string;
  efeito: string;
}

const formatadorPt = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const formatadorEn = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "BRL",
});

const pt = {
  tituloPagina: "PLANAR | Móveis Industriais de Aço e Madeira",
  preco: (centavos: number) => formatadorPt.format(centavos / 100),
  separadorDecimal: ",",
  idioma: { rotulo: "Idioma" },
  geral: {
    cancelar: "Cancelar",
    remover: "Remover",
    salvar: "Salvar",
    tentarDeNovo: "Tentar de novo",
  },
  header: {
    estrutura: "Estrutura",
    catalogo: "Catálogo",
    contato: "Contato",
    carrinhoAria: (n: number) => `carrinho de compras, ${n} itens`,
  },
  hero: {
    titulo1: "Honestidade",
    titulo2: "estrutural.",
    texto:
      "Móveis Industriais de aço e madeira. Cada parafuso, cada tubo, cada tampo — visíveis. Gire a Mesa Industrial e veja como ela é feita.",
  },
  guia: {
    aria: "Como manipular a mesa em 3D",
    toque: [
      { acao: "Deslize", efeito: "para girar" },
      { acao: "Pinça", efeito: "para ampliar" },
      { acao: "Toque 2×", efeito: "para centralizar" },
    ] as Dica[],
    mouse: [
      { acao: "Arraste", efeito: "para girar" },
      { acao: "Scroll", efeito: "para ampliar" },
      { acao: "Duplo clique", efeito: "para centralizar" },
    ] as Dica[],
    carregando: (progresso: number) => `Carregando holograma… ${progresso}%`,
  },
  letreiro: [
    "SAPATAS NIVELADORAS",
    "FEITO SOB MEDIDA",
    "ENTREGA PARA TODO O BRASIL",
    "AÇO ESCOVADO",
    "MADEIRA MACIÇA",
    "PARAFUSOS OCULTOS",
  ],
  produtos: {
    titulo: "Nossos Produtos",
    erroCarregar: "Não foi possível carregar os produtos.",
    vazio: "Nenhum produto cadastrado ainda.",
    adicionarAria: (nome: string) => `adicionar ${nome} ao carrinho`,
    eixos: "(L × P × A)",
  },
  medidas: {
    largura: "Largura",
    profundidade: "Profundidade",
    altura: "Altura",
    emCm: (rotulo: string) => `${rotulo} em cm`,
    padrao: (medidas: string) =>
      `Medidas padrão: ${medidas}. Ajuste se precisar de outro tamanho — fazemos sob medida.`,
    quantidade: "Quantidade",
    deUmA99: "De 1 a 99",
    numeroInteiro: "Use um número inteiro",
    entre: (min: number, max: number) => `Entre ${min} e ${max} cm`,
    voltarPadrao: "Medidas padrão",
    orcamento:
      "Para um orçamento mais detalhado, converse com o vendedor desta peça.",
    conversar: "Conversar com o vendedor",
    adicionar: "Adicionar ao carrinho",
  },
  carrinho: {
    titulo: (n: number) => `Seu Carrinho (${n})`,
    fecharAria: "fechar carrinho",
    vazio: "Seu carrinho está vazio.",
    personalizado: "• personalizado",
    removerAria: (nome: string) => `remover ${nome}`,
    diminuirAria: (nome: string) => `diminuir quantidade de ${nome}`,
    aumentarAria: (nome: string) => `aumentar quantidade de ${nome}`,
    total: "Total",
    finalizar: "Finalizar Pedido",
    removerTitulo: "Remover produto?",
    removerAntes: "Tem certeza de que deseja remover",
    removerDepois: "do carrinho?",
  },
  rodape: {
    slogan:
      "Soluções modernas em móveis com qualidade, elegância e design pensado para o seu ambiente.",
    navegacao: "Navegação",
    inicio: "Início",
    produtos: "Produtos",
    admin: "Área do administrador",
    contato: "Atendimento & Contato",
    email: "Email:",
    telefone: "Telefone:",
    direitos: (ano: number) =>
      `© ${ano} PLANAR Móveis. Todos os direitos reservados.`,
  },
  login: {
    titulo: "Área administrativa",
    subtitulo: "PLANAR Móveis",
    demo: "Demonstração — login",
    demoSenha: "senha",
    preencher: "Preencher",
    login: "Login",
    senha: "Senha",
    entrar: "Entrar",
    voltar: "← Voltar para o site",
    loginInvalido: "Login inválido",
    senhaCurta: "A senha tem pelo menos 8 caracteres",
    credenciaisErradas: "Login ou senha incorretos.",
    erroInesperado: "Erro inesperado. Tente novamente.",
    mostrarSenha: "mostrar senha",
    esconderSenha: "esconder senha",
  },
  admin: {
    verSite: "Ver site",
    sair: "Sair",
    produtos: "Produtos",
    novo: "Novo produto",
    restaurar: "Restaurar produtos",
    avisoDemo:
      "Modo demonstração: cadastre, edite e remova à vontade. As alterações ficam salvas só neste navegador.",
    colunaProduto: "Produto",
    colunaMedidas: "Medidas (L × P × A)",
    colunaPreco: "Preço",
    colunaAcoes: "Ações",
    vazio: "Nenhum produto cadastrado. Clique em “Novo produto”.",
    editarAria: (nome: string) => `editar ${nome}`,
    removerAria: (nome: string) => `remover ${nome}`,
    removerTitulo: "Remover produto?",
    removerTexto: "será removido do site. Essa ação não pode ser desfeita.",
  },
  formulario: {
    novo: "Novo produto",
    editar: "Editar produto",
    trocarFoto: "Trocar foto",
    escolherFoto: "Escolher foto",
    ajudaFoto: "JPG, PNG ou WEBP até 2 MB",
    nome: "Nome",
    descricao: "Descrição",
    preco: "Preço",
    medidasPadrao: "Medidas padrão (cm)",
    erroNome: "De 2 a 80 caracteres",
    erroDescricao: "De 5 a 500 caracteres",
    erroPreco: "Ex.: 1.890,00",
    erroMedida: (max: number) => `1 a ${max}`,
    erroFoto: "Escolha uma foto",
    erroTipoFoto: "Use JPG, PNG ou WEBP",
    erroTamanhoFoto: "A foto deve ter até 2 MB",
  },
  whatsapp: {
    linha: ({
      quantidade,
      nome,
      medidas,
      personalizado,
      subtotal,
    }: LinhaPedido) =>
      `• ${quantidade}x ${nome} — ${medidas}${personalizado ? " (medidas personalizadas)" : ""} — ${subtotal}`,
    pedido: (linhas: string[], total: string, personalizado: boolean) =>
      [
        "Olá! Gostaria de fazer o seguinte pedido:",
        "",
        ...linhas,
        "",
        `Total: ${total}`,
        ...(personalizado
          ? [
              "",
              "Sei que o valor pode mudar por causa das medidas personalizadas.",
            ]
          : []),
      ].join("\n"),
    orcamento: (
      quantidade: number,
      nome: string,
      desejadas: string,
      padrao: string,
    ) =>
      [
        `Olá! Gostaria de um orçamento para ${quantidade}x ${nome} com medidas personalizadas:`,
        "",
        `• Medidas desejadas: ${desejadas} (L × P × A)`,
        `• Medidas padrão: ${padrao}`,
      ].join("\n"),
  },
};

export type Textos = typeof pt;

const en: Textos = {
  tituloPagina: "PLANAR | Industrial Steel & Wood Furniture",
  preco: (centavos) => formatadorEn.format(centavos / 100),
  separadorDecimal: ".",
  idioma: { rotulo: "Language" },
  geral: {
    cancelar: "Cancel",
    remover: "Remove",
    salvar: "Save",
    tentarDeNovo: "Try again",
  },
  header: {
    estrutura: "Structure",
    catalogo: "Catalog",
    contato: "Contact",
    carrinhoAria: (n) => `shopping cart, ${n} items`,
  },
  hero: {
    titulo1: "Structural",
    titulo2: "honesty.",
    texto:
      "Industrial furniture in steel and wood. Every screw, every tube, every tabletop — on display. Rotate the Industrial Table and see how it's made.",
  },
  guia: {
    aria: "How to handle the 3D table",
    toque: [
      { acao: "Swipe", efeito: "to rotate" },
      { acao: "Pinch", efeito: "to zoom" },
      { acao: "Double tap", efeito: "to recenter" },
    ],
    mouse: [
      { acao: "Drag", efeito: "to rotate" },
      { acao: "Scroll", efeito: "to zoom" },
      { acao: "Double-click", efeito: "to recenter" },
    ],
    carregando: (progresso) => `Loading hologram… ${progresso}%`,
  },
  letreiro: [
    "LEVELING FEET",
    "MADE TO MEASURE",
    "SHIPPING ACROSS BRAZIL",
    "BRUSHED STEEL",
    "SOLID WOOD",
    "HIDDEN SCREWS",
  ],
  produtos: {
    titulo: "Our Products",
    erroCarregar: "We couldn't load the products.",
    vazio: "No products yet.",
    adicionarAria: (nome) => `add ${nome} to cart`,
    eixos: "(W × D × H)",
  },
  medidas: {
    largura: "Width",
    profundidade: "Depth",
    altura: "Height",
    emCm: (rotulo) => `${rotulo} in cm`,
    padrao: (medidas) =>
      `Default size: ${medidas}. Need a different size? Adjust it — we make it to measure.`,
    quantidade: "Quantity",
    deUmA99: "From 1 to 99",
    numeroInteiro: "Use a whole number",
    entre: (min, max) => `Between ${min} and ${max} cm`,
    voltarPadrao: "Default size",
    orcamento: "For a detailed quote, talk to the seller of this piece.",
    conversar: "Talk to the seller",
    adicionar: "Add to cart",
  },
  carrinho: {
    titulo: (n) => `Your Cart (${n})`,
    fecharAria: "close cart",
    vazio: "Your cart is empty.",
    personalizado: "• custom size",
    removerAria: (nome) => `remove ${nome}`,
    diminuirAria: (nome) => `decrease quantity of ${nome}`,
    aumentarAria: (nome) => `increase quantity of ${nome}`,
    total: "Total",
    finalizar: "Place Order",
    removerTitulo: "Remove product?",
    removerAntes: "Are you sure you want to remove",
    removerDepois: "from your cart?",
  },
  rodape: {
    slogan:
      "Modern furniture solutions with quality, elegance and design made for your space.",
    navegacao: "Navigation",
    inicio: "Home",
    produtos: "Products",
    admin: "Admin area",
    contato: "Support & Contact",
    email: "Email:",
    telefone: "Phone:",
    direitos: (ano) => `© ${ano} PLANAR Furniture. All rights reserved.`,
  },
  login: {
    titulo: "Admin area",
    subtitulo: "PLANAR Furniture",
    demo: "Demo — username",
    demoSenha: "password",
    preencher: "Fill in",
    login: "Username",
    senha: "Password",
    entrar: "Sign in",
    voltar: "← Back to the store",
    loginInvalido: "Invalid username",
    senhaCurta: "The password has at least 8 characters",
    credenciaisErradas: "Incorrect username or password.",
    erroInesperado: "Unexpected error. Please try again.",
    mostrarSenha: "show password",
    esconderSenha: "hide password",
  },
  admin: {
    verSite: "View store",
    sair: "Sign out",
    produtos: "Products",
    novo: "New product",
    restaurar: "Restore products",
    avisoDemo:
      "Demo mode: add, edit and remove products freely. Changes are saved only in this browser.",
    colunaProduto: "Product",
    colunaMedidas: "Size (W × D × H)",
    colunaPreco: "Price",
    colunaAcoes: "Actions",
    vazio: "No products yet. Click “New product”.",
    editarAria: (nome) => `edit ${nome}`,
    removerAria: (nome) => `remove ${nome}`,
    removerTitulo: "Remove product?",
    removerTexto: "will be removed from the store. This can't be undone.",
  },
  formulario: {
    novo: "New product",
    editar: "Edit product",
    trocarFoto: "Change photo",
    escolherFoto: "Choose photo",
    ajudaFoto: "JPG, PNG or WEBP up to 2 MB",
    nome: "Name",
    descricao: "Description",
    preco: "Price",
    medidasPadrao: "Default size (cm)",
    erroNome: "2 to 80 characters",
    erroDescricao: "5 to 500 characters",
    erroPreco: "e.g. 1890.00",
    erroMedida: (max) => `1 to ${max}`,
    erroFoto: "Choose a photo",
    erroTipoFoto: "Use JPG, PNG or WEBP",
    erroTamanhoFoto: "The photo must be up to 2 MB",
  },
  whatsapp: {
    linha: ({ quantidade, nome, medidas, personalizado, subtotal }) =>
      `• ${quantidade}x ${nome} — ${medidas}${personalizado ? " (custom size)" : ""} — ${subtotal}`,
    pedido: (linhas, total, personalizado) =>
      [
        "Hi! I'd like to place the following order:",
        "",
        ...linhas,
        "",
        `Total: ${total}`,
        ...(personalizado
          ? [
              "",
              "I understand the price may change because of the custom sizes.",
            ]
          : []),
      ].join("\n"),
    orcamento: (quantidade, nome, desejadas, padrao) =>
      [
        `Hi! I'd like a quote for ${quantidade}x ${nome} in a custom size:`,
        "",
        `• Requested size: ${desejadas} (W × D × H)`,
        `• Default size: ${padrao}`,
      ].join("\n"),
  },
};

export const TEXTOS: Record<Idioma, Textos> = { pt, en };

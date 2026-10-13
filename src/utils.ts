import type { ItemCarrinho, Medidas } from "./types";

export const TELEFONE = "(14) 99665-1162";
export const EMAIL = "planar_moveis@gmail.com";
const WHATSAPP = "5514996651162";

/** Limites (cm) que o cliente pode escolher ao personalizar um produto */
export const MEDIDA_MIN_CM = 10;
export const MEDIDA_MAX_CM = 500;

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatarPreco(centavos: number) {
  return brl.format(centavos / 100);
}

/** Converte "1.890,50", "1890,5" ou "1890.50" em centavos; null se inválido */
export function reaisParaCentavos(texto: string): number | null {
  const limpo = texto.trim().replace(/^R\$\s*/, "");
  if (!/^\d{1,3}(\.\d{3})*(,\d{1,2})?$|^\d+([.,]\d{1,2})?$/.test(limpo)) {
    return null;
  }
  const normalizado = limpo.includes(",")
    ? limpo.replace(/\./g, "").replace(",", ".")
    : limpo;
  return Math.round(Number(normalizado) * 100);
}

export function formatarMedidas({ largura, profundidade, altura }: Medidas) {
  return `${largura} × ${profundidade} × ${altura} cm`;
}

export function medidasIguais(a: Medidas, b: Medidas) {
  return (
    a.largura === b.largura &&
    a.profundidade === b.profundidade &&
    a.altura === b.altura
  );
}

export function calcularTotal(itens: ItemCarrinho[]) {
  return itens.reduce(
    (total, { produto, quantidade }) =>
      total + produto.precoCentavos * quantidade,
    0,
  );
}

export function linkPedidoWhatsApp(itens: ItemCarrinho[]) {
  const temPersonalizado = itens.some(
    (item) => !medidasIguais(item.medidas, item.produto.medidas),
  );

  const linhas = itens.map(({ produto, medidas, quantidade }) => {
    const personalizado = medidasIguais(medidas, produto.medidas)
      ? ""
      : " (medidas personalizadas)";
    return (
      `• ${quantidade}x ${produto.nome} — ${formatarMedidas(medidas)}${personalizado}` +
      ` — ${formatarPreco(produto.precoCentavos * quantidade)}`
    );
  });

  const mensagem = [
    "Olá! Gostaria de fazer o seguinte pedido:",
    "",
    ...linhas,
    "",
    `Total: ${formatarPreco(calcularTotal(itens))}`,
    ...(temPersonalizado
      ? ["", "Sei que o valor pode mudar por causa das medidas personalizadas."]
      : []),
  ].join("\n");

  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

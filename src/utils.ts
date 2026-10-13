import type { ItemCarrinho } from "./types";

export const TELEFONE = "(14) 99665-1162";
export const EMAIL = "planar_moveis@gmail.com";
const WHATSAPP = "5514996651162";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatarPreco(valor: number) {
  return brl.format(valor);
}

export function calcularTotal(itens: ItemCarrinho[]) {
  return itens.reduce(
    (total, { produto, quantidade }) => total + produto.preco * quantidade,
    0,
  );
}

export function linkPedidoWhatsApp(itens: ItemCarrinho[]) {
  const linhas = itens.map(
    ({ produto, quantidade }) =>
      `• ${quantidade}x ${produto.nome} — ${formatarPreco(produto.preco * quantidade)}`,
  );
  const mensagem = [
    "Olá! Gostaria de fazer o seguinte pedido:",
    "",
    ...linhas,
    "",
    `Total: ${formatarPreco(calcularTotal(itens))}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

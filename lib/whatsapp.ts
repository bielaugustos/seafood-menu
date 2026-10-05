import { brl } from "./menu";

export type CartLine = { id: string; name: string; price: number; qty: number };

export type PaymentMethod = "dinheiro" | "cartao" | "pix";
export type OrderMode = "local" | "retirada" | "entrega";

export const PAYMENT_LABEL: Record<PaymentMethod, string> = {
  dinheiro: "Dinheiro",
  cartao: "Cartão",
  pix: "Pix",
};

export const MODE_LABEL: Record<OrderMode, string> = {
  local: "Consumir no local",
  retirada: "Retirar no balcão",
  entrega: "Entrega",
};

export type OrderSummary = {
  orderNumber: string;
  mode: OrderMode;
  customerName: string;
  phone: string;
  spot?: string; // mesa / quiosque / ponto do lago (modo "local")
  address?: string;
  area?: string;
  lines: CartLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  payment: PaymentMethod;
  changeFor?: string;
  notes?: string;
};

export function buildWhatsAppMessage(o: OrderSummary): string {
  const items = o.lines
    .map((l) => `• ${l.qty}x ${l.name} — ${brl(l.price * l.qty)}`)
    .join("\n");

  const parts = [`*Novo pedido #${o.orderNumber}* — ${MODE_LABEL[o.mode]}`, "", items, ""];

  parts.push(`Subtotal: ${brl(o.subtotal)}`);
  if (o.mode === "entrega") parts.push(`Entrega (${o.area}): ${brl(o.deliveryFee)}`);
  parts.push(`*Total: ${brl(o.total)}*`, "");

  const when = o.mode === "local" ? "no local" : o.mode === "retirada" ? "na retirada" : "na entrega";
  const payLabel = o.payment === "pix" ? "Pix" : `${PAYMENT_LABEL[o.payment]} ${when}`;
  parts.push(`*Pagamento:* ${payLabel}`);
  if (o.payment === "dinheiro" && o.changeFor) parts.push(`Troco para: ${o.changeFor}`);
  if (o.payment === "pix") parts.push("Vou enviar o comprovante do Pix aqui.");

  parts.push("", `*Cliente:* ${o.customerName}`, `*Telefone:* ${o.phone}`);
  if (o.mode === "local") parts.push(`*Onde estou:* ${o.spot}`);
  if (o.mode === "entrega") parts.push(`*Endereço:* ${o.address} (${o.area})`);
  if (o.notes) parts.push(`*Observações:* ${o.notes}`);
  return parts.join("\n");
}

export function buildWhatsAppLink(shopNumber: string, message: string): string {
  return `https://wa.me/${shopNumber}?text=${encodeURIComponent(message)}`;
}

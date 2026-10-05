import { NextResponse } from "next/server";
import { DELIVERY_AREAS, MENU } from "@/lib/menu";
import { getServerSupabase } from "@/lib/supabase";

type Body = {
  mode?: "local" | "retirada" | "entrega";
  customerName?: string;
  phone?: string;
  spot?: string;
  address?: string;
  area?: string;
  payment?: "dinheiro" | "cartao" | "pix";
  changeFor?: string;
  notes?: string;
  items?: { id: string; qty: number }[];
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const mode = body.mode;
  const customerName = body.customerName?.trim();
  const phone = body.phone?.trim();
  const payment = body.payment;

  if (!mode || !["local", "retirada", "entrega"].includes(mode)) {
    return NextResponse.json({ error: "Invalid order mode" }, { status: 400 });
  }
  if (!customerName || !phone || !payment) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (!["dinheiro", "cartao", "pix"].includes(payment)) {
    return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });
  }

  const spot = body.spot?.trim();
  const address = body.address?.trim();
  const area = DELIVERY_AREAS.find((a) => a.name === body.area);

  if (mode === "local" && !spot) {
    return NextResponse.json({ error: "Informe onde você está (mesa, quiosque...)" }, { status: 400 });
  }
  if (mode === "entrega" && (!address || !area)) {
    return NextResponse.json({ error: "Informe o endereço e a região de entrega" }, { status: 400 });
  }

  // Prices are always recomputed on the server; the client's prices are never trusted.
  const lines = (body.items ?? [])
    .map((i) => {
      const p = MENU.find((m) => m.id === i.id);
      const qty = Math.floor(Number(i.qty));
      if (!p || !Number.isFinite(qty) || qty < 1 || qty > 50) return null;
      return { id: p.id, name: p.name, price: p.price, qty };
    })
    .filter((l): l is NonNullable<typeof l> => l !== null);

  if (lines.length === 0) {
    return NextResponse.json({ error: "Empty cart" }, { status: 400 });
  }

  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const deliveryFee = mode === "entrega" && area ? area.fee : 0;
  const total = subtotal + deliveryFee;

  let orderNumber = String(Math.floor(1000 + Math.random() * 9000));

  const supabase = getServerSupabase();
  if (supabase) {
    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_mode: mode,
        customer_name: customerName,
        phone,
        spot: mode === "local" ? spot : null,
        address: mode === "entrega" ? address : null,
        area: mode === "entrega" ? area?.name : null,
        items: lines,
        subtotal,
        delivery_fee: deliveryFee,
        total,
        payment_method: payment,
        change_for: body.changeFor?.trim() || null,
        notes: body.notes?.trim() || null,
      })
      .select("order_number")
      .single();

    if (error) {
      // Don't block the sale: the order still goes out via WhatsApp.
      console.error("Supabase insert failed:", error.message);
    } else if (data) {
      orderNumber = String(data.order_number);
    }
  }

  return NextResponse.json({ orderNumber, lines, subtotal, deliveryFee, total });
}

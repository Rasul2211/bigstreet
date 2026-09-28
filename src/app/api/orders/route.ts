import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { cities, deliveryPrice } from "@/lib/store";
import { bankEnabled, createPayment, paymentMethods, type PaymentMethod } from "@/lib/payments";

type Body = {
  name: string;
  phone: string;
  city: string;
  address: string;
  comment?: string;
  payment: PaymentMethod;
  lines: { slug: string; size: string; color: string; qty: number }[];
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Некорректный запрос" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").replace(/[^\d+]/g, "");
  const city = String(body.city ?? "");
  const address = String(body.address ?? "").trim();
  if (!name || phone.replace(/\D/g, "").length < 9 || !cities.includes(city) || !address) {
    return NextResponse.json({ error: "Проверьте имя, телефон, город и адрес" }, { status: 400 });
  }
  if (!(body.payment in paymentMethods)) {
    return NextResponse.json({ error: "Выберите способ оплаты" }, { status: 400 });
  }

  // Цены считаем на сервере — по каталогу, а не по данным из браузера
  const items = [];
  for (const l of body.lines ?? []) {
    const p = getProduct(l.slug);
    const qty = Math.max(1, Math.min(10, Math.floor(Number(l.qty) || 0)));
    if (!p || !p.sizes.includes(l.size) || p.soldOut?.includes(l.size)) {
      return NextResponse.json({ error: "Один из товаров недоступен" }, { status: 400 });
    }
    items.push({ name: p.name, size: l.size, color: l.color, qty, price: p.price });
  }
  if (items.length === 0) return NextResponse.json({ error: "Корзина пуста" }, { status: 400 });

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = deliveryPrice(city);
  const total = subtotal + delivery;
  const id = `BS-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  await notifyTelegram(
    [
      `🛍 Новый заказ ${id}`,
      ...items.map((i) => `• ${i.name} — ${i.color}, ${i.size} × ${i.qty} = ${i.price * i.qty} сом.`),
      `Доставка (${city}): ${delivery} сом.`,
      `Итого: ${total} сом.`,
      `Оплата: ${paymentMethods[body.payment].title}`,
      `👤 ${name}, ${phone}`,
      `📍 ${city}, ${address}`,
      body.comment ? `💬 ${String(body.comment).slice(0, 500)}` : "",
    ]
      .filter(Boolean)
      .join("\n"),
  );

  if (body.payment !== "cod") {
    if (!bankEnabled(body.payment)) {
      return NextResponse.json({ error: `Оплата через ${paymentMethods[body.payment].title} скоро появится` }, { status: 400 });
    }
    try {
      const { redirectUrl } = await createPayment(body.payment, {
        id,
        amount: total,
        description: `Заказ ${id} — BIGSTREET`,
        returnUrl: `${new URL(req.url).origin}/checkout?paid=${id}`,
      });
      return NextResponse.json({ id, total, redirectUrl });
    } catch (e) {
      return NextResponse.json({ error: (e as Error).message }, { status: 502 });
    }
  }

  return NextResponse.json({ id, total });
}

// Уведомление продавцу в Telegram (если заданы TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID).
// Временная замена списку заказов, пока нет админ-панели.
async function notifyTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) {
    console.log("[order]\n" + text);
    return;
  }
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text }),
    });
  } catch (e) {
    console.error("Telegram notify failed", e);
  }
}

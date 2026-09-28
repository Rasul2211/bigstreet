import type { Metadata } from "next";
import CheckoutForm from "@/components/CheckoutForm";
import { bankEnabled } from "@/lib/payments";

export const metadata: Metadata = { title: "Оформление заказа — BIGSTREET" };

// Доступность оплаты банками зависит от переменных окружения — проверяем при каждом запросе
export const dynamic = "force-dynamic";

export default function Checkout() {
  return <CheckoutForm banks={{ alif: bankEnabled("alif"), dc: bankEnabled("dc") }} />;
}

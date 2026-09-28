// Оплата через банки Таджикистана.
// Подключение: после договора интернет-эквайринга банк выдаёт данные мерчанта.
// Их нужно добавить в переменные окружения Vercel (Settings → Environment Variables):
//   Алиф:          ALIF_MERCHANT_ID, ALIF_SECRET_KEY
//   Душанбе Сити:  DC_MERCHANT_ID,   DC_SECRET_KEY
// и реализовать createPayment() по документации банка (API выдаёт сам банк).

export type PaymentMethod = "alif" | "dc" | "cod";

export const paymentMethods: Record<PaymentMethod, { title: string; note: string }> = {
  alif: { title: "Алиф", note: "Карта или alif mobi" },
  dc: { title: "Душанбе Сити", note: "Карта или DC Next" },
  cod: { title: "При получении", note: "Наличными или картой курьеру" },
};

export function bankEnabled(method: Exclude<PaymentMethod, "cod">) {
  if (method === "alif") return Boolean(process.env.ALIF_MERCHANT_ID && process.env.ALIF_SECRET_KEY);
  return Boolean(process.env.DC_MERCHANT_ID && process.env.DC_SECRET_KEY);
}

/**
 * Создаёт платёж в банке и возвращает ссылку на платёжную страницу.
 * TODO: реализовать по документации банка после подписания договора.
 */
export async function createPayment(
  method: Exclude<PaymentMethod, "cod">,
  order: { id: string; amount: number; description: string; returnUrl: string },
): Promise<{ redirectUrl: string }> {
  void order;
  throw new Error(`Оплата через ${paymentMethods[method].title} ещё не подключена`);
}

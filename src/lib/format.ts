// Валюта магазина. Поменяйте здесь, если нужна другая.
export const CURRENCY = "₽";

export function price(value: number) {
  return `${value.toLocaleString("ru-RU")} ${CURRENCY}`;
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}

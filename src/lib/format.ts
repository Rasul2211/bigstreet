// Валюта магазина.
export const CURRENCY = "сом.";

export function price(value: number) {
  return `${value.toLocaleString("ru-RU")} ${CURRENCY}`;
}

export function pad(n: number) {
  return String(n).padStart(2, "0");
}

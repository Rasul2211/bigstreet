// Контакты и настройки магазина.
export const store = {
  name: "BIGSTREET",
  tagline: "Streetwear & Sneakers",
  city: "Душанбе",
  address: "ТЦ «Аниса», 3 этаж (Дом печати)",
  street: "ул. Бухоро, 50Б",
  hours: "Без выходных, 10:00–20:30",
  phone: "+992 300 10 20 30",
  phoneHref: "tel:+992300102030",
  telegram: "https://t.me/bigstreetdushanbe",
  instagram: "https://www.instagram.com/bigstreet.tj1/",
  map: "https://yandex.tj/maps/org/bigstreet/166375727860/",
};

// Доставка. Позже эти цены будут редактироваться в админ-панели.
export const delivery = {
  dushanbe: { label: "Курьер по Душанбе", price: 20 },
  regions: { label: "Доставка в другие города", price: 50 },
};

export const cities = ["Душанбе", "Худжанд", "Бохтар", "Куляб", "Истаравшан", "Турсунзаде", "Вахдат", "Гиссар", "Хорог", "Другой город"];

export function deliveryPrice(city: string) {
  return city === "Душанбе" ? delivery.dushanbe.price : delivery.regions.price;
}

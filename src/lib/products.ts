// Каталог BIGSTREET.
// Фото товара кладутся в /public/images/products/<slug>/01.jpg, 02.jpg, 03.jpg ...
// Пока файла нет — на его месте показывается фирменная заглушка с этим путём.

export type CategoryId = "new" | "t-shirts" | "hoodies" | "jackets" | "pants" | "accessories";

export type Category = { id: CategoryId; label: string };

export const categories: Category[] = [
  { id: "new", label: "New Arrivals" },
  { id: "t-shirts", label: "T-Shirts" },
  { id: "hoodies", label: "Hoodies" },
  { id: "jackets", label: "Jackets" },
  { id: "pants", label: "Pants" },
  { id: "accessories", label: "Accessories" },
];

export type Color = { name: string; hex: string };

export type Product = {
  slug: string;
  name: string;
  category: Exclude<CategoryId, "new">;
  price: number;
  isNew?: boolean;
  colors: Color[];
  sizes: string[];
  soldOut?: string[];
  description: string;
  material: string;
  fit: string;
  /** Количество фотографий в папке товара */
  photos: number;
};

const APPAREL = ["XS", "S", "M", "L", "XL", "XXL"];
const ONE = ["ONE SIZE"];

const BLACK = { name: "Black", hex: "#0b0b0b" };
const BONE = { name: "Bone", hex: "#e6e1d7" };
const ORANGE = { name: "Signal Orange", hex: "#ff5a1f" };
const GRAPHITE = { name: "Graphite", hex: "#3a3a3a" };
const OLIVE = { name: "Olive", hex: "#4b4d3a" };

export const products: Product[] = [
  {
    slug: "core-heavy-tee",
    name: "Core Heavy Tee",
    category: "t-shirts",
    price: 4490,
    isNew: true,
    colors: [BLACK, BONE, ORANGE],
    sizes: APPAREL,
    soldOut: ["XS"],
    description: "Базовая футболка BIGSTREET из плотного хлопка. Свободный крой, спущенное плечо, плотная горловина, которая держит форму.",
    material: "100% хлопок, плотный трикотаж",
    fit: "Oversize. Если нужна посадка по фигуре — берите на размер меньше.",
    photos: 3,
  },
  {
    slug: "blackout-boxy-tee",
    name: "Blackout Boxy Tee",
    category: "t-shirts",
    price: 4990,
    colors: [BLACK, GRAPHITE],
    sizes: APPAREL,
    description: "Короткий boxy-силуэт и тональный принт BIGSTREET на спине. Чёрное на чёрном — видно только вблизи.",
    material: "100% хлопок",
    fit: "Boxy, укороченная длина.",
    photos: 3,
  },
  {
    slug: "signal-longsleeve",
    name: "Signal Longsleeve",
    category: "t-shirts",
    price: 5490,
    colors: [BONE, BLACK],
    sizes: APPAREL,
    description: "Лонгслив с оранжевой сигнальной полосой на рукаве. Удлинённые манжеты.",
    material: "100% хлопок",
    fit: "Relaxed.",
    photos: 3,
  },
  {
    slug: "concrete-hoodie",
    name: "Concrete Hoodie",
    category: "hoodies",
    price: 8990,
    isNew: true,
    colors: [GRAPHITE, BLACK],
    sizes: APPAREL,
    soldOut: ["XXL"],
    description: "Главное худи дропа. Двойной капюшон, карман-кенгуру, вышивка BIGSTREET на груди.",
    material: "Хлопок с начёсом",
    fit: "Oversize, спущенное плечо.",
    photos: 3,
  },
  {
    slug: "night-shift-zip-hoodie",
    name: "Night Shift Zip",
    category: "hoodies",
    price: 9490,
    isNew: true,
    colors: [BLACK, ORANGE],
    sizes: APPAREL,
    description: "Худи на двусторонней молнии с высоким воротом. Оранжевая изнанка капюшона.",
    material: "Хлопок с начёсом",
    fit: "Regular.",
    photos: 3,
  },
  {
    slug: "overpass-hoodie",
    name: "Overpass Hoodie",
    category: "hoodies",
    price: 8490,
    colors: [BONE, BLACK],
    sizes: APPAREL,
    description: "Худи с крупной графикой на спине. Рибана по низу и манжетам.",
    material: "Хлопок с начёсом",
    fit: "Oversize.",
    photos: 3,
  },
  {
    slug: "block-work-jacket",
    name: "Block Work Jacket",
    category: "jackets",
    price: 15990,
    isNew: true,
    colors: [BLACK, OLIVE],
    sizes: APPAREL,
    soldOut: ["XS", "S"],
    description: "Рабочая куртка из плотного канваса. Накладные карманы, металлическая фурнитура, оранжевая бирка.",
    material: "Хлопковый канвас",
    fit: "Boxy.",
    photos: 3,
  },
  {
    slug: "transit-puffer",
    name: "Transit Puffer",
    category: "jackets",
    price: 18990,
    colors: [BLACK],
    sizes: APPAREL,
    description: "Укороченный пуховик с матовой поверхностью и высоким воротом.",
    material: "Полиэстер, утеплитель",
    fit: "Oversize, укороченная длина.",
    photos: 3,
  },
  {
    slug: "cargo-utility-pants",
    name: "Cargo Utility Pants",
    category: "pants",
    price: 9990,
    isNew: true,
    colors: [BLACK, OLIVE],
    sizes: APPAREL,
    description: "Карго с объёмными карманами и регулировкой низа шнурком.",
    material: "Хлопковый твил",
    fit: "Wide, прямой низ.",
    photos: 3,
  },
  {
    slug: "wide-leg-denim",
    name: "Wide Leg Denim",
    category: "pants",
    price: 10990,
    colors: [BLACK, GRAPHITE],
    sizes: APPAREL,
    description: "Широкие джинсы с высокой посадкой и заломами на коленях.",
    material: "Деним",
    fit: "Wide, высокая посадка.",
    photos: 3,
  },
  {
    slug: "street-cap",
    name: "Street Cap",
    category: "accessories",
    price: 3490,
    colors: [BLACK, ORANGE],
    sizes: ONE,
    description: "Шестипанельная кепка с вышитым логотипом и металлической застёжкой.",
    material: "Хлопок",
    fit: "Регулируемый размер.",
    photos: 2,
  },
  {
    slug: "crossbody-bag",
    name: "Crossbody Bag",
    category: "accessories",
    price: 5990,
    isNew: true,
    colors: [BLACK],
    sizes: ONE,
    description: "Компактная сумка через плечо. Регулируемый ремень, оранжевая фурнитура.",
    material: "Нейлон",
    fit: "Регулируемый ремень.",
    photos: 2,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(id?: string) {
  if (!id || id === "all") return products;
  if (id === "new") return products.filter((p) => p.isNew);
  return products.filter((p) => p.category === id);
}

export function categoryLabel(id: string) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

export function photoPath(slug: string, index: number) {
  return `/images/products/${slug}/${String(index + 1).padStart(2, "0")}.jpg`;
}

export function related(slug: string, count = 3) {
  const p = getProduct(slug);
  const same = products.filter((x) => x.slug !== slug && x.category === p?.category);
  const rest = products.filter((x) => x.slug !== slug && x.category !== p?.category);
  return [...same, ...rest].slice(0, count);
}

/** Разбивает список на тройки — основа каталога (3 → 3 → 3). */
export function toTriads<T>(list: T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < list.length; i += 3) out.push(list.slice(i, i + 3));
  return out;
}

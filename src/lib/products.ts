// Каталог BIGSTREET (Душанбе).
// Фото товара: /public/images/products/<slug>/01.jpg, 02.jpg ...
// 3D-модель кроссовка (Polycam → GLB): /public/models/<slug>.glb  → поле model3d
// 360° одежды (36 кадров): /public/images/360/<slug>/01.jpg ... 36.jpg → поле spin360
// ВНИМАНИЕ: цены с пометкой priceTodo — временные, их нужно уточнить у магазина.

export type CategoryId = "sneakers" | "tshirts" | "tops" | "bottoms" | "accessories" | "socks" | "sale";

export type Category = { id: CategoryId; label: string; icon: IconName };

export type IconName = "sneaker" | "tee" | "shirt" | "pants" | "cap" | "sock" | "tag";

export const categories: Category[] = [
  { id: "sneakers", label: "Кроссовки", icon: "sneaker" },
  { id: "tshirts", label: "Футболки", icon: "tee" },
  { id: "tops", label: "Верх", icon: "shirt" },
  { id: "bottoms", label: "Низ", icon: "pants" },
  { id: "accessories", label: "Аксессуары", icon: "cap" },
  { id: "socks", label: "Носки", icon: "sock" },
  { id: "sale", label: "Скидки", icon: "tag" },
];

export type Color = { name: string; hex: string; /** номер фото этого цвета (с 0) */ photo?: number };

export type Product = {
  slug: string;
  name: string;
  brand?: string;
  category: Exclude<CategoryId, "sale">;
  price: number;
  oldPrice?: number;
  priceTodo?: boolean;
  isNew?: boolean;
  colors: Color[];
  sizes: string[];
  soldOut?: string[];
  description: string;
  photos: number;
  model3d?: string;
  spin360?: number;
  video?: string;
};

const SNEAKERS = ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"];
const APPAREL = ["S", "M", "L", "XL", "XXL"];
const ONE = ["ONE SIZE"];

const BLACK = { name: "Чёрный", hex: "#0b0b0b" };
const WHITE = { name: "Белый", hex: "#f1efe9" };
const CREAM = { name: "Молочный", hex: "#e8dfcc" };
const GREY = { name: "Серый", hex: "#8d8f93" };
const NAVY = { name: "Тёмно-синий", hex: "#1c2433" };

export const products: Product[] = [
  // ---------- Кроссовки ----------
  {
    slug: "nb-204l",
    name: "New Balance 204L",
    brand: "New Balance",
    category: "sneakers",
    price: 1290,
    priceTodo: true,
    isNew: true,
    colors: [{ name: "Серебро", hex: "#c9ccd1" }],
    sizes: SNEAKERS,
    description: "Ретро-силуэт с низким профилем. Стиль и комфорт каждый день.",
    photos: 2,
  },
  {
    slug: "nb-2002r",
    name: "New Balance 2002R",
    brand: "New Balance",
    category: "sneakers",
    price: 1490,
    priceTodo: true,
    colors: [{ name: "Графит", hex: "#3b3d42" }],
    sizes: SNEAKERS,
    description: "Легендарный силуэт и максимальный комфорт. Амортизация на весь день.",
    photos: 1,
  },
  {
    slug: "nb-2002r-protection-pack",
    name: "New Balance 2002R «Protection Pack»",
    brand: "New Balance",
    category: "sneakers",
    price: 1590,
    priceTodo: true,
    isNew: true,
    colors: [{ name: "Синий / серый", hex: "#4a5a7a" }],
    sizes: SNEAKERS,
    soldOut: ["36", "45"],
    description: "Культовый «рваный» силуэт в глубоком тёмно-синем и сером. Премиальная замша, многослойный верх.",
    photos: 1,
  },
  {
    slug: "nike-air-force-1-low",
    name: "Nike Air Force 1 Low",
    brand: "Nike",
    category: "sneakers",
    price: 1190,
    priceTodo: true,
    colors: [{ name: "Молочный / коричневый", hex: "#e9dfcf" }],
    sizes: SNEAKERS,
    description: "Форсы для тех, кто ценит стиль и универсальность. Нежные оттенки и классический силуэт.",
    photos: 1,
  },
  {
    slug: "nike-dunk-low-grey-suede",
    name: "Nike Dunk Low Grey Suede",
    brand: "Nike",
    category: "sneakers",
    price: 1290,
    priceTodo: true,
    colors: [{ name: "Серая замша", hex: "#b9b9b6" }],
    sizes: SNEAKERS,
    description: "Минимализм, стиль и комфорт. Серая замша сочетается с чем угодно.",
    photos: 1,
  },
  {
    slug: "nike-p-6000",
    name: "Nike P-6000",
    brand: "Nike",
    category: "sneakers",
    price: 1190,
    priceTodo: true,
    isNew: true,
    colors: [{ name: "Белый / серебро", hex: "#e4e4e0" }],
    sizes: SNEAKERS,
    description: "Беговой ретро-силуэт 2000-х. Лёгкие, дышащие и удобные для долгих прогулок.",
    photos: 1,
  },
  {
    slug: "adidas-spezial",
    name: "Adidas Spezial",
    brand: "Adidas",
    category: "sneakers",
    price: 1090,
    priceTodo: true,
    colors: [{ name: "Бежевый", hex: "#d9c3a9" }],
    sizes: SNEAKERS,
    description: "Легендарная классика от Adidas. Стиль, проверенный временем, и удобная посадка.",
    photos: 1,
  },
  {
    slug: "on-cloudtec",
    name: "On Running CloudTec",
    brand: "On",
    category: "sneakers",
    price: 1390,
    priceTodo: true,
    colors: [BLACK],
    sizes: SNEAKERS,
    description: "Созданы для движения. Лёгкие, удобные, с узнаваемой подошвой CloudTec.",
    photos: 1,
  },
  {
    slug: "vans-knu-skool",
    name: "Vans Knu Skool",
    brand: "Vans",
    category: "sneakers",
    price: 990,
    priceTodo: true,
    colors: [{ name: "Чёрный / белый", hex: "#111111" }],
    sizes: SNEAKERS,
    description: "Массивный объём, толстые шнурки и легендарный силуэт 90-х.",
    photos: 1,
  },

  // ---------- Футболки ----------
  {
    slug: "oversize-tee",
    name: "Футболка Oversize",
    category: "tshirts",
    price: 199,
    isNew: true,
    colors: [
      { name: "Графит", hex: "#55595e", photo: 0 },
      { name: "Зелёный", hex: "#1f6b56", photo: 1 },
    ],
    sizes: APPAREL,
    description: "Плотная базовая футболка свободного кроя. Основа любого образа.",
    photos: 2,
  },
  {
    slug: "basic-tee",
    name: "Футболка базовая",
    category: "tshirts",
    price: 260,
    colors: [WHITE, BLACK, GREY],
    sizes: APPAREL,
    description: "Базовые футболки разных цветов. Весь выбор — в магазине.",
    photos: 1,
  },
  {
    slug: "knit-button-tee",
    name: "Вязаная футболка на пуговицах",
    category: "tshirts",
    price: 240,
    colors: [BLACK, WHITE, GREY],
    sizes: APPAREL,
    description: "Стильная, лёгкая и фактурная база для твоих премиальных луков. Три цвета: чёрный, белый и серый.",
    photos: 1,
  },
  {
    slug: "velvets-tee",
    name: "Футболка VELVETS",
    category: "tshirts",
    price: 290,
    priceTodo: true,
    colors: [WHITE],
    sizes: APPAREL,
    description: "Оверсайз-футболка с графичным принтом VELVETS. Базовый стильный шмот для уличных луков.",
    photos: 1,
  },
  {
    slug: "embroidered-tee",
    name: "Футболка с вышивкой",
    category: "tshirts",
    price: 320,
    priceTodo: true,
    colors: [
      { ...NAVY, photo: 0 },
      { ...CREAM, photo: 1 },
    ],
    sizes: APPAREL,
    description: "Оверсайз с вышитым карманом. Два цвета.",
    photos: 2,
  },
  {
    slug: "calligraphy-tee",
    name: "Футболка «Каллиграфия»",
    category: "tshirts",
    price: 290,
    priceTodo: true,
    colors: [NAVY],
    sizes: APPAREL,
    description: "Оверсайз с крупной арабской каллиграфией на груди.",
    photos: 1,
  },
  {
    slug: "waw-tee",
    name: "Футболка «Вав»",
    category: "tshirts",
    price: 290,
    priceTodo: true,
    colors: [NAVY],
    sizes: APPAREL,
    description: "Оверсайз с графичным знаком на груди.",
    photos: 1,
  },
  {
    slug: "gang-tee",
    name: "Футболка GANG",
    category: "tshirts",
    price: 270,
    priceTodo: true,
    colors: [BLACK],
    sizes: APPAREL,
    description: "Чёрный оверсайз с минималистичным принтом.",
    photos: 1,
  },
  {
    slug: "witcher-tee",
    name: "Футболка The Witcher",
    category: "tshirts",
    price: 290,
    priceTodo: true,
    colors: [BLACK],
    sizes: APPAREL,
    description: "Оверсайз с принтом The Witcher 3: Wild Hunt.",
    photos: 1,
  },
  {
    slug: "logo-tee",
    name: "Футболка с мини-лого",
    category: "tshirts",
    price: 260,
    priceTodo: true,
    colors: [
      { ...NAVY, photo: 0 },
      { ...CREAM, photo: 1 },
    ],
    sizes: APPAREL,
    description: "Свободный крой и небольшой логотип на груди.",
    photos: 2,
  },

  // ---------- Верх ----------
  {
    slug: "white-textured-shirt",
    name: "Белая рубашка с фактурой",
    category: "tops",
    price: 390,
    priceTodo: true,
    colors: [WHITE],
    sizes: APPAREL,
    description: "Лёгкая фактурная ткань делает базовую вещь интересной и дорогой на вид.",
    photos: 1,
  },
  {
    slug: "white-shirt",
    name: "Идеальная белая рубашка",
    category: "tops",
    price: 350,
    priceTodo: true,
    colors: [WHITE],
    sizes: APPAREL,
    description: "Главная база в гардеробе. Легко сочетается с брюками и джинсами.",
    photos: 1,
  },
  {
    slug: "brown-textured-shirt",
    name: "Текстурная коричневая рубашка",
    category: "tops",
    price: 390,
    priceTodo: true,
    colors: [{ name: "Коричневый", hex: "#4a3226" }],
    sizes: APPAREL,
    description: "Стильный оверсайз для повседневных луков. Глубокий цвет и жатая фактура.",
    photos: 1,
  },
  {
    slug: "art-print-shirt",
    name: "Рубашка с арт-принтом",
    category: "tops",
    price: 420,
    priceTodo: true,
    isNew: true,
    colors: [CREAM],
    sizes: APPAREL,
    description: "Оверсайз для тех, кто любит выделяться. Лёгкая ткань и винтажный рисунок.",
    photos: 1,
  },
  {
    slug: "linen-shirt",
    name: "Льняная рубашка",
    category: "tops",
    price: 390,
    priceTodo: true,
    colors: [CREAM],
    sizes: APPAREL,
    description: "Свободная рубашка из лёгкой ткани в молочном цвете.",
    photos: 1,
  },
  {
    slug: "track-jacket",
    name: "Олимпийка",
    category: "tops",
    price: 590,
    priceTodo: true,
    isNew: true,
    colors: [CREAM],
    sizes: APPAREL,
    description: "Сочный стритвайб и максимальный комфорт для осенних прогулок.",
    photos: 1,
  },

  // ---------- Низ ----------
  {
    slug: "baggy-jeans",
    name: "Baggy Jeans",
    category: "bottoms",
    price: 450,
    priceTodo: true,
    colors: [GREY],
    sizes: APPAREL,
    description: "Твой идеальный оверсайз. Широкий крой и выбеленный серый деним.",
    photos: 1,
  },
  {
    slug: "clean-fit-jeans",
    name: "Джинсы Clean Fit",
    category: "bottoms",
    price: 420,
    priceTodo: true,
    colors: [{ name: "Голубой", hex: "#7f9dbd" }],
    sizes: APPAREL,
    description: "Джинсы в свободном силуэте. Минималистичный дизайн, ровная посадка и комфорт на каждый день.",
    photos: 2,
  },
  {
    slug: "cargo-oversize",
    name: "Карго Oversize",
    category: "bottoms",
    price: 450,
    priceTodo: true,
    colors: [{ name: "Светло-серый", hex: "#c7c9cc" }],
    sizes: APPAREL,
    description: "Свободный крой, удобная посадка и вместительные карманы.",
    photos: 1,
  },
  {
    slug: "wide-pants",
    name: "Широкие летние штаны",
    category: "bottoms",
    price: 350,
    priceTodo: true,
    colors: [BLACK],
    sizes: APPAREL,
    description: "Лёгкие, удобные и стильные. Свободный крой, который подчёркивает образ.",
    photos: 1,
  },

  // ---------- Аксессуары ----------
  {
    slug: "la-vintage-cap",
    name: "Кепка Los Angeles Vintage",
    category: "accessories",
    price: 190,
    priceTodo: true,
    colors: [GREY],
    sizes: ONE,
    description: "Твой кусочек Калифорнии на каждый день. Мягкий выцветший хлопок и потёртая вышивка.",
    photos: 1,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(id?: string) {
  if (!id || id === "all") return products;
  if (id === "sale") return products.filter((p) => p.oldPrice);
  return products.filter((p) => p.category === id);
}

/** Категории, в которых есть товары */
export function activeCategories() {
  return categories.filter((c) => productsByCategory(c.id).length > 0);
}

export function categoryLabel(id: string) {
  return categories.find((c) => c.id === id)?.label ?? id;
}

export function photoPath(slug: string, index: number) {
  return `/images/products/${slug}/${String(index + 1).padStart(2, "0")}.jpg`;
}

export function spinFramePath(slug: string, index: number) {
  return `/images/360/${slug}/${String(index + 1).padStart(2, "0")}.jpg`;
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

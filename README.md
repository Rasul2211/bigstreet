# BIGSTREET

Интернет-магазин streetwear-бренда BIGSTREET на Next.js (App Router, TypeScript, CSS Modules).

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:3000

## Структура

```
src/
  app/                  страницы: главная, /shop, /shop/[slug], /checkout, /about
  components/           Hero, ProductTriad, ProductObject, PurchasePanel, CartDrawer ...
  lib/products.ts       каталог: товары, цены, размеры, цвета, категории
  lib/cart.tsx          корзина (сохраняется в браузере)
  lib/format.ts         валюта
public/images/
  hero/hero-01.jpg      главное фото на первом экране
  about/about-01.jpg    фото на странице About
  products/<slug>/01.jpg, 02.jpg, 03.jpg   фото товаров
```

## Как добавить фотографии

1. Найдите `slug` товара в `src/lib/products.ts` (например, `concrete-hoodie`).
2. Положите фото в `public/images/products/concrete-hoodie/` с именами `01.jpg`, `02.jpg`, `03.jpg`.
3. `01.jpg` — главный кадр, `02.jpg` — появляется при наведении в каталоге.
4. Число фото товара задаётся полем `photos`.

Пока файла нет, на его месте показывается фирменная заглушка с путём, куда положить фото.
Рекомендуемые пропорции — 4:5 (например, 1600×2000).

## Оформление заказа

Форма в `/checkout` пока не отправляет данные никуда: подключите свой бэкенд, CRM или платёжную систему в `src/app/checkout/page.tsx`.

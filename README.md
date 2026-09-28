# BIGSTREET

Сайт магазина BIGSTREET — Streetwear & Sneakers, Душанбе (ТЦ «Аниса», 3 этаж).
Next.js (App Router, TypeScript, CSS Modules), three.js, model-viewer.

## Запуск

```bash
npm install
npm run dev
```

## Где что лежит

```
src/lib/products.ts     каталог: товары, цены (сом.), размеры, цвета, категории
src/lib/store.ts        контакты магазина, цены доставки, города
src/lib/payments.ts     оплата Алиф / Душанбе Сити (подключается после договора с банком)
src/app/api/orders      приём заказов
public/images/products/<slug>/01.jpg, 02.jpg ...   фото товаров
public/models/<slug>.glb                            3D-модели кроссовок (Polycam → GLB)
public/images/360/<slug>/01.jpg ... 36.jpg          360° одежды
```

Цены с пометкой `priceTodo: true` — временные, их нужно уточнить.

## 3D и 360°

- Кроссовок: положите `public/models/<slug>.glb` и добавьте товару `model3d: "/models/<slug>.glb"`.
- Одежда: положите 36 кадров в `public/images/360/<slug>/` и добавьте товару `spin360: 36`.

На странице товара сама появится вкладка «3D» или «360°».

## Переменные окружения (Vercel → Settings → Environment Variables)

| Переменная | Зачем |
|---|---|
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | новые заказы приходят продавцу в Telegram |
| `ALIF_MERCHANT_ID`, `ALIF_SECRET_KEY` | оплата через Алиф (после договора) |
| `DC_MERCHANT_ID`, `DC_SECRET_KEY` | оплата через Душанбе Сити (после договора) |

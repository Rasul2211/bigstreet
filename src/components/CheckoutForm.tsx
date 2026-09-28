"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { getProduct, photoPath } from "@/lib/products";
import { cities, deliveryPrice, store } from "@/lib/store";
import { paymentMethods, type PaymentMethod } from "@/lib/payments";
import AnimatedNumber from "./AnimatedNumber";
import ProductMedia from "./ProductMedia";
import styles from "./CheckoutForm.module.css";

export default function CheckoutForm({ banks }: { banks: { alif: boolean; dc: boolean } }) {
  const { lines, subtotal, clear } = useCart();
  const [city, setCity] = useState("Душанбе");
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [phone, setPhone] = useState("+992 ");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<{ id: string; total: number } | null>(null);

  const delivery = deliveryPrice(city);
  const total = subtotal + delivery;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSending(true);
    const f = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          phone,
          city,
          address: f.get("address"),
          comment: f.get("comment"),
          payment,
          lines,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Не удалось оформить заказ");
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }
      setOrder({ id: data.id, total: data.total });
      clear();
      window.scrollTo({ top: 0 });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSending(false);
    }
  }

  if (order) {
    return (
      <div className={styles.done}>
        <p className="mono accent">Заказ {order.id}</p>
        <h1 className={`display ${styles.title}`}>
          Спасибо<span className="accent">!</span>
        </h1>
        <p className="muted">
          Заказ принят. Мы позвоним в ближайшее время, чтобы подтвердить. Сумма к оплате: {order.total} сом.
        </p>
        <Link href="/shop" className="btn">
          Вернуться в каталог <span className="arrow">→</span>
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className={styles.done}>
        <h1 className={`display ${styles.title}`}>Корзина пуста</h1>
        <p className="muted">
          Доставка по Душанбе — 20 сом., в другие города — 50 сом. Оплата при получении или онлайн.
        </p>
        <Link href="/shop" className="btn">
          В каталог <span className="arrow">→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={`display ${styles.title}`}>Оформление</h1>

      <div className={styles.layout}>
        <form className={styles.form} onSubmit={submit}>
          <fieldset>
            <legend className="mono accent">01 — Контакты</legend>
            <label>
              <span className="mono muted">Имя</span>
              <input name="name" required autoComplete="name" />
            </label>
            <label>
              <span className="mono muted">Телефон</span>
              <input
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
          </fieldset>

          <fieldset>
            <legend className="mono accent">02 — Доставка</legend>
            <label>
              <span className="mono muted">Город</span>
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <p className={`mono ${styles.deliveryNote}`}>
              {city === "Душанбе" ? "Курьер по Душанбе" : "Доставка в другой город"} —{" "}
              <span className="accent">{delivery} сом.</span>
            </p>
            <label>
              <span className="mono muted">Адрес</span>
              <input name="address" required autoComplete="street-address" placeholder="Улица, дом, квартира" />
            </label>
            <label>
              <span className="mono muted">Комментарий</span>
              <textarea name="comment" rows={2} placeholder="Ориентир, удобное время" />
            </label>
          </fieldset>

          <fieldset>
            <legend className="mono accent">03 — Оплата</legend>
            <div className={styles.payments}>
              {(Object.keys(paymentMethods) as PaymentMethod[]).map((m) => {
                const off = m !== "cod" && !banks[m];
                return (
                  <label key={m} className={styles.pay} data-off={off} data-active={payment === m}>
                    <input
                      type="radio"
                      name="payment"
                      value={m}
                      checked={payment === m}
                      disabled={off}
                      onChange={() => setPayment(m)}
                    />
                    <span className={styles.payTitle}>{paymentMethods[m].title}</span>
                    <span className="mono muted">{off ? "Скоро" : paymentMethods[m].note}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {error && <p className={`mono ${styles.error}`}>{error}</p>}

          <button type="submit" className="btn" disabled={sending}>
            {sending ? "Отправляем…" : (
              <>
                Подтвердить заказ — <AnimatedNumber value={total} /> <span className="arrow">→</span>
              </>
            )}
          </button>
        </form>

        <aside className={styles.summary}>
          <p className="mono muted">Ваш заказ</p>
          <ul>
            {lines.map((l) => {
              const p = getProduct(l.slug);
              if (!p) return null;
              return (
                <li key={`${l.slug}-${l.size}-${l.color}`}>
                  <span className={styles.thumb}>
                    <ProductMedia src={photoPath(p.slug, 0)} alt={p.name} kind={p.category} />
                  </span>
                  <span className={styles.itemInfo}>
                    <span className={styles.itemName}>{p.name}</span>
                    <span className="mono muted">
                      {l.color} / {l.size} × {l.qty}
                    </span>
                  </span>
                  <span className="mono">{p.price * l.qty} сом.</span>
                </li>
              );
            })}
          </ul>
          <div className={styles.row}>
            <span className="mono muted">Товары</span>
            <span className="mono">
              <AnimatedNumber value={subtotal} />
            </span>
          </div>
          <div className={styles.row}>
            <span className="mono muted">Доставка</span>
            <span className="mono">
              <AnimatedNumber value={delivery} />
            </span>
          </div>
          <div className={`${styles.row} ${styles.total}`}>
            <span className="mono">Итого</span>
            <span className="mono accent">
              <AnimatedNumber value={total} />
            </span>
          </div>
          <p className={`mono muted ${styles.help}`}>
            Вопросы по заказу:{" "}
            <a href={store.phoneHref} className="link-line">
              {store.phone}
            </a>
          </p>
        </aside>
      </div>
    </div>
  );
}

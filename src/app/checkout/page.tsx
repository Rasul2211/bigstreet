"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { price } from "@/lib/format";
import styles from "./checkout.module.css";

// Отправка заказа пока локальная: подключите сюда свой бэкенд / CRM / платёжку.
export default function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const [delivery, setDelivery] = useState<"courier" | "pickup">("courier");
  const [orderId, setOrderId] = useState<string | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOrderId(`BS-${Date.now().toString().slice(-6)}`);
    clear();
    window.scrollTo({ top: 0 });
  }

  if (orderId) {
    return (
      <div className={styles.done}>
        <p className="mono accent">Order {orderId}</p>
        <h1 className={`display ${styles.title}`}>
          Thank you<span className="accent">.</span>
        </h1>
        <p className="muted">Заказ принят. Мы свяжемся с вами для подтверждения.</p>
        <Link href="/shop" className="btn">
          Back to shop <span className="arrow">→</span>
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className={styles.done}>
        <h1 className={`display ${styles.title}`}>Cart is empty</h1>
        <Link href="/shop" className="btn">
          Shop collection <span className="arrow">→</span>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={`display ${styles.title}`}>Checkout</h1>

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
              <input name="phone" type="tel" required autoComplete="tel" />
            </label>
            <label>
              <span className="mono muted">Email</span>
              <input name="email" type="email" autoComplete="email" />
            </label>
          </fieldset>

          <fieldset>
            <legend className="mono accent">02 — Доставка</legend>
            <div className={`mono ${styles.toggle}`}>
              <button type="button" aria-pressed={delivery === "courier"} onClick={() => setDelivery("courier")}>
                Курьер
              </button>
              <button type="button" aria-pressed={delivery === "pickup"} onClick={() => setDelivery("pickup")}>
                Самовывоз
              </button>
            </div>
            {delivery === "courier" && (
              <>
                <label>
                  <span className="mono muted">Город</span>
                  <input name="city" required autoComplete="address-level2" />
                </label>
                <label>
                  <span className="mono muted">Адрес</span>
                  <input name="address" required autoComplete="street-address" />
                </label>
              </>
            )}
            <label>
              <span className="mono muted">Комментарий</span>
              <textarea name="comment" rows={3} />
            </label>
          </fieldset>

          <button type="submit" className="btn">
            Place order — {price(subtotal)} <span className="arrow">→</span>
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
                  <span>
                    <span className={styles.itemName}>{p.name}</span>
                    <span className="mono muted">
                      {l.color} / {l.size} × {l.qty}
                    </span>
                  </span>
                  <span className="mono">{price(p.price * l.qty)}</span>
                </li>
              );
            })}
          </ul>
          <div className={styles.total}>
            <span className="mono">Итого</span>
            <span className="mono accent">{price(subtotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

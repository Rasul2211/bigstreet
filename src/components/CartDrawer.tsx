"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { getProduct, photoPath } from "@/lib/products";
import ProductMedia from "./ProductMedia";
import QtyStepper from "./QtyStepper";
import AnimatedNumber from "./AnimatedNumber";
import styles from "./CartDrawer.module.css";

export default function CartDrawer() {
  const { lines, isOpen, close, setQty, remove, subtotal, count } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <>
      <div className={styles.scrim} data-open={isOpen} onClick={close} aria-hidden="true" />
      <aside className={styles.drawer} data-open={isOpen} aria-hidden={!isOpen} aria-label="Корзина">
        <div className={styles.head}>
          <h2 className="display">
            Корзина <sup className="mono accent">{String(count).padStart(2, "0")}</sup>
          </h2>
          <button className="mono link-line" onClick={close}>
            Закрыть
          </button>
        </div>

        {lines.length === 0 ? (
          <div className={styles.empty}>
            <p className="display">Пусто.</p>
            <p className="muted">Самое время выбрать новые кроссовки.</p>
            <Link href="/shop" className="btn" onClick={close}>
              В каталог <span className="arrow">→</span>
            </Link>
          </div>
        ) : (
          <>
            <ul className={styles.list}>
              {lines.map((line, i) => {
                const p = getProduct(line.slug);
                if (!p) return null;
                return (
                  <li key={`${line.slug}-${line.size}-${line.color}`} className={styles.line}>
                    <Link href={`/shop/${p.slug}`} onClick={close} className={styles.thumb}>
                      <ProductMedia src={photoPath(p.slug, 0)} alt={p.name} kind={p.category} />
                    </Link>
                    <div className={styles.info}>
                      <Link href={`/shop/${p.slug}`} onClick={close} className={styles.name}>
                        {p.name}
                      </Link>
                      <span className="mono muted">
                        {line.color} / {line.size}
                      </span>
                      <div className={styles.controls}>
                        <QtyStepper small value={line.qty} onChange={(v) => setQty(i, v)} />
                        <button className="mono muted link-line" onClick={() => remove(i)}>
                          Удалить
                        </button>
                      </div>
                    </div>
                    <span className={`mono ${styles.linePrice}`}>
                      <AnimatedNumber value={p.price * line.qty} />
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className={styles.foot}>
              <div className={styles.total}>
                <span className="mono muted">Сумма</span>
                <span className="mono">
                  <AnimatedNumber value={subtotal} />
                </span>
              </div>
              <Link href="/checkout" className="btn" onClick={close}>
                Оформить заказ <span className="arrow">→</span>
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

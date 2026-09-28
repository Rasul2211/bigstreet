"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart";
import { getProduct, photoPath } from "@/lib/products";
import { price } from "@/lib/format";
import ProductMedia from "./ProductMedia";
import QtyStepper from "./QtyStepper";
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
            Cart <sup className="mono accent">{String(count).padStart(2, "0")}</sup>
          </h2>
          <button className="mono link-line" onClick={close}>
            Close
          </button>
        </div>

        {lines.length === 0 ? (
          <div className={styles.empty}>
            <p className="display">Empty.</p>
            <p className="muted">Корзина ждёт первый дроп.</p>
            <Link href="/shop" className="btn" onClick={close}>
              Shop collection <span className="arrow">→</span>
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
                          Remove
                        </button>
                      </div>
                    </div>
                    <span className={`mono ${styles.linePrice}`}>{price(p.price * line.qty)}</span>
                  </li>
                );
              })}
            </ul>

            <div className={styles.foot}>
              <div className={styles.total}>
                <span className="mono muted">Subtotal</span>
                <span className="mono">{price(subtotal)}</span>
              </div>
              <Link href="/checkout" className="btn" onClick={close}>
                Checkout <span className="arrow">→</span>
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

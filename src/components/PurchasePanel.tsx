"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { price } from "@/lib/format";
import QtyStepper from "./QtyStepper";
import styles from "./PurchasePanel.module.css";

/** Выбор цвета, размера, количества и добавление в корзину. */
export default function PurchasePanel({ product, compact }: { product: Product; compact?: boolean }) {
  const { add, open } = useCart();
  const oneSize = product.sizes.length === 1;
  const [size, setSize] = useState<string | null>(oneSize ? product.sizes[0] : null);
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [warn, setWarn] = useState(false);
  const [added, setAdded] = useState(false);

  function onAdd() {
    if (!size) {
      setWarn(false);
      setTimeout(() => setWarn(true), 20);
      return;
    }
    add({ slug: product.slug, size, color, qty });
    setAdded(true);
    setTimeout(() => open(), 450);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className={styles.panel} data-compact={compact}>
      <div className={styles.row}>
        <span className="mono muted">Price</span>
        <span className={styles.price}>{price(product.price)}</span>
      </div>

      <fieldset className={styles.group}>
        <legend className="mono muted">
          Color — <span className={styles.value}>{color}</span>
        </legend>
        <div className={styles.colors}>
          {product.colors.map((c) => (
            <button
              key={c.name}
              className={styles.swatch}
              style={{ background: c.hex }}
              aria-pressed={color === c.name}
              aria-label={c.name}
              onClick={() => setColor(c.name)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className="mono muted">
          Size
          {warn && !size && <span className={styles.warn}> — выберите размер</span>}
        </legend>
        <div className={`mono ${styles.sizes}`} data-shake={warn && !size}>
          {product.sizes.map((s) => {
            const out = product.soldOut?.includes(s);
            return (
              <button
                key={s}
                className={styles.size}
                aria-pressed={size === s}
                disabled={out}
                onClick={() => setSize(s)}
                data-wide={oneSize}
              >
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className={styles.buy}>
        <QtyStepper value={qty} onChange={setQty} />
        <button className={`btn ${styles.add}`} onClick={onAdd} data-added={added}>
          <span className={styles.addLabel}>
            <span>
              Add to cart <span className="arrow">→</span>
            </span>
            <span>Added ✓</span>
          </span>
        </button>
      </div>
    </div>
  );
}

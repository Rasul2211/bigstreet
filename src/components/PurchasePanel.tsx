"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import AnimatedNumber from "./AnimatedNumber";
import QtyStepper from "./QtyStepper";
import styles from "./PurchasePanel.module.css";

type Props = {
  product: Product;
  /** Сообщает наружу выбранный цвет (чтобы сменить фото) */
  onColor?: (index: number) => void;
  /** Вызывается после добавления (например, закрыть быстрый просмотр) */
  onAdded?: () => void;
};

/** Выбор цвета, размера, количества и добавление в корзину. */
export default function PurchasePanel({ product, onColor, onAdded }: Props) {
  const { add, open } = useCart();
  const oneSize = product.sizes.length === 1;
  const [size, setSize] = useState<string | null>(oneSize ? product.sizes[0] : null);
  const [colorIndex, setColorIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [warn, setWarn] = useState(false);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const color = product.colors[colorIndex];

  function pickColor(i: number) {
    setColorIndex(i);
    onColor?.(i);
  }

  function onAdd() {
    if (!size) {
      setWarn(false);
      setTimeout(() => setWarn(true), 20);
      return;
    }
    if (state !== "idle") return;
    setState("loading");
    setTimeout(() => {
      add({ slug: product.slug, size, color: color.name, qty });
      setState("done");
      setTimeout(() => {
        onAdded?.();
        open();
      }, 650);
      setTimeout(() => setState("idle"), 1900);
    }, 420);
  }

  return (
    <div className={styles.panel}>
      <div className={styles.row}>
        <span className="mono muted">Цена</span>
        <span className={styles.price}>
          {product.oldPrice && <s className={styles.old}>{product.oldPrice.toLocaleString("ru-RU")}</s>}
          <AnimatedNumber value={product.price * qty} />
        </span>
      </div>

      <fieldset className={styles.group}>
        <legend className="mono muted">
          Цвет — <span className={styles.value}>{color.name}</span>
        </legend>
        <div className={styles.colors}>
          {product.colors.map((c, i) => (
            <button
              key={c.name}
              className={styles.swatch}
              style={{ background: c.hex }}
              aria-pressed={colorIndex === i}
              aria-label={c.name}
              onClick={() => pickColor(i)}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className="mono muted">
          Размер
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
                title={out ? "Нет в наличии" : undefined}
              >
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className={styles.buy}>
        <QtyStepper value={qty} onChange={setQty} />
        <button className={`btn ${styles.add}`} onClick={onAdd} data-state={state} aria-live="polite">
          <span className={styles.label}>
            В корзину <span className="arrow">→</span>
          </span>
          <span className={styles.spinner} aria-hidden="true" />
          <svg className={styles.check} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12.5 L10 17.5 L19 7" pathLength={1} />
          </svg>
          <span className="visually-hidden">{state === "done" ? "Добавлено в корзину" : ""}</span>
        </button>
      </div>
    </div>
  );
}

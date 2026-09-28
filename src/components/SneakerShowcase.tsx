"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { photoPath, type Product } from "@/lib/products";
import { pad } from "@/lib/format";
import AnimatedNumber from "./AnimatedNumber";
import ProductMedia from "./ProductMedia";
import { useQuickView } from "./QuickView";
import styles from "./SneakerShowcase.module.css";

/**
 * Витрина кроссовок, управляемая прокруткой (scrollmation):
 * секция «закрепляется», а прокрутка пролистывает пары в 3D-перспективе.
 * Страница не блокируется — это обычная прокрутка, просто длинная секция.
 */
export default function SneakerShowcase({ items }: { items: Product[] }) {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { show } = useQuickView();

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / total));
      const pos = p * (items.length - 1);
      el.style.setProperty("--pos", pos.toFixed(4));
      el.style.setProperty("--p", p.toFixed(4));
      setActive((a) => {
        const n = Math.round(pos);
        return a === n ? a : n;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [items.length]);

  function jump(i: number) {
    const el = section.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + (total * i) / (items.length - 1), behavior: "smooth" });
  }

  const p = items[active];

  return (
    <section
      ref={section}
      className={styles.section}
      style={{ "--count": items.length } as React.CSSProperties}
      aria-label="Кроссовки"
    >
      <div className={styles.sticky}>
        <div className={styles.head}>
          <p className="mono accent">(02) Sneakers</p>
          <p className={`mono muted ${styles.counter}`}>
            <span className="accent">{pad(active + 1)}</span> / {pad(items.length)}
          </p>
        </div>

        <div className={styles.stage}>
          <span className={`display ${styles.bgWord}`} aria-hidden="true">
            {p.brand ?? "Sneakers"}
          </span>
          {items.map((it, i) => (
            <div
              key={it.slug}
              className={styles.shoe}
              style={{ "--i": i } as React.CSSProperties}
              aria-hidden={i !== active}
            >
              <ProductMedia src={photoPath(it.slug, 0)} alt={it.name} kind="sneakers" />
            </div>
          ))}
          <div className={styles.ring} aria-hidden="true" />
        </div>

        <div className={styles.info}>
          <div key={p.slug} className={styles.swap}>
            <p className="mono muted">{p.brand}</p>
            <h3 className={`display ${styles.name}`}>{p.name}</h3>
            <p className={styles.desc}>{p.description}</p>
            <p className={styles.price}>
              <AnimatedNumber value={p.price} />
            </p>
          </div>
          <div className={styles.actions}>
            <button className="btn" onClick={() => show(p.slug)}>
              Выбрать размер <span className="arrow">→</span>
            </button>
            <Link href={`/shop/${p.slug}`} className="btn btn--ghost">
              Подробнее
            </Link>
          </div>
        </div>

        <div className={styles.progress} aria-hidden="true">
          {items.map((it, i) => (
            <button key={it.slug} onClick={() => jump(i)} data-active={i === active} tabIndex={-1} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { photoPath, type Product } from "@/lib/products";
import { pad } from "@/lib/format";
import ProductMedia from "./ProductMedia";
import Reveal from "./Reveal";
import styles from "./ProductGallery.module.css";

/**
 * Телефон: горизонтальная лента кадров со свайпом и счётчиком.
 * Ноутбук: кадры идут столбцом, крупно.
 */
export default function ProductGallery({ product, goTo = 0 }: { product: Product; goTo?: number }) {
  const [current, setCurrent] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const photos = Array.from({ length: product.photos }, (_, i) => photoPath(product.slug, i));

  // Переход к нужному кадру (например, при выборе цвета). Первый рендер пропускаем.
  const mounted = useRef(false);
  useEffect(() => {
    const el = track.current;
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (!el) return;
    if (window.matchMedia("(min-width: 900px)").matches) {
      (el.children[goTo] as HTMLElement | undefined)?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      el.scrollTo({ left: goTo * el.clientWidth, behavior: "smooth" });
    }
  }, [goTo]);

  function onScroll() {
    const el = track.current;
    if (!el) return;
    setCurrent(Math.round(el.scrollLeft / el.clientWidth));
  }

  function go(i: number) {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  return (
    <div className={styles.gallery}>
      <div ref={track} className={styles.track} onScroll={onScroll}>
        {photos.map((src, i) => (
          <Reveal key={src} variant="image" delay={i === 0 ? 100 : 0} className={styles.slide}>
            <ProductMedia src={src} alt={`${product.name}, фото ${i + 1}`} kind={product.category} priority={i === 0} />
          </Reveal>
        ))}
      </div>

      <div className={`mono ${styles.counter}`}>
        <span>
          <span className="accent">{pad(current + 1)}</span> / {pad(photos.length)}
        </span>
        <span className={styles.dots}>
          {photos.map((_, i) => (
            <button key={i} aria-label={`Фото ${i + 1}`} aria-pressed={current === i} onClick={() => go(i)} />
          ))}
        </span>
      </div>
    </div>
  );
}

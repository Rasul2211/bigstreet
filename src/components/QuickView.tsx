"use client";

import Link from "next/link";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { categoryLabel, getProduct, photoPath, type Product } from "@/lib/products";
import ProductMedia from "./ProductMedia";
import PurchasePanel from "./PurchasePanel";
import styles from "./QuickView.module.css";

type Ctx = { show: (slug: string) => void };
const QuickViewContext = createContext<Ctx>({ show: () => {} });

export function useQuickView() {
  return useContext(QuickViewContext);
}

/** Быстрый просмотр: выбрать размер и положить в корзину, не уходя из каталога. */
export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState(0);

  const show = useCallback((slug: string) => {
    const p = getProduct(slug);
    if (!p) return;
    setProduct(p);
    setPhoto(0);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <QuickViewContext.Provider value={{ show }}>
      {children}
      <div className={styles.scrim} data-open={open} onClick={close} aria-hidden="true" />
      <div className={styles.modal} data-open={open} role="dialog" aria-modal="true" aria-hidden={!open} aria-label="Быстрый просмотр">
        {product && (
          <div key={product.slug} className={styles.inner}>
            <div className={styles.media}>
              <ProductMedia
                key={photo}
                src={photoPath(product.slug, photo)}
                alt={product.name}
                kind={product.category}
              />
              {product.photos > 1 && (
                <div className={`mono ${styles.thumbs}`}>
                  {Array.from({ length: product.photos }).map((_, i) => (
                    <button key={i} aria-pressed={photo === i} onClick={() => setPhoto(i)}>
                      {String(i + 1).padStart(2, "0")}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className={styles.info}>
              <div className={styles.top}>
                <p className="mono accent">{categoryLabel(product.category)}</p>
                <button className={`mono ${styles.close}`} onClick={close} tabIndex={open ? 0 : -1}>
                  Закрыть ✕
                </button>
              </div>
              <h2 className={`display ${styles.name}`}>{product.name}</h2>
              <PurchasePanel
                product={product}
                onColor={(i) => {
                  const ph = product.colors[i].photo;
                  if (ph !== undefined) setPhoto(ph);
                }}
                onAdded={close}
              />
              <Link href={`/shop/${product.slug}`} className={`mono link-line ${styles.more}`} onClick={close}>
                Подробнее о товаре →
              </Link>
            </div>
          </div>
        )}
      </div>
    </QuickViewContext.Provider>
  );
}

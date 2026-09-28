"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { categoryLabel, photoPath, spinFramePath, type Product } from "@/lib/products";
import { store } from "@/lib/store";
import ModelViewer from "./ModelViewer";
import ProductGallery from "./ProductGallery";
import PurchasePanel from "./PurchasePanel";
import Spin360 from "./Spin360";
import styles from "./ProductView.module.css";

type Mode = "photo" | "3d" | "360";

/** Страница товара: слева — название, в центре — фото / 3D / 360°, справа — покупка. */
export default function ProductView({ product }: { product: Product }) {
  const modes: Mode[] = ["photo", ...(product.model3d ? (["3d"] as Mode[]) : []), ...(product.spin360 ? (["360"] as Mode[]) : [])];
  const [mode, setMode] = useState<Mode>(product.model3d ? "3d" : "photo");
  const [photo, setPhoto] = useState(0);
  const frames = useMemo(
    () => Array.from({ length: product.spin360 ?? 0 }, (_, i) => spinFramePath(product.slug, i)),
    [product.slug, product.spin360],
  );

  return (
    <div className={styles.layout}>
      <div className={styles.info}>
        <p className="mono muted">
          <Link href="/shop" className="link-line">
            Каталог
          </Link>{" "}
          /{" "}
          <Link href={`/shop?c=${product.category}`} className="link-line">
            {categoryLabel(product.category)}
          </Link>
        </p>
        {product.brand && <p className={`gothic ${styles.brand}`}>{product.brand}</p>}
        <h1 className={`display ${styles.name}`}>
          {product.name.split(" ").map((w, i) => (
            <span key={i} className="line-mask" style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}>
              <span>{w}</span>
            </span>
          ))}
        </h1>
        {product.isNew && <p className={`mono accent ${styles.badge}`}>● Новинка</p>}
        <p className={styles.desc}>{product.description}</p>
      </div>

      <div className={styles.media}>
        {modes.length > 1 && (
          <div className={`mono ${styles.tabs}`} role="tablist">
            {modes.map((m) => (
              <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)}>
                {m === "photo" ? "Фото" : m === "3d" ? "3D" : "360°"}
              </button>
            ))}
          </div>
        )}
        {mode === "photo" && <ProductGallery product={product} goTo={photo} />}
        {mode === "3d" && product.model3d && (
          <div className={styles.viewer}>
            <ModelViewer src={product.model3d} alt={product.name} poster={photoPath(product.slug, 0)} />
          </div>
        )}
        {mode === "360" && frames.length > 0 && (
          <div className={styles.viewer}>
            <Spin360 frames={frames} alt={product.name} />
          </div>
        )}
      </div>

      <div className={styles.buy}>
        <PurchasePanel
          product={product}
          onColor={(i) => {
            const ph = product.colors[i].photo;
            if (ph !== undefined) {
              setMode("photo");
              setPhoto(ph);
            }
          }}
        />
        <dl className={styles.specs}>
          <div>
            <dt className="mono muted">Доставка</dt>
            <dd>По Душанбе — 20 сом., в другие города — 50 сом.</dd>
          </div>
          <div>
            <dt className="mono muted">Примерка</dt>
            <dd>{store.address}, {store.hours.toLowerCase()}</dd>
          </div>
          <div>
            <dt className="mono muted">Вопросы</dt>
            <dd>
              <a href={store.telegram} target="_blank" rel="noreferrer" className="link-line">
                Написать в Telegram
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

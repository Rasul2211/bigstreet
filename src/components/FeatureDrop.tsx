"use client";

import Link from "next/link";
import { useState } from "react";
import { categoryLabel, photoPath, type Product } from "@/lib/products";
import { pad } from "@/lib/format";
import ProductMedia from "./ProductMedia";
import PurchasePanel from "./PurchasePanel";
import Reveal from "./Reveal";
import styles from "./FeatureDrop.module.css";

/**
 * Editorial-блок коллекции:
 * слева — коллекция и бренд, в центре — крупный кадр, справа — покупка.
 * Под кадром переключатель товаров дропа.
 */
export default function FeatureDrop({ items }: { items: Product[] }) {
  const [active, setActive] = useState(0);
  const [frame, setFrame] = useState(0);
  const product = items[active];

  function pick(i: number) {
    setActive(i);
    setFrame(0);
  }

  return (
    <section id="collection" className={styles.drop}>
      <span id="drop" className={styles.anchor} />
      <Reveal className={styles.intro}>
        <p className="mono accent">(01) Collection</p>
        <h2 className={`display ${styles.title}`}>
          Concrete
          <br />
          Heat
        </h2>
        <p className={styles.text}>
          Первый дроп BIGSTREET. Плотные ткани, свободный крой, чёрный как база и оранжевый как сигнал.
        </p>
        <ol className={`mono ${styles.list}`}>
          {items.map((p, i) => (
            <li key={p.slug}>
              <button onClick={() => pick(i)} aria-pressed={active === i}>
                <span>{pad(i + 1)}</span>
                {p.name}
              </button>
            </li>
          ))}
        </ol>
      </Reveal>

      <div className={styles.stage}>
        <Reveal variant="image" className={styles.visual}>
          {Array.from({ length: product.photos }).map((_, i) => (
            <div
              key={`${product.slug}-${i}`}
              className={styles.layer}
              data-active={frame === i}
            >
              <ProductMedia src={photoPath(product.slug, i)} alt={`${product.name}, фото ${i + 1}`} kind={product.category} />
            </div>
          ))}
          <div className={`mono ${styles.frames}`}>
            {Array.from({ length: product.photos }).map((_, i) => (
              <button key={i} onClick={() => setFrame(i)} aria-pressed={frame === i} aria-label={`Фото ${i + 1}`}>
                {pad(i + 1)}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <Reveal className={styles.buy} delay={150}>
        <div key={product.slug} className={styles.swap}>
          <p className="mono muted">
            {categoryLabel(product.category)} — {pad(active + 1)} / {pad(items.length)}
          </p>
          <h3 className={`display ${styles.name}`}>{product.name}</h3>
          <p className={styles.desc}>{product.description}</p>
          <PurchasePanel product={product} />
          <Link href={`/shop/${product.slug}`} className={`mono link-line ${styles.more}`}>
            Подробнее о товаре →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

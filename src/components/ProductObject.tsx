"use client";

import Link from "next/link";
import { useRef } from "react";
import { photoPath, type Product } from "@/lib/products";
import { pad, price } from "@/lib/format";
import { useQuickView } from "./QuickView";
import ProductMedia from "./ProductMedia";
import Reveal from "./Reveal";
import styles from "./ProductObject.module.css";

type Props = {
  product: Product;
  index: number;
  size: "lead" | "side";
  delay?: number;
};

/**
 * Товар как визуальный объект:
 * — на ноутбуке при наведении меняется ракурс (или играет видео), выезжают размеры и «Быстрый просмотр»;
 * — на телефоне фото открывается «шторкой», кнопка «+» открывает быстрый просмотр.
 */
export default function ProductObject({ product, index, size, delay = 0 }: Props) {
  const { show } = useQuickView();
  const video = useRef<HTMLVideoElement>(null);
  const sizes = product.sizes.filter((s) => !product.soldOut?.includes(s));
  const hasAlt = product.photos > 1 || !!product.video;

  return (
    <div
      className={styles.object}
      data-size={size}
      onMouseEnter={() => video.current?.play().catch(() => {})}
      onMouseLeave={() => video.current?.pause()}
    >
      <div className={styles.mediaWrap}>
      <Link href={`/shop/${product.slug}`} className={styles.link} aria-label={product.name}>
        <Reveal variant="image" delay={delay} className={styles.frame}>
          <ProductMedia src={photoPath(product.slug, 0)} alt={product.name} kind={product.category} />
          {product.video ? (
            <video ref={video} className={styles.alt} src={product.video} muted loop playsInline preload="none" />
          ) : (
            product.photos > 1 && (
              <ProductMedia src={photoPath(product.slug, 1)} alt="" kind={product.category} className={styles.alt} />
            )
          )}
          <span className={styles.tags}>
            {product.isNew && <span className={`mono ${styles.tag}`}>New</span>}
            {product.oldPrice && <span className={`mono ${styles.tag} ${styles.sale}`}>Sale</span>}
            {(product.model3d || product.spin360) && <span className={`mono ${styles.tag} ${styles.ghost}`}>{product.model3d ? "3D" : "360°"}</span>}
          </span>
          {hasAlt && <span className={styles.hint} aria-hidden="true" />}
        </Reveal>
      </Link>

      <button
        className={`mono ${styles.quick}`}
        onClick={() => show(product.slug)}
        aria-label={`Быстрый просмотр: ${product.name}`}
      >
        <span className={styles.quickText}>Быстрый просмотр</span>
        <span className={styles.plus}>+</span>
      </button>
      </div>

      <Reveal className={styles.caption} delay={delay + 150}>
        <span className={`mono ${styles.index}`}>{pad(index)}</span>
        <Link href={`/shop/${product.slug}`} className={styles.name}>
          {product.name}
        </Link>
        <span className={`mono ${styles.price}`}>
          {product.oldPrice && <s className={styles.old}>{product.oldPrice}</s>}
          {price(product.price)}
        </span>
        <span className={`mono ${styles.more}`}>
          <span>{sizes.join(" · ")}</span>
        </span>
      </Reveal>
    </div>
  );
}

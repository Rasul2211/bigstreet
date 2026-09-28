"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProductMedia.module.css";

type Kind = "sneakers" | "tshirts" | "tops" | "bottoms" | "accessories" | "socks" | "model";

type Props = {
  src: string;
  alt: string;
  kind: Kind;
  priority?: boolean;
  /** Второй кадр (показывается при наведении на ноутбуке) */
  className?: string;
};

// Контуры одежды для заглушек, пока нет реальных фото.
const SHAPES: Record<Kind, string> = {
  sneakers: "M8 62 L8 52 Q8 46 14 46 L32 46 L46 36 Q52 33 57 40 L64 50 Q84 53 92 58 Q96 61 94 66 L8 66 Z M8 60 L94 60",
  tshirts: "M30 20 L42 15 Q50 22 58 15 L70 20 L85 35 L76 44 L70 38 L70 85 L30 85 L30 38 L24 44 L15 35 Z",
  tops: "M32 18 L44 14 L50 22 L56 14 L68 18 L84 30 L82 80 L72 80 L70 46 L70 88 L30 88 L30 46 L28 80 L18 80 L16 30 Z M50 22 L50 88",
  bottoms: "M32 12 L68 12 L72 90 L56 90 L50 40 L44 90 L28 90 Z M32 20 L68 20",
  accessories: "M20 62 Q22 32 50 30 Q78 32 80 62 Z M80 62 L94 66 L80 68 M50 30 L50 62",
  socks: "M36 10 L60 10 L60 56 L78 70 Q82 78 74 84 Q68 88 60 82 L36 64 Z M36 18 L60 18",
  model:
    "M50 10 Q58 10 58 20 Q58 30 50 30 Q42 30 42 20 Q42 10 50 10 Z M34 36 L66 36 L72 64 L66 64 L64 50 L64 90 L54 90 L50 62 L46 90 L36 90 L36 50 L34 64 L28 64 Z",
};

export default function ProductMedia({ src, alt, kind, priority, className }: Props) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Если картинка упала ещё до гидрации — onError не сработает, проверяем вручную.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete) {
      if (img.naturalWidth === 0) setFailed(true);
      else setLoaded(true);
    }
  }, []);

  return (
    <div className={`${styles.media} ${className ?? ""}`}>
      {failed ? (
        <div className={styles.placeholder} role="img" aria-label={alt}>
          <svg viewBox="0 0 100 100" className={styles.shape} aria-hidden="true">
            <path d={SHAPES[kind]} />
          </svg>
          <span className={`${styles.corner} ${styles.tl}`} />
          <span className={`${styles.corner} ${styles.br}`} />
          <span className={`mono ${styles.path}`}>
            ФОТО → public{src}
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={styles.img}
          data-loaded={loaded}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { photoPath } from "@/lib/products";
import { store } from "@/lib/store";
import Logo3D from "./Logo3D";
import ProductMedia from "./ProductMedia";
import styles from "./Hero.module.css";

const WORD = "BIGSTREET".split("");

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  // Параллакс карточек: от курсора на ноутбуке и от прокрутки везде
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let mx = 0;
    let my = 0;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    const tick = () => {
      const sy = window.scrollY;
      el.style.setProperty("--mx", mx.toFixed(3));
      el.style.setProperty("--my", my.toFixed(3));
      el.style.setProperty("--sy", String(Math.min(sy, 1200)));
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section ref={root} className={styles.hero}>
      <div className={`mono ${styles.meta}`}>
        <span>
          <span className={styles.dot} /> Открыто · {store.hours}
        </span>
        <span className="muted">{store.city}</span>
      </div>

      <p className={`gothic ${styles.tagline}`}>Streetwear &amp; Sneakers</p>

      <div className={styles.stage}>
        <div className={`${styles.card} ${styles.cardA}`}>
          <ProductMedia src={photoPath("nb-2002r-protection-pack", 0)} alt="New Balance 2002R" kind="sneakers" priority />
          <span className={`mono ${styles.cardTag}`}>NB 2002R</span>
        </div>
        <div className={`${styles.card} ${styles.cardB}`}>
          <ProductMedia src={photoPath("track-jacket", 0)} alt="Олимпийка BIGSTREET" kind="tops" priority />
          <span className={`mono ${styles.cardTag}`}>Олимпийка</span>
        </div>
        <div className={styles.logo}>
          <Logo3D />
        </div>
        <svg className={styles.orbit} viewBox="0 0 400 400" aria-hidden="true">
          <defs>
            <path id="orbit" d="M200 200 m-170 0 a170 170 0 1 1 340 0 a170 170 0 1 1 -340 0" />
          </defs>
          <text>
            <textPath href="#orbit">
              BIGSTREET · DUSHANBE · STREETWEAR &amp; SNEAKERS · ТЦ АНИСА · 3 ЭТАЖ ·
            </textPath>
          </text>
        </svg>
      </div>

      <h1 className={`display ${styles.word}`} aria-label="BIGSTREET">
        {WORD.map((ch, i) => (
          <span key={i} className={styles.char} style={{ "--i": i } as React.CSSProperties} aria-hidden="true">
            <span>{ch}</span>
          </span>
        ))}
      </h1>

      <div className={styles.copy}>
        <p className={`display ${styles.slogan}`}>
          <span className="line-mask" style={{ "--delay": "500ms" } as React.CSSProperties}>
            <span>Меня волнует</span>
          </span>
          <span className="line-mask" style={{ "--delay": "600ms" } as React.CSSProperties}>
            <span className="accent">только одежда.</span>
          </span>
        </p>
        <p className={styles.sub}>
          Стритвир и кроссовки в Душанбе. {store.address}.
        </p>
        <div className={styles.ctas}>
          <Link href="/shop" className="btn">
            Смотреть каталог <span className="arrow">→</span>
          </Link>
          <Link href="/shop?c=sneakers" className="btn btn--ghost">
            Кроссовки
          </Link>
        </div>
      </div>
    </section>
  );
}

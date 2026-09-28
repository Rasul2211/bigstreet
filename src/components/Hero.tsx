import Link from "next/link";
import ProductMedia from "./ProductMedia";
import styles from "./Hero.module.css";

const WORD = "BIGSTREET".split("");

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`mono ${styles.meta}`}>
        <span>
          <span className="accent">●</span> Drop 01 — Concrete Heat
        </span>
        <span className="muted">SS / 26</span>
      </div>

      <div className={styles.visual}>
        {/* Фото модели: положите файл в public/images/hero/hero-01.jpg */}
        <ProductMedia src="/images/hero/hero-01.jpg" alt="BIGSTREET — лукбук Drop 01" kind="model" priority />
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
            <span>Own the street.</span>
          </span>
          <span className="line-mask" style={{ "--delay": "600ms" } as React.CSSProperties}>
            <span className="accent">Wear the noise.</span>
          </span>
        </p>
        <p className={styles.sub}>Streetwear for the next generation. Чёрный, оранжевый и ничего лишнего.</p>
        <Link href="/shop" className="btn">
          Shop collection <span className="arrow">→</span>
        </Link>
      </div>

      <a href="#drop" className={`mono muted ${styles.scroll}`}>
        Scroll ↓
      </a>
    </section>
  );
}

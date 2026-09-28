import type { Metadata } from "next";
import Link from "next/link";
import ProductMedia from "@/components/ProductMedia";
import Reveal from "@/components/Reveal";
import styles from "./about.module.css";

export const metadata: Metadata = { title: "About — BIGSTREET" };

// Тексты — черновик, замените на историю бренда.
export default function About() {
  return (
    <div className={styles.page}>
      <p className="mono accent">About</p>
      <h1 className={`display ${styles.title}`}>
        <span className="line-mask">
          <span>Born on</span>
        </span>
        <span className="line-mask" style={{ "--delay": "90ms" } as React.CSSProperties}>
          <span>
            concrete<span className="accent">.</span>
          </span>
        </span>
      </h1>

      <div className={styles.grid}>
        <Reveal variant="image" className={styles.visual}>
          {/* Фото: public/images/about/about-01.jpg */}
          <ProductMedia src="/images/about/about-01.jpg" alt="BIGSTREET" kind="model" />
        </Reveal>
        <Reveal className={styles.text} delay={150}>
          <p>
            BIGSTREET — streetwear-бренд для тех, кто задаёт тон улице. Чёрный — наша база, оранжевый — сигнал.
          </p>
          <p className="muted">
            Здесь будет история бренда: кто вы, откуда, как делаете вещи и для кого.
          </p>
          <Link href="/shop" className="btn">
            Shop collection <span className="arrow">→</span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

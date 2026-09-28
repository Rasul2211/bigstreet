"use client";

import { useEffect, useRef } from "react";
import Logo from "./Logo";
import styles from "./AnimatedBackground.module.css";

/**
 * Живой фон всего сайта:
 * — плёночное зерно;
 * — медленно плывущие тонкие оранжевые линии;
 * — большая монограмма «bs», которая сдвигается при прокрутке;
 * — мягкое свечение: на ноутбуке следует за курсором, на телефоне медленно дрейфует.
 */
export default function AnimatedBackground() {
  const glow = useRef<HTMLDivElement>(null);
  const mono = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let tx = window.innerWidth * 0.7;
    let ty = window.innerHeight * 0.3;
    let x = tx;
    let y = ty;
    let raf = 0;
    let t = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      t += 0.004;
      if (!fine) {
        tx = window.innerWidth * (0.5 + Math.sin(t) * 0.35);
        ty = window.innerHeight * (0.45 + Math.cos(t * 0.8) * 0.3);
      }
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      if (glow.current) glow.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (mono.current) {
        const s = window.scrollY;
        mono.current.style.transform = `translate3d(0, ${s * -0.08}px, 0) rotate(${-12 + s * 0.01}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className={styles.bg} aria-hidden="true">
      <div ref={glow} className={styles.glow} />

      <div ref={mono} className={styles.mono}>
        <Logo className={styles.monoSvg} />
      </div>

      <svg className={styles.lines} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path className={styles.line} d="M-100 700 C 300 520, 520 880, 900 620 S 1400 360, 1600 520" />
        <path className={`${styles.line} ${styles.l2}`} d="M-100 260 C 260 120, 540 420, 860 260 S 1300 40, 1600 180" />
        <path className={`${styles.line} ${styles.l3}`} d="M200 -60 C 280 260, 80 520, 380 980" />
        <path className={`${styles.line} ${styles.l4}`} d="M1180 -60 C 1080 300, 1380 520, 1160 980" />
      </svg>

      <div className={styles.grain} />
      <div className={styles.vignette} />
    </div>
  );
}

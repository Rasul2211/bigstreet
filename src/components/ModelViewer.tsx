"use client";

import { createElement, useEffect, useRef, useState } from "react";
import styles from "./ModelViewer.module.css";

/**
 * 3D-просмотр кроссовка (GLB из Polycam) на <model-viewer>:
 * вращение пальцем/мышью, приближение, AR на телефоне.
 * Пока пользователь не трогал модель, камера облетает кроссовок при прокрутке.
 */
export default function ModelViewer({ src, alt, poster }: { src: string; alt: string; poster?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    import("@google/model-viewer").then(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!ready || !el) return;
    let touched = false;
    let raf = 0;
    const onLoad = () => setLoaded(true);
    const onTouch = () => (touched = true);
    el.addEventListener("load", onLoad);
    el.addEventListener("pointerdown", onTouch);
    const tick = () => {
      if (!touched) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, 1 - (r.top + r.height / 2) / window.innerHeight));
        el.setAttribute("camera-orbit", `${-40 + p * 140}deg ${80 - p * 20}deg auto`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("load", onLoad);
      el.removeEventListener("pointerdown", onTouch);
    };
  }, [ready]);

  return (
    <div className={styles.wrap} data-loaded={loaded}>
      {ready &&
        createElement("model-viewer", {
          ref,
          src,
          alt,
          poster,
          "camera-controls": "",
          "touch-action": "pan-y",
          "interaction-prompt": "none",
          "shadow-intensity": "1",
          exposure: "1.05",
          "environment-image": "neutral",
          ar: "",
          "ar-modes": "webxr scene-viewer quick-look",
          "min-camera-orbit": "auto auto 40%",
          "max-camera-orbit": "auto auto 140%",
          class: styles.viewer,
        })}
      {!loaded && <div className={`mono ${styles.loading}`}>Загружаем 3D…</div>}
      <p className={`mono ${styles.hint}`}>Крути пальцем · щипок — приблизить</p>
    </div>
  );
}

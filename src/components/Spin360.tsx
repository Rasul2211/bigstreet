"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Spin360.module.css";

/**
 * Вращение одежды на 360° по серии фото (обычно 36 кадров по 10°).
 * Тянешь пальцем или мышью — вещь поворачивается; кнопка «+» — приближение.
 */
export default function Spin360({ frames, alt }: { frames: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const drag = useRef<{ x: number; start: number } | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const hinted = useRef(false);

  // Предзагрузка кадров
  useEffect(() => {
    let alive = true;
    frames.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => alive && setLoaded((n) => n + 1);
      img.src = src;
    });
    return () => {
      alive = false;
    };
  }, [frames]);

  // Один приветственный оборот после загрузки — подсказка, что вещь можно крутить
  useEffect(() => {
    if (hinted.current || loaded < frames.length) return;
    hinted.current = true;
    let k = 0;
    const t = setInterval(() => {
      k++;
      setI((v) => (v + 1) % frames.length);
      if (k >= frames.length) clearInterval(t);
    }, 40);
    return () => clearInterval(t);
  }, [loaded, frames.length]);

  function onDown(e: React.PointerEvent) {
    if (zoom) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { x: e.clientX, start: i };
  }

  function onMove(e: React.PointerEvent) {
    if (zoom && box.current) {
      const r = box.current.getBoundingClientRect();
      setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
      return;
    }
    if (!drag.current || !box.current) return;
    const step = box.current.clientWidth / frames.length / 1.2;
    const delta = Math.round((e.clientX - drag.current.x) / step);
    const n = frames.length;
    setI((((drag.current.start - delta) % n) + n) % n);
  }

  const progress = Math.round((loaded / frames.length) * 100);

  return (
    <div className={styles.wrap}>
      <div
        ref={box}
        className={styles.stage}
        data-zoom={zoom}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={frames[i]} alt={`${alt}, вид ${i * Math.round(360 / frames.length)}°`} draggable={false} style={{ transformOrigin: origin }} />
      </div>
      {progress < 100 && (
        <div className={`mono ${styles.loading}`}>
          <span style={{ width: `${progress}%` }} />
          360° · {progress}%
        </div>
      )}
      <div className={`mono ${styles.bar}`}>
        <span>↔ Потяни, чтобы повернуть</span>
        <button onClick={() => setZoom((z) => !z)} aria-pressed={zoom}>
          {zoom ? "− Уменьшить" : "+ Приблизить"}
        </button>
      </div>
    </div>
  );
}

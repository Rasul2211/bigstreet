"use client";

import { useEffect, useRef, useState } from "react";
import { CURRENCY } from "@/lib/format";

/** Число, которое «прокручивается» счётчиком к новому значению. */
export default function AnimatedNumber({ value, currency = true }: { value: number; currency?: boolean }) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    const start = from.current;
    if (start === value) return;
    const t0 = performance.now();
    const dur = 650;
    let raf = 0;
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      const v = Math.round(start + (value - start) * e);
      setShown(v);
      if (k < 1) raf = requestAnimationFrame(step);
      else from.current = value;
    };
    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      from.current = value;
    };
  }, [value]);

  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {shown.toLocaleString("ru-RU")}
      {currency ? ` ${CURRENCY}` : ""}
    </span>
  );
}

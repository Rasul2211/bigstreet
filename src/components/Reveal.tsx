"use client";

import { useEffect, useRef } from "react";

type Props = {
  as?: keyof React.JSX.IntrinsicElements;
  variant?: "fade" | "image";
  delay?: number;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

/** Плавное появление элемента при прокрутке. Работает и на телефоне, и на ноутбуке. */
export default function Reveal({ as = "div", variant = "fade", delay = 0, className, children, style }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.in = "true";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.in = "true";
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    // Для «шторки» следим за родителем: сам элемент обрезан clip-path,
    // и браузер считает его невидимым, пока шторка закрыта.
    io.observe(variant === "image" && el.parentElement ? el.parentElement : el);
    return () => io.disconnect();
  }, [variant]);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={className}
      data-reveal={variant === "image" ? "image" : ""}
      style={{ ...style, "--delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

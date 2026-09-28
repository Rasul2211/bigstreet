"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { categoryLabel, photoPath, products } from "@/lib/products";
import { price } from "@/lib/format";
import ProductMedia from "./ProductMedia";
import styles from "./SearchOverlay.module.css";

export default function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => input.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return products.filter(
      (p) => p.name.toLowerCase().includes(s) || categoryLabel(p.category).toLowerCase().includes(s),
    );
  }, [q]);

  return (
    <div className={styles.overlay} data-open={open} aria-hidden={!open} role="dialog" aria-label="Поиск">
      <div className={styles.top}>
        <label className="visually-hidden" htmlFor="search-input">
          Поиск по каталогу
        </label>
        <input
          id="search-input"
          ref={input}
          className={`display ${styles.input}`}
          placeholder="Search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoComplete="off"
          tabIndex={open ? 0 : -1}
        />
        <button className={`mono ${styles.close}`} onClick={onClose} tabIndex={open ? 0 : -1}>
          Close
        </button>
      </div>

      <div className={styles.results}>
        {q && results.length === 0 && <p className="mono muted">Ничего не найдено</p>}
        {!q && (
          <p className="mono muted">
            Попробуйте: <button onClick={() => setQ("hoodie")}>hoodie</button>,{" "}
            <button onClick={() => setQ("tee")}>tee</button>,{" "}
            <button onClick={() => setQ("pants")}>pants</button>
          </p>
        )}
        {results.map((p, i) => (
          <Link
            key={p.slug}
            href={`/shop/${p.slug}`}
            onClick={onClose}
            className={styles.row}
            style={{ "--delay": `${i * 40}ms` } as React.CSSProperties}
          >
            <span className={styles.thumb}>
              <ProductMedia src={photoPath(p.slug, 0)} alt={p.name} kind={p.category} />
            </span>
            <span className={styles.name}>{p.name}</span>
            <span className="mono muted">{categoryLabel(p.category)}</span>
            <span className="mono">{price(p.price)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

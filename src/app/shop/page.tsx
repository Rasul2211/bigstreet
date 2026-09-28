import type { Metadata } from "next";
import CategoryRail from "@/components/CategoryRail";
import ProductTriad from "@/components/ProductTriad";
import { categories, categoryLabel, productsByCategory, toTriads } from "@/lib/products";
import { pad } from "@/lib/format";
import styles from "./shop.module.css";

export const metadata: Metadata = { title: "Каталог — BIGSTREET" };

export default async function Shop({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;
  const valid = c && categories.some((x) => x.id === c) ? c : undefined;
  const list = productsByCategory(valid);
  const triads = toTriads(list);

  return (
    <div className={styles.shop}>
      <header className={styles.head}>
        <p className="mono muted">
          Каталог / <span className="accent">{valid ? categoryLabel(valid) : "Все"}</span>
        </p>
        <h1 className={`display ${styles.title}`}>
          {valid ? categoryLabel(valid) : "Все вещи"}
          <sup className="mono accent">{pad(list.length)}</sup>
        </h1>
      </header>

      <CategoryRail active={valid} />

      <div key={valid ?? "all"} className={styles.list}>
        {triads.length === 0 && <p className="mono muted container">Скоро здесь появятся вещи.</p>}
        {triads.map((items, i) => (
          <ProductTriad key={items[0].slug} items={items} set={i} startIndex={i * 3} total={triads.length} />
        ))}
      </div>
    </div>
  );
}

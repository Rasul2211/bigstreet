import type { Product } from "@/lib/products";
import { pad } from "@/lib/format";
import ProductObject from "./ProductObject";
import styles from "./ProductTriad.module.css";

type Props = {
  items: Product[];
  /** Номер тройки — задаёт зеркальность раскладки */
  set: number;
  /** Номер первого товара в тройке (для сквозной нумерации) */
  startIndex: number;
  total?: number;
};

/**
 * Блок из трёх товаров: один крупный + два поменьше.
 * Чётные блоки зеркалятся — каталог читается как вёрстка журнала: 3 → 3 → 3.
 */
export default function ProductTriad({ items, set, startIndex, total }: Props) {
  const [lead, ...side] = items;
  const mirrored = set % 2 === 1;
  return (
    <section className={styles.triad} data-mirror={mirrored} data-count={items.length}>
      <header className={`mono ${styles.head}`}>
        <span className="accent">Set {pad(set + 1)}</span>
        <span className={styles.rule} />
        {total ? <span className="muted">{pad(set + 1)} / {pad(total)}</span> : null}
      </header>
      <div className={styles.grid}>
        <div className={styles.lead}>
          <ProductObject product={lead} index={startIndex + 1} size="lead" />
        </div>
        {side.map((p, i) => (
          <div key={p.slug} className={i === 0 ? styles.sideA : styles.sideB}>
            <ProductObject product={p} index={startIndex + 2 + i} size="side" delay={120 + i * 120} />
          </div>
        ))}
      </div>
    </section>
  );
}

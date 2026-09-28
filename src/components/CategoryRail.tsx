import Link from "next/link";
import { activeCategories, products, productsByCategory } from "@/lib/products";
import Icon from "./Icon";
import Reveal from "./Reveal";
import styles from "./CategoryRail.module.css";

/** Категории как «актуальное» в Instagram BIGSTREET: кружки с оранжевыми линейными иконками. */
export default function CategoryRail({ active }: { active?: string }) {
  const items = [
    { id: "all", label: "Все", icon: null, count: products.length },
    ...activeCategories().map((c) => ({ ...c, count: productsByCategory(c.id).length })),
  ];
  return (
    <nav className={styles.rail} aria-label="Категории">
      <Reveal as="ul" className={styles.list}>
        {items.map((c, i) => {
          const isActive = (active ?? "all") === c.id;
          return (
            <li key={c.id} style={{ "--i": i } as React.CSSProperties}>
              <Link
                href={c.id === "all" ? "/shop" : `/shop?c=${c.id}`}
                className={styles.item}
                aria-current={isActive ? "page" : undefined}
                scroll={false}
              >
                <span className={styles.ring}>
                  {c.icon ? (
                    <Icon name={c.icon} draw className={styles.icon} />
                  ) : (
                    <span className={`display ${styles.all}`}>bs</span>
                  )}
                </span>
                <span className={styles.label}>
                  {c.label}
                  <sup className="mono">{c.count}</sup>
                </span>
              </Link>
            </li>
          );
        })}
      </Reveal>
    </nav>
  );
}

import Link from "next/link";
import { categories, productsByCategory } from "@/lib/products";
import { pad } from "@/lib/format";
import styles from "./CategoryRail.module.css";

/** Горизонтальная лента категорий — крупная типографика вместо select. */
export default function CategoryRail({ active }: { active?: string }) {
  const all = [{ id: "all", label: "All" }, ...categories];
  return (
    <nav className={styles.rail} aria-label="Категории">
      <ul className={styles.list}>
        {all.map((c) => {
          const isActive = (active ?? "all") === c.id;
          return (
            <li key={c.id}>
              <Link
                href={c.id === "all" ? "/shop" : `/shop?c=${c.id}`}
                className={styles.item}
                aria-current={isActive ? "page" : undefined}
                scroll={false}
              >
                <span className="display">{c.label}</span>
                <sup className="mono">{pad(productsByCategory(c.id).length)}</sup>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

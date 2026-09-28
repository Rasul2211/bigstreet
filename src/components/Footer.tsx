import Link from "next/link";
import { categories } from "@/lib/products";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.cols}>
        <div>
          <p className="mono muted">Shop</p>
          <ul>
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/shop?c=${c.id}`} className="link-line">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mono muted">Brand</p>
          <ul>
            <li>
              <Link href="/about" className="link-line">
                About
              </Link>
            </li>
            <li>
              <Link href="/#collection" className="link-line">
                Collection
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <p className={`display ${styles.word}`} aria-hidden="true">
        BIGSTREET
      </p>

      <div className={`mono muted ${styles.bottom}`}>
        <span>© {new Date().getFullYear()} BIGSTREET</span>
        <span>Streetwear for the next generation</span>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { activeCategories } from "@/lib/products";
import { store } from "@/lib/store";
import Logo from "./Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <Logo className={styles.mark} />
        <p className={`gothic ${styles.tag}`}>Streetwear &amp; Sneakers</p>
      </div>

      <div className={styles.cols}>
        <div>
          <p className="mono muted">Каталог</p>
          <ul>
            {activeCategories().map((c) => (
              <li key={c.id}>
                <Link href={`/shop?c=${c.id}`} className="link-line">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mono muted">Магазин</p>
          <ul>
            <li>{store.address}</li>
            <li className="muted">
              {store.city}, {store.street}
            </li>
            <li>{store.hours}</li>
          </ul>
        </div>
        <div>
          <p className="mono muted">Связь</p>
          <ul>
            <li>
              <a href={store.phoneHref} className="link-line">
                {store.phone}
              </a>
            </li>
            <li>
              <a href={store.telegram} target="_blank" rel="noreferrer" className="link-line">
                Telegram
              </a>
            </li>
            <li>
              <a href={store.instagram} target="_blank" rel="noreferrer" className="link-line">
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="mono muted">Покупателям</p>
          <ul>
            <li>
              <Link href="/about" className="link-line">
                О магазине
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="link-line">
                Доставка и оплата
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
        <span>{store.city}</span>
      </div>
    </footer>
  );
}

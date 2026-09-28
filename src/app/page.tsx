import Link from "next/link";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import SneakerShowcase from "@/components/SneakerShowcase";
import CategoryRail from "@/components/CategoryRail";
import ProductTriad from "@/components/ProductTriad";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import Logo from "@/components/Logo";
import { products, productsByCategory, toTriads } from "@/lib/products";
import { store } from "@/lib/store";
import styles from "./home.module.css";

export default function Home() {
  const sneakers = productsByCategory("sneakers");
  const clothes = products.filter((p) => p.category !== "sneakers");
  const latest = toTriads(clothes.slice(0, 9));

  return (
    <>
      <Hero />

      <Marquee items={["Streetwear & Sneakers", store.city, store.address, "Без выходных 10:00–20:30"]} />

      <SneakerShowcase items={sneakers} />

      <Marquee tone="orange" reverse items={["Новые поступления", "Оверсайз", "Кроссовки", "Доставка по Таджикистану"]} />

      <section className={styles.catalog}>
        <Reveal className={styles.catalogHead}>
          <p className="mono accent">(03) Одежда</p>
          <h2 className={`display ${styles.h2}`}>
            Меня волнует <span className={styles.outline}>только</span> одежда
          </h2>
        </Reveal>
        <CategoryRail />
        <div className={styles.triads}>
          {latest.map((items, i) => (
            <ProductTriad key={i} items={items} set={i} startIndex={i * 3} total={latest.length} />
          ))}
        </div>
        <div className={styles.more}>
          <Link href="/shop" className="btn btn--ghost">
            Весь каталог — {products.length} вещей <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      <section className={styles.visit}>
        <Reveal className={styles.visitMono} variant="image">
          <Logo className={styles.visitLogo} />
        </Reveal>
        <div className={styles.visitInfo}>
          <Reveal>
            <p className="mono accent">(04) Магазин</p>
            <h2 className={`display ${styles.h2}`}>
              Приходи <br />
              примерить<span className="accent">.</span>
            </h2>
          </Reveal>
          <Reveal as="ul" className={styles.facts} delay={120}>
            <li>
              <Icon name="pin" draw className={styles.factIcon} />
              <span>
                {store.address}
                <br />
                <span className="muted">
                  {store.city}, {store.street}
                </span>
              </span>
            </li>
            <li>
              <Icon name="clock" draw className={styles.factIcon} />
              <span>{store.hours}</span>
            </li>
            <li>
              <Icon name="phone" draw className={styles.factIcon} />
              <a href={store.phoneHref} className="link-line">
                {store.phone}
              </a>
            </li>
            <li>
              <Icon name="send" draw className={styles.factIcon} />
              <a href={store.telegram} target="_blank" rel="noreferrer" className="link-line">
                Telegram @bigstreetdushanbe
              </a>
            </li>
          </Reveal>
          <Reveal delay={200} className={styles.visitCta}>
            <a href={store.map} target="_blank" rel="noreferrer" className="btn">
              Открыть на карте <span className="arrow">→</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}

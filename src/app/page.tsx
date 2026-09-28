import Link from "next/link";
import Hero from "@/components/Hero";
import FeatureDrop from "@/components/FeatureDrop";
import CategoryRail from "@/components/CategoryRail";
import ProductTriad from "@/components/ProductTriad";
import Reveal from "@/components/Reveal";
import { products, toTriads } from "@/lib/products";
import styles from "./home.module.css";

export default function Home() {
  const drop = products.filter((p) => p.isNew).slice(0, 4);
  const latest = toTriads(products.slice(0, 9));

  return (
    <>
      <Hero />

      <FeatureDrop items={drop} />

      <section className={styles.catalog}>
        <Reveal className={styles.catalogHead}>
          <p className="mono accent">(02) Shop</p>
          <h2 className={`display ${styles.h2}`}>The line-up</h2>
        </Reveal>
        <CategoryRail />
        <div className={styles.triads}>
          {latest.map((items, i) => (
            <ProductTriad key={i} items={items} set={i} startIndex={i * 3} total={latest.length} />
          ))}
        </div>
        <div className={styles.more}>
          <Link href="/shop" className="btn btn--ghost">
            View all pieces <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      <section className={styles.statement}>
        <Reveal>
          <p className="mono accent">(03) BIGSTREET</p>
        </Reveal>
        <Reveal delay={100}>
          <p className={`display ${styles.big}`}>
            Big on detail.
            <br />
            <span className={styles.outline}>Made for</span>
            <br />
            the street<span className="accent">.</span>
          </p>
        </Reveal>
        <Reveal delay={200} className={styles.statementFoot}>
          <Link href="/about" className="mono link-line">
            About the brand →
          </Link>
        </Reveal>
      </section>
    </>
  );
}

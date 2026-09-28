import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";
import PurchasePanel from "@/components/PurchasePanel";
import ProductTriad from "@/components/ProductTriad";
import Reveal from "@/components/Reveal";
import { categoryLabel, getProduct, products, related } from "@/lib/products";
import styles from "./product.module.css";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return { title: p ? `${p.name} — BIGSTREET` : "BIGSTREET" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const recs = related(product.slug, 3);

  return (
    <article className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.info}>
          <p className="mono muted">
            <Link href="/shop" className="link-line">
              Shop
            </Link>{" "}
            /{" "}
            <Link href={`/shop?c=${product.category}`} className="link-line">
              {categoryLabel(product.category)}
            </Link>
          </p>
          <h1 className={`display ${styles.name}`}>
            {product.name.split(" ").map((w, i) => (
              <span key={i} className="line-mask" style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}>
                <span>{w}</span>
              </span>
            ))}
          </h1>
          {product.isNew && <p className={`mono accent ${styles.badge}`}>● New arrival</p>}
          <p className={styles.desc}>{product.description}</p>
        </div>

        <div className={styles.gallery}>
          <ProductGallery product={product} />
        </div>

        <div className={styles.buy}>
          <PurchasePanel product={product} />
          <dl className={styles.specs}>
            <div>
              <dt className="mono muted">Материал</dt>
              <dd>{product.material}</dd>
            </div>
            <div>
              <dt className="mono muted">Посадка</dt>
              <dd>{product.fit}</dd>
            </div>
            <div>
              <dt className="mono muted">Цвета</dt>
              <dd>{product.colors.map((c) => c.name).join(", ")}</dd>
            </div>
          </dl>
        </div>
      </div>

      <section className={styles.recs}>
        <Reveal className={styles.recsHead}>
          <p className="mono accent">Complete the look</p>
          <h2 className={`display ${styles.recsTitle}`}>You may also like</h2>
        </Reveal>
        <ProductTriad items={recs} set={0} startIndex={0} />
      </section>
    </article>
  );
}

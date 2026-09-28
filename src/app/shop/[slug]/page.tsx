import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductView from "@/components/ProductView";
import ProductTriad from "@/components/ProductTriad";
import Reveal from "@/components/Reveal";
import { getProduct, products, related } from "@/lib/products";
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

  return (
    <article className={styles.page}>
      <ProductView product={product} />

      <section className={styles.recs}>
        <Reveal className={styles.recsHead}>
          <p className="mono accent">Собери образ</p>
          <h2 className={`display ${styles.recsTitle}`}>С этим носят</h2>
        </Reveal>
        <ProductTriad items={related(product.slug, 3)} set={0} startIndex={0} />
      </section>
    </article>
  );
}

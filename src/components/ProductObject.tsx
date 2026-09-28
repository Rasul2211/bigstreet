import Link from "next/link";
import { photoPath, type Product } from "@/lib/products";
import { pad, price } from "@/lib/format";
import ProductMedia from "./ProductMedia";
import Reveal from "./Reveal";
import styles from "./ProductObject.module.css";

type Props = {
  product: Product;
  index: number;
  size: "lead" | "side";
  delay?: number;
};

/**
 * Товар как визуальный объект, а не карточка:
 * фото без рамки, номер, название и цена — тонкой строкой под изображением.
 * На ноутбуке при наведении меняется кадр и выезжают размеры.
 * На телефоне — появление «шторкой» при скролле и отклик на нажатие.
 */
export default function ProductObject({ product, index, size, delay = 0 }: Props) {
  const sizes = product.sizes.filter((s) => !product.soldOut?.includes(s));
  return (
    <Link href={`/shop/${product.slug}`} className={styles.object} data-size={size}>
      <Reveal variant="image" delay={delay} className={styles.frame}>
        <ProductMedia src={photoPath(product.slug, 0)} alt={product.name} kind={product.category} />
        {product.photos > 1 && (
          <ProductMedia
            src={photoPath(product.slug, 1)}
            alt=""
            kind={product.category}
            className={styles.alt}
          />
        )}
        {product.isNew && <span className={`mono ${styles.tag}`}>New</span>}
      </Reveal>

      <Reveal className={styles.caption} delay={delay + 150}>
        <span className={`mono ${styles.index}`}>{pad(index)}</span>
        <span className={styles.name}>
          <span className={styles.nameInner}>{product.name}</span>
        </span>
        <span className={`mono ${styles.price}`}>{price(product.price)}</span>
        <span className={`mono ${styles.more}`}>
          <span>{sizes.join(" · ")}</span>
          <span className={styles.view}>View →</span>
        </span>
      </Reveal>
    </Link>
  );
}

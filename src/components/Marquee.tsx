import Logo from "./Logo";
import styles from "./Marquee.module.css";

/** Бегущая строка. Контент дублируется для бесшовной прокрутки. */
export default function Marquee({ items, reverse, tone = "dark" }: { items: string[]; reverse?: boolean; tone?: "dark" | "orange" }) {
  const row = (
    <div className={styles.row} aria-hidden="true">
      {items.map((t, i) => (
        <span key={i} className={styles.item}>
          <span>{t}</span>
          <Logo className={styles.sep} />
        </span>
      ))}
    </div>
  );
  return (
    <div className={styles.marquee} data-reverse={reverse} data-tone={tone}>
      <span className="visually-hidden">{items.join(" — ")}</span>
      <div className={styles.track}>
        {row}
        {row}
      </div>
    </div>
  );
}

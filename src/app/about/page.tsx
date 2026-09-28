import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Logo3D from "@/components/Logo3D";
import Reveal from "@/components/Reveal";
import { store } from "@/lib/store";
import styles from "./about.module.css";

export const metadata: Metadata = { title: "Магазин — BIGSTREET" };

export default function About() {
  return (
    <div className={styles.page}>
      <p className="mono accent">Магазин</p>
      <h1 className={`display ${styles.title}`}>
        <span className="line-mask">
          <span>Bigstreet</span>
        </span>
        <span className="line-mask" style={{ "--delay": "90ms" } as React.CSSProperties}>
          <span className="gothic accent">Dushanbe</span>
        </span>
      </h1>

      <div className={styles.grid}>
        <div className={styles.visual}>
          <Logo3D />
        </div>
        <Reveal className={styles.text} delay={150}>
          <p>
            BIGSTREET — стритвир и кроссовки в Душанбе. New Balance, Nike, Adidas, Vans, On и оверсайз-одежда на каждый
            день.
          </p>
          <ul className={styles.facts}>
            <li>
              <Icon name="pin" draw className={styles.icon} />
              <span>
                {store.address}
                <br />
                <span className="muted">
                  {store.city}, {store.street}
                </span>
              </span>
            </li>
            <li>
              <Icon name="clock" draw className={styles.icon} />
              <span>{store.hours}</span>
            </li>
            <li>
              <Icon name="phone" draw className={styles.icon} />
              <a href={store.phoneHref} className="link-line">
                {store.phone}
              </a>
            </li>
            <li>
              <Icon name="send" draw className={styles.icon} />
              <span>
                <a href={store.telegram} target="_blank" rel="noreferrer" className="link-line">
                  Telegram
                </a>{" "}
                ·{" "}
                <a href={store.instagram} target="_blank" rel="noreferrer" className="link-line">
                  Instagram
                </a>
              </span>
            </li>
          </ul>
          <div className={styles.ctas}>
            <a href={store.map} target="_blank" rel="noreferrer" className="btn">
              Открыть на карте <span className="arrow">→</span>
            </a>
            <Link href="/shop" className="btn btn--ghost">
              Каталог
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

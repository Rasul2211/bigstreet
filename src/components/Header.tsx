"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import SearchOverlay from "./SearchOverlay";
import styles from "./Header.module.css";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?c=new", label: "New" },
  { href: "/#collection", label: "Collection" },
  { href: "/about", label: "About" },
];

function NavLinks({ onNavigate, big }: { onNavigate?: () => void; big?: boolean }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const c = params.get("c");
  const current = pathname + (c ? `?c=${c}` : "");
  return (
    <>
      {NAV.map((item, i) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={big ? styles.bigLink : "link-line"}
          aria-current={current === item.href ? "page" : undefined}
          style={big ? ({ "--delay": `${120 + i * 70}ms` } as React.CSSProperties) : undefined}
        >
          {big ? (
            <>
              <span className="mono muted">0{i + 1}</span>
              <span className="display">{item.label}</span>
            </>
          ) : (
            item.label
          )}
        </Link>
      ))}
    </>
  );
}

export default function Header() {
  const { count, open } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [bump, setBump] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Счётчик корзины «подпрыгивает», когда добавили товар.
  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 500);
    return () => clearTimeout(t);
  }, [count]);

  useEffect(() => setMenu(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menu || search ? "hidden" : "";
  }, [menu, search]);

  return (
    <>
      <header className={styles.header} data-solid={scrolled || menu}>
        <Link href="/" className={`display ${styles.logo}`} aria-label="BIGSTREET — на главную">
          BIG<span className="accent">/</span>STREET
        </Link>

        <nav className={`mono ${styles.nav}`} aria-label="Основное меню">
          <Suspense>
            <NavLinks />
          </Suspense>
        </nav>

        <div className={`mono ${styles.actions}`}>
          <button className={styles.action} onClick={() => setSearch(true)} aria-label="Поиск">
            <span className={styles.textOnly}>Search</span>
            <svg className={styles.iconOnly} viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.5 15.5 L21 21" />
            </svg>
          </button>
          <button className={styles.action} onClick={open} aria-label={`Корзина, товаров: ${count}`}>
            <span className={styles.textOnly}>Cart</span>
            <svg className={styles.iconOnly} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 8 H19 L18 21 H6 Z" />
              <path d="M9 8 V6 A3 3 0 0 1 15 6 V8" />
            </svg>
            <span className={styles.count} data-bump={bump} data-empty={count === 0}>
              {count}
            </span>
          </button>
          <button
            className={`${styles.action} ${styles.menuBtn}`}
            onClick={() => setMenu((v) => !v)}
            aria-expanded={menu}
            aria-label="Меню"
          >
            <span className={styles.burger} data-open={menu}>
              <i />
              <i />
            </span>
          </button>
        </div>
      </header>

      <div className={styles.menu} data-open={menu} aria-hidden={!menu}>
        <nav className={styles.menuNav}>
          <Suspense>
            <NavLinks big onNavigate={() => setMenu(false)} />
          </Suspense>
        </nav>
        <p className={`mono muted ${styles.menuFoot}`}>BIGSTREET — Streetwear for the next generation</p>
      </div>

      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="container"
      style={{ paddingTop: "calc(var(--header-h) + 60px)", minHeight: "70svh", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}
    >
      <p className="mono accent">Ошибка 404</p>
      <h1 className="display" style={{ fontSize: "clamp(80px, 20vw, 240px)" }}>
        Потерялся<span className="accent">?</span>
      </h1>
      <Link href="/shop" className="btn">
        В каталог <span className="arrow">→</span>
      </Link>
    </div>
  );
}

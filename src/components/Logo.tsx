import { LOGO_PATH, LOGO_VIEWBOX } from "./logoPath";

/** Монограмма BIGSTREET «bs». Цвет берётся из currentColor. */
export default function Logo({ className, title = "BIGSTREET" }: { className?: string; title?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} role="img" aria-label={title}>
      <path d={LOGO_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

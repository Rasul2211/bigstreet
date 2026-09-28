import type { IconName } from "@/lib/products";
import styles from "./Icon.module.css";

// Линейные иконки в стиле «актуального» BIGSTREET в Instagram.
const PATHS: Record<IconName | "pin" | "clock" | "phone" | "send", string[]> = {
  sneaker: [
    "M4 30 L4 22 Q4 18 8 18 L18 18 L26 12 Q30 10 33 14 L38 22 Q52 24 58 28 Q61 30 60 34 L4 34 Z",
    "M4 30 L60 30",
    "M22 17 L25 22 M27 15 L30 20 M32 14 L34 18",
  ],
  tee: ["M22 8 L14 12 L6 22 L14 28 L18 24 L18 56 L46 56 L46 24 L50 28 L58 22 L50 12 L42 8 Q32 16 22 8 Z"],
  shirt: [
    "M24 8 L12 13 L6 30 L14 32 L18 24 L18 56 L46 56 L46 24 L50 32 L58 30 L52 13 L40 8 L32 16 Z",
    "M32 16 L32 56",
    "M24 8 L28 18 L32 16 L36 18 L40 8",
  ],
  pants: ["M18 6 L46 6 L50 58 L37 58 L32 22 L27 58 L14 58 Z", "M18 12 L46 12"],
  cap: ["M8 40 Q8 16 32 16 Q56 16 56 40 Z", "M56 40 L62 44 L48 46 L32 40", "M32 16 L32 40", "M30 14 L34 14"],
  sock: ["M22 6 L40 6 L40 36 L54 46 Q58 52 52 57 Q48 60 42 56 L22 44 Z", "M22 12 L40 12"],
  tag: ["M8 8 L30 8 L58 36 L36 58 L8 30 Z", "M19 19 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0"],
  pin: ["M32 58 Q14 38 14 26 A18 18 0 0 1 50 26 Q50 38 32 58 Z", "M32 26 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0"],
  clock: ["M32 32 m-24 0 a24 24 0 1 0 48 0 a24 24 0 1 0 -48 0", "M32 16 L32 32 L42 38"],
  phone: ["M18 8 L26 8 L30 20 L24 24 Q28 34 40 40 L44 34 L56 38 L56 46 Q54 56 44 56 Q10 50 8 18 Q8 8 18 8 Z"],
  send: ["M6 30 L58 8 L46 56 L30 38 Z", "M30 38 L58 8"],
};

export type AnyIcon = keyof typeof PATHS;

/** draw — иконка «рисуется» линией при появлении (родитель ставит data-in="true"). */
export default function Icon({ name, className, draw }: { name: AnyIcon; className?: string; draw?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={`${styles.icon} ${className ?? ""}`} data-draw={draw} aria-hidden="true">
      {PATHS[name].map((d, i) => (
        <path key={i} d={d} pathLength={1} />
      ))}
    </svg>
  );
}

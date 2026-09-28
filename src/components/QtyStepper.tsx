"use client";

import styles from "./QtyStepper.module.css";

export default function QtyStepper({
  value,
  onChange,
  small,
}: {
  value: number;
  onChange: (v: number) => void;
  small?: boolean;
}) {
  return (
    <div className={`mono ${styles.stepper}`} data-small={small}>
      <button onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Уменьшить количество">
        −
      </button>
      <span aria-live="polite">{String(value).padStart(2, "0")}</span>
      <button onClick={() => onChange(value + 1)} disabled={value >= 10} aria-label="Увеличить количество">
        +
      </button>
    </div>
  );
}

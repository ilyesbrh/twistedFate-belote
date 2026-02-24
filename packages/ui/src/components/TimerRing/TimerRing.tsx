import styles from "./TimerRing.module.css";

interface TimerRingProps {
  isActive: boolean;
  /** seconds remaining (0–30); purely visual for now */
  timeLeft?: number;
}

/**
 * SVG countdown ring rendered on top of the avatar.
 * Uses a normalized 100×100 viewBox so it scales with CSS width/height.
 * Stroke drains clockwise from full (green) to empty (red) over `duration` seconds.
 */
const DURATION = 30; // seconds
const R = 46; // circle radius inside 100×100 viewBox
const CIRCUMFERENCE = 2 * Math.PI * R; // ≈ 289

export function TimerRing({ isActive }: TimerRingProps) {
  if (!isActive) return null;

  return (
    <svg
      className={styles.svg}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Dim track */}
      <circle className={styles.track} cx="50" cy="50" r={R} />
      {/* Animated progress arc */}
      <circle
        className={styles.progress}
        cx="50"
        cy="50"
        r={R}
        style={
          {
            "--circ": CIRCUMFERENCE,
            "--dur": `${DURATION}s`,
          } as React.CSSProperties
        }
      />
    </svg>
  );
}

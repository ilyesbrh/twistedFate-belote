import type { CSSProperties } from "react";
import styles from "./CardBack.module.css";

interface CardBackProps {
  width?: number;
  height?: number;
  style?: CSSProperties;
}

export function CardBack({ width, height, style }: CardBackProps) {
  const cssVars = {
    "--cw": width ? `${width}px` : undefined,
    "--ch": height ? `${height}px` : undefined,
  } as CSSProperties;

  return <div className={styles.card} style={{ ...cssVars, ...style }} data-testid="card-back" />;
}

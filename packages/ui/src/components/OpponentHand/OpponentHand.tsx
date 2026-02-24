import type { CSSProperties } from 'react';
import { CardBack } from '../CardBack/CardBack.js';
import styles from './OpponentHand.module.css';

interface OpponentHandProps {
  cardCount: number;
  orientation: 'top' | 'left' | 'right';
}

const FAN_SPAN = 44; // total degrees — shared by top and side fans

export function OpponentHand({ cardCount, orientation }: OpponentHandProps) {
  const n = Math.min(cardCount, 10);

  if (orientation === 'top') {
    return (
      <div className={styles.topFan} data-testid="opponent-hand-north">
        {Array.from({ length: n }).map((_, i) => {
          const angle = n > 1 ? -FAN_SPAN / 2 + (i / (n - 1)) * FAN_SPAN : 0;
          const style: CSSProperties = {
            transform: `translateX(-50%) rotate(${angle}deg)`,
          };
          return (
            <div key={i} className={styles.topFanSlot} style={style}>
              <CardBack />
            </div>
          );
        })}
      </div>
    );
  }

  /* ── Left / Right: same arc fan as top, rotated ±90° via CSS ── */
  const isLeft = orientation === 'left';
  const fanCards = Math.min(n, 8);

  return (
    /* sideWrap has the POST-rotation dimensions so layout is correct */
    <div
      className={`${styles.sideWrap} ${isLeft ? styles.sideWrapLeft : styles.sideWrapRight}`}
      data-testid={`opponent-hand-${orientation}`}
    >
      {/* sideFan has the PRE-rotation dimensions and is rotated via CSS */}
      <div className={`${styles.sideFan} ${isLeft ? styles.sideFanLeft : styles.sideFanRight}`}>
        {Array.from({ length: fanCards }).map((_, i) => {
          const angle = fanCards > 1 ? -FAN_SPAN / 2 + (i / (fanCards - 1)) * FAN_SPAN : 0;
          const style: CSSProperties = {
            transform: `translateX(-50%) rotate(${angle}deg)`,
          };
          return (
            <div key={i} className={styles.sideFanSlot} style={style}>
              <CardBack />
            </div>
          );
        })}
      </div>
    </div>
  );
}

import type { Suit } from "../../data/mockGame.js";
import styles from "./TrumpIndicator.module.css";

interface TrumpIndicatorProps {
  suit: Suit;
}

const SUIT_SYMBOLS: Record<Suit, string> = {
  clubs: "♣",
  hearts: "♥",
  diamonds: "♦",
  spades: "♠",
};

const RED_SUITS: Suit[] = ["hearts", "diamonds"];

export function TrumpIndicator({ suit }: TrumpIndicatorProps) {
  const isRed = RED_SUITS.includes(suit);

  return (
    <div className={styles.indicator} data-testid="trump-indicator" title={`Trump: ${suit}`}>
      <div className={styles.midRing}>
        <div className={styles.inner}>
          <div className={styles.suits}>
            <span className={styles.suitSpade}>♠</span>
            <span
              className={styles.suitHeart}
              style={{ color: isRed ? "var(--suit-red)" : undefined }}
            >
              {SUIT_SYMBOLS[suit]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

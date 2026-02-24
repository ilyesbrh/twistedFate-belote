import { useState } from 'react';
import type { CSSProperties } from 'react';
import type { CardData } from '../../data/mockGame.js';
import { CardFace } from '../CardFace/CardFace.js';
import styles from './HandDisplay.module.css';

interface HandDisplayProps {
  cards: CardData[];
  onCardClick?: (index: number) => void;
}

const MAX_ANGLE = 22; // degrees from center to each edge

export function HandDisplay({ cards, onCardClick }: HandDisplayProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(
    cards.findIndex((c) => c.isSelected),
  );
  const n = cards.length;

  function handleClick(i: number) {
    setSelectedIndex((prev) => (prev === i ? null : i));
    onCardClick?.(i);
  }

  return (
    <div className={styles.container} data-testid="hand-display">
      {cards.map((card, i) => {
        const angle = n > 1 ? -MAX_ANGLE + (i / (n - 1)) * MAX_ANGLE * 2 : 0;
        const isSelected = selectedIndex === i;

        const slotStyle: CSSProperties = {
          transform: `translateX(-50%) rotate(${angle}deg)`,
          zIndex: i,
        };

        return (
          <div
            key={`${card.rank}-${card.suit}-${i}`}
            className={`${styles.fanSlot} ${isSelected ? styles.selected : ''}`}
            style={slotStyle}
            onClick={() => handleClick(i)}
            data-testid={`hand-card-${i}`}
          >
            <div className={styles.cardHover}>
            <CardFace
                suit={card.suit}
                rank={card.rank}
                isSelected={isSelected}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

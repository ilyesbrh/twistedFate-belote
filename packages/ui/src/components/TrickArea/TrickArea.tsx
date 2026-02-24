import type { CSSProperties } from 'react';
import type { TrickCardData } from '../../data/mockGame.js';
import { CardFace } from '../CardFace/CardFace.js';
import styles from './TrickArea.module.css';

interface TrickAreaProps {
  cards: TrickCardData[];
}

export function TrickArea({ cards }: TrickAreaProps) {
  return (
    <div className={styles.area} data-testid="trick-area">
      {cards.map((card, i) => {
        const style: CSSProperties = {
          transform: `translate(calc(-50% + ${card.offsetX}px), calc(-50% + ${card.offsetY}px)) rotate(${card.rotation}deg)`,
          zIndex: i,
        };
        return (
          <div key={`trick-${i}`} className={styles.cardSlot} style={style}>
            <CardFace suit={card.suit} rank={card.rank} />
          </div>
        );
      })}
    </div>
  );
}

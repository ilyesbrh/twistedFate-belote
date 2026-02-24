import { useState } from 'react';
import type { MockGameState } from '../../data/mockGame.js';
import { ChatButton } from '../ChatButton/ChatButton.js';
import { ChatPanel } from '../ChatPanel/ChatPanel.js';
import { HandDisplay } from '../HandDisplay/HandDisplay.js';
import { OpponentHand } from '../OpponentHand/OpponentHand.js';
import { PlayerAvatar } from '../PlayerAvatar/PlayerAvatar.js';
import { ScorePanel } from '../ScorePanel/ScorePanel.js';
import { TrickArea } from '../TrickArea/TrickArea.js';
import styles from './GameTable.module.css';

interface GameTableProps {
  game: MockGameState;
}

export function GameTable({ game }: GameTableProps) {
  const south = game.players.find((p) => p.position === 'south')!;
  const north = game.players.find((p) => p.position === 'north')!;
  const west  = game.players.find((p) => p.position === 'west')!;
  const east  = game.players.find((p) => p.position === 'east')!;

  const active = game.activePosition;
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className={styles.table} data-testid="game-table">
      {/* ── Felt layers ── */}
      <div className={styles.felt}       aria-hidden="true" />
      <div className={styles.feltWeave}  aria-hidden="true" />
      <div className={styles.feltCenter} aria-hidden="true" />
      <div className={styles.rings}      aria-hidden="true" />
      <div className={styles.woodRim}    aria-hidden="true" />

      {/* ── Score panel — top left ── */}
      <div className={styles.scorePanel}>
        <ScorePanel
          target={game.targetScore}
          usScore={game.usScore}
          themScore={game.themScore}
          usTotalScore={game.usTotalScore}
          themTotalScore={game.themTotalScore}
          trumpSuit={game.trumpSuit}
          dealerName={game.dealerName}
        />
      </div>

      {/* ── North hand — top center ── */}
      <div className={styles.northHand}>
        <OpponentHand cardCount={north.cardCount} orientation="top" />
      </div>

      {/* ── North avatar ── */}
      <div className={styles.northAvatar}>
        <PlayerAvatar player={north} size="md" isActive={active === 'north'} />
      </div>

      {/* ── West avatar ── */}
      <div className={styles.westAvatar}>
        <PlayerAvatar player={west} size="sm" isActive={active === 'west'} />
      </div>

      {/* ── West card stack ── */}
      <div className={styles.westCards}>
        <OpponentHand cardCount={west.cardCount} orientation="left" />
      </div>

      {/* ── East avatar ── */}
      <div className={styles.eastAvatar}>
        <PlayerAvatar player={east} size="sm" isActive={active === 'east'} />
      </div>

      {/* ── East card stack ── */}
      <div className={styles.eastCards}>
        <OpponentHand cardCount={east.cardCount} orientation="right" />
      </div>

      {/* ── Trick area — center ── */}
      <div className={styles.trickArea}>
        <TrickArea cards={game.trickCards} />
      </div>

      {/* ── South row: hand (left) + avatar (right-of-DOM = paints on top, flex-order puts it left) ── */}
      <div className={styles.southRow}>
        <div className={styles.handDisplay}>
          <HandDisplay cards={game.playerHand} />
        </div>
        <div className={styles.southAvatar}>
          <PlayerAvatar player={south} size="lg" isActive={active === 'south'} />
        </div>
      </div>

      {/* ── Chat button — top right ── */}
      <div className={styles.chatBtn}>
        <ChatButton onClick={() => setChatOpen(true)} />
      </div>

      {/* ── Chat panel overlay ── */}
      <ChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}

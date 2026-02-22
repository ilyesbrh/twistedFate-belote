// ====================================================================
// HandDisplayReact — React functional component for the human player's
// card fan. Renders face-up cards using createCardFaceGraphics and
// computeHandLayout. Supports playable/non-playable states and tap.
// Coexists with imperative hand-display.ts during migration.
// ====================================================================

import { useCallback, useRef, useEffect } from "react";
import type { Container } from "pixi.js";
import type { Suit, Rank } from "@belote/core";
import type { Rect } from "../../layout.js";
import { createCardFaceGraphics } from "../../card-textures.js";
import { computeHandLayout } from "./hand-layout.js";

// ---- Types ----------------------------------------------------------

export interface HandCardReact {
  readonly suit: Suit;
  readonly rank: Rank;
  readonly playable: boolean;
}

export interface HandDisplayReactProps {
  zone: Rect;
  cards: readonly HandCardReact[];
  onCardTap?: (index: number, card: HandCardReact) => void;
}

// ---- Constants ------------------------------------------------------

const DIMMED_ALPHA = 0.4;

// ---- Extracted helpers (unit-tested) --------------------------------

/** Return alpha for a card based on playability. */
export function cardAlpha(playable: boolean): number {
  return playable ? 1 : DIMMED_ALPHA;
}

/** Return eventMode for a card based on playability. */
export function cardEventMode(playable: boolean): "static" | "none" {
  return playable ? "static" : "none";
}

// ---- Component ------------------------------------------------------

export function HandDisplayReact({
  zone,
  cards,
  onCardTap,
}: HandDisplayReactProps): React.JSX.Element {
  const layout = computeHandLayout(zone, cards.length);

  // Refs for imperatively mounted card Graphics (one per card slot)
  const containerRefs = useRef<(Container | null)[]>([]);

  // Stable callback ref to avoid stale closures
  const onCardTapRef = useRef(onCardTap);
  onCardTapRef.current = onCardTap;

  // Mount card Graphics imperatively into each pixiContainer
  const mountCard = useCallback(
    (index: number) => (containerEl: Container | null) => {
      containerRefs.current[index] = containerEl;
      if (!containerEl) return;

      // Clear previous children (React re-render)
      containerEl.removeChildren();

      const card = cards[index];
      if (!card) return;

      const gfx = createCardFaceGraphics(card.suit, card.rank);
      gfx.label = `card-${card.suit}-${card.rank}`;
      gfx.pivot.set(gfx.width / 2, gfx.height / 2);

      const pos = layout.cards[index];
      if (!pos) return;

      const scaleX = layout.cardWidth / gfx.width;
      const scaleY = layout.cardHeight / gfx.height;
      gfx.scale.set(scaleX, scaleY);

      containerEl.addChild(gfx);
    },
    [cards, layout],
  );

  // Attach pointer events after mount
  useEffect(() => {
    for (const [i, containerEl] of containerRefs.current.entries()) {
      if (!containerEl) continue;
      const card = cards[i];
      if (!card?.playable) continue;

      containerEl.removeAllListeners("pointerdown");
      containerEl.on("pointerdown", () => {
        onCardTapRef.current?.(i, card);
      });
    }
  }, [cards]);

  return (
    <pixiContainer label="hand-display">
      {cards.map((card, i) => {
        const pos = layout.cards[i];
        if (!pos) return null;

        return (
          <pixiContainer
            key={`${card.suit}-${card.rank}`}
            label={`hand-card-${String(i)}`}
            ref={mountCard(i)}
            x={pos.x}
            y={pos.y}
            rotation={pos.rotation}
            alpha={cardAlpha(card.playable)}
            eventMode={cardEventMode(card.playable)}
            cursor={card.playable ? "pointer" : "default"}
          />
        );
      })}
    </pixiContainer>
  );
}

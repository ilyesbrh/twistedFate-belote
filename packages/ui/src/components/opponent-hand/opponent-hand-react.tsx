// ====================================================================
// OpponentHandReact — React functional component for face-down opponent
// card stacks. Renders card backs using createCardBackGraphics and
// computeOpponentLayout. Supports horizontal and vertical orientations.
// Coexists with imperative opponent-hand.ts during migration.
// ====================================================================

import { useCallback, useRef } from "react";
import type { Container } from "pixi.js";
import type { Rect } from "../../layout.js";
import { createCardBackGraphics } from "../../card-textures.js";
import { computeOpponentLayout } from "./opponent-layout.js";
import type { OpponentOrientation } from "./opponent-layout.js";

// ---- Types ----------------------------------------------------------

export interface OpponentHandReactProps {
  zone: Rect;
  cardCount: number;
  orientation: OpponentOrientation;
}

// ---- Component ------------------------------------------------------

export function OpponentHandReact({
  zone,
  cardCount,
  orientation,
}: OpponentHandReactProps): React.JSX.Element {
  const layout = computeOpponentLayout(zone, cardCount, orientation);

  // Refs for imperatively mounted card Graphics
  const containerRefs = useRef<(Container | null)[]>([]);

  // Mount card-back Graphics imperatively into each pixiContainer
  const mountCard = useCallback(
    (index: number) => (containerEl: Container | null) => {
      containerRefs.current[index] = containerEl;
      if (!containerEl) return;

      // Clear previous children (React re-render)
      containerEl.removeChildren();

      const pos = layout.cards[index];
      if (!pos) return;

      const gfx = createCardBackGraphics();
      gfx.label = `card-back-${String(index)}`;
      gfx.pivot.set(gfx.width / 2, gfx.height / 2);

      const scaleX = (layout.cardWidth * pos.scale) / gfx.width;
      const scaleY = (layout.cardHeight * pos.scale) / gfx.height;
      gfx.scale.set(scaleX, scaleY);

      containerEl.addChild(gfx);
    },
    [layout],
  );

  return (
    <pixiContainer label={`opponent-hand-${orientation}`}>
      {layout.cards.map((pos, i) => (
        <pixiContainer
          key={`opponent-card-${String(i)}`}
          label={`opponent-card-${String(i)}`}
          ref={mountCard(i)}
          x={pos.x}
          y={pos.y}
          rotation={pos.rotation}
        />
      ))}
    </pixiContainer>
  );
}

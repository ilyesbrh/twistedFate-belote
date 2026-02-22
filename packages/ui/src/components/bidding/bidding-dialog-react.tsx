// ====================================================================
// BiddingDialogReact — React component wrapping a @pixi/ui Dialog for
// modal bidding choices. Renders 4 suit FancyButtons + 1 pass button.
// The Dialog is created imperatively via useEffect (its constructor
// takes Container/Graphics instances that don't map to JSX props).
// Coexists with zone-based BiddingPanelReact during migration.
// ====================================================================

import { useRef, useEffect } from "react";
import { Graphics } from "pixi.js";
import type { Container } from "pixi.js";
import type { Suit } from "@belote/core";
import { ALL_SUITS } from "@belote/core";
import { Dialog } from "@pixi/ui";
import type { ButtonOptions } from "@pixi/ui";
import { THEME } from "../../theme.js";
import { suitSymbol } from "../../card-textures.js";

// ---- Types ----------------------------------------------------------

export interface BiddingDialogReactProps {
  viewportWidth: number;
  viewportHeight: number;
  open: boolean;
  onSuitBid?: (suit: Suit) => void;
  onPass?: () => void;
}

// ---- Constants ------------------------------------------------------

const DIALOG_WIDTH = 500;
const DIALOG_HEIGHT = 220;
const DIALOG_RADIUS = 16;
const DIALOG_PADDING = 16;
const BTN_WIDTH = 80;
const BTN_HEIGHT = 65;
const BTN_RADIUS = 10;

// ---- Extracted helpers (unit-tested) --------------------------------

/** Create the dialog background Graphics (dark green + gold border). */
export function createDialogBackground(width: number, height: number, radius: number): Graphics {
  const bg = new Graphics();
  bg.roundRect(0, 0, width, height, radius);
  bg.fill(0x1b3a1b);
  bg.roundRect(0, 0, width, height, radius);
  bg.stroke({ width: 2, color: THEME.colors.accent.gold });
  return bg;
}

/** Build ButtonOptions for a suit bid button with default and hover states. */
export function suitBidButtonOptions(suit: Suit, width: number, height: number): ButtonOptions {
  const symbol = suitSymbol(suit);

  const defaultBg = new Graphics();
  defaultBg.roundRect(0, 0, width, height, BTN_RADIUS);
  defaultBg.fill({ color: 0x000000, alpha: 0.5 });
  defaultBg.roundRect(0, 0, width, height, BTN_RADIUS);
  defaultBg.stroke({ width: 2, color: THEME.colors.accent.gold, alpha: 0.6 });

  const hoverBg = new Graphics();
  hoverBg.roundRect(0, 0, width, height, BTN_RADIUS);
  hoverBg.fill({ color: 0x333333, alpha: 0.6 });
  hoverBg.roundRect(0, 0, width, height, BTN_RADIUS);
  hoverBg.stroke({ width: 2, color: THEME.colors.accent.gold });

  const suitName = suit.charAt(0).toUpperCase() + suit.slice(1);

  return {
    defaultView: defaultBg,
    hoverView: hoverBg,
    text: `${symbol} ${suitName}`,
    padding: 8,
  };
}

/** Build ButtonOptions for the pass button. */
export function passBidButtonOptions(width: number, height: number): ButtonOptions {
  const defaultBg = new Graphics();
  defaultBg.roundRect(0, 0, width, height, BTN_RADIUS);
  defaultBg.fill({ color: 0x000000, alpha: 0.3 });
  defaultBg.roundRect(0, 0, width, height, BTN_RADIUS);
  defaultBg.stroke({ width: 1, color: 0x9e9e9e, alpha: 0.4 });

  return {
    defaultView: defaultBg,
    text: "Pass",
    padding: 8,
  };
}

// ---- Component ------------------------------------------------------

export function BiddingDialogReact({
  viewportWidth,
  viewportHeight,
  open,
  onSuitBid,
  onPass,
}: BiddingDialogReactProps): React.JSX.Element {
  const containerRef = useRef<Container | null>(null);
  const dialogRef = useRef<Dialog | null>(null);

  // Store callbacks in refs to avoid stale closures
  const onSuitBidRef = useRef(onSuitBid);
  onSuitBidRef.current = onSuitBid;
  const onPassRef = useRef(onPass);
  onPassRef.current = onPass;

  // Build dialog imperatively
  useEffect(() => {
    const parent = containerRef.current;
    if (!parent) return;

    const buttons: ButtonOptions[] = [
      ...ALL_SUITS.map((suit: Suit) => suitBidButtonOptions(suit, BTN_WIDTH, BTN_HEIGHT)),
      passBidButtonOptions(BTN_WIDTH, BTN_HEIGHT),
    ];

    const dialog = new Dialog({
      background: createDialogBackground(DIALOG_WIDTH, DIALOG_HEIGHT, DIALOG_RADIUS),
      title: "Your Bid",
      width: DIALOG_WIDTH,
      height: DIALOG_HEIGHT,
      padding: DIALOG_PADDING,
      buttons,
      backdropAlpha: 0.6,
      closeOnBackdropClick: false,
    });

    dialog.label = "bidding-dialog";

    // Center dialog in viewport
    dialog.x = (viewportWidth - DIALOG_WIDTH) / 2;
    dialog.y = (viewportHeight - DIALOG_HEIGHT) / 2;

    dialog.onSelect.connect((index: number) => {
      if (index < ALL_SUITS.length) {
        const suit = ALL_SUITS[index];
        if (suit) onSuitBidRef.current?.(suit);
      } else {
        onPassRef.current?.();
      }
    });

    parent.addChild(dialog);
    dialogRef.current = dialog;

    return () => {
      dialog.onSelect.disconnectAll();
      dialog.onClose.disconnectAll();
      dialog.destroy({ children: true });
      dialogRef.current = null;
    };
  }, [viewportWidth, viewportHeight]);

  // Open/close based on prop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.open();
    } else {
      dialog.close();
    }
  }, [open]);

  return (
    <pixiContainer
      label="bidding-dialog-wrapper"
      ref={(el: Container | null) => {
        containerRef.current = el;
      }}
    />
  );
}

// ====================================================================
// Card frame — wraps card content in a MaskedFrame with rounded rect
// mask and themed border. Provides true pixel-level clipping for clean
// card edges. Used by HandDisplayReact and OpponentHandReact.
// ====================================================================

import { Graphics } from "pixi.js";
import type { Container } from "pixi.js";
import { MaskedFrame } from "@pixi/ui";
import { THEME } from "./theme.js";

// ---- Types ----------------------------------------------------------

export interface CardFrameOptions {
  readonly content: Container;
  readonly width: number;
  readonly height: number;
  readonly cornerRadius?: number;
  readonly borderWidth?: number;
  readonly borderColor?: number;
}

// ---- Factory --------------------------------------------------------

/**
 * Wrap card content in a MaskedFrame with a rounded rect mask.
 * Returns a MaskedFrame (extends Container) ready to be added to the scene.
 */
export function createMaskedCard(options: CardFrameOptions): MaskedFrame {
  const {
    content,
    width,
    height,
    cornerRadius = THEME.spacing.sm,
    borderWidth = THEME.cardDesign.borderWidth,
    borderColor = 0xbdbdbd,
  } = options;

  // Rounded rect mask for pixel-level clipping
  const mask = new Graphics();
  mask.roundRect(0, 0, width, height, cornerRadius);
  mask.fill(0xffffff);

  const frame = new MaskedFrame({
    target: content,
    mask,
    borderWidth,
    borderColor,
  });

  frame.label = "card-frame";
  return frame;
}

import { describe, it, expect, vi } from "vitest";
import { isValidElement } from "react";
import type { Rect } from "../src/layout.js";

/**
 * HandDisplayReact — React functional component for the human player's card fan.
 * Tests the exported component and extracted helpers.
 */
describe("HandDisplayReact", () => {
  const ZONE: Rect = { x: 0, y: 281, width: 844, height: 109 };

  const CARDS = [
    { suit: "spades" as const, rank: "7" as const, playable: true },
    { suit: "hearts" as const, rank: "jack" as const, playable: true },
    { suit: "diamonds" as const, rank: "ace" as const, playable: false },
  ];

  // ---- Export checks -------------------------------------------------

  it("exports the component function", async () => {
    const mod = await import("../src/components/hand/hand-display-react.js");
    expect(mod.HandDisplayReact).toBeTypeOf("function");
  });

  it("exports cardAlpha function", async () => {
    const mod = await import("../src/components/hand/hand-display-react.js");
    expect(mod.cardAlpha).toBeTypeOf("function");
  });

  it("exports cardEventMode function", async () => {
    const mod = await import("../src/components/hand/hand-display-react.js");
    expect(mod.cardEventMode).toBeTypeOf("function");
  });

  // ---- React element validity ----------------------------------------

  it("returns a valid React element with cards", async () => {
    const { HandDisplayReact } = await import("../src/components/hand/hand-display-react.js");
    const element = <HandDisplayReact zone={ZONE} cards={CARDS} />;
    expect(isValidElement(element)).toBe(true);
  });

  it("returns a valid React element with empty cards", async () => {
    const { HandDisplayReact } = await import("../src/components/hand/hand-display-react.js");
    const element = <HandDisplayReact zone={ZONE} cards={[]} />;
    expect(isValidElement(element)).toBe(true);
  });

  it("accepts onCardTap callback prop", async () => {
    const { HandDisplayReact } = await import("../src/components/hand/hand-display-react.js");
    const element = <HandDisplayReact zone={ZONE} cards={CARDS} onCardTap={vi.fn()} />;
    expect(isValidElement(element)).toBe(true);
  });

  // ---- cardAlpha -----------------------------------------------------

  it("cardAlpha returns 1 for playable cards", async () => {
    const { cardAlpha } = await import("../src/components/hand/hand-display-react.js");
    expect(cardAlpha(true)).toBe(1);
  });

  it("cardAlpha returns dimmed value for non-playable cards", async () => {
    const { cardAlpha } = await import("../src/components/hand/hand-display-react.js");
    const alpha = cardAlpha(false);
    expect(alpha).toBeLessThan(1);
    expect(alpha).toBeGreaterThan(0);
  });

  it("cardAlpha returns 0.4 for non-playable cards", async () => {
    const { cardAlpha } = await import("../src/components/hand/hand-display-react.js");
    expect(cardAlpha(false)).toBe(0.4);
  });

  // ---- cardEventMode -------------------------------------------------

  it("cardEventMode returns 'static' for playable cards", async () => {
    const { cardEventMode } = await import("../src/components/hand/hand-display-react.js");
    expect(cardEventMode(true)).toBe("static");
  });

  it("cardEventMode returns 'none' for non-playable cards", async () => {
    const { cardEventMode } = await import("../src/components/hand/hand-display-react.js");
    expect(cardEventMode(false)).toBe("none");
  });
});

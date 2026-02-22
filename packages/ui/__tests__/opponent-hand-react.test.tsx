import { describe, it, expect } from "vitest";
import { isValidElement } from "react";
import type { Rect } from "../src/layout.js";

/**
 * OpponentHandReact — React functional component for face-down opponent cards.
 * Tests the exported component for both horizontal and vertical orientations.
 */
describe("OpponentHandReact", () => {
  const ZONE: Rect = { x: 0, y: 0, width: 844, height: 70 };

  // ---- Export checks -------------------------------------------------

  it("exports the component function", async () => {
    const mod = await import("../src/components/opponent-hand/opponent-hand-react.js");
    expect(mod.OpponentHandReact).toBeTypeOf("function");
  });

  // ---- React element validity ----------------------------------------

  it("returns a valid React element with horizontal orientation", async () => {
    const { OpponentHandReact } =
      await import("../src/components/opponent-hand/opponent-hand-react.js");
    const element = <OpponentHandReact zone={ZONE} cardCount={8} orientation="horizontal" />;
    expect(isValidElement(element)).toBe(true);
  });

  it("returns a valid React element with vertical orientation", async () => {
    const { OpponentHandReact } =
      await import("../src/components/opponent-hand/opponent-hand-react.js");
    const sideZone: Rect = { x: 0, y: 70, width: 127, height: 250 };
    const element = <OpponentHandReact zone={sideZone} cardCount={8} orientation="vertical" />;
    expect(isValidElement(element)).toBe(true);
  });

  it("returns a valid React element with zero cards", async () => {
    const { OpponentHandReact } =
      await import("../src/components/opponent-hand/opponent-hand-react.js");
    const element = <OpponentHandReact zone={ZONE} cardCount={0} orientation="horizontal" />;
    expect(isValidElement(element)).toBe(true);
  });

  it("returns a valid React element with single card", async () => {
    const { OpponentHandReact } =
      await import("../src/components/opponent-hand/opponent-hand-react.js");
    const element = <OpponentHandReact zone={ZONE} cardCount={1} orientation="horizontal" />;
    expect(isValidElement(element)).toBe(true);
  });
});

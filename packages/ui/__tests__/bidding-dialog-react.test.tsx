import { describe, it, expect, vi } from "vitest";
import { isValidElement } from "react";
import { Graphics } from "pixi.js";

/**
 * BiddingDialogReact — React component wrapping a @pixi/ui Dialog
 * for modal bidding choices (4 suits + pass).
 */
describe("BiddingDialogReact", () => {
  // ---- Export checks -------------------------------------------------

  it("exports BiddingDialogReact function", async () => {
    const mod = await import("../src/components/bidding/bidding-dialog-react.js");
    expect(mod.BiddingDialogReact).toBeTypeOf("function");
  });

  it("exports createDialogBackground function", async () => {
    const mod = await import("../src/components/bidding/bidding-dialog-react.js");
    expect(mod.createDialogBackground).toBeTypeOf("function");
  });

  it("exports suitBidButtonOptions function", async () => {
    const mod = await import("../src/components/bidding/bidding-dialog-react.js");
    expect(mod.suitBidButtonOptions).toBeTypeOf("function");
  });

  it("exports passBidButtonOptions function", async () => {
    const mod = await import("../src/components/bidding/bidding-dialog-react.js");
    expect(mod.passBidButtonOptions).toBeTypeOf("function");
  });

  // ---- React element validity ----------------------------------------

  it("returns a valid React element", async () => {
    const { BiddingDialogReact } =
      await import("../src/components/bidding/bidding-dialog-react.js");
    const element = <BiddingDialogReact viewportWidth={844} viewportHeight={390} open={true} />;
    expect(isValidElement(element)).toBe(true);
  });

  it("accepts onSuitBid and onPass callback props", async () => {
    const { BiddingDialogReact } =
      await import("../src/components/bidding/bidding-dialog-react.js");
    const element = (
      <BiddingDialogReact
        viewportWidth={844}
        viewportHeight={390}
        open={false}
        onSuitBid={vi.fn()}
        onPass={vi.fn()}
      />
    );
    expect(isValidElement(element)).toBe(true);
  });

  // ---- createDialogBackground ----------------------------------------

  it("createDialogBackground returns a Graphics instance", async () => {
    const { createDialogBackground } =
      await import("../src/components/bidding/bidding-dialog-react.js");
    const bg = createDialogBackground(400, 200, 16);
    expect(bg).toBeInstanceOf(Graphics);
  });

  // ---- suitBidButtonOptions ------------------------------------------

  it("suitBidButtonOptions returns object with defaultView and text", async () => {
    const { suitBidButtonOptions } =
      await import("../src/components/bidding/bidding-dialog-react.js");
    const opts = suitBidButtonOptions("hearts", 80, 65);
    expect(opts.defaultView).toBeDefined();
    expect(opts.text).toBeDefined();
    expect(opts.padding).toBeTypeOf("number");
  });

  it("suitBidButtonOptions text contains suit symbol", async () => {
    const { suitBidButtonOptions } =
      await import("../src/components/bidding/bidding-dialog-react.js");
    const opts = suitBidButtonOptions("hearts", 80, 65);
    expect(opts.text as string).toContain("\u2665"); // ♥
  });

  it("each suit produces distinct button text", async () => {
    const { suitBidButtonOptions } =
      await import("../src/components/bidding/bidding-dialog-react.js");
    const texts = (["hearts", "diamonds", "clubs", "spades"] as const).map(
      (suit) => suitBidButtonOptions(suit, 80, 65).text as string,
    );
    const unique = new Set(texts);
    expect(unique.size).toBe(4);
  });

  // ---- passBidButtonOptions ------------------------------------------

  it("passBidButtonOptions returns object with text 'Pass'", async () => {
    const { passBidButtonOptions } =
      await import("../src/components/bidding/bidding-dialog-react.js");
    const opts = passBidButtonOptions(80, 65);
    expect(opts.text).toBe("Pass");
    expect(opts.defaultView).toBeDefined();
    expect(opts.padding).toBeTypeOf("number");
  });
});

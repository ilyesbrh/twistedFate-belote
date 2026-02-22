import { describe, it, expect } from "vitest";
import { Container } from "pixi.js";

/**
 * createMaskedCard — Factory function that wraps card content in a
 * MaskedFrame with rounded rect mask and themed border.
 */
describe("createMaskedCard", () => {
  // ---- Export checks -------------------------------------------------

  it("exports createMaskedCard function", async () => {
    const mod = await import("../src/card-frame.js");
    expect(mod.createMaskedCard).toBeTypeOf("function");
  });

  // ---- Return type ---------------------------------------------------

  it("returns a Container instance", async () => {
    const { createMaskedCard } = await import("../src/card-frame.js");
    const content = new Container();
    const frame = createMaskedCard({ content, width: 100, height: 156 });
    expect(frame).toBeInstanceOf(Container);
  });

  it("has label 'card-frame'", async () => {
    const { createMaskedCard } = await import("../src/card-frame.js");
    const content = new Container();
    const frame = createMaskedCard({ content, width: 100, height: 156 });
    expect(frame.label).toBe("card-frame");
  });

  // ---- Target --------------------------------------------------------

  it("has target set to the provided content", async () => {
    const { createMaskedCard } = await import("../src/card-frame.js");
    const content = new Container();
    content.label = "test-content";
    const frame = createMaskedCard({ content, width: 100, height: 156 });
    // MaskedFrame stores content as .target
    expect((frame as unknown as { target: Container }).target).toBe(content);
  });

  // ---- Border --------------------------------------------------------

  it("has a border child", async () => {
    const { createMaskedCard } = await import("../src/card-frame.js");
    const content = new Container();
    const frame = createMaskedCard({ content, width: 100, height: 156 });
    // MaskedFrame has a .border Graphics property
    expect((frame as unknown as { border: Container }).border).toBeDefined();
  });

  // ---- Custom options ------------------------------------------------

  it("accepts custom borderWidth and borderColor", async () => {
    const { createMaskedCard } = await import("../src/card-frame.js");
    const content = new Container();
    // Should not throw with custom values
    const frame = createMaskedCard({
      content,
      width: 80,
      height: 120,
      cornerRadius: 12,
      borderWidth: 4,
      borderColor: 0xff0000,
    });
    expect(frame).toBeInstanceOf(Container);
    expect(frame.label).toBe("card-frame");
  });

  it("works with zero-size content", async () => {
    const { createMaskedCard } = await import("../src/card-frame.js");
    const content = new Container();
    const frame = createMaskedCard({ content, width: 0, height: 0 });
    expect(frame).toBeInstanceOf(Container);
  });
});

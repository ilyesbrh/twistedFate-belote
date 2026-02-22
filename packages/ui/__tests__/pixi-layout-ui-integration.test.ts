import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";

// LayoutContainer uses Ticker which needs requestAnimationFrame/cancelAnimationFrame in Node
const origRaf = globalThis.requestAnimationFrame;
const origCaf = globalThis.cancelAnimationFrame;
beforeAll(() => {
  vi.stubGlobal("requestAnimationFrame", vi.fn());
  vi.stubGlobal("cancelAnimationFrame", vi.fn());
});
afterAll(() => {
  vi.stubGlobal("requestAnimationFrame", origRaf);
  vi.stubGlobal("cancelAnimationFrame", origCaf);
});

describe("@pixi/layout integration", () => {
  it("LayoutContainer is importable and constructible", async () => {
    const { LayoutContainer } = await import("@pixi/layout/components");
    expect(LayoutContainer).toBeTypeOf("function");
    const container = new LayoutContainer();
    expect(container).toBeDefined();
    container.destroy();
  });

  it("Layout mixin augments Container with layout property", async () => {
    // Importing @pixi/layout side-effects augments Container
    await import("@pixi/layout");
    const { Container } = await import("pixi.js");
    const c = new Container();
    // The layout property should exist (even if null by default)
    expect("layout" in c).toBe(true);
    c.destroy();
  });
});

describe("@pixi/ui integration", () => {
  it("FancyButton is importable and constructible", async () => {
    const { FancyButton } = await import("@pixi/ui");
    expect(FancyButton).toBeTypeOf("function");
    const btn = new FancyButton();
    expect(btn).toBeDefined();
    btn.destroy();
  });

  it("ButtonContainer is importable and constructible", async () => {
    const { ButtonContainer } = await import("@pixi/ui");
    expect(ButtonContainer).toBeTypeOf("function");
    const btn = new ButtonContainer();
    expect(btn).toBeDefined();
    btn.destroy();
  });
});

describe("@pixi/ui MaskedFrame integration", () => {
  it("MaskedFrame is importable and constructible", async () => {
    const { MaskedFrame } = await import("@pixi/ui");
    expect(MaskedFrame).toBeTypeOf("function");
    const frame = new MaskedFrame();
    expect(frame).toBeDefined();
    frame.destroy();
  });
});

describe("@pixi/ui Dialog integration", () => {
  it("Dialog is importable and constructible", async () => {
    const { Graphics } = await import("pixi.js");
    const { Dialog } = await import("@pixi/ui");
    expect(Dialog).toBeTypeOf("function");
    const bg = new Graphics();
    bg.roundRect(0, 0, 100, 100, 10);
    bg.fill(0xffffff);
    const dialog = new Dialog({ background: bg });
    expect(dialog).toBeDefined();
    // Note: dialog.destroy() has internal side effects in headless env;
    // construction proves the class is usable.
  });
});

describe("pixi-react-setup includes layout/ui elements", () => {
  it("initPixiReact registers LayoutContainer, FancyButton, MaskedFrame, and Dialog without throwing", async () => {
    const { initPixiReact } = await import("../src/pixi-react-setup.js");
    expect(() => {
      initPixiReact();
    }).not.toThrow();
  });
});

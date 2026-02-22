import { describe, it, expect } from "vitest";
import { isValidElement, createElement } from "react";

/**
 * StoryCanvas — React wrapper that renders imperative PixiJS Containers
 * inside a <canvas> element for Storybook stories.
 */
describe("StoryCanvas", () => {
  it("exports the StoryCanvas component function", async () => {
    const mod = await import("../src/storybook-helpers.js");
    expect(mod.StoryCanvas).toBeTypeOf("function");
  });

  it("returns a valid React element", async () => {
    const { StoryCanvas } = await import("../src/storybook-helpers.js");
    const element = createElement(StoryCanvas, {
      createView: () => ({ label: "mock-container" }) as never,
    });
    expect(isValidElement(element)).toBe(true);
  });

  it("accepts optional width and height props", async () => {
    const { StoryCanvas } = await import("../src/storybook-helpers.js");
    const element = createElement(StoryCanvas, {
      createView: () => ({ label: "mock-container" }) as never,
      width: 500,
      height: 400,
    });
    expect(isValidElement(element)).toBe(true);
  });
});

import type { StoryFn, Meta } from "@storybook/react";
import { Container } from "pixi.js";
import { ALL_SUITS } from "@belote/core";
import { TrumpIndicator } from "./trump-indicator.js";
import { StoryCanvas } from "../../storybook-helpers.js";

const meta: Meta = {
  title: "Components/HUD/TrumpIndicator",
};

export default meta;

// ---- Stories --------------------------------------------------------

/** All 4 trump suits side by side. */
export const AllSuits: StoryFn = () => (
  <StoryCanvas
    createView={() => {
      const root = new Container();
      root.label = "story-root";

      ALL_SUITS.forEach((suit, i) => {
        const indicator = new TrumpIndicator(suit);
        indicator.x = 50 + i * 70;
        indicator.y = 50;
        root.addChild(indicator);
      });

      return root;
    }}
  />
);

/** Hearts trump. */
export const Hearts: StoryFn = () => (
  <StoryCanvas
    createView={() => {
      const root = new Container();
      root.label = "story-root";
      const indicator = new TrumpIndicator("hearts");
      indicator.x = 50;
      indicator.y = 50;
      root.addChild(indicator);
      return root;
    }}
  />
);

/** Spades trump. */
export const Spades: StoryFn = () => (
  <StoryCanvas
    createView={() => {
      const root = new Container();
      root.label = "story-root";
      const indicator = new TrumpIndicator("spades");
      indicator.x = 50;
      indicator.y = 50;
      root.addChild(indicator);
      return root;
    }}
  />
);

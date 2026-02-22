import type { StoryFn, Meta } from "@storybook/react";
import { Container } from "pixi.js";
import type { Suit } from "@belote/core";
import { ALL_SUITS } from "@belote/core";
import { THEME } from "./theme.js";
import { createCardFaceGraphics, createCardBackGraphics } from "./card-textures.js";
import { StoryCanvas } from "./storybook-helpers.js";

const meta: Meta = {
  title: "Cards/CardSprite",
};

export default meta;

const CARD_OFFSET = THEME.spacing.xl;

export const FaceUp: StoryFn = () => (
  <StoryCanvas
    createView={() => {
      const card = createCardFaceGraphics("hearts", "ace");
      card.label = "card-hearts-ace";
      card.x = CARD_OFFSET;
      card.y = CARD_OFFSET;
      return card;
    }}
  />
);

export const FaceDown: StoryFn = () => (
  <StoryCanvas
    createView={() => {
      const card = createCardBackGraphics();
      card.label = "card-back";
      card.x = CARD_OFFSET;
      card.y = CARD_OFFSET;
      return card;
    }}
  />
);

export const AllSuits: StoryFn = () => (
  <StoryCanvas
    createView={() => {
      const row = new Container();
      row.label = "all-suits-row";

      const suits: readonly Suit[] = ALL_SUITS;
      let nextX = 0;
      suits.forEach((suit) => {
        const card = createCardFaceGraphics(suit, "ace");
        card.label = `card-${suit}-ace`;
        card.x = nextX;
        nextX += card.width + THEME.spacing.sm;
        row.addChild(card);
      });

      row.x = CARD_OFFSET;
      row.y = CARD_OFFSET;
      return row;
    }}
  />
);

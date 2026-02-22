import type { StoryFn, Meta } from "@storybook/react";
import { Application } from "@pixi/react";
import type { Suit, Rank } from "@belote/core";
import { THEME } from "../../theme.js";
import { initPixiReact } from "../../pixi-react-setup.js";
import { HandDisplayReact } from "./hand-display-react.js";
import type { HandCardReact } from "./hand-display-react.js";
import type { Rect } from "../../layout.js";

initPixiReact();

const meta: Meta = {
  title: "React/HandDisplay",
};

export default meta;

// ---- Mock data ------------------------------------------------------

function makeCard(suit: Suit, rank: Rank, playable = true): HandCardReact {
  return { suit, rank, playable };
}

const FULL_HAND: HandCardReact[] = [
  makeCard("spades", "7"),
  makeCard("spades", "8"),
  makeCard("spades", "9"),
  makeCard("hearts", "jack"),
  makeCard("hearts", "queen"),
  makeCard("diamonds", "ace"),
  makeCard("clubs", "king"),
  makeCard("clubs", "10"),
];

const LANDSCAPE_BOTTOM: Rect = { x: 0, y: 281, width: 844, height: 109 };

// ---- Stories --------------------------------------------------------

/** 8 cards — full belote hand at baseline landscape. */
export const FullHand: StoryFn = () => (
  <Application width={844} height={390} background={THEME.colors.table.bgDark} antialias>
    <HandDisplayReact
      zone={LANDSCAPE_BOTTOM}
      cards={FULL_HAND}
      onCardTap={(i, card) => {
        console.log("Card tap:", i, card.suit, card.rank);
      }}
    />
  </Application>
);

/** 5 cards — mid-game hand. */
export const FiveCards: StoryFn = () => (
  <Application width={844} height={390} background={THEME.colors.table.bgDark} antialias>
    <HandDisplayReact zone={LANDSCAPE_BOTTOM} cards={FULL_HAND.slice(0, 5)} />
  </Application>
);

/** 1 card — last card. */
export const SingleCard: StoryFn = () => (
  <Application width={844} height={390} background={THEME.colors.table.bgDark} antialias>
    <HandDisplayReact zone={LANDSCAPE_BOTTOM} cards={FULL_HAND.slice(0, 1)} />
  </Application>
);

/** Mixed playable/non-playable — dimmed non-playable cards. */
export const PlayableCards: StoryFn = () => {
  const mixed: HandCardReact[] = [
    makeCard("spades", "7", true),
    makeCard("spades", "8", false),
    makeCard("spades", "9", true),
    makeCard("hearts", "jack", false),
    makeCard("hearts", "queen", false),
    makeCard("diamonds", "ace", true),
    makeCard("clubs", "king", true),
    makeCard("clubs", "10", false),
  ];

  return (
    <Application width={844} height={390} background={THEME.colors.table.bgDark} antialias>
      <HandDisplayReact
        zone={LANDSCAPE_BOTTOM}
        cards={mixed}
        onCardTap={(i, card) => {
          console.log("Card tap:", i, card.suit, card.rank);
        }}
      />
    </Application>
  );
};

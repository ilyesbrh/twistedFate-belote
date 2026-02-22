import type { StoryFn, Meta } from "@storybook/react";
import { Application } from "@pixi/react";
import { THEME } from "../../theme.js";
import { initPixiReact } from "../../pixi-react-setup.js";
import { OpponentHandReact } from "./opponent-hand-react.js";
import type { Rect } from "../../layout.js";

initPixiReact();

const meta: Meta = {
  title: "React/OpponentHand",
};

export default meta;

// ---- Zones ----------------------------------------------------------

const TOP_ZONE: Rect = { x: 0, y: 0, width: 844, height: 70 };
const LEFT_ZONE: Rect = { x: 0, y: 70, width: 127, height: 211 };
const RIGHT_ZONE: Rect = { x: 717, y: 70, width: 127, height: 211 };

// ---- Stories --------------------------------------------------------

/** Top opponent — 8 face-down cards in horizontal stack. */
export const HorizontalFull: StoryFn = () => (
  <Application width={844} height={390} background={THEME.colors.table.bgDark} antialias>
    <OpponentHandReact zone={TOP_ZONE} cardCount={8} orientation="horizontal" />
  </Application>
);

/** Top opponent — 4 cards remaining (mid-game). */
export const HorizontalFour: StoryFn = () => (
  <Application width={844} height={390} background={THEME.colors.table.bgDark} antialias>
    <OpponentHandReact zone={TOP_ZONE} cardCount={4} orientation="horizontal" />
  </Application>
);

/** Left opponent — 8 face-down cards in vertical stack. */
export const VerticalLeft: StoryFn = () => (
  <Application width={844} height={390} background={THEME.colors.table.bgDark} antialias>
    <OpponentHandReact zone={LEFT_ZONE} cardCount={8} orientation="vertical" />
  </Application>
);

/** Right opponent — 8 face-down cards in vertical stack. */
export const VerticalRight: StoryFn = () => (
  <Application width={844} height={390} background={THEME.colors.table.bgDark} antialias>
    <OpponentHandReact zone={RIGHT_ZONE} cardCount={8} orientation="vertical" />
  </Application>
);

/** Side opponent — 1 card remaining (last card). */
export const VerticalSingle: StoryFn = () => (
  <Application width={844} height={390} background={THEME.colors.table.bgDark} antialias>
    <OpponentHandReact zone={LEFT_ZONE} cardCount={1} orientation="vertical" />
  </Application>
);

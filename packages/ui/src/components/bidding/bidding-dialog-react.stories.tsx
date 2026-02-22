import type { StoryFn, Meta } from "@storybook/react";
import { Application } from "@pixi/react";
import { THEME } from "../../theme.js";
import { initPixiReact } from "../../pixi-react-setup.js";
import { BiddingDialogReact } from "./bidding-dialog-react.js";

initPixiReact();

const meta: Meta = {
  title: "React/BiddingDialog",
};

export default meta;

// ---- Stories --------------------------------------------------------

/** Dialog open — 4 suit buttons + pass, centered. */
export const DialogOpen: StoryFn = () => (
  <Application width={844} height={390} background={THEME.colors.table.bgDark} antialias>
    <BiddingDialogReact
      viewportWidth={844}
      viewportHeight={390}
      open={true}
      onSuitBid={(suit) => {
        console.log("Suit bid:", suit);
      }}
      onPass={() => {
        console.log("Pass");
      }}
    />
  </Application>
);

/** Dialog closed — empty stage. */
export const DialogClosed: StoryFn = () => (
  <Application width={844} height={390} background={THEME.colors.table.bgDark} antialias>
    <BiddingDialogReact viewportWidth={844} viewportHeight={390} open={false} />
  </Application>
);

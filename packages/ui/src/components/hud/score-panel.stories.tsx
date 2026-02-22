import type { StoryFn, Meta } from "@storybook/react";
import { Container } from "pixi.js";
import { ScorePanel } from "./score-panel.js";
import { StoryCanvas } from "../../storybook-helpers.js";

const meta: Meta = {
  title: "Components/HUD/ScorePanel",
};

export default meta;

// ---- Stories --------------------------------------------------------

/** Opening scores (0-0). */
export const ZeroZero: StoryFn = () => (
  <StoryCanvas
    createView={() => {
      const root = new Container();
      root.label = "story-root";
      const panel = new ScorePanel({
        team1Score: 0,
        team2Score: 0,
        team1Label: "Us",
        team2Label: "Them",
      });
      panel.x = 30;
      panel.y = 30;
      root.addChild(panel);
      return root;
    }}
  />
);

/** Mid-game scores. */
export const MidGame: StoryFn = () => (
  <StoryCanvas
    createView={() => {
      const root = new Container();
      root.label = "story-root";
      const panel = new ScorePanel({
        team1Score: 82,
        team2Score: 45,
        team1Label: "Us",
        team2Label: "Them",
      });
      panel.x = 30;
      panel.y = 30;
      root.addChild(panel);
      return root;
    }}
  />
);

/** High scores (close to winning). */
export const CloseGame: StoryFn = () => (
  <StoryCanvas
    createView={() => {
      const root = new Container();
      root.label = "story-root";
      const panel = new ScorePanel({
        team1Score: 481,
        team2Score: 462,
        team1Label: "Us",
        team2Label: "Them",
      });
      panel.x = 30;
      panel.y = 30;
      root.addChild(panel);
      return root;
    }}
  />
);

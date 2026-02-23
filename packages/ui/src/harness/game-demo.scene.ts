// ====================================================================
// Scene: Game Demo
// Full playable demo wiring GameSession + GameController + GameRenderer.
// Human at position 0 (south), AI at positions 1-3 (west, north, east).
// ====================================================================

import type { Application } from "pixi.js";
import { GameSession, createStartGameCommand, createStartRoundCommand } from "@belote/app";
import { createCardTextureAtlas } from "../card-textures.js";
import type { CardTextureAtlas } from "../card-textures.js";
import { GameRenderer } from "../game-renderer.js";
import { GameController } from "../game-controller.js";
import { registerScene } from "./scenes.js";

const PLAYER_NAMES: readonly [string, string, string, string] = ["You", "West", "Partner", "East"];

let atlas: CardTextureAtlas | undefined;
let controller: GameController | undefined;

function createGameDemo(app: Application): void {
  // 1. Texture atlas (needs renderer)
  atlas = createCardTextureAtlas(app);

  // 2. Game session: human + 3 AI
  const session = new GameSession({
    playerTypes: ["human", "ai", "ai", "ai"],
    stepDelayMs: 2000,
  });

  // 3. Game renderer (root UI layer)
  const viewport = { width: app.screen.width, height: app.screen.height };
  const renderer = new GameRenderer({
    viewport,
    atlas,
    playerNames: PLAYER_NAMES,
  });
  app.stage.addChild(renderer.getContainer());

  // 4. Game controller (event → view → render bridge)
  controller = new GameController(session, renderer, PLAYER_NAMES);
  controller.wireInput(renderer);
  controller.start();

  // 5. Auto-start next round on round completion (register before dispatching)
  session.on((event) => {
    if (event.type === "round_completed" || event.type === "round_cancelled") {
      // Small delay so user can see the result before next round
      setTimeout(() => {
        if (session.state === "round_completed") {
          session.dispatch(createStartRoundCommand());
        }
      }, 1500);
    }
  });

  // 6. Start the game and first round
  session.dispatch(createStartGameCommand(PLAYER_NAMES, 1000));
  session.dispatch(createStartRoundCommand());

  // 7. Handle resize
  app.renderer.on("resize", () => {
    renderer.resize({ width: app.screen.width, height: app.screen.height });
  });
}

registerScene({
  name: "Game Demo",
  create: createGameDemo,
  destroy(): void {
    controller?.stop();
    controller = undefined;
    if (atlas) {
      atlas.destroy();
      atlas = undefined;
    }
  },
});

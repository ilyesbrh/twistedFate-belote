// ====================================================================
// Dev entry point — creates the PixiJS app.
// Use Storybook (`pnpm storybook`) for component development.
// ====================================================================

import { createApp } from "./bootstrap.js";

async function main(): Promise<void> {
  const app = await createApp({ resizeTo: window });
  document.body.appendChild(app.canvas);
}

void main();

// ====================================================================
// StoryCanvas — React wrapper for rendering imperative PixiJS Containers
// inside Storybook stories. Used during the React migration to bridge
// existing imperative components into @storybook/react-vite.
// ====================================================================

import { useRef, useEffect } from "react";
import { Application } from "pixi.js";
import type { Container } from "pixi.js";
import { THEME } from "./theme.js";

// ---- Props ----------------------------------------------------------

export interface StoryCanvasProps {
  /** Factory that creates the imperative PixiJS Container to display. */
  createView: () => Container;
  /** Canvas width in pixels (default 800). */
  width?: number;
  /** Canvas height in pixels (default 600). */
  height?: number;
}

// ---- Constants ------------------------------------------------------

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 600;

// ---- Component ------------------------------------------------------

/**
 * Renders an imperative PixiJS Container inside a `<canvas>` element.
 * Initializes a PixiJS Application, calls `createView()`, and mounts
 * the returned Container onto the stage.
 */
export function StoryCanvas({
  createView,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
}: StoryCanvasProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const app = new Application();
    let destroyed = false;

    void app
      .init({
        canvas,
        width,
        height,
        background: THEME.colors.table.bgDark,
        antialias: true,
        autoDensity: true,
        resolution: window.devicePixelRatio,
        preference: "webgl",
      })
      .then(() => {
        if (destroyed) return;
        const view = createView();
        app.stage.addChild(view);
      });

    return () => {
      destroyed = true;
      app.destroy(true);
    };
  }, [createView, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
}

# Iteration 34 Report: Storybook → @storybook/react-vite

**Date**: 2026-02-22
**Status**: Complete

## Goal

Migrate Storybook from `@pixi/storybook-vite` (imperative-only renderer) to `@storybook/react-vite` so both imperative and React components can have stories.

## Scope

1. Replace `@pixi/storybook-vite` + `@pixi/storybook-renderer` with `@storybook/react-vite` + `@storybook/react`
2. Create `StoryCanvas` React wrapper component for imperative PixiJS Containers
3. Update `.storybook/main.ts` framework and story glob
4. Update `.storybook/preview.ts` to use `@storybook/react` types
5. Convert all 13 existing `.stories.ts` to `.stories.tsx` using `StoryCanvas`
6. Delete old `.stories.ts` files
7. Update barrel exports
8. All 4 checks pass

## PO Decisions Locked

- **StoryCanvas pattern**: Imperative stories use a `<StoryCanvas createView={() => Container}>` wrapper that initializes a PixiJS Application in a `<canvas>` element and mounts the returned Container. This avoids mixing `@pixi/react` with imperative code.
- **PixiJS Application config in StoryCanvas**: Background, antialias, resolution, and WebGL preference moved from `preview.ts` into `StoryCanvas` (each story owns its canvas lifecycle).
- **Resize callbacks dropped**: Two stories (table-background, card-gallery) had `resize` callbacks. These are dropped in the migration — canvas is fixed-size. Resize can be re-added later if needed.
- **preview.ts stays .ts**: No JSX needed in preview config, so it remains a `.ts` file.

## Tests Written (3 test cases, written before implementation)

### `__tests__/storybook-helpers.test.tsx`

- `exports the StoryCanvas component function` — verifies module exports
- `returns a valid React element` — validates createElement produces valid element
- `accepts optional width and height props` — validates optional prop acceptance

## Implementation Summary

### Files Created

- `packages/ui/src/storybook-helpers.tsx` — `StoryCanvas` React component + `StoryCanvasProps` interface
- `packages/ui/__tests__/storybook-helpers.test.tsx` — 3 tests
- 13 new `.stories.tsx` files (replacing old `.stories.ts`)

### Files Modified

- `packages/ui/package.json` — removed `@pixi/storybook-renderer`, `@pixi/storybook-vite`; added `@storybook/react-vite`, `@storybook/react`
- `packages/ui/.storybook/main.ts` — framework: `@storybook/react-vite`, stories glob: `**/*.stories.tsx`
- `packages/ui/.storybook/preview.ts` — types from `@storybook/react`, removed `pixi` parameter
- `packages/ui/src/index.ts` — added `StoryCanvas`, `StoryCanvasProps` exports

### Files Deleted

- 13 old `.stories.ts` files (replaced by `.stories.tsx` equivalents)

### Key Functions

- `StoryCanvas({ createView, width?, height? }): React.JSX.Element` — renders an imperative PixiJS Container in a `<canvas>` element via a PixiJS Application

### Stories Converted (13)

| Story File                                           | Title                         | Variants                                                                   |
| ---------------------------------------------------- | ----------------------------- | -------------------------------------------------------------------------- |
| `card-sprite.stories.tsx`                            | Cards/CardSprite              | FaceUp, FaceDown, AllSuits                                                 |
| `card-gallery.stories.tsx`                           | Cards/Gallery                 | Default                                                                    |
| `table-background.stories.tsx`                       | Table/Background              | Default                                                                    |
| `game-renderer.stories.tsx`                          | Integration/GameRenderer      | PlayingPhase, PortraitFallback, TabletLandscape, BiddingPhase              |
| `components/hud/trump-indicator.stories.tsx`         | Components/HUD/TrumpIndicator | AllSuits, Hearts, Spades                                                   |
| `components/hud/score-panel.stories.tsx`             | Components/HUD/ScorePanel     | ZeroZero, MidGame, CloseGame                                               |
| `components/hud/turn-indicator.stories.tsx`          | Components/HUD/TurnIndicator  | YourTurn, AllDirections                                                    |
| `components/player-info/player-info.stories.tsx`     | Components/PlayerInfo         | ActiveSouth, InactiveNorth, AllPlayers                                     |
| `components/bidding/bidding-panel.stories.tsx`       | Components/BiddingPanel       | Landscape, Portrait                                                        |
| `components/hand/hand-display.stories.tsx`           | Components/HandDisplay        | FullHand, FiveCards, ThreeCards, SingleCard, PortraitZone                  |
| `components/opponent-hand/opponent-hand.stories.tsx` | Components/OpponentHand       | HorizontalFull, HorizontalFour, VerticalLeft, VerticalRight, VerticalThree |
| `components/trick/trick-display.stories.tsx`         | Components/TrickDisplay       | Empty, OneCard, TwoCards, FullTrick                                        |
| `components/table/table-layout.stories.tsx`          | Components/TableLayout        | LandscapeBaseline, PortraitFallback, TabletLandscape, Desktop              |

## Technical Decisions

| Decision                                 | Choice                            | Rationale                                                                   |
| ---------------------------------------- | --------------------------------- | --------------------------------------------------------------------------- |
| StoryCanvas over @pixi/react Application | Plain canvas + PixiJS Application | Avoids mixing @pixi/react JSX with imperative Containers; simpler lifecycle |
| PixiJS config in StoryCanvas             | Hardcoded THEME defaults          | preview.ts no longer owns PixiJS Application; each canvas is self-contained |
| Resize callbacks dropped                 | Fixed canvas size                 | Complexity reduction; resize was only used in 2 stories and can be re-added |
| preview.ts stays .ts                     | No JSX needed                     | Clean separation: preview is pure config, stories are React components      |

## Refactoring Performed

None beyond the story format migration.

## Risks Identified

- **Visual rendering not verified**: Stories were converted mechanically. `pnpm storybook` should be run to visually verify all stories render correctly. TypeScript and lint pass, but canvas rendering requires a browser.
- **peerDependencyRules**: `@storybook/react-vite` may pull in deps that conflict with Vite 7. Root `pnpm.peerDependencyRules.allowedVersions` has `"vite": "7"` which should cover it.

## Validation Results

- `pnpm test`: **859/859 passing** (3 new)
- `pnpm typecheck`: Clean
- `pnpm lint`: Clean
- `pnpm format:check`: Clean

## Next Iteration: 35 (Retroactive React Stories)

**Scope**: Add Storybook stories for the 4 React components created in iterations 30-33 (TrumpIndicatorReact, TurnIndicatorReact, ScorePanelReact, PlayerInfoReact), satisfying UI_MANIFESTO PO Rule 1.

**Acceptance criteria**:

1. 4 new `.stories.tsx` files (one per React component)
2. Each story wraps the React component in `<Application>` from `@pixi/react`
3. All stories render in `pnpm storybook`
4. All 4 checks pass

## Iteration 36 Preview (BiddingPanel → React)

**Scope**: Rewrite BiddingPanel as a React functional component with 5 buttons (4 suits + pass). Uses `computeBiddingLayout` (unchanged). Callback props: `onSuitBid(suit)`, `onPass()`. Includes Storybook story.

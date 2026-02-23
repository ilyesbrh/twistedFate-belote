# Iteration 44 Report: Remove Old Imperative Code

**Date**: 2026-02-23
**Status**: Complete

## Goal

Delete all old imperative component files, stories, harness scenes, GameRenderer, and GameController. Relocate shared types (`GameSessionAccess`, `teamForSeat`, `PlayerSeat`, `HandCard`, `TrickCard`) to their surviving React-side homes. Update barrel exports to React-only.

## Scope

1. Relocate `GameSessionAccess` interface from `game-controller.ts` to `hooks/use-game-controller.ts`
2. Relocate `teamForSeat` + `PlayerSeat` from `player-info.ts` to `player-info-react.tsx`
3. Move `HandCard` and `TrickCard` types from deleted component files to `game-view.ts` (with `Rank` type instead of `string`)
4. Delete 8 old imperative component `.ts` files
5. Delete 9 old imperative component `.stories.tsx` files
6. Delete `game-renderer.ts`, `game-controller.ts`, `game-renderer.stories.tsx`
7. Delete `game-controller.test.ts` (46 tests for deleted class)
8. Delete entire `harness/` directory (3 scenes + index + registry)
9. Update `main.ts` — remove harness import, minimal dev entry
10. Update `index.ts` — remove all imperative exports, add relocated types
11. Keep `storybook-helpers.tsx` + 3 root stories (`card-sprite`, `card-gallery`, `table-background`)

## Files Deleted (26)

### Old Imperative Components (8)
- `src/components/bidding/bidding-panel.ts`
- `src/components/hand/hand-display.ts`
- `src/components/hud/score-panel.ts`
- `src/components/hud/trump-indicator.ts`
- `src/components/hud/turn-indicator.ts`
- `src/components/opponent-hand/opponent-hand.ts`
- `src/components/player-info/player-info.ts`
- `src/components/trick/trick-display.ts`

### Old Imperative Stories (9)
- `src/components/bidding/bidding-panel.stories.tsx`
- `src/components/hand/hand-display.stories.tsx`
- `src/components/hud/score-panel.stories.tsx`
- `src/components/hud/trump-indicator.stories.tsx`
- `src/components/hud/turn-indicator.stories.tsx`
- `src/components/opponent-hand/opponent-hand.stories.tsx`
- `src/components/player-info/player-info.stories.tsx`
- `src/components/table/table-layout.stories.tsx`
- `src/components/trick/trick-display.stories.tsx`

### Root Files (4)
- `src/game-renderer.ts`
- `src/game-controller.ts`
- `src/game-renderer.stories.tsx`
- `__tests__/game-controller.test.ts`

### Harness Directory (5)
- `src/harness/game-demo.scene.ts`
- `src/harness/card-gallery.scene.ts`
- `src/harness/table-background.scene.ts`
- `src/harness/index.ts`
- `src/harness/scenes.ts`

## Files Modified (7)

- `src/hooks/use-game-controller.ts` — added `GameSessionAccess` interface (moved from game-controller.ts)
- `src/components/player-info/player-info-react.tsx` — added `PlayerSeat` type alias + `teamForSeat` function
- `src/game-view.ts` — added `HandCard`/`TrickCard` interfaces with `Rank` type (upgraded from `string`)
- `src/game-root.tsx` — updated import: `teamForSeat` from `player-info-react.js`
- `src/index.ts` — removed all imperative exports, added `GameSessionAccess`/`HandCard`/`TrickCard`/`PlayerSeat`/`teamForSeat` from new locations
- `src/main.ts` — removed harness import, simplified to minimal dev entry
- `__tests__/use-game-controller.test.ts` — updated import path for `GameSessionAccess`
- `__tests__/player-info.test.ts` — updated import path for `teamForSeat`/`PlayerSeat`

## Technical Decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| Keep `storybook-helpers.tsx` | StoryCanvas still used by 3 root stories | `card-sprite`, `card-gallery`, `table-background` have no React equivalents yet |
| `HandCard`/`TrickCard` in `game-view.ts` | Types defined alongside mapper functions | Avoids circular dependency (game-view shouldn't import from components) |
| `Rank` instead of `string` | Upgraded `HandCard.rank`/`TrickCard.rank` to `Rank` type | Aligns with React component types (`HandCardReact`, `TrickCardReact`) for type-safe assignment |
| `GameSessionAccess` in hook file | Interface lives next to its only consumer | Single consumer, no need for separate types file |
| `teamForSeat` in React file | Collocated with `PlayerInfoReact` | Mirrors the old imperative file's structure |
| Delete `game-controller.test.ts` | 46 tests removed | Tests the deleted `GameController` class; equivalent logic tested via `use-game-controller.test.ts` (14 tests for pure reducer) |

## Errors Encountered and Fixed

1. **`player-info-react.tsx` edit didn't apply**: First Edit tool call didn't match due to concurrent linter modification. Re-applied with correct old_string.
2. **`game-view.ts` imports from deleted files**: `HandCard` from `hand-display.js` and `TrickCard` from `trick-display.js` — moved types inline with `Rank` upgrade.
3. **Type mismatch `string` vs `Rank`**: Old types used `string` for rank; React components use `Rank`. Fixed by importing `Rank` from `@belote/core`.
4. **Pre-existing `opponent-layout.test.ts` uncommitted changes**: Stash captured unrelated working-tree modifications. Restored to committed version.

## Validation Results

- `pnpm test`: **895/895 passing** (941 - 46 deleted with game-controller.test.ts)
- `pnpm typecheck`: Clean
- `pnpm lint`: Clean
- `pnpm format:check`: Clean

## What Remains

- `storybook-helpers.tsx` (StoryCanvas) — still used by 3 root-level stories
- `card-sprite.ts` — imperative CardSprite class, still used by React components via ref callbacks
- `bootstrap.ts` — still useful for creating PixiJS Application instances
- `table-layout.ts` — imperative TableLayout class still exported (has React replacement `TableLayoutReact`)

## Next Iteration: 45 (Final Cleanup + Docs)

**Scope**: Remove unused deps, decide CardSprite future, update docs, update auto memory.

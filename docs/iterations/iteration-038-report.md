# Iteration 38 Report: OpponentHand → React

**Date**: 2026-02-22
**Status**: Complete

## Goal

Rewrite OpponentHand as a React component with face-down cards using `computeOpponentLayout` (unchanged).

## Scope

1. Create `opponent-hand-react.tsx` with `OpponentHandReact` component
2. Render cards via `createCardBackGraphics` drawing primitives (not CardSprite)
3. Props: `zone: Rect`, `cardCount: number`, `orientation: OpponentOrientation`
4. Write TDD tests (red → green)
5. Create story with HorizontalFull, HorizontalFour, VerticalLeft, VerticalRight, VerticalSingle variants
6. Update barrel exports
7. Old `opponent-hand.ts` unchanged
8. All 4 checks pass

## PO Decisions Locked

- **Graphics over CardSprite**: Same rationale as iteration 37. `createCardBackGraphics` keeps the component self-contained, testable in Vitest, and consistent with existing stories. CardSprite migration deferred to iteration 44.
- **Imperative card mounting via ref**: Card backs are created imperatively via `ref` callback on `pixiContainer`, since `createCardBackGraphics` returns a Container. Same bridge pattern as HandDisplayReact.
- **No extracted helpers**: Unlike HandDisplay, OpponentHand has no playable/non-playable states and no tap interaction. All cards are identical face-down backs. No helpers needed for extraction.
- **Scale includes pos.scale**: The opponent layout provides a per-card `scale` factor (always 1 currently but part of the interface). The React component applies `pos.scale` to the card Graphics scale, matching the imperative version.

## Tests Written (5 test cases, written before implementation)

### `__tests__/opponent-hand-react.test.tsx`

- `exports the component function` — verifies module export
- `returns a valid React element with horizontal orientation` — top opponent
- `returns a valid React element with vertical orientation` — side opponent
- `returns a valid React element with zero cards` — empty hand
- `returns a valid React element with single card` — last card

## Implementation Summary

### Files Created

- `packages/ui/src/components/opponent-hand/opponent-hand-react.tsx` — React OpponentHand component
- `packages/ui/src/components/opponent-hand/opponent-hand-react.stories.tsx` — 5 story variants
- `packages/ui/__tests__/opponent-hand-react.test.tsx` — 5 tests

### Files Modified

- `packages/ui/src/index.ts` — added `OpponentHandReact`, `OpponentHandReactProps` exports

### Key Types

- `OpponentHandReactProps` — `{ zone: Rect; cardCount: number; orientation: OpponentOrientation }`

### Key Functions

- `OpponentHandReact({ zone, cardCount, orientation })` — React component rendering face-down card stack

## Technical Decisions

| Decision                             | Choice                        | Rationale                                                                  |
| ------------------------------------ | ----------------------------- | -------------------------------------------------------------------------- |
| createCardBackGraphics vs CardSprite | Graphics drawing primitives   | No atlas dependency; testable without Application; consistent with stories |
| Imperative card mount via ref        | ref callback + removeChildren | createCardBackGraphics returns Container; can't use as JSX child           |
| No tap handlers                      | Omitted                       | Opponent cards are non-interactive                                         |
| Layout key includes index            | `opponent-card-${i}`          | Cards are identical face-down backs; index is the only differentiator      |

## Refactoring Performed

None. Imperative `opponent-hand.ts` untouched.

## Risks Identified

- **Visual rendering not verified**: Cards rendered via Graphics drawing primitives, not texture-based CardSprites. Visual fidelity in Storybook should be confirmed.
- **No DropShadowFilter**: Imperative CardSprite has a drop shadow. React version using Graphics has no shadow. Acceptable during migration — shadows added when CardSprite migrates to React (iteration 44).
- **Imperative mount pattern**: Using ref callbacks to mount Graphics is a bridge pattern. Future iterations may introduce a React `<Card>` component.

## Validation Results

- `pnpm test`: **885/885 passing** (5 new)
- `pnpm typecheck`: Clean
- `pnpm lint`: Clean
- `pnpm format:check`: Clean

## Next Iteration: 39 (TrickDisplay → React)

**Scope**: Rewrite TrickDisplay as a React component for center trick area.

**Acceptance criteria**:

1. `trick-display-react.tsx` renders 0-4 played cards using `computeTrickLayout` (unchanged)
2. Cards rendered via `createCardFaceGraphics` drawing primitives
3. Props: `zone: Rect`, `cards: TrickCardReact[]`
4. Tests for component + valid React element
5. `trick-display-react.stories.tsx` renders in Storybook
6. Old `trick-display.ts` unchanged
7. All 4 checks pass

## Iteration 40 Preview (TableLayout with @pixi/layout flexbox)

**Scope**: Rewrite TableLayout using Yoga-powered flexbox from `@pixi/layout`. 5-zone structure with column flex. Background felt as `<pixiGraphics>` draw callback. Includes story and tests.

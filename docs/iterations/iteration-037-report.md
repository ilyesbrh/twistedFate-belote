# Iteration 37 Report: HandDisplay → React

**Date**: 2026-02-22
**Status**: Complete

## Goal

Rewrite HandDisplay as a React component with card fan and tap interaction, using `computeHandLayout` (unchanged).

## Scope

1. Create `hand-display-react.tsx` with `HandDisplayReact` component
2. Render cards via `createCardFaceGraphics` drawing primitives (not CardSprite)
3. Extract testable helpers: `cardAlpha`, `cardEventMode`
4. Props: `zone: Rect`, `cards: HandCardReact[]`, `onCardTap?: (index, card) => void`
5. Playable/non-playable alpha and eventMode per card
6. Write TDD tests (red → green)
7. Create story with FullHand, FiveCards, SingleCard, PlayableCards variants
8. Update barrel exports
9. Old `hand-display.ts` unchanged
10. All 4 checks pass

## PO Decisions Locked

- **Graphics over CardSprite**: CardSprite requires `CardTextureAtlas` (needs running Application + renderer) and `DropShadowFilter` from `pixi-filters`. Using `createCardFaceGraphics` keeps the component self-contained, testable in Vitest, and consistent with existing stories. CardSprite migration to a React `<Card>` component is deferred to iteration 44. This is a deviation from the original plan's "CardSprite mounted via ref" with justified rationale.
- **Imperative card mounting via ref**: Card Graphics are created imperatively via `ref` callback on `pixiContainer`, since `createCardFaceGraphics` returns a Container (not a primitive). This is a bridge pattern for the migration period.
- **`HandCardReact` type**: Identical shape to `HandCard` from imperative version but kept as a separate type to avoid coupling during migration. Can be unified in cleanup (iteration 43).
- **Stable callback ref pattern**: `onCardTap` stored in a `useRef` to avoid stale closures in event handlers without causing re-renders.

## Tests Written (11 test cases, written before implementation)

### `__tests__/hand-display-react.test.tsx`

- `exports the component function` — verifies module export
- `exports cardAlpha function` — verifies helper export
- `exports cardEventMode function` — verifies helper export
- `returns a valid React element with cards` — validates createElement with 3 cards
- `returns a valid React element with empty cards` — validates empty hand
- `accepts onCardTap callback prop` — validates optional callback prop
- `cardAlpha returns 1 for playable cards` — playable → full opacity
- `cardAlpha returns dimmed value for non-playable cards` — non-playable → less than 1
- `cardAlpha returns 0.4 for non-playable cards` — exact dimmed alpha value
- `cardEventMode returns 'static' for playable cards` — touch events enabled
- `cardEventMode returns 'none' for non-playable cards` — touch events disabled

## Implementation Summary

### Files Created

- `packages/ui/src/components/hand/hand-display-react.tsx` — React HandDisplay component + helpers
- `packages/ui/src/components/hand/hand-display-react.stories.tsx` — 4 story variants
- `packages/ui/__tests__/hand-display-react.test.tsx` — 11 tests

### Files Modified

- `packages/ui/src/index.ts` — added `HandDisplayReact`, `cardAlpha`, `cardEventMode`, `HandCardReact`, `HandDisplayReactProps` exports

### Key Types

- `HandCardReact` — `{ suit: Suit; rank: Rank; playable: boolean }`
- `HandDisplayReactProps` — `{ zone: Rect; cards: readonly HandCardReact[]; onCardTap?: (index, card) => void }`

### Key Functions

- `HandDisplayReact({ zone, cards, onCardTap })` — React component rendering a fan of face-up cards
- `cardAlpha(playable)` — returns 1 or 0.4
- `cardEventMode(playable)` — returns "static" or "none"

## Technical Decisions

| Decision | Choice | Rationale |
| --- | --- | --- |
| createCardFaceGraphics vs CardSprite | Graphics drawing primitives | No atlas dependency; testable without Application; consistent with stories |
| Imperative card mount via ref | ref callback + removeChildren | createCardFaceGraphics returns Container; can't use as JSX child |
| Callback ref pattern | useRef for onCardTap | Prevents stale closures in pointerdown handlers |
| Separate HandCardReact type | Own interface during migration | Avoids coupling to imperative HandCard; unified in cleanup |

## Refactoring Performed

None. Imperative `hand-display.ts` untouched.

## Risks Identified

- **Visual rendering not verified**: Cards are rendered via Graphics drawing primitives, not texture-based CardSprites. Visual fidelity in Storybook should be confirmed. The Graphics rendering matches existing imperative stories.
- **No DropShadowFilter**: Imperative CardSprite has a drop shadow from `pixi-filters`. The React version using Graphics has no shadow. This is acceptable during migration — shadows will be added when CardSprite is migrated to React (iteration 44).
- **Imperative mount pattern**: Using ref callbacks to mount Graphics is a bridge pattern. Future iterations may introduce a React `<Card>` component that renders purely in JSX.

## Validation Results

- `pnpm test`: **880/880 passing** (11 new)
- `pnpm typecheck`: Clean
- `pnpm lint`: Clean
- `pnpm format:check`: Clean

## Next Iteration: 38 (OpponentHand → React)

**Scope**: Rewrite OpponentHand as a React component with face-down cards.

**Acceptance criteria**:

1. `opponent-hand-react.tsx` renders N face-down cards using `computeOpponentLayout` (unchanged)
2. Cards rendered via `createCardBackGraphics` drawing primitives
3. Props: `zone: Rect`, `cardCount: number`, `orientation: OpponentOrientation`
4. Tests for component + valid React element
5. `opponent-hand-react.stories.tsx` renders in Storybook
6. Old `opponent-hand.ts` unchanged
7. All 4 checks pass

## Iteration 39 Preview (TrickDisplay → React)

**Scope**: Rewrite TrickDisplay as a React component for center trick area. Uses `computeTrickLayout` (unchanged). Cards rendered via `createCardFaceGraphics`. Supports 0-4 played cards. Includes Storybook story.

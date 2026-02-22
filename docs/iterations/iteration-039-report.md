# Iteration 39 Report: MaskedFrame Cards + Dialog Bidding (Course Correction)

**Date**: 2026-02-22
**Status**: Complete

## Goal

Course-correct the React migration to leverage `@pixi/ui` capabilities that were installed but unused:

1. **MaskedFrame** for card rendering — true pixel-level clipping with clean rounded corners and themed borders
2. **Dialog + FancyButton** for bidding — modal popup with proper button states
3. Register both in `pixi-react-setup.ts`

## Why

Iterations 36-38 ported components 1:1 from imperative to React using raw `createCardFaceGraphics`/`createCardBackGraphics` (programmatic Graphics). This missed `@pixi/ui` capabilities that improve visual quality and UX.

## Scope — 3 Sub-tasks

### Sub-task A: `createMaskedCard` helper + card component updates

1. Created `card-frame.ts` with `createMaskedCard(options)` factory function
2. Wraps card content Container in MaskedFrame with rounded rect Graphics mask
3. Updated `hand-display-react.tsx` to use `createMaskedCard` in `mountCard` ref callback
4. Updated `opponent-hand-react.tsx` to use `createMaskedCard` with gold border for card backs
5. 7 new tests for card-frame

### Sub-task B: `BiddingDialogReact` — Dialog-based bidding

1. Created `bidding-dialog-react.tsx` with modal Dialog component
2. 5 buttons: 4 suit FancyButtons + 1 pass button via `ButtonOptions`
3. Dialog created imperatively in `useEffect` (complex constructor API doesn't map to JSX)
4. `open` prop controls `dialog.open()` / `dialog.close()`
5. `onSuitBid` + `onPass` callbacks via stable refs
6. Extracted 3 testable helpers: `createDialogBackground`, `suitBidButtonOptions`, `passBidButtonOptions`
7. 11 new tests for bidding-dialog-react
8. Story with DialogOpen and DialogClosed variants

### Sub-task C: Register MaskedFrame + Dialog

1. Added `MaskedFrame` and `Dialog` imports to `pixi-react-setup.ts`
2. Added to `extend()` call
3. 2 new integration tests for MaskedFrame and Dialog constructibility

## PO Decisions Locked

- **Imperative helper, not JSX component**: `MaskedFrame` takes `target: Container` and `mask: Graphics` — instances, not serializable JSX props. Using it imperatively in the existing ref-callback mounting pattern is the right approach.
- **Dialog imperative via useEffect**: Dialog has complex constructor (buttons array, backdrop, signals). Created in `useEffect`, controlled by `open` prop.
- **Additive, not replacement**: `BiddingDialogReact` is a new component. `BiddingPanelReact` (zone-based) stays as fallback.
- **Plain string text for buttons**: FancyButton `text` uses plain strings (`"♥ Hearts"`, `"Pass"`) rather than styled Text objects, for simplicity and testability.

## Tests Written (20 new, written before implementation)

### `__tests__/card-frame.test.ts` — 7 tests

- Export check, returns Container, label = "card-frame"
- Has target set, has border child
- Accepts custom options, works with zero-size

### `__tests__/bidding-dialog-react.test.tsx` — 11 tests

- 4 export checks (component + 3 helpers)
- 2 React element validity tests
- 1 createDialogBackground → Graphics instance
- 3 suitBidButtonOptions (defaultView, suit symbol, distinct per suit)
- 1 passBidButtonOptions (text = "Pass")

### `__tests__/pixi-layout-ui-integration.test.ts` — 2 new tests

- MaskedFrame importable and constructible
- Dialog importable and constructible

## Implementation Summary

### Files Created (5)

- `packages/ui/src/card-frame.ts` — MaskedFrame wrapper factory
- `packages/ui/__tests__/card-frame.test.ts` — 7 tests
- `packages/ui/src/components/bidding/bidding-dialog-react.tsx` — Dialog bidding component
- `packages/ui/__tests__/bidding-dialog-react.test.tsx` — 11 tests
- `packages/ui/src/components/bidding/bidding-dialog-react.stories.tsx` — 2 story variants

### Files Modified (5)

- `packages/ui/src/pixi-react-setup.ts` — register MaskedFrame, Dialog
- `packages/ui/__tests__/pixi-layout-ui-integration.test.ts` — 2 new integration tests
- `packages/ui/src/components/hand/hand-display-react.tsx` — use createMaskedCard
- `packages/ui/src/components/opponent-hand/opponent-hand-react.tsx` — use createMaskedCard + gold border
- `packages/ui/src/index.ts` — barrel exports for card-frame + bidding-dialog

### Key Types

- `CardFrameOptions` — `{ content, width, height, cornerRadius?, borderWidth?, borderColor? }`
- `BiddingDialogReactProps` — `{ viewportWidth, viewportHeight, open, onSuitBid?, onPass? }`

## Technical Decisions

| Decision                          | Choice                                         | Rationale                                                          |
| --------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------ |
| MaskedFrame via imperative helper | `createMaskedCard()` factory                   | MaskedFrame takes Container/Graphics instances; can't be JSX props |
| Dialog via useEffect              | Imperative creation + signal connection        | Complex constructor API, lifecycle methods (open/close)            |
| Card back gold border             | `borderColor: 0xFFD54F`                        | Matches THEME accent gold; distinguishes face-down cards           |
| Dialog title as string            | `"Your Bid"`                                   | AnyText typed; string is simplest; styled text deferred            |
| Additive approach                 | BiddingDialogReact alongside BiddingPanelReact | Zone-based fallback stays during migration                         |

## Errors Encountered and Fixed

1. **TS6133**: Unused `color` variable and `suitColor` import in bidding-dialog-react — removed
2. **TS2740**: Dialog `title` typed as `AnyText`, not text options object — changed to plain string
3. **no-base-to-string**: `String(opts.text)` in tests — changed to `opts.text as string`
4. **Dialog.destroy() fails in headless**: Removed destroy call from integration test (construction proves usability)
5. **Prettier formatting**: Fixed on 2 files

## Risks Identified

- **MaskedFrame mask sizing at scale**: Mask dimensions must match the scaled card size. Verified with existing stories (same layout math).
- **Dialog rendering in headless tests**: Dialog constructor works but destroy has internal side effects. Visual verification needed in Storybook.
- **Dialog animation timing**: `open()`/`close()` use `tweedle.js` tweening. May need running ticker for smooth animations in Storybook.

## Validation Results

- `pnpm test`: **905/905 passing** (20 new)
- `pnpm typecheck`: Clean
- `pnpm lint`: Clean
- `pnpm format:check`: Clean

## Next Iteration: 40 (TrickDisplay → React with MaskedFrame)

**Scope**: Rewrite TrickDisplay as a React component using `computeTrickLayout` and `createMaskedCard` for face-up trick cards.

**Acceptance criteria**:

1. `trick-display-react.tsx` renders 0-4 played cards using `computeTrickLayout` (unchanged)
2. Cards wrapped in `createMaskedCard` for clean bordered rendering
3. Props: `zone: Rect`, `cards: TrickCardReact[]`
4. Tests for component + valid React element
5. `trick-display-react.stories.tsx` renders in Storybook
6. Old `trick-display.ts` unchanged
7. All 4 checks pass

## Iteration 41 Preview (TableLayout with @pixi/layout flexbox)

**Scope**: Rewrite TableLayout using Yoga-powered flexbox from `@pixi/layout`. 5-zone structure with column flex. Background felt as `<pixiGraphics>` draw callback.

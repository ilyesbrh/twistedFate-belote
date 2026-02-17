# Iteration 6 Report: Round Scoring

**Date**: 2026-02-17
**Status**: Complete

## Goal

Implement Round Scoring — pure calculation module that takes 8 completed tricks + a contract and computes final scores per team. This builds on trick mechanics (iteration 5) and is the prerequisite for round/game state machine (iteration 7).

## Scope

1. `calculateTrickPoints(trick, trumpSuit)` — sum card points in a completed trick
2. `calculateTeamPoints(tricks, trumpSuit, bidderPosition)` — sum points per team + last trick bonus
3. `detectBeloteRebelote(tricks, trumpSuit, bidderPosition)` — auto-detect K+Q of trump
4. `calculateRoundScore(tricks, contract)` — main orchestrator: contract eval + multiplier + belote
5. Constants: `LAST_TRICK_BONUS=10`, `BELOTE_BONUS=20`, `TOTAL_CARD_POINTS=152`, `TOTAL_ROUND_POINTS=162`

## PO Decisions Locked

- **Belote/Rebelote detection**: Auto-detect from tricks (K+Q of trump played by same team = +20)
- **Coinche scoring on failure**: Opponent gets 162 × multiplier (×1/×2/×4)
- **Belote bonus timing**: Added AFTER multiplier (+20 flat bonus)

## Tests Written (40 test cases, written before implementation)

- calculateTrickPoints (6 tests): non-trump sum, trump sum, mixed, zero-point, trump jack=20, throw if not completed
- calculateTeamPoints (8 tests): all to contracting, all to opponent, split, last trick bonus contracting, last trick bonus opponent, total=162, throw <8 tricks, throw incomplete
- detectBeloteRebelote (7 tests): contracting has both, opponent has both, different teams, different tricks, same player, bidder at pos 1, bidder at pos 3
- Contract evaluation (5 tests): success above, success exact, failure below, success at 160, failure at 80
- Coinche multipliers (6 tests): ×1 success, ×2 success, ×4 success, ×1 failure, ×2 failure (324), ×4 failure (648)
- Belote bonus (6 tests): +20 contracting on success, +20 opponent on success, +20 contracting on failure (=20), +20 opponent on failure, no bonus, bonus AFTER multiplier
- Integration (2 tests): frozen result, constants exported

## Implementation Summary

### Files Created

- `packages/core/src/models/scoring.ts` - Types, constants, 4 scoring functions
- `packages/core/__tests__/models/scoring.test.ts` - 40 TDD test cases

### Files Modified

- `packages/core/src/models/index.ts` - Added scoring exports
- `packages/core/src/index.ts` - Added scoring re-exports
- `eslint.config.mjs` - Added `@typescript-eslint/array-type: "off"` for test files
- `docs/GAME_RULES.md` - Updated PO decisions for scoring

### Key Types

```typescript
interface TeamPoints {
  readonly contractingTeamPoints: number;
  readonly opponentTeamPoints: number;
}

interface RoundScore {
  readonly contractingTeamPoints: number;
  readonly opponentTeamPoints: number;
  readonly contractMet: boolean;
  readonly contractingTeamScore: number;
  readonly opponentTeamScore: number;
  readonly beloteBonusTeam: "contracting" | "opponent" | null;
  readonly contractingTeamFinalScore: number;
  readonly opponentTeamFinalScore: number;
}
```

### Scoring Pipeline (calculateRoundScore)

1. `calculateTeamPoints` → raw card points + last trick bonus per team
2. Contract evaluation: `contractMet = contractingTeamPoints >= contract.value`
3. On success: both teams' points × coinche multiplier
4. On failure: contracting = 0, opponent = 162 × coinche multiplier
5. `detectBeloteRebelote` → +20 to whichever team has K+Q of trump (always, even on failure)
6. Freeze and return `RoundScore`

## Technical Decisions

| Decision                                  | Choice                            | Rationale                                       |
| ----------------------------------------- | --------------------------------- | ----------------------------------------------- |
| No entity IDs                             | Scoring is pure calculation       | No stateful entities, just input→output         |
| Reuse `getCardPoints`                     | From `card.ts`                    | Already handles trump vs non-trump scoring      |
| Reuse `isOnSameTeam`                      | From `player-helpers.ts`          | Determines which team wins each trick           |
| Test helpers build frozen Tricks directly | `makeTrick()` bypasses `playCard` | Scoring only reads data, doesn't validate plays |
| Belote always applies                     | Even on contract failure          | PO decision: bonus is unconditional             |
| Belote after multiplier                   | +20 flat, not multiplied          | PO decision: prevents snowball scoring          |

## Risks Identified

- None blocking

## Validation Results

- `pnpm test`: 270/270 passing (230 prior + 40 new)
- `pnpm run typecheck`: Clean
- `pnpm run lint`: Clean
- `pnpm run format:check`: Clean

## Next Iteration: N+1 (Iteration 7)

**Round/Game State Machine (TDD)**

- Round entity connecting bidding, tricks, and scoring
- Full round lifecycle (deal → bid → 8 tricks → score)
- Game loop with target score tracking
- Game completion conditions (first team to target score)
- 8 tricks per round validation (deferred from iteration 5)

## Iteration N+2 Preview (Iteration 8)

**AI Player / Basic Strategy (TDD)**

- AI card selection logic for trick play
- Basic bidding strategy
- Rule-compliant play validation integration

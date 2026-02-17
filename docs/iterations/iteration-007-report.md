# Iteration 7 Report: Round/Game State Machine

**Date**: 2026-02-18
**Status**: Complete

## Goal

Implement Round and Game state machines — connecting bidding, tricks, and scoring into a full round lifecycle (deal → bid → 8 tricks → score) and multi-round game with target score tracking.

## Scope

1. **EntityType migration**: Added `"bidding_round"` to EntityType, migrated `createBiddingRound`
2. **Round entity** (`round.ts`): Full round lifecycle with 3 orchestration functions
3. **Game entity** (`game.ts`): Score tracking, dealer rotation, win detection

## PO Decisions Locked

- **Target score**: Configurable (default 1000)
- **Both teams reach target**: Contracting team wins (priority)

## Tests Written (68 test cases, written before implementation)

### round.test.ts (45 tests)

- createRound (7 tests): ID prefix, roundNumber, 8 cards per player, bidding round created, dealer+1 first bidder, phase="bidding", frozen
- placeBidInRound (10 tests): forwards bid, keeps phase, auto→playing, contract extracted, first trick leader, trump suit, auto→cancelled, throws wrong phase, coinche flow, surcoinche flow, frozen
- playCardInRound (15 tests): plays card, removes from hand, updates player, trick completes, moves to array, new trick created, winner leads, 8th→completed, score calculated, hands empty, throws wrong phase, wrong player, card not in hand, delegation, frozen
- trick leader logic (3 tests): dealer+1 first, winner leads next, chained leaders
- cancelled phase (2 tests): no contract/tricks/score, throws on play
- completed phase (3 tests): roundScore non-null, 8 tricks, currentTrick null
- Integration (4 tests): full lifecycle, all-passed, trick counting, different dealer

### game.test.ts (23 tests)

- createGame (5 tests): state, players/teams, target score, initial values, frozen
- addCompletedRound (9 tests): adds round, team0 score, team1 score, accumulation, cancelled no-op, dealer rotation, throws completed, throws wrong phase, frozen
- Win condition (5 tests): team0 wins, team1 wins, no winner, exact target, contracting priority
- DEFAULT_TARGET_SCORE (1 test): constant = 1000
- Integration (3 tests): multi-round game, cancelled rounds, dealer rotation

## Implementation Summary

### Files Created

- `packages/core/src/models/round.ts` — Round types + 3 functions
- `packages/core/src/models/game.ts` — Game types + 2 functions + constant
- `packages/core/__tests__/models/round.test.ts` — 45 TDD test cases
- `packages/core/__tests__/models/game.test.ts` — 23 TDD test cases

### Files Modified

- `packages/core/src/utils/id.ts` — Added `"bidding_round"` to EntityType union
- `packages/core/src/models/bid.ts` — Changed `createBiddingRound` to use `"bidding_round"` EntityType
- `packages/core/src/models/index.ts` — Added round + game exports
- `packages/core/src/index.ts` — Added round + game re-exports
- `docs/GAME_RULES.md` — Locked target score and tiebreaker PO decisions

### Key Types

```typescript
// Round
type RoundPhase = "bidding" | "playing" | "completed" | "cancelled";

interface Round {
  readonly id: string;
  readonly roundNumber: number;
  readonly dealerPosition: PlayerPosition;
  readonly players: readonly [Player, Player, Player, Player];
  readonly biddingRound: BiddingRound;
  readonly contract: Contract | null;
  readonly tricks: readonly Trick[];
  readonly currentTrick: Trick | null;
  readonly roundScore: RoundScore | null;
  readonly phase: RoundPhase;
}

// Game
type GameState = "in_progress" | "completed";

interface Game {
  readonly id: string;
  readonly players: readonly [Player, Player, Player, Player];
  readonly teams: readonly [Team, Team];
  readonly targetScore: number;
  readonly rounds: readonly Round[];
  readonly teamScores: readonly [number, number];
  readonly currentDealerPosition: PlayerPosition;
  readonly state: GameState;
  readonly winnerTeamIndex: 0 | 1 | null;
}
```

### Round Lifecycle

1. `createRound(roundNumber, dealerPos, players, deck, idGen)` → deals 8 cards each, creates BiddingRound, phase="bidding"
2. `placeBidInRound(round, bid, idGen)` → delegates to `placeBid`, auto-transitions to "playing" (extract contract, create first trick) or "cancelled" (all passed)
3. `playCardInRound(round, card, pos, idGen)` → delegates to `playCard` + `removeCardFromHand`, manages trick lifecycle, auto-transitions to "completed" after 8th trick (calculates score)

### Game Functions

1. `createGame(players, teams, targetScore, idGen)` → initial state
2. `addCompletedRound(game, round)` → validates, updates scores via `isOnSameTeam`, advances dealer, checks win (contracting team priority)

## Technical Decisions

| Decision                                     | Choice                                             | Rationale                                                    |
| -------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| EntityType migration                         | `"bidding_round"` added                            | Frees `"round"` for Round entity, avoids ID prefix collision |
| Round holds `currentTrick` separately        | `tricks` = completed, `currentTrick` = in-progress | Clear state, easy to reason about                            |
| `idGenerator` passed to transition functions | Not stored in entity                               | Keeps entities serializable and pure                         |
| Game doesn't create rounds                   | Just accepts completed/cancelled rounds            | Clean separation — Round runs independently                  |
| Contracting team priority on tiebreak        | PO decision                                        | Standard Belote rule                                         |
| Test helpers build frozen Rounds directly    | For Game tests                                     | Game only reads phase + scores, doesn't replay rounds        |

## Risks Identified

- None blocking

## Validation Results

- `pnpm test`: 338/338 passing (270 prior + 45 round + 23 game)
- `pnpm run typecheck`: Clean
- `pnpm run lint`: Clean
- `pnpm run format:check`: Clean

## Next Iteration: N+1 (Iteration 8)

**AI Player / Basic Strategy (TDD)**

- AI card selection logic for trick play
- Basic bidding strategy (when to bid, how high)
- Rule-compliant play validation integration
- Simple heuristics (play highest trump, follow suit preference)

## Iteration N+2 Preview (Iteration 9)

**App Layer / Command-Event Orchestration (TDD)**

- `@belote/app` package implementation
- Command/event pattern for game actions
- Game session management
- Integration between core domain and application layer

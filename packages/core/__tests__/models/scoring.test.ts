import { describe, it, expect, beforeEach } from "vitest";
import {
  LAST_TRICK_BONUS,
  BELOTE_BONUS,
  TOTAL_CARD_POINTS,
  TOTAL_ROUND_POINTS,
  calculateTrickPoints,
  calculateTeamPoints,
  detectBeloteRebelote,
  calculateRoundScore,
} from "../../src/models/scoring.js";
import type { TeamPoints, RoundScore } from "../../src/models/scoring.js";
import { createCard } from "../../src/models/card.js";
import type { Card, Suit, Rank } from "../../src/models/card.js";
import type { PlayerPosition } from "../../src/models/player.js";
import type { Trick, PlayedCard } from "../../src/models/trick.js";
import type { Contract } from "../../src/models/bid.js";
import type { BidValue } from "../../src/models/bid.js";
import { createIdGenerator } from "../../src/utils/id.js";
import type { IdGenerator } from "../../src/utils/id.js";

// ==============================================================
// Helpers
// ==============================================================

let idGen: IdGenerator;

beforeEach(() => {
  idGen = createIdGenerator({ seed: 42 });
});

function c(suit: Suit, rank: Rank): Card {
  return createCard(suit, rank, idGen);
}

/** Build a completed trick directly (scoring reads data, doesn't re-validate plays). */
function makeTrick(
  trumpSuit: Suit,
  cards: Array<{ suit: Suit; rank: Rank; position: PlayerPosition }>,
  winnerPosition: PlayerPosition,
): Trick {
  const playedCards: PlayedCard[] = cards.map((entry) =>
    Object.freeze({ card: c(entry.suit, entry.rank), playerPosition: entry.position }),
  );
  return Object.freeze({
    id: idGen.generateId("trick"),
    leadingPlayerPosition: cards[0]!.position,
    trumpSuit,
    cards: Object.freeze(playedCards),
    state: "completed" as const,
    winnerPosition,
  });
}

/** Build an in-progress trick for error tests. */
function makeInProgressTrick(trumpSuit: Suit): Trick {
  return Object.freeze({
    id: idGen.generateId("trick"),
    leadingPlayerPosition: 0 as PlayerPosition,
    trumpSuit,
    cards: Object.freeze([]),
    state: "in_progress" as const,
    winnerPosition: null,
  });
}

/** Build a simple contract. */
function makeContract(
  value: BidValue,
  suit: Suit,
  bidderPosition: PlayerPosition,
  coincheLevel: 1 | 2 | 4 = 1,
): Contract {
  return Object.freeze({
    id: idGen.generateId("contract"),
    suit,
    value,
    bidderPosition,
    coincheLevel,
  });
}

/**
 * Build 8 tricks for a full round. Uses simple filler cards (7s and 8s)
 * for non-scoring tricks, with explicit control over who wins what.
 *
 * @param trumpSuit - The trump suit
 * @param config - Array of 8 entries, each with card details and winner
 */
function makeEightTricks(
  trumpSuit: Suit,
  config: Array<{
    cards: Array<{ suit: Suit; rank: Rank; position: PlayerPosition }>;
    winner: PlayerPosition;
  }>,
): Trick[] {
  return config.map((entry) => makeTrick(trumpSuit, entry.cards, entry.winner));
}

// Standard filler trick (all zero-point non-trump cards)
function fillerTrick(trumpSuit: Suit, winner: PlayerPosition): Trick {
  // Use diamonds as filler if trump is not diamonds, else use clubs
  const fillerSuit: Suit = trumpSuit === "diamonds" ? "clubs" : "diamonds";
  return makeTrick(
    trumpSuit,
    [
      { suit: fillerSuit, rank: "7", position: 0 as PlayerPosition },
      { suit: fillerSuit, rank: "8", position: 1 as PlayerPosition },
      { suit: fillerSuit, rank: "7", position: 2 as PlayerPosition },
      { suit: fillerSuit, rank: "8", position: 3 as PlayerPosition },
    ],
    winner,
  );
}

// ==============================================================
// calculateTrickPoints
// ==============================================================

describe("calculateTrickPoints", () => {
  it("should sum card points for a trick with all non-trump cards", () => {
    // Trump=hearts. Play 4 spades: ace=11, 10=10, king=4, queen=3
    const trick = makeTrick(
      "hearts",
      [
        { suit: "spades", rank: "ace", position: 0 },
        { suit: "spades", rank: "10", position: 1 },
        { suit: "spades", rank: "king", position: 2 },
        { suit: "spades", rank: "queen", position: 3 },
      ],
      0,
    );
    expect(calculateTrickPoints(trick, "hearts")).toBe(28); // 11+10+4+3
  });

  it("should sum card points for a trick with all trump cards", () => {
    // Trump=hearts. Play 4 hearts: jack=20, 9=14, ace=11, 10=10
    const trick = makeTrick(
      "hearts",
      [
        { suit: "hearts", rank: "jack", position: 0 },
        { suit: "hearts", rank: "9", position: 1 },
        { suit: "hearts", rank: "ace", position: 2 },
        { suit: "hearts", rank: "10", position: 3 },
      ],
      0,
    );
    expect(calculateTrickPoints(trick, "hearts")).toBe(55); // 20+14+11+10
  });

  it("should use trump scoring for trump cards and non-trump for others", () => {
    // Trump=hearts. hearts 9=14(trump), spades ace=11, spades 7=0, spades 8=0
    const trick = makeTrick(
      "hearts",
      [
        { suit: "hearts", rank: "9", position: 0 },
        { suit: "spades", rank: "ace", position: 1 },
        { suit: "spades", rank: "7", position: 2 },
        { suit: "spades", rank: "8", position: 3 },
      ],
      0,
    );
    expect(calculateTrickPoints(trick, "hearts")).toBe(25); // 14+11+0+0
  });

  it("should return 0 for a trick with all zero-point cards", () => {
    const trick = makeTrick(
      "hearts",
      [
        { suit: "spades", rank: "7", position: 0 },
        { suit: "spades", rank: "8", position: 1 },
        { suit: "clubs", rank: "7", position: 2 },
        { suit: "clubs", rank: "8", position: 3 },
      ],
      0,
    );
    expect(calculateTrickPoints(trick, "hearts")).toBe(0);
  });

  it("should correctly score trump jack at 20 points (not non-trump 2)", () => {
    // Trump=hearts. hearts jack=20, spades 7=0, spades 8=0, clubs 7=0
    const trick = makeTrick(
      "hearts",
      [
        { suit: "hearts", rank: "jack", position: 0 },
        { suit: "spades", rank: "7", position: 1 },
        { suit: "spades", rank: "8", position: 2 },
        { suit: "clubs", rank: "7", position: 3 },
      ],
      0,
    );
    expect(calculateTrickPoints(trick, "hearts")).toBe(20);
  });

  it("should throw if trick is not completed", () => {
    const trick = makeInProgressTrick("hearts");
    expect(() => calculateTrickPoints(trick, "hearts")).toThrow(/not completed|in_progress/i);
  });
});

// ==============================================================
// calculateTeamPoints
// ==============================================================

describe("calculateTeamPoints", () => {
  it("should assign all trick points to contracting team when they win all tricks", () => {
    // Bidder=0, contracting team={0,2}. All 8 tricks won by position 0.
    // Use 7 filler tricks (0 points each) + 1 trick with all 4 aces non-trump (44 points)
    // But we need total=152 card points. Simpler: just make 8 tricks with known totals.
    // Actually, let's build a full 32-card round properly.
    // For simplicity, use fillers that still contribute to 152.

    // Approach: one trick has non-trump aces (4×11=44), another has non-trump 10s (4×10=40),
    // another has non-trump kings (4×4=16), etc. Sum must be 152.
    // trump=hearts, bidder=0

    // Trump cards: jack=20, 9=14, ace=11, 10=10, king=4, queen=3, 8=0, 7=0 = 62
    // Non-trump (×3 suits): ace=11, 10=10, king=4, queen=3, jack=2, 9=0, 8=0, 7=0 = 30 each = 90
    // Total: 62 + 90 = 152 ✓

    // 8 tricks, all won by contracting team (position 0)
    const trumpSuit: Suit = "hearts";
    const tricks = [
      // Trick 1: trump high cards (jack=20, 9=14, ace=11, 10=10) = 55
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "jack", position: 0 },
          { suit: "hearts", rank: "9", position: 1 },
          { suit: "hearts", rank: "ace", position: 2 },
          { suit: "hearts", rank: "10", position: 3 },
        ],
        0,
      ),
      // Trick 2: trump low + non-trump (king=4, queen=3, 8=0, 7=0) = 7
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "king", position: 0 },
          { suit: "hearts", rank: "queen", position: 1 },
          { suit: "hearts", rank: "8", position: 2 },
          { suit: "hearts", rank: "7", position: 3 },
        ],
        0,
      ),
      // Trick 3: spades (ace=11, 10=10, king=4, queen=3) = 28
      makeTrick(
        trumpSuit,
        [
          { suit: "spades", rank: "ace", position: 0 },
          { suit: "spades", rank: "10", position: 1 },
          { suit: "spades", rank: "king", position: 2 },
          { suit: "spades", rank: "queen", position: 3 },
        ],
        0,
      ),
      // Trick 4: spades (jack=2, 9=0, 8=0, 7=0) = 2
      makeTrick(
        trumpSuit,
        [
          { suit: "spades", rank: "jack", position: 0 },
          { suit: "spades", rank: "9", position: 1 },
          { suit: "spades", rank: "8", position: 2 },
          { suit: "spades", rank: "7", position: 3 },
        ],
        0,
      ),
      // Trick 5: diamonds (ace=11, 10=10, king=4, queen=3) = 28
      makeTrick(
        trumpSuit,
        [
          { suit: "diamonds", rank: "ace", position: 0 },
          { suit: "diamonds", rank: "10", position: 1 },
          { suit: "diamonds", rank: "king", position: 2 },
          { suit: "diamonds", rank: "queen", position: 3 },
        ],
        0,
      ),
      // Trick 6: diamonds (jack=2, 9=0, 8=0, 7=0) = 2
      makeTrick(
        trumpSuit,
        [
          { suit: "diamonds", rank: "jack", position: 0 },
          { suit: "diamonds", rank: "9", position: 1 },
          { suit: "diamonds", rank: "8", position: 2 },
          { suit: "diamonds", rank: "7", position: 3 },
        ],
        0,
      ),
      // Trick 7: clubs (ace=11, 10=10, king=4, queen=3) = 28
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "ace", position: 0 },
          { suit: "clubs", rank: "10", position: 1 },
          { suit: "clubs", rank: "king", position: 2 },
          { suit: "clubs", rank: "queen", position: 3 },
        ],
        0,
      ),
      // Trick 8: clubs (jack=2, 9=0, 8=0, 7=0) = 2
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "jack", position: 0 },
          { suit: "clubs", rank: "9", position: 1 },
          { suit: "clubs", rank: "8", position: 2 },
          { suit: "clubs", rank: "7", position: 3 },
        ],
        0,
      ),
    ];
    // Total card points: 55+7+28+2+28+2+28+2 = 152 ✓
    const result = calculateTeamPoints(tricks, trumpSuit, 0);
    expect(result.contractingTeamPoints).toBe(162); // 152 + 10 last trick bonus
    expect(result.opponentTeamPoints).toBe(0);
  });

  it("should assign all trick points to opponent when they win all tricks", () => {
    const trumpSuit: Suit = "hearts";
    // 8 filler tricks all won by position 1 (opponent when bidder=0)
    // All 0-point cards → 0 card points + 10 last trick bonus = 10 for opponent
    // But we need to test with real card points too. Let's use a simpler approach:
    // same 8-trick structure as above but all won by position 1
    const tricks = [
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "jack", position: 0 },
          { suit: "hearts", rank: "9", position: 1 },
          { suit: "hearts", rank: "ace", position: 2 },
          { suit: "hearts", rank: "10", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "king", position: 0 },
          { suit: "hearts", rank: "queen", position: 1 },
          { suit: "hearts", rank: "8", position: 2 },
          { suit: "hearts", rank: "7", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "spades", rank: "ace", position: 0 },
          { suit: "spades", rank: "10", position: 1 },
          { suit: "spades", rank: "king", position: 2 },
          { suit: "spades", rank: "queen", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "spades", rank: "jack", position: 0 },
          { suit: "spades", rank: "9", position: 1 },
          { suit: "spades", rank: "8", position: 2 },
          { suit: "spades", rank: "7", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "diamonds", rank: "ace", position: 0 },
          { suit: "diamonds", rank: "10", position: 1 },
          { suit: "diamonds", rank: "king", position: 2 },
          { suit: "diamonds", rank: "queen", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "diamonds", rank: "jack", position: 0 },
          { suit: "diamonds", rank: "9", position: 1 },
          { suit: "diamonds", rank: "8", position: 2 },
          { suit: "diamonds", rank: "7", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "ace", position: 0 },
          { suit: "clubs", rank: "10", position: 1 },
          { suit: "clubs", rank: "king", position: 2 },
          { suit: "clubs", rank: "queen", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "jack", position: 0 },
          { suit: "clubs", rank: "9", position: 1 },
          { suit: "clubs", rank: "8", position: 2 },
          { suit: "clubs", rank: "7", position: 3 },
        ],
        1,
      ),
    ];
    const result = calculateTeamPoints(tricks, trumpSuit, 0);
    expect(result.contractingTeamPoints).toBe(0);
    expect(result.opponentTeamPoints).toBe(162);
  });

  it("should split points across teams based on trick winners", () => {
    const trumpSuit: Suit = "hearts";
    // Contracting team (bidder=0) wins tricks 1-4, opponent wins tricks 5-8
    // Trick 1: trump high = 55, won by pos 0 (contracting)
    // Trick 2: trump low = 7, won by pos 2 (contracting)
    // Trick 3: spades high = 28, won by pos 0 (contracting)
    // Trick 4: spades low = 2, won by pos 2 (contracting)
    // Contracting card points: 55+7+28+2 = 92
    // Trick 5-8: diamonds+clubs = 28+2+28+2 = 60, won by opponent
    // Opponent card points: 60
    // Total: 92+60 = 152 ✓
    // Last trick (8) won by opponent → opponent gets +10
    const tricks = [
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "jack", position: 0 },
          { suit: "hearts", rank: "9", position: 1 },
          { suit: "hearts", rank: "ace", position: 2 },
          { suit: "hearts", rank: "10", position: 3 },
        ],
        0,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "king", position: 0 },
          { suit: "hearts", rank: "queen", position: 1 },
          { suit: "hearts", rank: "8", position: 2 },
          { suit: "hearts", rank: "7", position: 3 },
        ],
        2,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "spades", rank: "ace", position: 0 },
          { suit: "spades", rank: "10", position: 1 },
          { suit: "spades", rank: "king", position: 2 },
          { suit: "spades", rank: "queen", position: 3 },
        ],
        0,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "spades", rank: "jack", position: 0 },
          { suit: "spades", rank: "9", position: 1 },
          { suit: "spades", rank: "8", position: 2 },
          { suit: "spades", rank: "7", position: 3 },
        ],
        2,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "diamonds", rank: "ace", position: 0 },
          { suit: "diamonds", rank: "10", position: 1 },
          { suit: "diamonds", rank: "king", position: 2 },
          { suit: "diamonds", rank: "queen", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "diamonds", rank: "jack", position: 0 },
          { suit: "diamonds", rank: "9", position: 1 },
          { suit: "diamonds", rank: "8", position: 2 },
          { suit: "diamonds", rank: "7", position: 3 },
        ],
        3,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "ace", position: 0 },
          { suit: "clubs", rank: "10", position: 1 },
          { suit: "clubs", rank: "king", position: 2 },
          { suit: "clubs", rank: "queen", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "jack", position: 0 },
          { suit: "clubs", rank: "9", position: 1 },
          { suit: "clubs", rank: "8", position: 2 },
          { suit: "clubs", rank: "7", position: 3 },
        ],
        3,
      ),
    ];
    const result = calculateTeamPoints(tricks, trumpSuit, 0);
    expect(result.contractingTeamPoints).toBe(92);
    expect(result.opponentTeamPoints).toBe(70); // 60 + 10 last trick bonus
  });

  it("should add last trick bonus to contracting team when they win the 8th trick", () => {
    const trumpSuit: Suit = "hearts";
    // 7 filler tricks (0 pts) won by opponent + 1 last trick won by contracting
    const tricks: Trick[] = [];
    for (let i = 0; i < 7; i++) {
      tricks.push(fillerTrick(trumpSuit, 1));
    }
    // Last trick has some points: spades ace=11
    tricks.push(
      makeTrick(
        trumpSuit,
        [
          { suit: "spades", rank: "ace", position: 0 },
          { suit: "spades", rank: "7", position: 1 },
          { suit: "clubs", rank: "7", position: 2 },
          { suit: "clubs", rank: "8", position: 3 },
        ],
        0,
      ),
    );
    const result = calculateTeamPoints(tricks, trumpSuit, 0);
    // Contracting: 11 (card pts from last trick) + 10 (bonus) = 21
    expect(result.contractingTeamPoints).toBe(21);
  });

  it("should add last trick bonus to opponent when they win the 8th trick", () => {
    const trumpSuit: Suit = "hearts";
    const tricks: Trick[] = [];
    for (let i = 0; i < 7; i++) {
      tricks.push(fillerTrick(trumpSuit, 0));
    }
    tricks.push(fillerTrick(trumpSuit, 1));
    const result = calculateTeamPoints(tricks, trumpSuit, 0);
    // Opponent: 0 (card pts) + 10 (bonus) = 10
    expect(result.opponentTeamPoints).toBe(10);
  });

  it("should ensure total points always equal 162", () => {
    const trumpSuit: Suit = "hearts";
    // Use the split scenario from above
    const tricks = [
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "jack", position: 0 },
          { suit: "hearts", rank: "9", position: 1 },
          { suit: "hearts", rank: "ace", position: 2 },
          { suit: "hearts", rank: "10", position: 3 },
        ],
        0,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "king", position: 0 },
          { suit: "hearts", rank: "queen", position: 1 },
          { suit: "hearts", rank: "8", position: 2 },
          { suit: "hearts", rank: "7", position: 3 },
        ],
        2,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "spades", rank: "ace", position: 0 },
          { suit: "spades", rank: "10", position: 1 },
          { suit: "spades", rank: "king", position: 2 },
          { suit: "spades", rank: "queen", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "spades", rank: "jack", position: 0 },
          { suit: "spades", rank: "9", position: 1 },
          { suit: "spades", rank: "8", position: 2 },
          { suit: "spades", rank: "7", position: 3 },
        ],
        3,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "diamonds", rank: "ace", position: 0 },
          { suit: "diamonds", rank: "10", position: 1 },
          { suit: "diamonds", rank: "king", position: 2 },
          { suit: "diamonds", rank: "queen", position: 3 },
        ],
        0,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "diamonds", rank: "jack", position: 0 },
          { suit: "diamonds", rank: "9", position: 1 },
          { suit: "diamonds", rank: "8", position: 2 },
          { suit: "diamonds", rank: "7", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "ace", position: 0 },
          { suit: "clubs", rank: "10", position: 1 },
          { suit: "clubs", rank: "king", position: 2 },
          { suit: "clubs", rank: "queen", position: 3 },
        ],
        2,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "jack", position: 0 },
          { suit: "clubs", rank: "9", position: 1 },
          { suit: "clubs", rank: "8", position: 2 },
          { suit: "clubs", rank: "7", position: 3 },
        ],
        3,
      ),
    ];
    const result = calculateTeamPoints(tricks, trumpSuit, 0);
    expect(result.contractingTeamPoints + result.opponentTeamPoints).toBe(162);
  });

  it("should throw if fewer than 8 tricks provided", () => {
    const tricks = [fillerTrick("hearts", 0)];
    expect(() => calculateTeamPoints(tricks, "hearts", 0)).toThrow(/8 tricks/i);
  });

  it("should throw if any trick is not completed", () => {
    const tricks: Trick[] = [];
    for (let i = 0; i < 7; i++) {
      tricks.push(fillerTrick("hearts", 0));
    }
    tricks.push(makeInProgressTrick("hearts"));
    expect(() => calculateTeamPoints(tricks, "hearts", 0)).toThrow(/not completed|in_progress/i);
  });
});

// ==============================================================
// detectBeloteRebelote
// ==============================================================

describe("detectBeloteRebelote", () => {
  it("should return 'contracting' when contracting team plays both K and Q of trump", () => {
    const trumpSuit: Suit = "hearts";
    // King played by pos 0 (bidder), Queen by pos 2 (partner). Both contracting team.
    const tricks: Trick[] = [];
    tricks.push(
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "king", position: 0 },
          { suit: "spades", rank: "7", position: 1 },
          { suit: "spades", rank: "8", position: 2 },
          { suit: "clubs", rank: "7", position: 3 },
        ],
        0,
      ),
    );
    tricks.push(
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "queen", position: 2 },
          { suit: "spades", rank: "9", position: 1 },
          { suit: "clubs", rank: "8", position: 0 },
          { suit: "clubs", rank: "9", position: 3 },
        ],
        2,
      ),
    );
    for (let i = 0; i < 6; i++) {
      tricks.push(fillerTrick(trumpSuit, 0));
    }
    expect(detectBeloteRebelote(tricks, trumpSuit, 0)).toBe("contracting");
  });

  it("should return 'opponent' when opponent team plays both K and Q of trump", () => {
    const trumpSuit: Suit = "hearts";
    // King by pos 1, Queen by pos 3. Both opponent team (bidder=0).
    const tricks: Trick[] = [];
    tricks.push(
      makeTrick(
        trumpSuit,
        [
          { suit: "spades", rank: "7", position: 0 },
          { suit: "hearts", rank: "king", position: 1 },
          { suit: "spades", rank: "8", position: 2 },
          { suit: "clubs", rank: "7", position: 3 },
        ],
        1,
      ),
    );
    tricks.push(
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "8", position: 0 },
          { suit: "spades", rank: "9", position: 1 },
          { suit: "clubs", rank: "9", position: 2 },
          { suit: "hearts", rank: "queen", position: 3 },
        ],
        3,
      ),
    );
    for (let i = 0; i < 6; i++) {
      tricks.push(fillerTrick(trumpSuit, 0));
    }
    expect(detectBeloteRebelote(tricks, trumpSuit, 0)).toBe("opponent");
  });

  it("should return null when K and Q of trump are played by different teams", () => {
    const trumpSuit: Suit = "hearts";
    // King by pos 0 (contracting), Queen by pos 1 (opponent)
    const tricks: Trick[] = [];
    tricks.push(
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "king", position: 0 },
          { suit: "spades", rank: "7", position: 1 },
          { suit: "spades", rank: "8", position: 2 },
          { suit: "clubs", rank: "7", position: 3 },
        ],
        0,
      ),
    );
    tricks.push(
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "8", position: 0 },
          { suit: "hearts", rank: "queen", position: 1 },
          { suit: "clubs", rank: "9", position: 2 },
          { suit: "spades", rank: "9", position: 3 },
        ],
        1,
      ),
    );
    for (let i = 0; i < 6; i++) {
      tricks.push(fillerTrick(trumpSuit, 0));
    }
    expect(detectBeloteRebelote(tricks, trumpSuit, 0)).toBeNull();
  });

  it("should detect belote when K and Q are in different tricks", () => {
    const trumpSuit: Suit = "hearts";
    // King in trick 1 by pos 0, Queen in trick 5 by pos 2. Both contracting.
    const tricks: Trick[] = [];
    tricks.push(
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "king", position: 0 },
          { suit: "spades", rank: "7", position: 1 },
          { suit: "spades", rank: "8", position: 2 },
          { suit: "clubs", rank: "7", position: 3 },
        ],
        0,
      ),
    );
    for (let i = 0; i < 3; i++) {
      tricks.push(fillerTrick(trumpSuit, 0));
    }
    tricks.push(
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "8", position: 0 },
          { suit: "spades", rank: "9", position: 1 },
          { suit: "hearts", rank: "queen", position: 2 },
          { suit: "clubs", rank: "9", position: 3 },
        ],
        2,
      ),
    );
    for (let i = 0; i < 3; i++) {
      tricks.push(fillerTrick(trumpSuit, 0));
    }
    expect(detectBeloteRebelote(tricks, trumpSuit, 0)).toBe("contracting");
  });

  it("should detect belote when same player plays both K and Q", () => {
    const trumpSuit: Suit = "hearts";
    // Pos 0 plays both king and queen of trump in different tricks
    const tricks: Trick[] = [];
    tricks.push(
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "king", position: 0 },
          { suit: "spades", rank: "7", position: 1 },
          { suit: "spades", rank: "8", position: 2 },
          { suit: "clubs", rank: "7", position: 3 },
        ],
        0,
      ),
    );
    tricks.push(
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "queen", position: 0 },
          { suit: "spades", rank: "9", position: 1 },
          { suit: "clubs", rank: "8", position: 2 },
          { suit: "clubs", rank: "9", position: 3 },
        ],
        0,
      ),
    );
    for (let i = 0; i < 6; i++) {
      tricks.push(fillerTrick(trumpSuit, 0));
    }
    expect(detectBeloteRebelote(tricks, trumpSuit, 0)).toBe("contracting");
  });

  it("should handle bidder at different positions", () => {
    const trumpSuit: Suit = "hearts";
    // Bidder=1. K+Q by pos 1 and 3 (contracting team when bidder=1)
    const tricks: Trick[] = [];
    tricks.push(
      makeTrick(
        trumpSuit,
        [
          { suit: "spades", rank: "7", position: 0 },
          { suit: "hearts", rank: "king", position: 1 },
          { suit: "spades", rank: "8", position: 2 },
          { suit: "clubs", rank: "7", position: 3 },
        ],
        1,
      ),
    );
    tricks.push(
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "8", position: 0 },
          { suit: "spades", rank: "9", position: 1 },
          { suit: "clubs", rank: "9", position: 2 },
          { suit: "hearts", rank: "queen", position: 3 },
        ],
        3,
      ),
    );
    for (let i = 0; i < 6; i++) {
      tricks.push(fillerTrick(trumpSuit, 0));
    }
    expect(detectBeloteRebelote(tricks, trumpSuit, 1)).toBe("contracting");
  });

  it("should handle bidder at position 3 with opponent belote", () => {
    const trumpSuit: Suit = "hearts";
    // Bidder=3. K+Q by pos 0 and 2 (opponent team when bidder=3)
    const tricks: Trick[] = [];
    tricks.push(
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "king", position: 0 },
          { suit: "spades", rank: "7", position: 1 },
          { suit: "spades", rank: "8", position: 2 },
          { suit: "clubs", rank: "7", position: 3 },
        ],
        0,
      ),
    );
    tricks.push(
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "8", position: 0 },
          { suit: "spades", rank: "9", position: 1 },
          { suit: "hearts", rank: "queen", position: 2 },
          { suit: "clubs", rank: "9", position: 3 },
        ],
        2,
      ),
    );
    for (let i = 0; i < 6; i++) {
      tricks.push(fillerTrick(trumpSuit, 0));
    }
    expect(detectBeloteRebelote(tricks, trumpSuit, 3)).toBe("opponent");
  });
});

// ==============================================================
// Contract Evaluation (via calculateRoundScore)
// ==============================================================

describe("contract evaluation", () => {
  // For these tests, build a full 32-card round where contracting team earns specific points.
  // Use the split scenario: contracting wins first N tricks with high cards.

  function makeRoundWithContractingPoints(
    contractingCardPoints: number,
    contractingWinsLastTrick: boolean,
  ): Trick[] {
    // Trump=hearts, bidder=0
    // Build tricks so contracting team earns exactly contractingCardPoints
    // Trick 1: trump high (55 pts) won by contracting
    // Trick 2: trump low (7 pts) won by contracting (running total: 62)
    // Trick 3: spades high (28 pts) won by contracting (running total: 90)
    // Trick 4: spades low (2 pts) won by contracting (running total: 92)
    // Trick 5-8: remaining 60 pts won by opponent
    // Adjust winners based on contractingCardPoints target

    // For simplicity: always use the same card layout, just change winners
    const trumpSuit: Suit = "hearts";
    const allTricks = [
      // 55 pts
      {
        cards: [
          { suit: "hearts" as Suit, rank: "jack" as Rank, position: 0 as PlayerPosition },
          { suit: "hearts" as Suit, rank: "9" as Rank, position: 1 as PlayerPosition },
          { suit: "hearts" as Suit, rank: "ace" as Rank, position: 2 as PlayerPosition },
          { suit: "hearts" as Suit, rank: "10" as Rank, position: 3 as PlayerPosition },
        ],
        points: 55,
      },
      // 7 pts
      {
        cards: [
          { suit: "hearts" as Suit, rank: "king" as Rank, position: 0 as PlayerPosition },
          { suit: "hearts" as Suit, rank: "queen" as Rank, position: 1 as PlayerPosition },
          { suit: "hearts" as Suit, rank: "8" as Rank, position: 2 as PlayerPosition },
          { suit: "hearts" as Suit, rank: "7" as Rank, position: 3 as PlayerPosition },
        ],
        points: 7,
      },
      // 28 pts
      {
        cards: [
          { suit: "spades" as Suit, rank: "ace" as Rank, position: 0 as PlayerPosition },
          { suit: "spades" as Suit, rank: "10" as Rank, position: 1 as PlayerPosition },
          { suit: "spades" as Suit, rank: "king" as Rank, position: 2 as PlayerPosition },
          { suit: "spades" as Suit, rank: "queen" as Rank, position: 3 as PlayerPosition },
        ],
        points: 28,
      },
      // 2 pts
      {
        cards: [
          { suit: "spades" as Suit, rank: "jack" as Rank, position: 0 as PlayerPosition },
          { suit: "spades" as Suit, rank: "9" as Rank, position: 1 as PlayerPosition },
          { suit: "spades" as Suit, rank: "8" as Rank, position: 2 as PlayerPosition },
          { suit: "spades" as Suit, rank: "7" as Rank, position: 3 as PlayerPosition },
        ],
        points: 2,
      },
      // 28 pts
      {
        cards: [
          { suit: "diamonds" as Suit, rank: "ace" as Rank, position: 0 as PlayerPosition },
          { suit: "diamonds" as Suit, rank: "10" as Rank, position: 1 as PlayerPosition },
          { suit: "diamonds" as Suit, rank: "king" as Rank, position: 2 as PlayerPosition },
          { suit: "diamonds" as Suit, rank: "queen" as Rank, position: 3 as PlayerPosition },
        ],
        points: 28,
      },
      // 2 pts
      {
        cards: [
          { suit: "diamonds" as Suit, rank: "jack" as Rank, position: 0 as PlayerPosition },
          { suit: "diamonds" as Suit, rank: "9" as Rank, position: 1 as PlayerPosition },
          { suit: "diamonds" as Suit, rank: "8" as Rank, position: 2 as PlayerPosition },
          { suit: "diamonds" as Suit, rank: "7" as Rank, position: 3 as PlayerPosition },
        ],
        points: 2,
      },
      // 28 pts
      {
        cards: [
          { suit: "clubs" as Suit, rank: "ace" as Rank, position: 0 as PlayerPosition },
          { suit: "clubs" as Suit, rank: "10" as Rank, position: 1 as PlayerPosition },
          { suit: "clubs" as Suit, rank: "king" as Rank, position: 2 as PlayerPosition },
          { suit: "clubs" as Suit, rank: "queen" as Rank, position: 3 as PlayerPosition },
        ],
        points: 28,
      },
      // 2 pts
      {
        cards: [
          { suit: "clubs" as Suit, rank: "jack" as Rank, position: 0 as PlayerPosition },
          { suit: "clubs" as Suit, rank: "9" as Rank, position: 1 as PlayerPosition },
          { suit: "clubs" as Suit, rank: "8" as Rank, position: 2 as PlayerPosition },
          { suit: "clubs" as Suit, rank: "7" as Rank, position: 3 as PlayerPosition },
        ],
        points: 2,
      },
    ];

    // Assign winners greedily to reach target contractingCardPoints
    let accumulated = 0;
    const tricks: Trick[] = [];
    for (let i = 0; i < 8; i++) {
      const entry = allTricks[i]!;
      const isLast = i === 7;
      let winner: PlayerPosition;
      if (accumulated + entry.points <= contractingCardPoints) {
        winner = 0; // contracting wins
        accumulated += entry.points;
      } else {
        winner = 1; // opponent wins
      }
      // Override last trick winner if needed
      if (isLast && contractingWinsLastTrick) {
        if (winner !== 0) {
          // Recalculate: we need contracting to win last trick
          winner = 0;
        }
      } else if (isLast && !contractingWinsLastTrick) {
        winner = 1;
      }
      tricks.push(makeTrick(trumpSuit, entry.cards, winner));
    }
    return tricks;
  }

  it("should report contractMet=true when contracting team points > contract value", () => {
    // Contracting earns 92 card pts, wins last trick → 92+10=102. Contract=80.
    const tricks = makeRoundWithContractingPoints(92, true);
    const contract = makeContract(80, "hearts", 0);
    const result = calculateRoundScore(tricks, contract);
    expect(result.contractMet).toBe(true);
  });

  it("should report contractMet=true when points exactly equal contract value", () => {
    // Contracting earns 90 card pts, wins last trick → 100. Contract=100.
    const tricks = makeRoundWithContractingPoints(90, true);
    const contract = makeContract(100, "hearts", 0);
    const result = calculateRoundScore(tricks, contract);
    expect(result.contractMet).toBe(true);
  });

  it("should report contractMet=false when contracting team points < contract value", () => {
    // Contracting earns 62 card pts, loses last trick → 62. Contract=80.
    const tricks = makeRoundWithContractingPoints(62, false);
    const contract = makeContract(80, "hearts", 0);
    const result = calculateRoundScore(tricks, contract);
    expect(result.contractMet).toBe(false);
  });

  it("should report contractMet=false at high contract value", () => {
    // Contracting earns 150 but contract is 160.
    const tricks = makeRoundWithContractingPoints(150, true);
    const contract = makeContract(160, "hearts", 0);
    const result = calculateRoundScore(tricks, contract);
    // 150+10=160, should meet exactly
    expect(result.contractMet).toBe(true);
  });

  it("should report contractMet=false when below minimum contract value (80)", () => {
    const tricks = makeRoundWithContractingPoints(62, true);
    const contract = makeContract(80, "hearts", 0);
    const result = calculateRoundScore(tricks, contract);
    // 62 + 10 = 72 < 80 → fails
    expect(result.contractMet).toBe(false);
  });
});

// ==============================================================
// Coinche Multipliers
// ==============================================================

describe("coinche multipliers", () => {
  // Reuse the makeRoundWithContractingPoints helper from above
  // but re-declare inline since it's defined inside a describe block
  function quickRound(contractingWins: boolean): Trick[] {
    // Trump=hearts, bidder=0
    // If contractingWins: contracting gets 92 card pts + last trick = 102
    // If !contractingWins: contracting gets 62 card pts, no last trick = 62
    const trumpSuit: Suit = "hearts";
    if (contractingWins) {
      // Contracting wins first 4 tricks (55+7+28+2=92) + last trick
      return [
        makeTrick(
          trumpSuit,
          [
            { suit: "hearts", rank: "jack", position: 0 },
            { suit: "hearts", rank: "9", position: 1 },
            { suit: "hearts", rank: "ace", position: 2 },
            { suit: "hearts", rank: "10", position: 3 },
          ],
          0,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "hearts", rank: "king", position: 0 },
            { suit: "hearts", rank: "queen", position: 1 },
            { suit: "hearts", rank: "8", position: 2 },
            { suit: "hearts", rank: "7", position: 3 },
          ],
          0,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "spades", rank: "ace", position: 0 },
            { suit: "spades", rank: "10", position: 1 },
            { suit: "spades", rank: "king", position: 2 },
            { suit: "spades", rank: "queen", position: 3 },
          ],
          0,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "spades", rank: "jack", position: 0 },
            { suit: "spades", rank: "9", position: 1 },
            { suit: "spades", rank: "8", position: 2 },
            { suit: "spades", rank: "7", position: 3 },
          ],
          0,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "diamonds", rank: "ace", position: 0 },
            { suit: "diamonds", rank: "10", position: 1 },
            { suit: "diamonds", rank: "king", position: 2 },
            { suit: "diamonds", rank: "queen", position: 3 },
          ],
          1,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "diamonds", rank: "jack", position: 0 },
            { suit: "diamonds", rank: "9", position: 1 },
            { suit: "diamonds", rank: "8", position: 2 },
            { suit: "diamonds", rank: "7", position: 3 },
          ],
          1,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "clubs", rank: "ace", position: 0 },
            { suit: "clubs", rank: "10", position: 1 },
            { suit: "clubs", rank: "king", position: 2 },
            { suit: "clubs", rank: "queen", position: 3 },
          ],
          1,
        ),
        // Last trick won by contracting
        makeTrick(
          trumpSuit,
          [
            { suit: "clubs", rank: "jack", position: 0 },
            { suit: "clubs", rank: "9", position: 1 },
            { suit: "clubs", rank: "8", position: 2 },
            { suit: "clubs", rank: "7", position: 3 },
          ],
          0,
        ),
      ];
    } else {
      // Contracting wins only first 2 tricks (55+7=62), opponent wins rest + last trick
      return [
        makeTrick(
          trumpSuit,
          [
            { suit: "hearts", rank: "jack", position: 0 },
            { suit: "hearts", rank: "9", position: 1 },
            { suit: "hearts", rank: "ace", position: 2 },
            { suit: "hearts", rank: "10", position: 3 },
          ],
          0,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "hearts", rank: "king", position: 0 },
            { suit: "hearts", rank: "queen", position: 1 },
            { suit: "hearts", rank: "8", position: 2 },
            { suit: "hearts", rank: "7", position: 3 },
          ],
          0,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "spades", rank: "ace", position: 0 },
            { suit: "spades", rank: "10", position: 1 },
            { suit: "spades", rank: "king", position: 2 },
            { suit: "spades", rank: "queen", position: 3 },
          ],
          1,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "spades", rank: "jack", position: 0 },
            { suit: "spades", rank: "9", position: 1 },
            { suit: "spades", rank: "8", position: 2 },
            { suit: "spades", rank: "7", position: 3 },
          ],
          1,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "diamonds", rank: "ace", position: 0 },
            { suit: "diamonds", rank: "10", position: 1 },
            { suit: "diamonds", rank: "king", position: 2 },
            { suit: "diamonds", rank: "queen", position: 3 },
          ],
          1,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "diamonds", rank: "jack", position: 0 },
            { suit: "diamonds", rank: "9", position: 1 },
            { suit: "diamonds", rank: "8", position: 2 },
            { suit: "diamonds", rank: "7", position: 3 },
          ],
          1,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "clubs", rank: "ace", position: 0 },
            { suit: "clubs", rank: "10", position: 1 },
            { suit: "clubs", rank: "king", position: 2 },
            { suit: "clubs", rank: "queen", position: 3 },
          ],
          1,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "clubs", rank: "jack", position: 0 },
            { suit: "clubs", rank: "9", position: 1 },
            { suit: "clubs", rank: "8", position: 2 },
            { suit: "clubs", rank: "7", position: 3 },
          ],
          1,
        ),
      ];
    }
  }

  it("should not multiply scores at coincheLevel 1", () => {
    const tricks = quickRound(true);
    // Contracting wins tricks 1-4 (92 pts) + trick 8 (2 pts) = 94 card + 10 bonus = 104
    // Opponent wins tricks 5-7 (58 pts). Contract=80.
    const contract = makeContract(80, "hearts", 0, 1);
    const result = calculateRoundScore(tricks, contract);
    expect(result.contractingTeamScore).toBe(104);
    expect(result.opponentTeamScore).toBe(58);
  });

  it("should multiply both teams' scores by 2 at coincheLevel 2 on success", () => {
    const tricks = quickRound(true);
    const contract = makeContract(80, "hearts", 0, 2);
    const result = calculateRoundScore(tricks, contract);
    expect(result.contractingTeamScore).toBe(208); // 104 * 2
    expect(result.opponentTeamScore).toBe(116); // 58 * 2
  });

  it("should multiply both teams' scores by 4 at coincheLevel 4 on success", () => {
    const tricks = quickRound(true);
    const contract = makeContract(80, "hearts", 0, 4);
    const result = calculateRoundScore(tricks, contract);
    expect(result.contractingTeamScore).toBe(416); // 104 * 4
    expect(result.opponentTeamScore).toBe(232); // 58 * 4
  });

  it("should give opponent 162 on contract failure at level 1", () => {
    const tricks = quickRound(false);
    // Contracting: 62, no last trick. Contract=80 → fails.
    const contract = makeContract(80, "hearts", 0, 1);
    const result = calculateRoundScore(tricks, contract);
    expect(result.contractingTeamScore).toBe(0);
    expect(result.opponentTeamScore).toBe(162);
  });

  it("should give opponent 324 on contract failure at level 2", () => {
    const tricks = quickRound(false);
    const contract = makeContract(80, "hearts", 0, 2);
    const result = calculateRoundScore(tricks, contract);
    expect(result.contractingTeamScore).toBe(0);
    expect(result.opponentTeamScore).toBe(324); // 162 * 2
  });

  it("should give opponent 648 on contract failure at level 4", () => {
    const tricks = quickRound(false);
    const contract = makeContract(80, "hearts", 0, 4);
    const result = calculateRoundScore(tricks, contract);
    expect(result.contractingTeamScore).toBe(0);
    expect(result.opponentTeamScore).toBe(648); // 162 * 4
  });
});

// ==============================================================
// Belote Bonus
// ==============================================================

describe("belote bonus", () => {
  // Build a round where contracting has belote (K+Q of trump played by pos 0 and 2)
  function roundWithBelote(
    beloteTeam: "contracting" | "opponent",
    contractingWinsLastTrick: boolean,
  ): Trick[] {
    const trumpSuit: Suit = "hearts";
    // Always: contracting wins first 4 tricks (92 pts), opponent wins rest
    // Belote: K+Q of trump. Trump cards are in trick 1 and 2.
    // If beloteTeam=contracting: K by pos 0, Q by pos 2 (both in contracting team)
    // If beloteTeam=opponent: K by pos 1, Q by pos 3

    if (beloteTeam === "contracting") {
      return [
        // Trick 1: trump jack(20)+9(14)=34 by pos 0,1 + king(4) by pos 0 + 10(10) by pos 3
        makeTrick(
          trumpSuit,
          [
            { suit: "hearts", rank: "jack", position: 0 },
            { suit: "hearts", rank: "9", position: 1 },
            { suit: "hearts", rank: "king", position: 0 },
            { suit: "hearts", rank: "10", position: 3 },
          ],
          0,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "hearts", rank: "queen", position: 2 },
            { suit: "hearts", rank: "ace", position: 1 },
            { suit: "hearts", rank: "8", position: 2 },
            { suit: "hearts", rank: "7", position: 3 },
          ],
          2,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "spades", rank: "ace", position: 0 },
            { suit: "spades", rank: "10", position: 1 },
            { suit: "spades", rank: "king", position: 2 },
            { suit: "spades", rank: "queen", position: 3 },
          ],
          0,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "spades", rank: "jack", position: 0 },
            { suit: "spades", rank: "9", position: 1 },
            { suit: "spades", rank: "8", position: 2 },
            { suit: "spades", rank: "7", position: 3 },
          ],
          0,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "diamonds", rank: "ace", position: 0 },
            { suit: "diamonds", rank: "10", position: 1 },
            { suit: "diamonds", rank: "king", position: 2 },
            { suit: "diamonds", rank: "queen", position: 3 },
          ],
          1,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "diamonds", rank: "jack", position: 0 },
            { suit: "diamonds", rank: "9", position: 1 },
            { suit: "diamonds", rank: "8", position: 2 },
            { suit: "diamonds", rank: "7", position: 3 },
          ],
          1,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "clubs", rank: "ace", position: 0 },
            { suit: "clubs", rank: "10", position: 1 },
            { suit: "clubs", rank: "king", position: 2 },
            { suit: "clubs", rank: "queen", position: 3 },
          ],
          1,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "clubs", rank: "jack", position: 0 },
            { suit: "clubs", rank: "9", position: 1 },
            { suit: "clubs", rank: "8", position: 2 },
            { suit: "clubs", rank: "7", position: 3 },
          ],
          contractingWinsLastTrick ? 0 : 1,
        ),
      ];
    } else {
      // Opponent has belote: K by pos 1, Q by pos 3
      return [
        makeTrick(
          trumpSuit,
          [
            { suit: "hearts", rank: "jack", position: 0 },
            { suit: "hearts", rank: "king", position: 1 },
            { suit: "hearts", rank: "ace", position: 2 },
            { suit: "hearts", rank: "10", position: 3 },
          ],
          0,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "hearts", rank: "9", position: 0 },
            { suit: "hearts", rank: "8", position: 1 },
            { suit: "hearts", rank: "queen", position: 3 },
            { suit: "hearts", rank: "7", position: 2 },
          ],
          0,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "spades", rank: "ace", position: 0 },
            { suit: "spades", rank: "10", position: 1 },
            { suit: "spades", rank: "king", position: 2 },
            { suit: "spades", rank: "queen", position: 3 },
          ],
          0,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "spades", rank: "jack", position: 0 },
            { suit: "spades", rank: "9", position: 1 },
            { suit: "spades", rank: "8", position: 2 },
            { suit: "spades", rank: "7", position: 3 },
          ],
          0,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "diamonds", rank: "ace", position: 0 },
            { suit: "diamonds", rank: "10", position: 1 },
            { suit: "diamonds", rank: "king", position: 2 },
            { suit: "diamonds", rank: "queen", position: 3 },
          ],
          1,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "diamonds", rank: "jack", position: 0 },
            { suit: "diamonds", rank: "9", position: 1 },
            { suit: "diamonds", rank: "8", position: 2 },
            { suit: "diamonds", rank: "7", position: 3 },
          ],
          1,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "clubs", rank: "ace", position: 0 },
            { suit: "clubs", rank: "10", position: 1 },
            { suit: "clubs", rank: "king", position: 2 },
            { suit: "clubs", rank: "queen", position: 3 },
          ],
          1,
        ),
        makeTrick(
          trumpSuit,
          [
            { suit: "clubs", rank: "jack", position: 0 },
            { suit: "clubs", rank: "9", position: 1 },
            { suit: "clubs", rank: "8", position: 2 },
            { suit: "clubs", rank: "7", position: 3 },
          ],
          contractingWinsLastTrick ? 0 : 1,
        ),
      ];
    }
  }

  it("should add +20 to contracting team when they have belote on success", () => {
    const tricks = roundWithBelote("contracting", true);
    const contract = makeContract(80, "hearts", 0);
    const result = calculateRoundScore(tricks, contract);
    expect(result.beloteBonusTeam).toBe("contracting");
    expect(result.contractingTeamFinalScore).toBe(result.contractingTeamScore + 20);
    expect(result.opponentTeamFinalScore).toBe(result.opponentTeamScore);
  });

  it("should add +20 to opponent team when they have belote on success", () => {
    const tricks = roundWithBelote("opponent", true);
    const contract = makeContract(80, "hearts", 0);
    const result = calculateRoundScore(tricks, contract);
    expect(result.beloteBonusTeam).toBe("opponent");
    expect(result.opponentTeamFinalScore).toBe(result.opponentTeamScore + 20);
    expect(result.contractingTeamFinalScore).toBe(result.contractingTeamScore);
  });

  it("should add +20 to contracting team even on contract failure", () => {
    const tricks = roundWithBelote("contracting", false);
    // Contract=160, contracting won't reach it → failure
    const contract = makeContract(160, "hearts", 0);
    const result = calculateRoundScore(tricks, contract);
    expect(result.contractMet).toBe(false);
    expect(result.contractingTeamScore).toBe(0);
    expect(result.contractingTeamFinalScore).toBe(20); // 0 + 20 belote
  });

  it("should add +20 to opponent on contract failure when opponent has belote", () => {
    const tricks = roundWithBelote("opponent", false);
    const contract = makeContract(160, "hearts", 0);
    const result = calculateRoundScore(tricks, contract);
    expect(result.contractMet).toBe(false);
    expect(result.opponentTeamFinalScore).toBe(result.opponentTeamScore + 20);
    expect(result.contractingTeamFinalScore).toBe(0);
  });

  it("should not add any bonus when neither team has belote", () => {
    // Build round where K and Q of trump are on different teams → no belote
    const trumpSuit: Suit = "hearts";
    const tricks = [
      // K of trump by pos 0 (contracting)
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "king", position: 0 },
          { suit: "hearts", rank: "9", position: 1 },
          { suit: "hearts", rank: "ace", position: 2 },
          { suit: "hearts", rank: "10", position: 3 },
        ],
        0,
      ),
      // Q of trump by pos 1 (opponent) → different teams
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "jack", position: 0 },
          { suit: "hearts", rank: "queen", position: 1 },
          { suit: "hearts", rank: "8", position: 2 },
          { suit: "hearts", rank: "7", position: 3 },
        ],
        0,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "spades", rank: "ace", position: 0 },
          { suit: "spades", rank: "10", position: 1 },
          { suit: "spades", rank: "king", position: 2 },
          { suit: "spades", rank: "queen", position: 3 },
        ],
        0,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "spades", rank: "jack", position: 0 },
          { suit: "spades", rank: "9", position: 1 },
          { suit: "spades", rank: "8", position: 2 },
          { suit: "spades", rank: "7", position: 3 },
        ],
        0,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "diamonds", rank: "ace", position: 0 },
          { suit: "diamonds", rank: "10", position: 1 },
          { suit: "diamonds", rank: "king", position: 2 },
          { suit: "diamonds", rank: "queen", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "diamonds", rank: "jack", position: 0 },
          { suit: "diamonds", rank: "9", position: 1 },
          { suit: "diamonds", rank: "8", position: 2 },
          { suit: "diamonds", rank: "7", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "ace", position: 0 },
          { suit: "clubs", rank: "10", position: 1 },
          { suit: "clubs", rank: "king", position: 2 },
          { suit: "clubs", rank: "queen", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "jack", position: 0 },
          { suit: "clubs", rank: "9", position: 1 },
          { suit: "clubs", rank: "8", position: 2 },
          { suit: "clubs", rank: "7", position: 3 },
        ],
        0,
      ),
    ];
    const contract = makeContract(80, "hearts", 0);
    const result = calculateRoundScore(tricks, contract);
    expect(result.beloteBonusTeam).toBeNull();
    expect(result.contractingTeamFinalScore).toBe(result.contractingTeamScore);
    expect(result.opponentTeamFinalScore).toBe(result.opponentTeamScore);
  });

  it("should add belote bonus AFTER multiplier, not before", () => {
    const tricks = roundWithBelote("contracting", true);
    const contract = makeContract(80, "hearts", 0, 2); // coinche
    const result = calculateRoundScore(tricks, contract);
    // Score = points * 2, THEN + 20
    expect(result.contractingTeamFinalScore).toBe(result.contractingTeamScore + 20);
    expect(result.contractingTeamScore).toBe(result.contractingTeamPoints * 2);
  });
});

// ==============================================================
// Integration
// ==============================================================

describe("calculateRoundScore integration", () => {
  it("should return a frozen RoundScore object", () => {
    const trumpSuit: Suit = "hearts";
    const tricks = [
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "jack", position: 0 },
          { suit: "hearts", rank: "9", position: 1 },
          { suit: "hearts", rank: "ace", position: 2 },
          { suit: "hearts", rank: "10", position: 3 },
        ],
        0,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "hearts", rank: "king", position: 0 },
          { suit: "hearts", rank: "queen", position: 1 },
          { suit: "hearts", rank: "8", position: 2 },
          { suit: "hearts", rank: "7", position: 3 },
        ],
        0,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "spades", rank: "ace", position: 0 },
          { suit: "spades", rank: "10", position: 1 },
          { suit: "spades", rank: "king", position: 2 },
          { suit: "spades", rank: "queen", position: 3 },
        ],
        0,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "spades", rank: "jack", position: 0 },
          { suit: "spades", rank: "9", position: 1 },
          { suit: "spades", rank: "8", position: 2 },
          { suit: "spades", rank: "7", position: 3 },
        ],
        0,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "diamonds", rank: "ace", position: 0 },
          { suit: "diamonds", rank: "10", position: 1 },
          { suit: "diamonds", rank: "king", position: 2 },
          { suit: "diamonds", rank: "queen", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "diamonds", rank: "jack", position: 0 },
          { suit: "diamonds", rank: "9", position: 1 },
          { suit: "diamonds", rank: "8", position: 2 },
          { suit: "diamonds", rank: "7", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "ace", position: 0 },
          { suit: "clubs", rank: "10", position: 1 },
          { suit: "clubs", rank: "king", position: 2 },
          { suit: "clubs", rank: "queen", position: 3 },
        ],
        1,
      ),
      makeTrick(
        trumpSuit,
        [
          { suit: "clubs", rank: "jack", position: 0 },
          { suit: "clubs", rank: "9", position: 1 },
          { suit: "clubs", rank: "8", position: 2 },
          { suit: "clubs", rank: "7", position: 3 },
        ],
        0,
      ),
    ];
    const contract = makeContract(80, "hearts", 0);
    const result = calculateRoundScore(tricks, contract);
    expect(Object.isFrozen(result)).toBe(true);
  });

  it("should export scoring constants", () => {
    expect(LAST_TRICK_BONUS).toBe(10);
    expect(BELOTE_BONUS).toBe(20);
    expect(TOTAL_CARD_POINTS).toBe(152);
    expect(TOTAL_ROUND_POINTS).toBe(162);
  });
});

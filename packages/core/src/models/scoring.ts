import type { Suit } from "./card.js";
import { getCardPoints } from "./card.js";
import type { PlayerPosition } from "./player.js";
import { isOnSameTeam } from "./player-helpers.js";
import type { Trick } from "./trick.js";
import type { Contract } from "./bid.js";

// ── Constants ──

export const LAST_TRICK_BONUS = 10;
export const BELOTE_BONUS = 20;
export const TOTAL_CARD_POINTS = 152;
export const TOTAL_ROUND_POINTS = 162;

// ── Types ──

export interface TeamPoints {
  readonly contractingTeamPoints: number;
  readonly opponentTeamPoints: number;
}

export interface RoundScore {
  readonly contractingTeamPoints: number;
  readonly opponentTeamPoints: number;
  readonly contractMet: boolean;
  readonly contractingTeamScore: number;
  readonly opponentTeamScore: number;
  readonly beloteBonusTeam: "contracting" | "opponent" | null;
  readonly contractingTeamFinalScore: number;
  readonly opponentTeamFinalScore: number;
}

// ── calculateTrickPoints ──

export function calculateTrickPoints(trick: Trick, trumpSuit: Suit): number {
  if (trick.state !== "completed") {
    throw new Error(
      `Cannot calculate points: trick state is "${trick.state}", expected "completed"`,
    );
  }

  let total = 0;
  for (const pc of trick.cards) {
    total += getCardPoints(pc.card, trumpSuit);
  }
  return total;
}

// ── calculateTeamPoints ──

export function calculateTeamPoints(
  tricks: readonly Trick[],
  trumpSuit: Suit,
  bidderPosition: PlayerPosition,
): TeamPoints {
  if (tricks.length !== 8) {
    throw new Error(`Expected 8 tricks, got ${String(tricks.length)}`);
  }

  for (const trick of tricks) {
    if (trick.state !== "completed") {
      throw new Error(
        `Cannot calculate team points: trick state is "${trick.state}", expected "completed"`,
      );
    }
  }

  let contractingTeamPoints = 0;
  let opponentTeamPoints = 0;

  for (const trick of tricks) {
    const trickPoints = calculateTrickPoints(trick, trumpSuit);
    if (trick.winnerPosition !== null && isOnSameTeam(trick.winnerPosition, bidderPosition)) {
      contractingTeamPoints += trickPoints;
    } else {
      opponentTeamPoints += trickPoints;
    }
  }

  // Last trick bonus
  const lastTrick = tricks[7];
  if (lastTrick !== undefined && lastTrick.winnerPosition !== null) {
    if (isOnSameTeam(lastTrick.winnerPosition, bidderPosition)) {
      contractingTeamPoints += LAST_TRICK_BONUS;
    } else {
      opponentTeamPoints += LAST_TRICK_BONUS;
    }
  }

  return Object.freeze({ contractingTeamPoints, opponentTeamPoints });
}

// ── detectBeloteRebelote ──

export function detectBeloteRebelote(
  tricks: readonly Trick[],
  trumpSuit: Suit,
  bidderPosition: PlayerPosition,
): "contracting" | "opponent" | null {
  let kingPlayer: PlayerPosition | null = null;
  let queenPlayer: PlayerPosition | null = null;

  for (const trick of tricks) {
    for (const pc of trick.cards) {
      if (pc.card.suit === trumpSuit && pc.card.rank === "king") {
        kingPlayer = pc.playerPosition;
      }
      if (pc.card.suit === trumpSuit && pc.card.rank === "queen") {
        queenPlayer = pc.playerPosition;
      }
    }
  }

  if (kingPlayer === null || queenPlayer === null) {
    return null;
  }

  // Both must be on the same team
  if (!isOnSameTeam(kingPlayer, queenPlayer)) {
    return null;
  }

  // Determine which team
  if (isOnSameTeam(kingPlayer, bidderPosition)) {
    return "contracting";
  }
  return "opponent";
}

// ── calculateRoundScore ──

export function calculateRoundScore(tricks: readonly Trick[], contract: Contract): RoundScore {
  const { contractingTeamPoints, opponentTeamPoints } = calculateTeamPoints(
    tricks,
    contract.suit,
    contract.bidderPosition,
  );

  const contractMet = contractingTeamPoints >= contract.value;

  let contractingTeamScore: number;
  let opponentTeamScore: number;

  if (contractMet) {
    contractingTeamScore = contractingTeamPoints * contract.coincheLevel;
    opponentTeamScore = opponentTeamPoints * contract.coincheLevel;
  } else {
    contractingTeamScore = 0;
    opponentTeamScore = TOTAL_ROUND_POINTS * contract.coincheLevel;
  }

  const beloteBonusTeam = detectBeloteRebelote(tricks, contract.suit, contract.bidderPosition);

  let contractingTeamFinalScore = contractingTeamScore;
  let opponentTeamFinalScore = opponentTeamScore;

  if (beloteBonusTeam === "contracting") {
    contractingTeamFinalScore += BELOTE_BONUS;
  } else if (beloteBonusTeam === "opponent") {
    opponentTeamFinalScore += BELOTE_BONUS;
  }

  return Object.freeze({
    contractingTeamPoints,
    opponentTeamPoints,
    contractMet,
    contractingTeamScore,
    opponentTeamScore,
    beloteBonusTeam,
    contractingTeamFinalScore,
    opponentTeamFinalScore,
  });
}

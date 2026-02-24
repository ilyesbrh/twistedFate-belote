export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Position = "south" | "north" | "west" | "east";

export interface CardData {
  suit: Suit;
  rank: string;
  isSelected?: boolean;
}

export interface PlayerData {
  name: string;
  level: number;
  avatarUrl: string;
  isVip: boolean;
  isDealer: boolean;
  position: Position;
  cardCount: number;
}

export interface TrickCardData extends CardData {
  position: Position;
  rotation: number;
  offsetX: number;
  offsetY: number;
}

export interface MockGameState {
  targetScore: number;
  usScore: number;
  themScore: number;
  usTotalScore: number;
  themTotalScore: number;
  trumpSuit: Suit;
  dealerName: string;
  activePosition: Position;
  players: PlayerData[];
  playerHand: CardData[];
  trickCards: TrickCardData[];
}

export const mockGame: MockGameState = {
  targetScore: 501,
  usScore: 0,
  themScore: 0,
  usTotalScore: 23,
  themTotalScore: 0,
  trumpSuit: "clubs",
  dealerName: "ElenaP",
  activePosition: "south",

  players: [
    {
      name: "ElenaP",
      level: 14,
      avatarUrl: "https://i.pravatar.cc/150?u=elenap-belote",
      isVip: true,
      isDealer: true,
      position: "south",
      cardCount: 6,
    },
    {
      name: "DilyanaBl",
      level: 18,
      avatarUrl: "https://i.pravatar.cc/150?u=dilyanab-belote",
      isVip: false,
      isDealer: false,
      position: "north",
      cardCount: 8,
    },
    {
      name: "Villy",
      level: 17,
      avatarUrl: "https://i.pravatar.cc/150?u=villy-belote",
      isVip: true,
      isDealer: false,
      position: "west",
      cardCount: 8,
    },
    {
      name: "Vane_Bane",
      level: 10,
      avatarUrl: "https://i.pravatar.cc/150?u=vanebane-belote",
      isVip: true,
      isDealer: false,
      position: "east",
      cardCount: 8,
    },
  ],

  playerHand: [
    { suit: "hearts", rank: "7" },
    { suit: "spades", rank: "jack" },
    { suit: "hearts", rank: "queen", isSelected: true },
    { suit: "clubs", rank: "jack" },
    { suit: "clubs", rank: "9" },
    { suit: "clubs", rank: "king" },
    { suit: "diamonds", rank: "king" },
    { suit: "clubs", rank: "queen" },
  ],

  trickCards: [
    { suit: "hearts", rank: "10", position: "north", rotation: 22, offsetX: -55, offsetY: -55 },
    { suit: "hearts", rank: "8", position: "west", rotation: -8, offsetX: -80, offsetY: -10 },
    { suit: "hearts", rank: "7", position: "north", rotation: 35, offsetX: -25, offsetY: -35 },
    { suit: "hearts", rank: "king", position: "east", rotation: -14, offsetX: 90, offsetY: -20 },
  ],
};

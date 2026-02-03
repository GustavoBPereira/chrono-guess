// src/types/game.ts

export interface Occurrence {
  id: number;
  title: string;
  summary: string;
  year: number | null; // year can be null for player_hand cards
}

export interface Match {
  id: number;
  player_hand: Occurrence[];
  timeline: Occurrence[];
  mistakes: Occurrence[];
  remaining_deck: number;
  remaining_life: number;
  status: "ongoing" | "win" | "lose";
}

export interface PlayCardResponse {
  status: "correct" | "incorrect";
  match: Match;
}

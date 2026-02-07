// src/services/game.ts
import { Match, PlayCardResponse } from '../types/game';

const API_BASE_URL = 'https://api.chronoguess.com/api';

export const createMatch = async (): Promise<Match> => {
  const response = await fetch(`${API_BASE_URL}/match/`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getMatch = async (matchId: number): Promise<Match> => {
  const response = await fetch(`${API_BASE_URL}/match/${matchId}/`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const playCard = async (
  matchId: number,
  occurrenceId: number,
  position: number
): Promise<PlayCardResponse> => {
  const response = await fetch(`${API_BASE_URL}/match/${matchId}/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ occurrence_id: occurrenceId, position }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

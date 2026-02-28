import { Match, PlayCardResponse, Occurrence } from '../types/game';
import { DECK } from '../game/Deck';

const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const createMatch = async (lang: 'en' | 'pt-br' = 'en'): Promise<Match> => {
  const allCards = DECK[lang];
  const selectedCards = shuffleArray(allCards).slice(0, 15);

  const occurrences: Occurrence[] = selectedCards.map((card, index) => ({
    id: index,
    title: card.title,
    summary: card.summary,
    year: parseInt(card.year),
  }));

  const player_hand = [occurrences[0]];
  const timeline = [occurrences[1]];
  const deck = occurrences.slice(2);

  return {
    id: Math.floor(Math.random() * 1000000),
    player_hand,
    timeline,
    mistakes: [],
    deck,
    timeline_size_goal: 15,
    remaining_life: 3,
    status: 'ongoing',
  };
};

export const playCard = async (
  match: Match,
  occurrenceId: number,
  position: number
): Promise<PlayCardResponse> => {
  const cardToPlay = match.player_hand.find((c) => c.id === occurrenceId);
  if (!cardToPlay) {
    throw new Error('Card not found in player hand');
  }

  const currentTimeline = [...match.timeline];
  let isCorrect = true;

  const cardYear = cardToPlay.year ?? 0;

  if (position > 0) {
    const beforeCard = currentTimeline[position - 1];
    const beforeYear = beforeCard?.year ?? -Infinity;
    if (cardYear < beforeYear) {
      isCorrect = false;
    }
  }
  if (position < currentTimeline.length) {
    const afterCard = currentTimeline[position];
    const afterYear = afterCard?.year ?? Infinity;
    if (cardYear > afterYear) {
      isCorrect = false;
    }
  }

  const updatedMatch: Match = { ...match };
  
  updatedMatch.player_hand = match.player_hand.filter(c => c.id !== occurrenceId);

  if (isCorrect) {
    const newTimeline = [...match.timeline];
    newTimeline.splice(position, 0, cardToPlay);
    updatedMatch.timeline = newTimeline;
  } else {
    updatedMatch.mistakes = [...match.mistakes, cardToPlay];
    updatedMatch.remaining_life -= 1;
  }

  if (updatedMatch.deck.length > 0) {
    const [nextCard, ...remainingDeck] = updatedMatch.deck;
    updatedMatch.player_hand = [...updatedMatch.player_hand, nextCard];
    updatedMatch.deck = remainingDeck;
  }

  if (updatedMatch.remaining_life <= 0) {
    updatedMatch.status = 'lose';
  } else if (updatedMatch.timeline.length >= updatedMatch.timeline_size_goal) {
    updatedMatch.status = 'win';
  } else if (updatedMatch.player_hand.length === 0) {
    if (updatedMatch.timeline.length >= updatedMatch.timeline_size_goal) {
        updatedMatch.status = 'win';
    } else {
        updatedMatch.status = 'lose';
    }
  }

  return {
    status: isCorrect ? 'correct' : 'incorrect',
    match: updatedMatch,
  };
};

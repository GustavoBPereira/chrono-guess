import { useState, useEffect } from 'react';
import { Heart, Trophy, Calendar } from 'lucide-react';
import { EventCard } from './EventCard';
import { Timeline } from './Timeline';
import { GameOver } from './GameOver';
import { Victory } from './Victory';
import { Match, Occurrence } from '../types/game';
import { createMatch, playCard } from '../services/game';

export default function TimelineGame() {
  const [match, setMatch] = useState<Match | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = async () => {
    setLoading(true);
    try {
      const initialMatch = await createMatch();
      setMatch(initialMatch);
      setIsCorrect(null);
    } catch (error) {
      console.error('Failed to start new game:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlacement = async (position: number) => {
    if (!match || isCorrect !== null || loading) return;

    const currentCard = match.player_hand[0];
    if (!currentCard) return;

    setLoading(true);
    try {
      const response = await playCard(match.id, currentCard.id, position);
      setIsCorrect(response.status === 'correct');
      setMatch(response.match);

      // Delay for visual feedback before clearing isCorrect
      setTimeout(() => {
        setIsCorrect(null);
      }, 1000);

    } catch (error) {
      console.error('Failed to play card:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  if (!match && loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <p className="text-2xl font-semibold text-gray-700">Loading game...</p>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <p className="text-2xl font-semibold text-red-500">Error: Game not loaded.</p>
      </div>
    );
  }

  const currentCard = match.player_hand.length > 0 ? match.player_hand[0] : null;

  if (match.status === 'win') {
    return <Victory onRestart={startNewGame} score={match.timeline.length} occurrences_played={match.timeline.length + match.mistakes.length} />;
  }

  if (match.status === 'lose') {
    return <GameOver onRestart={startNewGame} score={match.timeline.length} />;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-800">Timeline Challenge</h1>
          </div>

          <div className="flex items-center gap-6">
            {/* Lives */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
              <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
              <span className="font-semibold text-gray-700">Lives: {match.remaining_life}</span>
            </div>

            {/* Remaining Cards */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-700">
                Remaining: {match.remaining_deck}
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <p className="text-gray-600 text-center">
            Place the event card in the correct chronological position on the timeline!
          </p>
        </div>

        {/* Current Card */}
        {currentCard && (
          <div className="mb-8">
            <EventCard event={currentCard} isCorrect={isCorrect} />
          </div>
        )}

        {/* Timeline */}
        <Timeline 
          events={match.timeline} 
          onPlacement={handlePlacement} 
          disabled={isCorrect !== null || loading}
        />
      </div>
    </div>
  );
}

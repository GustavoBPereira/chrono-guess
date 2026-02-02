import { useState, useEffect } from 'react';
import { Heart, Trophy, Calendar } from 'lucide-react';
import { EventCard } from './EventCard';
import { Timeline } from './Timeline';
import { GameOver } from './GameOver';
import { Victory } from './Victory';

export interface HistoricalEvent {
  id: number;
  title: string;
  year: number;
  description: string;
}

// Historical events database
const allEvents: HistoricalEvent[] = [
  { id: 1, title: "First Moon Landing", year: 1969, description: "Apollo 11 mission successfully lands on the Moon" },
  { id: 2, title: "Fall of Berlin Wall", year: 1989, description: "The Berlin Wall falls, marking the end of the Cold War era" },
  { id: 3, title: "World Wide Web Invented", year: 1989, description: "Tim Berners-Lee invents the World Wide Web" },
  { id: 4, title: "First iPhone Released", year: 2007, description: "Apple releases the first iPhone, revolutionizing smartphones" },
  { id: 5, title: "End of World War II", year: 1945, description: "World War II ends with Japan's surrender" },
  { id: 6, title: "Titanic Sinks", year: 1912, description: "RMS Titanic sinks on its maiden voyage" },
  { id: 7, title: "Wright Brothers First Flight", year: 1903, description: "First successful powered airplane flight" },
  { id: 8, title: "Discovery of Penicillin", year: 1928, description: "Alexander Fleming discovers penicillin" },
  { id: 9, title: "First Human in Space", year: 1961, description: "Yuri Gagarin becomes the first human in space" },
  { id: 10, title: "Stock Market Crash", year: 1929, description: "Wall Street Crash leads to the Great Depression" },
  { id: 11, title: "First TV Broadcast", year: 1927, description: "First long-distance television broadcast" },
  { id: 12, title: "Facebook Founded", year: 2004, description: "Mark Zuckerberg launches Facebook" },
  { id: 13, title: "Einstein's Theory of Relativity", year: 1915, description: "Einstein publishes General Theory of Relativity" },
  { id: 14, title: "Netflix Founded", year: 1997, description: "Netflix launches as a DVD rental service" },
  { id: 15, title: "Google Founded", year: 1998, description: "Larry Page and Sergey Brin found Google" },
];

export default function TimelineGame() {
  const [lives, setLives] = useState(3);
  const [timeline, setTimeline] = useState<HistoricalEvent[]>([]);
  const [remainingEvents, setRemainingEvents] = useState<HistoricalEvent[]>([]);
  const [currentCard, setCurrentCard] = useState<HistoricalEvent | null>(null);
  const [gameState, setGameState] = useState<'playing' | 'victory' | 'gameover'>('playing');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Shuffle events
    const shuffled = [...allEvents].sort(() => Math.random() - 0.5);
    
    // Take first event for timeline
    const firstEvent = shuffled[0];
    setTimeline([firstEvent]);
    
    // Set remaining events
    const remaining = shuffled.slice(1);
    setRemainingEvents(remaining);
    
    // Set current card
    setCurrentCard(remaining[0]);
    
    // Reset game state
    setLives(3);
    setGameState('playing');
    setIsCorrect(null);
  };

  const handlePlacement = (position: number) => {
    if (!currentCard || isCorrect !== null) return;

    // Create new timeline with card inserted
    const newTimeline = [...timeline];
    newTimeline.splice(position, 0, currentCard);

    // Check if placement is correct
    const isCorrectPlacement = newTimeline.every((event, idx) => {
      if (idx === 0) return true;
      return event.year >= newTimeline[idx - 1].year;
    });

    if (isCorrectPlacement) {
      // Correct placement
      setIsCorrect(true);
      setTimeline(newTimeline);

      setTimeout(() => {
        const newRemaining = remainingEvents.slice(1);
        setRemainingEvents(newRemaining);

        if (newRemaining.length === 0) {
          // Victory!
          setGameState('victory');
        } else {
          setCurrentCard(newRemaining[0]);
          setIsCorrect(null);
        }
      }, 1000);
    } else {
      // Wrong placement
      setIsCorrect(false);
      const newLives = lives - 1;
      setLives(newLives);

      setTimeout(() => {
        if (newLives === 0) {
          setGameState('gameover');
        }
        setIsCorrect(null);
      }, 1000);
    }
  };

  if (gameState === 'victory') {
    return <Victory onRestart={startNewGame} score={timeline.length} />;
  }

  if (gameState === 'gameover') {
    return <GameOver onRestart={startNewGame} score={timeline.length} />;
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
              <span className="font-semibold text-gray-700">Lives: {lives}</span>
            </div>

            {/* Remaining Cards */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span className="font-semibold text-gray-700">
                Remaining: {remainingEvents.length}
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
          events={timeline} 
          onPlacement={handlePlacement} 
          disabled={isCorrect !== null}
        />
      </div>
    </div>
  );
}

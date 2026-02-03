import { motion } from 'motion/react';
import { RotateCcw, Trophy, Sparkles } from 'lucide-react';

interface VictoryProps {
  onRestart: () => void;
  score: number;
  occurrences_played: number;
}

export function Victory({ onRestart, score, occurrences_played}: VictoryProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center relative overflow-hidden"
      >
        {/* Animated background sparkles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                scale: 0,
                x: Math.random() * 400,
                y: Math.random() * 600,
              }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="absolute"
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6 relative z-10"
        >
          <Trophy className="w-24 h-24 text-yellow-500 mx-auto" fill="currentColor" />
        </motion.div>

        <h2 className="text-4xl font-bold text-gray-800 mb-4 relative z-10">
          Congratulations!
        </h2>
        <p className="text-gray-600 mb-6 relative z-10">
          You've successfully placed all events in chronological order!
        </p>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 mb-8 relative z-10">
          {score === occurrences_played ? "Perfect Score" : "Your Score"}
          <p className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            {score}/{occurrences_played}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 relative z-10"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </motion.button>
      </motion.div>
    </div>
  );
}

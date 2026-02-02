import { motion } from 'motion/react';
import { RotateCcw, XCircle } from 'lucide-react';

interface GameOverProps {
  onRestart: () => void;
  score: number;
}

export function GameOver({ onRestart, score }: GameOverProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <XCircle className="w-24 h-24 text-red-500 mx-auto" />
        </motion.div>

        <h2 className="text-4xl font-bold text-gray-800 mb-4">Game Over!</h2>
        <p className="text-gray-600 mb-6">
          You've run out of lives, but you did great!
        </p>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 mb-8">
          <p className="text-gray-600 mb-2">Events Placed</p>
          <p className="text-5xl font-bold text-indigo-600">{score}</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Try Again
        </motion.button>
      </motion.div>
    </div>
  );
}

import { motion } from 'motion/react';
import { Occurrence } from '../types/game';
import { Check, X } from 'lucide-react';

interface EventCardProps {
  event: Occurrence;
  isCorrect: boolean | null;
  revealed?: boolean;
}

export function EventCard({ event, isCorrect, revealed = false }: EventCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotateY: isCorrect === true ? [0, 10, -10, 0] : 0,
        x: isCorrect === false ? [0, -10, 10, -10, 10, 0] : 0,
      }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div
        className={`
          relative bg-white rounded-xl shadow-lg p-4 sm:p-6 border-4 transition-all duration-300
          ${isCorrect === true ? 'border-green-500' : ''}
          ${isCorrect === false ? 'border-red-500' : 'border-indigo-200'}
        `}
      >
        {/* Feedback Icons */}
        {isCorrect === true && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-3 -right-3 bg-green-500 rounded-full p-2"
          >
            <Check className="w-6 h-6 text-white" strokeWidth={3} />
          </motion.div>
        )}
        {isCorrect === false && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-3 -right-3 bg-red-500 rounded-full p-2"
          >
            <X className="w-6 h-6 text-white" strokeWidth={3} />
          </motion.div>
        )}

        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{event.title}</h3>
          <p className="text-gray-600 mb-4">{event.summary}</p>
          {revealed && event.year !== null && (
            <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold">
              {event.year}
            </div>
          )}
          {!revealed || event.year === null && (
            <div className="text-gray-400 italic">Year: ???</div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

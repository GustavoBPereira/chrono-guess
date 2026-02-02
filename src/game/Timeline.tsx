import { motion } from 'motion/react';
import { HistoricalEvent } from './TimelineGame';
import { CalendarDays } from 'lucide-react';

interface TimelineProps {
  events: HistoricalEvent[];
  onPlacement: (position: number) => void;
  disabled: boolean;
}

export function Timeline({ events, onPlacement, disabled }: TimelineProps) {
  return (
    <div className="relative">
      <div className="flex flex-col gap-4">
        {/* Placement zones before, between, and after events */}
        {events.map((event, index) => (
          <div key={event.id}>
            {/* Placement zone before this event */}
            {index === 0 && (
              <PlacementZone 
                position={0} 
                onPlace={onPlacement} 
                disabled={disabled}
                label="Place here (earliest)"
              />
            )}

            {/* Event card */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-lg p-4 text-white"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-5 h-5" />
                  <div>
                    <h4 className="font-semibold">{event.title}</h4>
                    <p className="text-sm opacity-90">{event.description}</p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg font-bold text-lg">
                  {event.year}
                </div>
              </div>
            </motion.div>

            {/* Placement zone after this event */}
            <PlacementZone 
              position={index + 1} 
              onPlace={onPlacement} 
              disabled={disabled}
              label={index === events.length - 1 ? "Place here (latest)" : "Place here"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface PlacementZoneProps {
  position: number;
  onPlace: (position: number) => void;
  disabled: boolean;
  label: string;
}

function PlacementZone({ position, onPlace, disabled, label }: PlacementZoneProps) {
  return (
    <motion.button
      onClick={() => !disabled && onPlace(position)}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        w-full py-3 border border-dashed rounded-md transition-all duration-200
        ${disabled 
          ? 'border-gray-200 bg-gray-50/50 cursor-not-allowed opacity-40' 
          : 'border-indigo-200 bg-indigo-50/30 hover:bg-indigo-50 hover:border-indigo-300 cursor-pointer'
        }
      `}
    >
      <span className={`text-xs font-medium ${disabled ? 'text-gray-400' : 'text-indigo-500'}`}>
        {label}
      </span>
    </motion.button>
  );
}
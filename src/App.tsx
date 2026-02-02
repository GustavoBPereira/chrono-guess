import { useState } from 'react';
import TimelineGame from './game/TimelineGame';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <TimelineGame />
    </div>
  );
}

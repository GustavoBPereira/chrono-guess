import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TimelineGame from './game/TimelineGame';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <DndProvider backend={HTML5Backend}>
        <TimelineGame />
      </DndProvider>
    </div>
  );
}

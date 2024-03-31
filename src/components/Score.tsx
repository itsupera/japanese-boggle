import React from 'react'
import { GameStateContextType, useGameState } from '../utils/GameState';

interface ScoreProps {
  // Props if needed
}

const Score: React.FC<ScoreProps> = () => {
  const { state } = useGameState() as GameStateContextType
  return (
    <div className="Score">
      <h2>Score: {state.history.reduce((acc, entry) => acc + entry.score, 0)}</h2>
    </div>
  );
};

export default Score;
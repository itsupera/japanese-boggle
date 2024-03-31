import React from 'react'
import GameBoard from './GameBoard'
import History from './History'
import Score from './Score'
import Timer from './Timer'
import './App.css'
import { useGameState } from '../utils/GameState'

const App: React.FC = () => {
  const gameState = useGameState()
  if (gameState === null) {
    return <>Loading...</>
  }
  const { history } = gameState.state

  return (
    <div className="App">
      <header>
        <h3 className="game-title">Japanese Boggle-like Game</h3>
      </header>
      <main>
        <div className="top-pane">
          <button className="new-game">New Game</button>
          <Timer />
          <Score />
        </div>
        <div className="center-pane">
          <GameBoard />
          <History history={history}/>
        </div>
      </main>
    </div>
  );
};

export default App;
import React from 'react'
import { useGameState } from '../utils/GameState'
import './App.css'
import GameBoard from './GameBoard'
import GameOver from './GameOver'
import History from './History'
import Score from './Score'
import Timer from './Timer'

const App: React.FC = () => {
  const gameState = useGameState()
  const [gameOver, setGameOver] = React.useState(false)
  const [resetFlag, setResetFlag] = React.useState(false)

  if (gameState === null) {
    return <>Loading...</>
  }

  const { history } = gameState.state

  const handleTimerEnd = () => {
    setGameOver(true)
  }

  const handleNewGame = () => {
    // Change the reset flag value to trigger the timer reset
    setResetFlag(!resetFlag)
    // Wait for the callback from the Timer component to actually reset the game
  }

  const handleResetComplete = () => {
    setGameOver(false)
    gameState.resetGame()
  }

  return (
    <div className="App">
      <header>
        <h3 className="game-title">Japanese Boggle-like Game</h3>
      </header>
      <main>
        <div className="top-pane">
          <button className="new-game" onClick={handleNewGame}>
            New Game
          </button>
          <Timer
            duration={180}
            onTimerEnd={handleTimerEnd}
            resetFlag={resetFlag}
            onResetComplete={handleResetComplete}
          />
          <Score />
        </div>
        <div className="center-pane">
          <div className="play-area">
            {gameOver ? <GameOver />: <GameBoard />}
          </div>
          <History history={history}/>
        </div>
      </main>
    </div>
  );
};

export default App;
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { GameStateProvider } from './utils/GameState';

ReactDOM.render(
  <React.StrictMode>
    <GameStateProvider>
      <App />
    </GameStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
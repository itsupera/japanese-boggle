import React from 'react'
import { HistoryEntry } from '../utils/GameState'
import './History.css'

interface HistoryProps {
  history: HistoryEntry[]
}

/**
 * History of the valid words found by the player.
 */
const History: React.FC<HistoryProps> = ({ history }): JSX.Element => {
  return (
    <div className="history">
      <h2 className="history-title">History</h2>
      <ol className="history-list">
        {history.map((entry, i) => (
          <li key={i}>
            <span className='spelling'>{entry.spelling}</span>
            <span className='score'>{entry.score}</span>
            <ul className='dict-entries'>
              {entry.dictEntries.map((dictEntry, j) => (
                <li key={j} className='dict-entry'>
                  <span className='word'>{dictEntry.word}</span>
                  <span className='meanings'>{dictEntry.meanings.join(', ')}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default History

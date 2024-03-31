import React, { useRef } from 'react'
import { Coords, isAdjacent } from '../utils/Coords'
import Character from './Character'
import { GameStateContextType, useGameState } from '../utils/GameState'

/**
 * The game board consists of a grid of kana characters.
 * The player can click on a first character and drag to a series of adjacent characters to form a word.
 */
const GameBoard: React.FC = () => {
  const { state, submitWord, replaceCharacters } = useGameState() as GameStateContextType
  const [selectedCoords, setSelectedCoords] = React.useState<Coords[]>([])
  const [wordStatus, setWordStatus] = React.useState<'valid' | 'invalid' | null>(null)
  const timeout = useRef<NodeJS.Timeout | null>(null)

  const handleClick = (coords: Coords) => {
    if (selectedCoords.length === 0) {
      setSelectedCoords([coords])
      return
    }
    if (selectedCoords.length > 0) {
      if(submitWord(selectedCoords)) {
        setWordStatus('valid')
        timeout.current = setTimeout(() => {
          replaceCharacters(selectedCoords)
          setSelectedCoords([])
          setWordStatus(null)
        }, 500)
      } else {
        setWordStatus('invalid')
        timeout.current = setTimeout(() => {
          setSelectedCoords([])
          setWordStatus(null)
        }, 500)
      }
    }
  }

  const alreadySelected = (coords: Coords) => {
    return selectedCoords.some(c => c.row === coords.row && c.col === coords.col)
  }

  const handleMouseEnter = (coords: Coords) => {
    if (alreadySelected(coords)) {
      return
    }

    if (selectedCoords.length > 0) {
      const lastCoords = selectedCoords[selectedCoords.length - 1]
      if (!isAdjacent(coords, lastCoords)) {
        return
      }
      setSelectedCoords([...selectedCoords, coords])
    }
  }

  const handleMouseLeave = (coords: Coords) => {
    console.log('Mouse leave', coords)
  }

  const word = selectedCoords.map(c => state.characters[c.row][c.col]).join('')

  return (
    <div className="game-board">
      <span className="word">{word.length > 0 ? word : '-'}</span>
      <table>
        <tbody>
          {Array.from({ length: state.size }).map((_, row) => (
            <tr key={row}>
              {Array.from({ length: state.size }).map((_, col) => (
                <td key={col}>
                  <Character
                    kana={state.characters[row][col]}
                    coords={{ row, col }}
                    isSelected={
                      selectedCoords.some(c => c.row === row && c.col === col)
                    }
                    wordStatus={wordStatus}
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GameBoard


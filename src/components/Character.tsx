import { Coords } from '../utils/Coords'
import { kanaToScore } from '../utils/KanaGenerator'
import './Character.css'
import React from 'react'

export type WordStatus = 'valid' | 'invalid' | null

interface CharacterProps {
  kana: string
  coords: Coords
  isSelected: boolean
  wordStatus: WordStatus
  onClick: (coords: Coords) => void
  onMouseEnter: (coords: Coords) => void
  onMouseLeave: (coords: Coords) => void
}

/**
 * A single kana character on the game board.
 * Monitor when the character is clicked and pass the coordinates to the parent component,
 * and also when the cursor is positioned over the character.
 */
const Character: React.FC<CharacterProps> = ({ kana, coords, isSelected, wordStatus, onClick, onMouseEnter, onMouseLeave }) => {
  const addedClassNames = (
    isSelected
      ? wordStatus !== null ? wordStatus : 'selected'
      : ''
  )
  const score: number = kanaToScore[kana]
  const selectable = wordStatus === null
  return (
    <div
      className={`kana-container ${addedClassNames}`}
      onClick={() => selectable && onClick(coords)}
      onMouseEnter={() => selectable && onMouseEnter(coords)}
      onMouseLeave={() => selectable && onMouseLeave(coords)}
    >
      <span className='kana'>
        {kana}
      </span>
      <span className='score'>
        {score}
      </span>
    </div>
  )
}

export default Character

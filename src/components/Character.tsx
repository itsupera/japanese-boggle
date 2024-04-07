import React from 'react'
import { Coords } from '../utils/Coords'
import './Character.css'

export const kanaToScore: Record<string, number> = {
  'あ': 3,
  'い': 1,
  'う': 1,
  'え': 8,
  'お': 5,
  'か': 1,
  'き': 2,
  'く': 2,
  'け': 3,
  'こ': 2,
  'さ': 4,
  'し': 1,
  'す': 3,
  'せ': 3,
  'そ': 4,
  'た': 1,
  'ち': 4,
  'つ': 2,
  'て': 1,
  'と': 1,
  'な': 2,
  'に': 2,
  'ぬ': 12,
  'ね': 10,
  'の': 1,
  'は': 2,
  'ひ': 5,
  'ふ': 5,
  'へ': 8,
  'ほ': 6,
  'ま': 4,
  'み': 8,
  'む': 10,
  'め': 6,
  'も': 3,
  'や': 6,
  'ゆ': 5,
  'よ': 2,
  'ら': 3,
  'り': 3,
  'る': 3,
  'れ': 2,
  'ろ': 10,
  'わ': 3,
  'ん': 1,
  'が': 1,
  'ぎ': 2,
  'ぐ': 2,
  'げ': 3,
  'ご': 2,
  'ざ': 4,
  'じ': 1,
  'ず': 3,
  'ぜ': 3,
  'ぞ': 4,
  'だ': 1,
  'ぢ': 4,
  'づ': 2,
  'で': 1,
  'ど': 1,
  'ば': 2,
  'び': 5,
  'ぶ': 5,
  'べ': 8,
  'ぼ': 6,
  'ぱ': 2,
  'ぴ': 5,
  'ぷ': 5,
  'ぺ': 8,
  'ぽ': 6,
}


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

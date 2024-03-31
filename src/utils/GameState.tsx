import { createContext, useContext, useState } from "react"
import { generateCharacter, generateKanaBoard } from "./KanaGenerator"
import useWordValidator, { DictEntry } from "./WordValidator"
import { Coords } from "./Coords"
import React from 'react'

export interface HistoryEntry {
  spelling: string
  dictEntries: DictEntry[]
  score: number
}

interface GameState {
  // The size of the game board
  size: number
  // The characters on the game board
  characters: string[][]
  // History of valid words submitted by the player
  history: HistoryEntry[]
}

export interface GameStateContextType {
  state: GameState
  submitWord: (selectedCoords: Coords[]) => boolean
  replaceCharacters: (selectedCoords: Coords[]) => void
}

export const GameStateContext = createContext<GameStateContextType | null>(null)

const initState = (size: number): GameState => ({
  size,
  characters: generateKanaBoard(size),
  history: [
    {
      spelling: 'あい',
      score: 10,
      dictEntries: [
        {
          word: 'あいうえお',
          reading: 'あいうえお',
          boggle_spelling: 'あいうえお',
          meanings: ['The first five hiragana characters', 'Something else']
        },
        {
          word: 'アイウエオ',
          reading: 'アイウエオ',
          boggle_spelling: 'あいうえお',
          meanings: ['The first five katakana characters', 'Something else']
        }
      ]
    },
    {
      spelling: 'いあ',
      score: 5,
      dictEntries: [
        {
          word: 'かきくけこ',
          reading: 'かきくけこ',
          boggle_spelling: 'かきくけこ',
          meanings: ['The next five hiragana characters']
        }
      ]
    }
  ]
})

export const GameStateProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, setState] = useState<GameState>(initState(5))
  const validator = useWordValidator()

  const submitWord = (selectedCoords: Coords[]): boolean => {
    const word = selectedCoords.map(({ row, col }) => state.characters[row][col]).join('')
    console.log('Selected word:', word)
    const dictEntries = validator.validate(word)
    const isValid = dictEntries.length > 0
    console.log('Is valid:', isValid)
    if (isValid) {
      const score = word.length
      setState(prevState => ({
        ...prevState,
        history: [...prevState.history, { spelling: word, score, dictEntries }]
      }))
    }
    return isValid
  }

  const replaceCharacters = (selectedCoords: Coords[]) => {
    const newCharacters = state.characters.map(row => [...row])
    selectedCoords.forEach(({ row, col }) => {
      newCharacters[row][col] = generateCharacter()
    })
    setState(prevState => ({ ...prevState, characters: newCharacters }))
  }

  return (
    <GameStateContext.Provider value={{ state, submitWord, replaceCharacters }}>
      {children}
    </GameStateContext.Provider>
  )
}

export const useGameState = (): GameStateContextType | null => (
  useContext(GameStateContext)
)

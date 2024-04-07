import { useMemo } from 'react'

export interface DictEntry {
  word: string
  reading: string
  boggle_spelling: string
  meanings: string[]
}

/**
 * Create a mapping from each unique boggle spelling to all dictionary entries
 * that match it, for quick lookup.
 */
const createMapping = (): Map<string, DictEntry[]> => {
  const data = require('../data/dictionary.json')

  const spellingToDictEntries = new Map<string, DictEntry[]>();
  // const data: DictEntry[] = [
  //   {
  //     word: 'あいうえお',
  //     reading: 'あいうえお',
  //     boggle_spelling: 'あい',
  //     meanings: ['The first five hiragana characters', 'Something else']
  //   },
  //   {
  //     word: 'アイウエオ',
  //     reading: 'アイウエオ',
  //     boggle_spelling: 'いあ',
  //     meanings: ['The first five katakana characters', 'Something else']
  //   }
  // ];
  (data as DictEntry[]).forEach(entry => {
    if (!spellingToDictEntries.has(entry.boggle_spelling)) {
      spellingToDictEntries.set(entry.boggle_spelling, [])
    }
    spellingToDictEntries.get(entry.boggle_spelling)?.push(entry)
  })
  return spellingToDictEntries
}

const useDictionary = () => {
  const spellingToDictEntries = useMemo(() => createMapping(), [])

  return { spellingToDictEntries }
}

export default useDictionary
import data from '../data/dictionary.json'

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

const useWordValidator = () => {
  const spellingToDictEntries = createMapping()

  const validate = (word: string): DictEntry[] => {
    // If the word is too short, it is never valid
    if (word.length < 2) {
      return []
    }
    const match = spellingToDictEntries.get(word)
    return match ? match : []
  }

  return { validate }
}

export default useWordValidator
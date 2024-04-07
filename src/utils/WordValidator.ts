import useDictionary, { DictEntry } from "./Dictionary"

const useWordValidator = () => {
  const { spellingToDictEntries } = useDictionary()

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
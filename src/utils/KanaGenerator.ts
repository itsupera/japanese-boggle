// export const kana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ";
// export const kana = "あい";

import { useMemo } from "react"
import useDictionary, { DictEntry } from "./Dictionary"

/**
 * Compute the probability of each kana character based on the frequency
 * with which they appear in the dictionary.
 */
const computeKanaProbabilities = (spellingToDictEntries: Map<string, DictEntry[]>): Map<string, number> => {
  // Compute frequency of each kana character
  // based on how frequently they appear in the dictionary
  const kanaToOccurrences = new Map<string, number>()
  const spellingsIterator = spellingToDictEntries.keys()
  for (let spelling of spellingsIterator) {
    for (let i = 0; i < spelling.length; i++) {
      const kana = spelling[i]
      if (!kanaToOccurrences.has(kana)) {
        kanaToOccurrences.set(kana, 0)
      }
      kanaToOccurrences.set(kana, kanaToOccurrences.get(kana)! + 1)
    }
  }
  // Normalize the occurrences to get a probability distribution
  const total = Array.from(kanaToOccurrences.values()).reduce((acc, val) => acc + val, 0)
  const kanaToProbability = new Map<string, number>()
  kanaToOccurrences.forEach((occurrences, kana) => {
    kanaToProbability.set(kana, occurrences / total)
  })
  return kanaToProbability
}

interface KanaAndCumProb {
  kana: string
  cumProb: number
}

/**
 * Compute the cumulative probabilities of each kana character,
 * which is used to generate random kana characters.
 */
const computeCumulativeProbabilities = (kanaToProbability: Map<string, number>): Array<KanaAndCumProb> => {
  const kanaAndCumProbs = new Array<KanaAndCumProb>()
  let cumProb = 0
  kanaToProbability.forEach((prob, kana) => {
    cumProb += prob
    kanaAndCumProbs.push({ kana, cumProb })
  })
  return kanaAndCumProbs
}

const useKanaGenerator = () => {
  const { spellingToDictEntries } = useDictionary()
  const kanaToProbability = useMemo(() => computeKanaProbabilities(spellingToDictEntries), [spellingToDictEntries])
  const cumulativeProbabilities = computeCumulativeProbabilities(kanaToProbability)
  const generateKana = (): string => {
    const random = Math.random()
    for (let i = 0; i < cumulativeProbabilities.length; i++) {
      if (random < cumulativeProbabilities[i].cumProb) {
        return cumulativeProbabilities[i].kana
      }
    }
    return cumulativeProbabilities[cumulativeProbabilities.length - 1].kana
  }

  const generateKanaBoard = (size: number = 4): string[][] => {
    let board: string[][] = [];
    for (let i = 0; i < size; i++) {
      let row: string[] = [];
      for (let j = 0; j < size; j++) {
        row.push(generateKana());
      }
      board.push(row);
    }
    return board;
  }

  return { generateKana, generateKanaBoard }
}

export default useKanaGenerator

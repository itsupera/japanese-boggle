// export const kana = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽ";
// export const kana = "あい";

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

const kana = Object.keys(kanaToScore)

// Check that all kanaToScore entries are in kana, and vice versa
if (Object.keys(kanaToScore).length !== kana.length) {
  throw new Error('kana and kanaToScore have different lengths')
}

export const generateCharacter = (): string => {
  // TODO: Implement the logic to generate a size x size board of random kana characters
  const randomIndex = Math.floor(Math.random() * kana.length);
  return kana[randomIndex];
}

export const generateKanaBoard = (size: number = 4): string[][] => {
  let board: string[][] = [];
  for (let i = 0; i < size; i++) {
    let row: string[] = [];
    for (let j = 0; j < size; j++) {
      row.push(generateCharacter());
    }
    board.push(row);
  }
  return board;
};
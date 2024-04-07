"""
Script to generate the dictionary.json file from the JMdict dictionary.
Must have Python and the jaconv library installed (`pip install jaconv`).
"""
import argparse
from collections import Counter
import os
import json
from pathlib import Path

import jaconv


def word_to_boggle_spelling(word: str) -> str | None:
    """
    Convert a word to a spelling that can be used in Boggle.
    Return None if the word is not a valid word for Boggle.
    """
    spelling = jaconv.kata2hira(jaconv.normalize(word, "NFKC"))
    
    # Transform lower case hiragana (e.g., ぃ) to upper case (e.g., い)
    replace_map = {
        "ぁ": "あ",
        "ぃ": "い",
        "ぅ": "う",
        "ぇ": "え",
        "ぉ": "お",
        "ゃ": "や",
        "ゅ": "ゆ",
        "ょ": "よ",
        "っ": "つ",
        "ゎ": "わ",
        "ゕ": "か",
        "ゖ": "け",
    }
    spelling = "".join([replace_map.get(c, c) for c in spelling])

    # Ignore words with unsupported characters
    unsupported_chars = set("ゐゑゔゝゞ・、")
    if any(c in unsupported_chars for c in spelling):
        return None

    # Converts ー into a double vowel
    spelling = replace_dashes_by_vowels(spelling)
    if spelling is None:
        return None

    return spelling

def replace_dashes_by_vowels(spelling: str) -> str | None:
    if "ー" not in spelling:
        return spelling
    
    kana_to_vowel = {
        "あ": "あ",
        "い": "い",
        "う": "う",
        "え": "え",
        "お": "お",
        "か": "あ",
        "き": "い",
        "く": "う",
        "け": "え",
        "こ": "お",
        "さ": "あ",
        "し": "い",
        "す": "う",
        "せ": "え",
        "そ": "お",
        "た": "あ",
        "ち": "い",
        "つ": "う",
        "て": "え",
        "と": "お",
        "な": "あ",
        "に": "い",
        "ぬ": "う",
        "ね": "え",
        "の": "お",
        "は": "あ",
        "ひ": "い",
        "ふ": "う",
        "へ": "え",
        "ほ": "お",
        "ま": "あ",
        "み": "い",
        "む": "う",
        "め": "え",
        "も": "お",
        "や": "あ",
        "ゆ": "う",
        "よ": "お",
        "ら": "あ",
        "り": "い",
        "る": "う",
        "れ": "え",
        "ろ": "お",
        "わ": "あ",
        "を": "お",
        "ん": "ん",
        "が": "あ",
        "ぎ": "い",
        "ぐ": "う",
        "げ": "え",
        "ご": "お",
        "ざ": "あ",
        "じ": "い",
        "ず": "う",
        "ぜ": "え",
        "ぞ": "お",
        "だ": "あ",
        "ぢ": "い",
        "づ": "う",
        "で": "え",
        "ど": "お",
        "ば": "あ",
        "び": "い",
        "ぶ": "う",
        "べ": "え",
        "ぼ": "お",
        "ぱ": "あ",
        "ぴ": "い",
        "ぷ": "う",
        "ぺ": "え",
        "ぽ": "お",
    }
    new_spelling = ""
    for i, c in enumerate(spelling):
        if c == "ー":
            if i == 0:
                # Can't do anything with a word that starts with a dash
                return None
            previous_kana = new_spelling[i-1]
            previous_kana_vowel = kana_to_vowel.get(previous_kana)
            if previous_kana_vowel is None:
                raise ValueError(f"Unexpected previous kana: {previous_kana}")
            new_spelling += previous_kana_vowel
        else:
            new_spelling += c

    return new_spelling


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "jmdict_path",
        help="Path to the extracted JMdict dictionary."
    )
    parser.add_argument("--output", default="./src/data/dictionary.json")
    args = parser.parse_args()

    words = []

    basepath = Path(args.jmdict_path)
    filenames = os.listdir(basepath)
    kana_counter = Counter()
    for filename in filenames:
        if not filename.startswith("term_bank"):
            continue
        print(filename)
        with (basepath / filename).open() as f:
            entries = json.loads(f.read())
        for entry in entries:
            boggle_spelling = word_to_boggle_spelling(entry[1] or entry[0])
            if boggle_spelling is None:
                print("Skipping word:", entry[0])
                continue

            words.append({
                "word": entry[0],
                "reading": entry[1],
                "boggle_spelling": boggle_spelling,
                "meanings": entry[5],
            })

            for c in boggle_spelling:
                kana_counter[c] += 1

    print("Kana counts:")
    for kana, count in kana_counter.most_common():
        print(f"{kana}: {count}")

    with Path(args.output).open("w", encoding="utf-8") as f:
        f.write(json.dumps(words))


if __name__ == "__main__":
    main()
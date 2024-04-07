# Japanese Boggle-like game

The goal is to find as many Japanese words as possible in a grid of kana characters.
Click on a kana to start a word, then hover over a sequence of neighboring kana to add them to the word,
and click again to confirm the word.

## Local setup

```bash
npm install
npm run start
```

## Deployment with Docker

```bash
docker build -t japanese-boggle .
docker run -p 8080:80 japanese-boggle
# open http://localhost:8080 in your browser
```

## TODOs

- remove abbreviations from the dictionary
- dockerize
- sort definitions from most to least common
- show player's high score (with a cookie)
- leaderboard
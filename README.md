# Dictionary Wallpaper Generator

A minimal browser-only React app that generates word/definition wallpapers.

## Features

- **Four input modes:**
  1. Enter a word → fetch definition
  2. Enter a meaning → find suitable words
  3. Pick a category → get a word from that category
  4. Random word across categories

- **Live preview** and downloadable PNG wallpapers
- **Minimal, modern design** with dark theme

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- html-to-image (for PNG export)
- Free Dictionary API (Wiktionary-based)
- Datamuse API (for word search)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Run tests:
```bash
npm test
```

## Attribution

Definitions from Wiktionary via Free Dictionary API. Word search powered by Datamuse.


# Lexiloom

Turn meaningful words into minimal wallpapers.

A minimal browser-only React app that generates word/definition wallpapers with a clean, modern design system supporting both light and dark themes.

## Features

- **Four input modes:**
  1. Enter a word → fetch definition
  2. Enter a meaning → find suitable words
  3. Pick a category → get a word from that category
  4. Random word across categories

- **Live preview** and downloadable PNG wallpapers
- **Minimal, modern design** with light/dark theme support
- **Pill-style UI** with soft, aesthetic color palette
- **Customizable wallpapers** with alignment, sizing, and background controls

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- html-to-image (for PNG export)
- Free Dictionary API (Wiktionary-based)
- Datamuse API (for word search)
- Google Fonts (Plus Jakarta Sans, DM Serif Display)

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

## Design System

- **Typography:** Plus Jakarta Sans for UI, DM Serif Display for wallpaper words
- **Themes:** Light mode (default) and dark mode with smooth transitions
- **Colors:** Soft, minimal palette with semantic color tokens
- **Components:** Pill-shaped buttons and tabs for a modern, clean aesthetic

## Attribution

Definitions from Wiktionary via Free Dictionary API. Word search powered by Datamuse.

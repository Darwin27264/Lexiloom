import * as wanakana from 'wanakana';
import { JAPANESE_WORDS, type JapaneseDictEntry } from '../data/japaneseWords';
import type { WordEntry } from '../types';

export function findJapaneseEntry(rawInput: string): WordEntry | null {
  const input = rawInput.trim();

  // Normalize to romaji for matching
  const normalizedRomaji = wanakana.toRomaji(input).toLowerCase();

  // Try direct key match by romaji
  let dictEntry: JapaneseDictEntry | undefined = JAPANESE_WORDS[normalizedRomaji];

  // If not found by key, try matching against kanji or kana values
  if (!dictEntry) {
    dictEntry = Object.values(JAPANESE_WORDS).find((entry) => {
      return entry.kanji === input || entry.kana === input;
    });
  }

  if (!dictEntry) {
    return null;
  }

  return {
    word: dictEntry.romaji,
    language: 'ja',
    characters: dictEntry.kanji ?? dictEntry.kana,
    readingNative: dictEntry.kana,
    reading: dictEntry.romaji,
    partOfSpeech: dictEntry.partOfSpeech,
    definition: dictEntry.definition,
  };
}


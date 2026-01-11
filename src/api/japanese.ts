import * as wanakana from 'wanakana';
import { JAPANESE_WORDS, type JapaneseDictEntry } from '../data/japaneseWords';
import type { WordEntry } from '../types';

export function findJapaneseEntry(rawInput: string): WordEntry | null {
  const input = rawInput.trim();

  // First, try direct key match (case-insensitive) for words already in romaji
  const lowerInput = input.toLowerCase();
  let dictEntry: JapaneseDictEntry | undefined = JAPANESE_WORDS[lowerInput];

  // If not found, try matching against kanji or kana values
  if (!dictEntry) {
    dictEntry = Object.values(JAPANESE_WORDS).find((entry) => {
      return entry.kanji === input || entry.kana === input || entry.romaji.toLowerCase() === lowerInput;
    });
  }

  // If still not found and input contains kana, try converting kana to romaji
  if (!dictEntry) {
    const hasKana = /[\u3040-\u309F\u30A0-\u30FF]/.test(input);
    if (hasKana) {
      try {
        const normalizedRomaji = wanakana.toRomaji(input).toLowerCase();
        dictEntry = JAPANESE_WORDS[normalizedRomaji];
      } catch (e) {
        // wanakana conversion failed, continue
      }
    }
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


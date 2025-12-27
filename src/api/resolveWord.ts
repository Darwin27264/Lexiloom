import type { LanguageCode, WordEntry } from '../types';
import { fetchWordEntry } from '../hooks/useDictionary';
import { findJapaneseEntry } from './japanese';
import { findChineseEntry } from './chinese';
import * as wanakana from 'wanakana';

/**
 * Central entry point for turning any user input (plus language) into a WordEntry object.
 * Delegates to the right logic for English, Japanese, or Chinese.
 */
export async function resolveWordEntry(
  input: string,
  language: LanguageCode
): Promise<WordEntry> {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      word: '',
      language,
      definition: '',
    };
  }

  try {
    if (language === 'ja') {
      const jpEntry = findJapaneseEntry(trimmed);
      if (jpEntry) return jpEntry;
      
      // Fallback for Japanese: handle kana or kanji input
      // Check if input contains kana
      const hasKana = /[\u3040-\u309F\u30A0-\u30FF]/.test(trimmed);
      // Check if input contains kanji
      const hasKanji = /[\u4E00-\u9FAF]/.test(trimmed);
      
      if (hasKana) {
        // Input is kana: set readingNative from input and reading via wanakana
        return {
          word: wanakana.toRomaji(trimmed),
          language: 'ja',
          characters: trimmed,
          readingNative: trimmed,
          reading: wanakana.toRomaji(trimmed),
          definition: '',
        };
      } else if (hasKanji) {
        // Input is kanji only: set characters, leave readingNative/reading empty
        return {
          word: trimmed,
          language: 'ja',
          characters: trimmed,
          definition: '',
        };
      }
      // If neither kana nor kanji, fall through to generic fallback
    }

    if (language === 'zh') {
      // Chinese is handled entirely locally (no async needed),
      // but we keep the function async for a unified interface.
      return findChineseEntry(trimmed);
    }

    if (language === 'en') {
      // Use dictionaryapi.dev for English
      const entry = await fetchWordEntry(trimmed);
      if (entry) return entry;
    }
  } catch (e) {
    // log or handle error; we'll still return a fallback below
    console.error('resolveWordEntry error', e);
  }

  // Fallback: minimal entry; UI will allow manual definition
  return {
    word: trimmed,
    language,
    definition: '',
  };
}


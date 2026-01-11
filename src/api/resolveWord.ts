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
    // First, always try local dictionaries (Japanese and Chinese) regardless of detected language
    // This handles cases where romaji Japanese words are detected as English
    const jpEntry = findJapaneseEntry(trimmed);
    if (jpEntry && jpEntry.definition) {
      return jpEntry;
    }

    const chineseEntry = findChineseEntry(trimmed);
    if (chineseEntry && chineseEntry.definition) {
      return chineseEntry;
    }

    // Then proceed with language-specific resolution
    if (language === 'ja') {
      // If we already tried Japanese above and it didn't work, handle fallbacks
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
      // If neither kana nor kanji, fall through to English API
    }

    if (language === 'zh') {
      // Chinese was already tried above, so if we get here it means no definition found
      // Return the entry anyway (it might have pinyin but no definition)
      return chineseEntry;
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


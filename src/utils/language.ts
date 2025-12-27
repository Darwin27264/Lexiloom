import type { LanguageCode } from '../types';

/**
 * Simple language detection based on Unicode ranges.
 * This is intentionally simple and "good enough" for our use case.
 */
export function detectLanguage(input: string): LanguageCode {
  const text = input.trim();

  if (!text) return 'en';

  // Hiragana: 3040–309F, Katakana: 30A0–30FF
  const hasKana = /[\u3040-\u30ff]/.test(text);
  // CJK Unified Ideographs: 4E00–9FFF (covers Chinese & Japanese Kanji)
  const hasCJK = /[\u4e00-\u9fff]/.test(text);

  if (hasKana) return 'ja';
  if (hasCJK) return 'zh'; // default CJK to 'zh' when no kana

  return 'en';
}


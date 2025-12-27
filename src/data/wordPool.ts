import { JAPANESE_WORDS } from './japaneseWords';
import { CHINESE_WORDS } from './chineseWords';
import type { CategoryId } from './categories';

/**
 * Unified word pool that combines words from all languages.
 * Maps words to categories based on their themes.
 */

// Japanese words categorized by theme
export const JAPANESE_BY_CATEGORY: Record<CategoryId, string[]> = {
  aesthetics: ['wabi-sabi', 'ikigai', 'mono no aware', 'kintsugi', 'yugen'],
  emotions: ['mono no aware'],
  nature: ['komorebi', 'shinrin-yoku'],
  philosophy: ['ikigai', 'yugen'],
  productivity: ['tsundoku'],
};

// Chinese words categorized by theme
export const CHINESE_BY_CATEGORY: Record<CategoryId, string[]> = {
  aesthetics: ['和', '静'],
  emotions: ['心'],
  nature: ['气'],
  philosophy: ['無常', '道', '禅', '空'],
  productivity: [],
};

/**
 * Get all Japanese words (romaji keys)
 */
export function getAllJapaneseWords(): string[] {
  return Object.keys(JAPANESE_WORDS);
}

/**
 * Get all Chinese words (hanzi keys)
 */
export function getAllChineseWords(): string[] {
  return Object.keys(CHINESE_WORDS);
}


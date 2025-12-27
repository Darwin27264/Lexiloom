// Import language-specific word pools
import {
  JAPANESE_BY_CATEGORY,
  CHINESE_BY_CATEGORY,
  getAllJapaneseWords,
  getAllChineseWords,
} from './wordPool';

export type CategoryId =
  | 'aesthetics'
  | 'emotions'
  | 'nature'
  | 'philosophy'
  | 'productivity';

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  aesthetics: 'Aesthetics & Japanese concepts',
  emotions: 'Emotions & feelings',
  nature: 'Nature & seasons',
  philosophy: 'Philosophy & meaning',
  productivity: 'Focus & habits',
};

export const CATEGORY_WORDS: Record<CategoryId, string[]> = {
  aesthetics: ['wabi-sabi', 'ikigai', 'mono no aware', 'hiraeth', 'sonder'],
  emotions: ['melancholy', 'euphoria', 'serenity', 'awe', 'equanimity'],
  nature: ['solstice', 'equinox', 'zenith', 'horizon', 'canopy'],
  philosophy: ['stoicism', 'absurdism', 'ethos', 'telos', 'existence'],
  productivity: ['focus', 'momentum', 'consistency', 'discipline', 'flow'],
};

export const ALL_CATEGORY_WORDS: string[] = Array.from(
  new Set(Object.values(CATEGORY_WORDS).flat())
);

// Combined word pool including all languages
export const ALL_WORDS_ALL_LANGUAGES: string[] = Array.from(
  new Set([
    ...ALL_CATEGORY_WORDS,
    ...getAllJapaneseWords(),
    ...getAllChineseWords(),
  ])
);

/**
 * Get a random word from a specific category.
 */
export function getRandomWordFromCategory(categoryId: CategoryId): string | null {
  const words = CATEGORY_WORDS[categoryId];
  if (!words || words.length === 0) return null;
  return words[Math.floor(Math.random() * words.length)];
}

/**
 * Get a random word from all categories (English only, for backward compatibility).
 */
export function getRandomWordFromAll(): string | null {
  if (ALL_CATEGORY_WORDS.length === 0) return null;
  return ALL_CATEGORY_WORDS[Math.floor(Math.random() * ALL_CATEGORY_WORDS.length)];
}

/**
 * Get a random word from all categories and languages.
 */
export function getRandomWordFromAllLanguages(): string | null {
  if (ALL_WORDS_ALL_LANGUAGES.length === 0) return null;
  return ALL_WORDS_ALL_LANGUAGES[Math.floor(Math.random() * ALL_WORDS_ALL_LANGUAGES.length)];
}

/**
 * Get all words from a specific category (English only, for backward compatibility).
 */
export function getWordsFromCategory(categoryId: CategoryId): string[] {
  return CATEGORY_WORDS[categoryId] || [];
}

/**
 * Get all words from a specific category, including Japanese and Chinese words.
 */
export function getWordsFromCategoryWithLanguages(categoryId: CategoryId): string[] {
  const englishWords = CATEGORY_WORDS[categoryId] || [];
  const japaneseWords = JAPANESE_BY_CATEGORY[categoryId] || [];
  const chineseWords = CHINESE_BY_CATEGORY[categoryId] || [];
  
  return [...englishWords, ...japaneseWords, ...chineseWords];
}


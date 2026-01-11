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

// State for managing shuffled word pool to avoid repetition (for random mode)
let shuffledPool: string[] = [];
let currentIndex = 0;
const recentlyUsed: string[] = [];
const MIN_RECENTLY_USED = 5; // Minimum number of recent words to avoid (always avoid last 5)
const MAX_RECENTLY_USED = 10; // Maximum number of recent words to track

// State for managing shuffled word pools per category to avoid repetition
const categoryPools: Record<CategoryId, string[]> = {};
const categoryIndices: Record<CategoryId, number> = {};
const categoryRecentlyUsed: Record<CategoryId, string[]> = {};
const CATEGORY_MIN_RECENTLY_USED = 3; // Minimum number of recent words to avoid per category
const CATEGORY_MAX_RECENTLY_USED = 5; // Maximum number of recent words to track per category

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Initialize or reset the shuffled pool
 */
function initializeShuffledPool(): void {
  shuffledPool = shuffleArray(ALL_WORDS_ALL_LANGUAGES);
  currentIndex = 0;
}

/**
 * Initialize or reset the shuffled pool for a specific category
 */
function initializeCategoryPool(categoryId: CategoryId): void {
  const words = getWordsFromCategoryWithLanguages(categoryId);
  categoryPools[categoryId] = shuffleArray(words);
  categoryIndices[categoryId] = 0;
}

/**
 * Get a random word from a specific category.
 * Uses a shuffled pool approach to ensure all words are shown before repeating,
 * and avoids recently used words to prevent immediate repetition.
 * Guarantees: Never repeats the previous word, and avoids at least the last 3 words.
 */
export function getRandomWordFromCategory(categoryId: CategoryId): string | null {
  const words = getWordsFromCategoryWithLanguages(categoryId);
  if (!words || words.length === 0) return null;
  
  // Initialize pool for this category if it doesn't exist or is exhausted
  if (!categoryPools[categoryId] || categoryPools[categoryId].length === 0 || 
      categoryIndices[categoryId] >= categoryPools[categoryId].length) {
    initializeCategoryPool(categoryId);
  }
  
  const pool = categoryPools[categoryId];
  const recentlyUsedForCategory = categoryRecentlyUsed[categoryId] || [];
  
  // Get the last N words to avoid (at least CATEGORY_MIN_RECENTLY_USED, up to what we have)
  const wordsToAvoid = recentlyUsedForCategory.slice(-Math.min(CATEGORY_MIN_RECENTLY_USED, recentlyUsedForCategory.length));
  
  // Get available words (excluding the words we want to avoid)
  const availableWords = pool.filter(
    word => !wordsToAvoid.includes(word)
  );
  
  let selectedWord: string;
  
  // If we have available words that aren't in the avoid list, pick from those
  if (availableWords.length > 0) {
    // Try to pick from current position in shuffled pool, skipping avoided words
    let found = false;
    let attempts = 0;
    const maxAttempts = Math.min(pool.length, 20);
    
    while (!found && attempts < maxAttempts) {
      const candidate = pool[categoryIndices[categoryId]];
      categoryIndices[categoryId] = (categoryIndices[categoryId] + 1) % pool.length;
      attempts++;
      
      // Make sure candidate is not in our avoid list (especially not the previous word)
      if (!wordsToAvoid.includes(candidate)) {
        selectedWord = candidate;
        found = true;
      }
    }
    
    // If we couldn't find one by cycling, pick randomly from available
    if (!found) {
      const randomIndex = Math.floor(Math.random() * availableWords.length);
      selectedWord = availableWords[randomIndex];
      // Update index to point after this word in the pool (if found)
      const poolIndex = pool.indexOf(selectedWord);
      if (poolIndex !== -1) {
        categoryIndices[categoryId] = (poolIndex + 1) % pool.length;
      }
    }
  } else {
    // Edge case: All words are in the avoid list
    // In this case, we'll still avoid at least the previous word
    const previousWord = recentlyUsedForCategory.length > 0 
      ? recentlyUsedForCategory[recentlyUsedForCategory.length - 1] 
      : null;
    const fallbackWords = previousWord 
      ? pool.filter(word => word !== previousWord)
      : pool;
    
    if (fallbackWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * fallbackWords.length);
      selectedWord = fallbackWords[randomIndex];
      const poolIndex = pool.indexOf(selectedWord);
      if (poolIndex !== -1) {
        categoryIndices[categoryId] = (poolIndex + 1) % pool.length;
      }
    } else {
      // Truly edge case: only one word in category
      selectedWord = pool[0];
      categoryIndices[categoryId] = 1;
    }
  }
  
  // Don't track here - let the caller mark it as used only if it successfully resolves
  return selectedWord;
}

/**
 * Mark a word as successfully used for a category (only call this when the word has a valid definition).
 * This ensures we only track words that were actually shown to the user.
 */
export function markCategoryWordAsUsed(categoryId: CategoryId, word: string): void {
  if (!categoryRecentlyUsed[categoryId]) {
    categoryRecentlyUsed[categoryId] = [];
  }
  categoryRecentlyUsed[categoryId].push(word);
  
  // Keep only the last CATEGORY_MAX_RECENTLY_USED words in history
  if (categoryRecentlyUsed[categoryId].length > CATEGORY_MAX_RECENTLY_USED) {
    categoryRecentlyUsed[categoryId].shift(); // Remove oldest entry
  }
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
 * Uses a shuffled pool approach to ensure all words are shown before repeating,
 * and avoids recently used words to prevent immediate repetition.
 * Guarantees: Never repeats the previous word, and avoids at least the last 5 words.
 */
export function getRandomWordFromAllLanguages(): string | null {
  if (ALL_WORDS_ALL_LANGUAGES.length === 0) return null;
  
  // Initialize pool if empty or exhausted
  if (shuffledPool.length === 0 || currentIndex >= shuffledPool.length) {
    initializeShuffledPool();
  }
  
  // Get the last N words to avoid (at least MIN_RECENTLY_USED, up to what we have)
  const wordsToAvoid = recentlyUsed.slice(-Math.min(MIN_RECENTLY_USED, recentlyUsed.length));
  
  // Get available words (excluding the words we want to avoid)
  const availableWords = shuffledPool.filter(
    word => !wordsToAvoid.includes(word)
  );
  
  let selectedWord: string;
  
  // If we have available words that aren't in the avoid list, pick from those
  if (availableWords.length > 0) {
    // Try to pick from current position in shuffled pool, skipping avoided words
    let found = false;
    let attempts = 0;
    const maxAttempts = Math.min(shuffledPool.length, 50);
    
    while (!found && attempts < maxAttempts) {
      const candidate = shuffledPool[currentIndex];
      currentIndex = (currentIndex + 1) % shuffledPool.length;
      attempts++;
      
      // Make sure candidate is not in our avoid list (especially not the previous word)
      if (!wordsToAvoid.includes(candidate)) {
        selectedWord = candidate;
        found = true;
      }
    }
    
    // If we couldn't find one by cycling, pick randomly from available
    if (!found) {
      const randomIndex = Math.floor(Math.random() * availableWords.length);
      selectedWord = availableWords[randomIndex];
      // Update currentIndex to point after this word in the pool (if found)
      const poolIndex = shuffledPool.indexOf(selectedWord);
      if (poolIndex !== -1) {
        currentIndex = (poolIndex + 1) % shuffledPool.length;
      }
    }
  } else {
    // Edge case: All words are in the avoid list (shouldn't happen with 40+ words and only 5 avoided)
    // In this case, we'll still avoid at least the previous word
    const previousWord = recentlyUsed.length > 0 ? recentlyUsed[recentlyUsed.length - 1] : null;
    const fallbackWords = previousWord 
      ? shuffledPool.filter(word => word !== previousWord)
      : shuffledPool;
    
    if (fallbackWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * fallbackWords.length);
      selectedWord = fallbackWords[randomIndex];
      const poolIndex = shuffledPool.indexOf(selectedWord);
      if (poolIndex !== -1) {
        currentIndex = (poolIndex + 1) % shuffledPool.length;
      }
    } else {
      // Truly edge case: only one word in entire pool
      selectedWord = shuffledPool[0];
      currentIndex = 1;
    }
  }
  
  // Don't track here - let the caller mark it as used only if it successfully resolves
  return selectedWord;
}

/**
 * Mark a word as successfully used for random mode (only call this when the word has a valid definition).
 * This ensures we only track words that were actually shown to the user.
 */
export function markRandomWordAsUsed(word: string): void {
  recentlyUsed.push(word);
  
  // Keep only the last MAX_RECENTLY_USED words in history
  if (recentlyUsed.length > MAX_RECENTLY_USED) {
    recentlyUsed.shift(); // Remove oldest entry
  }
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


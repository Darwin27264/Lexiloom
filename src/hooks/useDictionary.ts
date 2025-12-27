import { useState } from 'react';
import type { WordEntry } from '../types';

const DICTIONARY_API_BASE = 'https://api.dictionaryapi.dev/api/v2/entries/en';

interface DictionaryResponse {
  word: string;
  phonetic?: string;
  phonetics?: Array<{ text?: string; audio?: string }>;
  meanings: Array<{
    partOfSpeech?: string;
    definitions: Array<{ definition: string }>;
  }>;
}

/**
 * Central function to fetch a word entry from the dictionary API.
 * Normalizes the API response into a WordEntry.
 * Handles network errors gracefully and returns null on failure.
 */
export async function fetchWordEntry(word: string): Promise<WordEntry | null> {
  try {
    const response = await fetch(`${DICTIONARY_API_BASE}/${encodeURIComponent(word.toLowerCase())}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null; // Word not found - return null instead of throwing
      }
      throw new Error(`Failed to fetch definition: ${response.statusText}`);
    }

    const data: DictionaryResponse[] = await response.json();
    
    if (!data || data.length === 0) {
      return null;
    }

    const entry = data[0];
    
    // Get the first definition from the first meaning
    const firstMeaning = entry.meanings[0];
    const definition = firstMeaning?.definitions[0]?.definition || 'No definition available';
    const partOfSpeech = firstMeaning?.partOfSpeech;
    
    // Extract phonetic/reading info
    const phonetic = entry.phonetic || entry.phonetics?.[0]?.text;

    return {
      word: entry.word,
      language: 'en' as const,
      reading: phonetic,
      partOfSpeech,
      definition,
    };
  } catch (err) {
    // Log error but don't throw - return null for graceful handling
    console.error('Error fetching word entry:', err);
    return null;
  }
}

/**
 * Hook wrapper for fetchWordEntry that manages loading and error state.
 */
export function useDictionary() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWord = async (word: string): Promise<WordEntry | null> => {
    setLoading(true);
    setError(null);

    const entry = await fetchWordEntry(word);
    
    if (!entry) {
      setError(`Word "${word}" not found`);
    }

    setLoading(false);
    return entry;
  };

  return { fetchWord, loading, error };
}


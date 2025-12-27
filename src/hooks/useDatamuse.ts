import { useState } from 'react';

const DATAMUSE_API_BASE = 'https://api.datamuse.com/words';

interface DatamuseWord {
  word: string;
  score?: number;
}

/**
 * Hook for Datamuse API - only used for "meaning → word" mode.
 * Category and Random modes now use local word lists.
 */
export function useDatamuse() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getWordsByMeaning = async (meaning: string): Promise<string[]> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${DATAMUSE_API_BASE}?ml=${encodeURIComponent(meaning)}&max=10`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch words: ${response.statusText}`);
      }

      const data: DatamuseWord[] = await response.json();
      return data.map(item => item.word);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    getWordsByMeaning,
    loading,
    error,
  };
}

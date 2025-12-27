import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDictionary } from '../useDictionary';

// Mock fetch
global.fetch = vi.fn();

describe('useDictionary', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch and normalize a word entry', async () => {
    const mockResponse = [
      {
        word: 'serendipity',
        phonetic: '/ˌserənˈdipitē/',
        meanings: [
          {
            partOfSpeech: 'noun',
            definitions: [
              {
                definition: 'the occurrence and development of events by chance in a happy or beneficial way',
              },
            ],
          },
        ],
      },
    ];

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useDictionary());

    const entry = await result.current.fetchWord('serendipity');

    expect(entry).toEqual({
      word: 'serendipity',
      language: 'en',
      reading: '/ˌserənˈdipitē/',
      partOfSpeech: 'noun',
      definition: 'the occurrence and development of events by chance in a happy or beneficial way',
    });
  });

  it('should handle API errors', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const { result } = renderHook(() => useDictionary());

    const entry = await result.current.fetchWord('nonexistentword');

    expect(entry).toBeNull();
    await waitFor(() => {
      expect(result.current.error).toContain('not found');
    });
  });
});


import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDatamuse } from '../useDatamuse';

// Mock fetch
global.fetch = vi.fn();

describe('useDatamuse', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should get words by meaning', async () => {
    const mockResponse = [
      { word: 'happiness', score: 100 },
      { word: 'joy', score: 95 },
    ];

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useDatamuse());

    const words = await result.current.getWordsByMeaning('feeling good');

    expect(words).toEqual(['happiness', 'joy']);
  });

  it('should handle API errors gracefully', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      statusText: 'Internal Server Error',
    });

    const { result } = renderHook(() => useDatamuse());

    const words = await result.current.getWordsByMeaning('test');

    expect(words).toEqual([]);
    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });
});


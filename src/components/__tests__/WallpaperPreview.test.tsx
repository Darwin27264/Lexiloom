import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WallpaperPreview } from '../WallpaperPreview';
import type { WordEntry } from '../../types';

describe('WallpaperPreview', () => {
  const mockEntry: WordEntry = {
    word: 'serendipity',
    language: 'en',
    reading: '/ˌserənˈdipitē/',
    partOfSpeech: 'noun',
    definition: 'the occurrence and development of events by chance in a happy or beneficial way',
  };

  it('should render word and definition', () => {
    render(<WallpaperPreview entry={mockEntry} />);
    
    expect(screen.getByText('serendipity')).toBeInTheDocument();
    expect(screen.getByText(mockEntry.definition)).toBeInTheDocument();
  });

  it('should render part of speech when available', () => {
    render(<WallpaperPreview entry={mockEntry} />);
    
    expect(screen.getByText('(noun)')).toBeInTheDocument();
  });

  it('should render reading when available', () => {
    render(<WallpaperPreview entry={mockEntry} />);
    
    // Reading should be in the meta line
    expect(screen.getByText(/en.*ˌserənˈdipitē/)).toBeInTheDocument();
  });

  it('should have wallpaper-node id for export', () => {
    const { container } = render(<WallpaperPreview entry={mockEntry} />);
    
    const node = container.querySelector('#wallpaper-node');
    expect(node).toBeInTheDocument();
  });
});


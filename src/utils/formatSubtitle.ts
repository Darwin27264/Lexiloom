import type { WordEntry } from '../types';

function getLanguageLabel(language: WordEntry['language']): string {
  switch (language) {
    case 'ja':
      return 'Japanese';
    case 'zh':
      return 'Chinese';
    case 'en':
      return 'English';
    default:
      return '';
  }
}

export function buildSubtitle(entry: WordEntry): string {
  const label = getLanguageLabel(entry.language);
  const parts: string[] = [];

  if (entry.language === 'ja') {
    // Prefer: kana • Japanese • romaji
    if (entry.readingNative) {
      parts.push(entry.readingNative);
    }
    if (label) {
      parts.push(label.toUpperCase());
    }
    // Show romaji if it exists and is different from kana (to avoid showing same content twice)
    if (entry.reading && entry.reading !== entry.readingNative) {
      parts.push(entry.reading.toUpperCase());
    }

    // Remove any duplicate parts and filter out empty strings
    return Array.from(new Set(parts.filter(p => p.trim()))).join(' • ');
  }

  if (entry.language === 'zh') {
    // Hanzi already appears as heading; subtitle should focus on pinyin + label
    if (label) {
      parts.push(label.toUpperCase());
    }
    if (entry.reading) {
      parts.push(entry.reading);
    }
    return Array.from(new Set(parts.filter(p => p.trim()))).join(' • ');
  }

  // English: show language label and pronunciation if available
  if (entry.language === 'en') {
    if (label) {
      parts.push(label.toUpperCase());
    }
    if (entry.reading) {
      parts.push(entry.reading);
    }
    return Array.from(new Set(parts.filter(p => p.trim()))).join(' • ');
  }

  // Other languages: fallback – keep it very simple
  if (label) {
    parts.push(label.toUpperCase());
  }
  return parts.filter(p => p.trim()).join(' • ');
}


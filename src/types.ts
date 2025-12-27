export type LanguageCode = 'en' | 'ja' | 'zh' | 'other';

export interface WordEntry {
  word: string;             // primary display word (may be English, romaji, or hanzi/kanji)
  language: LanguageCode;   // required
  characters?: string;      // e.g. 侘寂, 無常, etc.
  reading?: string;         // romaji or pinyin
  readingNative?: string;   // kana for Japanese (optional)
  partOfSpeech?: string;
  definition: string;       // short English gloss or user-provided meaning
}


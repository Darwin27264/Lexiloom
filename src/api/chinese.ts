import { pinyin } from 'pinyin-pro';
import { CHINESE_WORDS, type ChineseDictEntry } from '../data/chineseWords';
import type { WordEntry } from '../types';

export function findChineseEntry(rawInput: string): WordEntry {
  const input = rawInput.trim();

  // Try exact hanzi match first
  const dictEntry: ChineseDictEntry | undefined = CHINESE_WORDS[input];

  if (dictEntry) {
    return {
      word: dictEntry.hanzi,
      language: 'zh',
      characters: dictEntry.hanzi,
      reading: dictEntry.pinyin,
      definition: dictEntry.definition,
      partOfSpeech: dictEntry.partOfSpeech,
    };
  }

  // Fallback: auto-generate pinyin, blank definition
  const autoPinyin = pinyin(input, { toneType: 'symbol' });

  return {
    word: input,
    language: 'zh',
    characters: input,
    reading: autoPinyin,
    definition: '',
  };
}


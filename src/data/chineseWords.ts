export interface ChineseDictEntry {
  hanzi: string;
  pinyin: string;       // e.g. "wúcháng"
  definition: string;
  partOfSpeech?: string;
}

export const CHINESE_WORDS: Record<string, ChineseDictEntry> = {
  '無常': {
    hanzi: '無常',
    pinyin: 'wúcháng',
    definition: 'impermanence; the transient nature of all things',
    partOfSpeech: 'n.',
  },
  '气': {
    hanzi: '气',
    pinyin: 'qì',
    definition: 'vital energy or life force',
    partOfSpeech: 'n.',
  },
  '道': {
    hanzi: '道',
    pinyin: 'dào',
    definition: 'the way; the path; the principle underlying all things',
    partOfSpeech: 'n.',
  },
  '禅': {
    hanzi: '禅',
    pinyin: 'chán',
    definition: 'meditation; zen; a state of deep contemplation',
    partOfSpeech: 'n.',
  },
  '空': {
    hanzi: '空',
    pinyin: 'kōng',
    definition: 'emptiness; void; the concept of non-being',
    partOfSpeech: 'n.',
  },
  '和': {
    hanzi: '和',
    pinyin: 'hé',
    definition: 'harmony; peace; balance',
    partOfSpeech: 'n.',
  },
  '静': {
    hanzi: '静',
    pinyin: 'jìng',
    definition: 'stillness; quiet; tranquility',
    partOfSpeech: 'n.',
  },
  '心': {
    hanzi: '心',
    pinyin: 'xīn',
    definition: 'heart; mind; the center of consciousness',
    partOfSpeech: 'n.',
  },
};


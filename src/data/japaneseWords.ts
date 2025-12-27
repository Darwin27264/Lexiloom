export interface JapaneseDictEntry {
  kanji?: string;
  kana: string;
  romaji: string;
  definition: string;
  partOfSpeech?: string;
}

// Keys can be normalized romaji
export const JAPANESE_WORDS: Record<string, JapaneseDictEntry> = {
  'wabi-sabi': {
    kanji: '侘寂',
    kana: 'わびさび',
    romaji: 'wabi-sabi',
    definition:
      'a Japanese aesthetic centered on the beauty of imperfection and impermanence',
    partOfSpeech: 'n.',
  },
  'ikigai': {
    kanji: '生き甲斐',
    kana: 'いきがい',
    romaji: 'ikigai',
    definition: 'a reason for being; that which makes life feel worthwhile',
    partOfSpeech: 'n.',
  },
  'mono no aware': {
    kanji: '物の哀れ',
    kana: 'もののあわれ',
    romaji: 'mono no aware',
    definition: 'a gentle sadness or sensitivity to the transience of things',
    partOfSpeech: 'n.',
  },
  'kintsugi': {
    kanji: '金継ぎ',
    kana: 'きんつぎ',
    romaji: 'kintsugi',
    definition: 'the art of repairing broken pottery with gold, embracing flaws',
    partOfSpeech: 'n.',
  },
  'yugen': {
    kanji: '幽玄',
    kana: 'ゆうげん',
    romaji: 'yugen',
    definition: 'a profound awareness of the universe that triggers deep emotional response',
    partOfSpeech: 'n.',
  },
  'komorebi': {
    kanji: '木漏れ日',
    kana: 'こもれび',
    romaji: 'komorebi',
    definition: 'sunlight filtering through trees',
    partOfSpeech: 'n.',
  },
  'tsundoku': {
    kanji: '積ん読',
    kana: 'つんどく',
    romaji: 'tsundoku',
    definition: 'the act of acquiring books but letting them pile up unread',
    partOfSpeech: 'n.',
  },
  'shinrin-yoku': {
    kanji: '森林浴',
    kana: 'しんりんよく',
    romaji: 'shinrin-yoku',
    definition: 'forest bathing; the practice of spending time in forests for health',
    partOfSpeech: 'n.',
  },
};


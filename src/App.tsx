import { useState } from 'react';
import { useDatamuse } from './hooks/useDatamuse';
import { resolveWordEntry } from './api/resolveWord';
import { detectLanguage } from './utils/language';
import { WallpaperPreview } from './components/WallpaperPreview';
import { ExportButton } from './components/ExportButton';
import { ModeTabs } from './components/ModeTabs';
import { DeviceFrame } from './components/DeviceFrame';
import { PrimaryButton } from './components/PrimaryButton';
import { AnimatedBackground } from './components/AnimatedBackground';
import { WallpaperControls } from './components/WallpaperControls';
import type { WordEntry, LanguageCode } from './types';
import {
  CATEGORY_LABELS,
  getRandomWordFromAllLanguages,
  getWordsFromCategoryWithLanguages,
  type CategoryId,
} from './data/categories';
import {
  DEFAULT_LAYOUT_SETTINGS,
  type WallpaperLayoutSettings,
} from './types/wallpaper';

type Mode = 'word' | 'definition' | 'category' | 'random';

// Convert category data to array format for the select dropdown
const CATEGORIES: Array<{ id: CategoryId; label: string }> = Object.entries(
  CATEGORY_LABELS
).map(([id, label]) => ({ id: id as CategoryId, label }));

const MODE_DESCRIPTIONS: Record<Mode, string> = {
  word: "Enter a word and we'll fetch its definition.",
  definition: "Describe a meaning and we'll find a suitable word.",
  category: 'Choose a category to discover a word from that theme.',
  random: 'Get a random word from any category.',
};

function App() {
  const [mode, setMode] = useState<Mode>('word');
  const [currentEntry, setCurrentEntry] = useState<WordEntry | null>(null);
  const [wordInput, setWordInput] = useState('');
  const [definitionInput, setDefinitionInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(CATEGORIES[0].id);
  const [languageOverride, setLanguageOverride] = useState<'auto' | LanguageCode>('auto');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wallpaperSettings, setWallpaperSettings] = useState<WallpaperLayoutSettings>(
    DEFAULT_LAYOUT_SETTINGS
  );

  const { getWordsByMeaning, loading: datamuseLoading, error: datamuseError } = useDatamuse();

  // Combine loading states - Datamuse is only used for definition mode
  const isLoading = loading || (mode === 'definition' && datamuseLoading);
  const currentError = error || (mode === 'definition' ? datamuseError : null);

  const handleWordSubmit = async () => {
    if (!wordInput.trim()) return;
    
    setLoading(true);
    setError(null);
    
    const effectiveLanguage: LanguageCode =
      languageOverride === 'auto' ? detectLanguage(wordInput) : languageOverride;
    
    const entry = await resolveWordEntry(wordInput.trim(), effectiveLanguage);
    
    if (entry.word && entry.definition) {
      setCurrentEntry(entry);
    } else if (entry.word) {
      // Word found but no definition - still show it, user can add definition manually
      setCurrentEntry(entry);
    } else {
      setError(`Word "${wordInput.trim()}" not found`);
    }
    
    setLoading(false);
  };

  const handleDefinitionSubmit = async () => {
    if (!definitionInput.trim()) return;

    setError(null);
    const words = await getWordsByMeaning(definitionInput.trim());
    
    if (words.length === 0) {
      setError('No words found for this meaning');
      return;
    }

    setLoading(true);
    
    // Try words until we find one with a valid definition
    // Meaning mode assumes English (Datamuse is English-focused)
    for (const word of words) {
      const entry = await resolveWordEntry(word, 'en');
      if (entry.word && entry.definition) {
        setCurrentEntry(entry);
        setLoading(false);
        return;
      }
    }
    
    setError('Found words but none have valid definitions');
    setLoading(false);
  };

  const handleCategorySubmit = async () => {
    setLoading(true);
    setError(null);
    
    // Get words from all languages for this category
    const words = getWordsFromCategoryWithLanguages(selectedCategory);
    
    if (words.length === 0) {
      setError('No words available for this category');
      setLoading(false);
      return;
    }

    // Shuffle words and try until we find one with a valid definition
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    
    for (const word of shuffledWords) {
      // Detect language for each word
      const detectedLanguage = detectLanguage(word);
      const entry = await resolveWordEntry(word, detectedLanguage);
      if (entry.word && entry.definition) {
        setCurrentEntry(entry);
        setLoading(false);
        return;
      }
    }
    
    setError('Words found but none have valid definitions. Please try another category.');
    setLoading(false);
  };

  const handleRandomSubmit = async () => {
    setLoading(true);
    setError(null);
    
    // Try up to 5 times to find a valid word with a definition
    const maxAttempts = 5;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      // Use the function that includes all languages
      const randomWord = getRandomWordFromAllLanguages();
      
      if (!randomWord) {
        setError('Unable to get a random word. Please try again.');
        setLoading(false);
        return;
      }

      // Detect language and resolve word
      const detectedLanguage = detectLanguage(randomWord);
      const entry = await resolveWordEntry(randomWord, detectedLanguage);
      if (entry.word && entry.definition) {
        setCurrentEntry(entry);
        setLoading(false);
        return;
      }
      
      // If this word doesn't have a definition, try again
      if (attempt === maxAttempts - 1) {
        setError('Unable to find a word with a valid definition. Please try again.');
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen relative text-zinc-100">
      <AnimatedBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Dictionary Wallpaper
          </h1>
        </div>

        {/* Main content: two-column on desktop, stacked on mobile */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left column: Controls */}
          <div className="flex-1 lg:max-w-md">
            <div className="glass-strong rounded-2xl p-6 space-y-6 shadow-2xl">
              {/* Mode tabs */}
              <ModeTabs currentMode={mode} onModeChange={setMode} />

              {/* Mode description */}
              <p className="text-sm text-zinc-300 leading-relaxed">
                {MODE_DESCRIPTIONS[mode]}
              </p>

              {/* Mode-specific inputs */}
              <div className="space-y-4">
                {mode === 'word' && (
                  <>
                    <input
                      type="text"
                      value={wordInput}
                      onChange={(e) => setWordInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleWordSubmit()}
                      className="w-full px-4 py-3 glass-input rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/30 transition-all"
                      placeholder="serendipity, wabi-sabi, 無常"
                      disabled={isLoading}
                    />
                    <select
                      value={languageOverride}
                      onChange={(e) => setLanguageOverride(e.target.value as 'auto' | LanguageCode)}
                      className="w-full px-4 py-3 glass-input rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/30 transition-all cursor-pointer text-sm"
                      disabled={isLoading}
                    >
                      <option value="auto" className="bg-zinc-900">Auto-detect</option>
                      <option value="en" className="bg-zinc-900">English</option>
                      <option value="ja" className="bg-zinc-900">Japanese</option>
                      <option value="zh" className="bg-zinc-900">Chinese</option>
                    </select>
                    <PrimaryButton onClick={handleWordSubmit} disabled={isLoading || !wordInput.trim()}>
                      Generate
                    </PrimaryButton>
                  </>
                )}

                {mode === 'definition' && (
                  <>
                    <textarea
                      value={definitionInput}
                      onChange={(e) => setDefinitionInput(e.target.value)}
                      className="w-full px-4 py-3 glass-input rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/30 transition-all resize-none"
                      placeholder="feeling of happiness"
                      rows={2}
                      disabled={isLoading}
                    />
                    <PrimaryButton onClick={handleDefinitionSubmit} disabled={isLoading || !definitionInput.trim()}>
                      Find Word
                    </PrimaryButton>
                  </>
                )}

                {mode === 'category' && (
                  <>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as CategoryId)}
                      className="w-full px-4 py-3 glass-input rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/30 transition-all cursor-pointer"
                      disabled={isLoading}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id} className="bg-zinc-900">
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    <PrimaryButton onClick={handleCategorySubmit} disabled={isLoading}>
                      Generate
                    </PrimaryButton>
                  </>
                )}

                {mode === 'random' && (
                  <PrimaryButton onClick={handleRandomSubmit} disabled={isLoading}>
                    Surprise Me
                  </PrimaryButton>
                )}
              </div>

              {/* Loading and error states */}
              {isLoading && (
                <div className="text-sm text-zinc-400">Loading...</div>
              )}
              {currentError && (
                <div className="text-sm text-red-400 bg-red-500/10 rounded-lg px-3 py-2 border border-red-500/20">
                  Error: {currentError}
                </div>
              )}
            </div>
          </div>

          {/* Right column: Preview & Controls */}
          <div className="flex-1 lg:flex-initial lg:w-auto">
            {currentEntry ? (
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
                {/* Phone Preview */}
                <div className="flex-shrink-0">
                  <DeviceFrame>
                    <WallpaperPreview
                      entry={currentEntry}
                      wordScale={wallpaperSettings.wordScale}
                      alignment={wallpaperSettings.alignment}
                      verticalAlignment={wallpaperSettings.verticalAlignment}
                      definitionWidth={wallpaperSettings.definitionWidth}
                      backgroundColor={wallpaperSettings.backgroundColor}
                      backgroundImage={wallpaperSettings.backgroundImage || undefined}
                    />
                  </DeviceFrame>
                </div>

                {/* Customization Panel - to the right of phone */}
                <div className="w-full lg:w-auto lg:min-w-[320px]">
                  <div className="glass-strong rounded-2xl p-6 space-y-6 shadow-2xl">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-white">Customize</h2>
                      <ExportButton />
                    </div>
                    <WallpaperControls
                      settings={wallpaperSettings}
                      onSettingsChange={setWallpaperSettings}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center lg:items-start">
                <DeviceFrame>
                  <div className="flex items-center justify-center text-zinc-400 w-full h-full bg-gradient-to-br from-zinc-900/90 to-zinc-800/90 rounded-2xl">
                    <p className="text-sm">Preview will appear here</p>
                  </div>
                </DeviceFrame>
              </div>
            )}
          </div>
        </div>

        {/* Footer attribution */}
        <footer className="mt-16 pt-8 border-t border-white/10">
          <p className="text-xs text-zinc-400 text-center">
            Definitions from Wiktionary via Free Dictionary API. Meaning search powered by Datamuse.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;

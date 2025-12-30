import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDatamuse } from '../hooks/useDatamuse';
import { resolveWordEntry } from '../api/resolveWord';
import { detectLanguage } from '../utils/language';
import { WallpaperPreview } from './WallpaperPreview';
import { ExportButton } from './ExportButton';
import { ModeTabs } from './ModeTabs';
import { DeviceFrame } from './DeviceFrame';
import { PrimaryButton } from './PrimaryButton';
import { WallpaperControls } from './WallpaperControls';
import { ThemeToggle } from './ThemeToggle';
import type { WordEntry, LanguageCode } from '../types';
import {
  CATEGORY_LABELS,
  getRandomWordFromAllLanguages,
  getWordsFromCategoryWithLanguages,
  type CategoryId,
} from '../data/categories';
import {
  DEFAULT_LAYOUT_SETTINGS,
  type WallpaperLayoutSettings,
} from '../types/wallpaper';

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

export function AppTool() {
  const navigate = useNavigate();
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

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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
    <div className="min-h-screen bg-soft animate-page-enter">
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        {/* Header */}
        <div className="mb-8 lg:mb-12 flex items-start justify-between animate-fade-in">
          <div>
            <button
              onClick={() => navigate('/')}
              className="text-2xl lg:text-3xl font-light text-primary mb-1 hover:opacity-80 transition-opacity duration-150 cursor-pointer text-left"
            >
              Lexiloom
            </button>
            <p className="text-sm text-secondary">
              Turn meaningful words into minimal wallpapers.
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Main content: All at top - Phone centered, panels on sides */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-6 lg:gap-8">
          {/* Left column: Word Generation Panel */}
          <div className="flex flex-col gap-6 w-full lg:w-96 flex-shrink-0">
            <div className="bg-surface rounded-2xl lg:rounded-3xl p-6 space-y-6 border border-subtle animate-fade-in animate-delay-100">
              {/* Mode tabs */}
              <ModeTabs currentMode={mode} onModeChange={setMode} />

              {/* Mode description */}
              <p className="text-sm text-secondary leading-relaxed">
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
                      className="w-full px-4 py-3 bg-surface-muted border border-subtle rounded-xl text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface transition-colors duration-150"
                      placeholder="serendipity, wabi-sabi, 無常"
                      disabled={isLoading}
                    />
                    <select
                      value={languageOverride}
                      onChange={(e) => setLanguageOverride(e.target.value as 'auto' | LanguageCode)}
                      className="w-full px-4 py-3 bg-surface-muted border border-subtle rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface transition-colors duration-150 cursor-pointer text-sm"
                      disabled={isLoading}
                    >
                      <option value="auto" className="bg-surface text-primary">Auto-detect</option>
                      <option value="en" className="bg-surface text-primary">English</option>
                      <option value="ja" className="bg-surface text-primary">Japanese</option>
                      <option value="zh" className="bg-surface text-primary">Chinese</option>
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
                      className="w-full px-4 py-3 bg-surface-muted border border-subtle rounded-xl text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface transition-colors duration-150 resize-none"
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
                      className="w-full px-4 py-3 bg-surface-muted border border-subtle rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface transition-colors duration-150 cursor-pointer"
                      disabled={isLoading}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id} className="bg-surface text-primary">
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

              {/* Error state */}
              {currentError && (
                <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 rounded-lg px-3 py-2 border border-red-200 dark:border-red-900/50">
                  Error: {currentError}
                </div>
              )}
            </div>

            {/* Download Button - Separated below the generate options */}
            {currentEntry && (
              <div className="animate-fade-in animate-delay-200">
                <ExportButton />
              </div>
            )}
          </div>

          {/* Center: Phone Preview */}
          <div className="flex justify-center flex-shrink-0">
            {currentEntry ? (
              <div className="animate-fade-in animate-delay-200">
                <DeviceFrame>
                  <WallpaperPreview
                    entry={currentEntry}
                    wordScale={wallpaperSettings.wordScale}
                    alignment={wallpaperSettings.alignment}
                    verticalAlignment={wallpaperSettings.verticalAlignment}
                    definitionWidth={wallpaperSettings.definitionWidth}
                    textColor={wallpaperSettings.textColor}
                    backgroundColor={wallpaperSettings.backgroundColor}
                    backgroundImage={wallpaperSettings.backgroundImage || undefined}
                  />
                </DeviceFrame>
              </div>
            ) : (
              <div className="animate-fade-in animate-delay-100">
                <DeviceFrame>
                  <div className="flex items-center justify-center text-secondary w-full h-full bg-soft rounded-2xl transition-colors duration-150">
                    <p className="text-sm">Preview will appear here</p>
                  </div>
                </DeviceFrame>
              </div>
            )}
          </div>

          {/* Right column: Customization Panel */}
          <div className="flex flex-col gap-6 w-full lg:w-96 flex-shrink-0">
            {currentEntry && (
              <div className="bg-surface rounded-2xl lg:rounded-3xl p-6 space-y-6 border border-subtle animate-fade-in animate-delay-300">
                <h2 className="text-lg font-semibold text-primary">Customize</h2>
                <WallpaperControls
                  settings={wallpaperSettings}
                  onSettingsChange={setWallpaperSettings}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer attribution */}
        <footer className="mt-16 pt-8 border-t border-subtle animate-fade-in animate-delay-300">
          <p className="text-xs text-secondary text-center">
            Definitions from Wiktionary via Free Dictionary API. Word search powered by Datamuse.
          </p>
        </footer>
      </div>
    </div>
  );
}


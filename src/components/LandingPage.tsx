import { useNavigate } from 'react-router-dom';
import { DeviceFrame } from './DeviceFrame';
import { WallpaperPreview } from './WallpaperPreview';
import { PrimaryButton } from './PrimaryButton';
import { ThemeToggle } from './ThemeToggle';
import { SEO } from './SEO';
import type { WordEntry } from '../types';
import type { TextAlignment, VerticalAlignment } from '../types/wallpaper';

// Color presets matching WallpaperControls
const COLOR_PRESETS: Array<{ name: string; backgroundColor: string; textColor: string }> = [
  { name: 'Cream', backgroundColor: '#FAF9F6', textColor: '#1A1A1A' },
  { name: 'Charcoal', backgroundColor: '#2A2A2A', textColor: '#F5F5F5' },
  { name: 'AMOLED', backgroundColor: '#000000', textColor: '#FFFFFF' },
  { name: 'Beige', backgroundColor: '#F4F1EB', textColor: '#2C2C2C' },
];

// Mock examples for the landing page with different styles and color themes
interface MockExample {
  entry: WordEntry;
  wordScale: number;
  alignment: TextAlignment;
  verticalAlignment: VerticalAlignment;
  definitionWidth: number;
  backgroundColor: string;
  textColor: string;
}

const MOCK_EXAMPLES: MockExample[] = [
  {
    entry: {
      word: 'serendipity',
      language: 'en',
      reading: '/ˌserənˈdipitē/',
      partOfSpeech: 'noun',
      definition: 'The occurrence and development of events by chance in a happy or beneficial way.',
    },
    wordScale: 0.6,
    alignment: 'left',
    verticalAlignment: 'top',
    definitionWidth: 0.7,
    backgroundColor: COLOR_PRESETS[0].backgroundColor, // Cream
    textColor: COLOR_PRESETS[0].textColor,
  },
  {
    entry: {
      word: 'wabi-sabi',
      language: 'ja',
      characters: '侘寂',
      reading: 'wabi-sabi',
      partOfSpeech: 'noun',
      definition: 'A Japanese aesthetic centered on the acceptance of transience and imperfection.',
    },
    wordScale: 0.65,
    alignment: 'center',
    verticalAlignment: 'middle',
    definitionWidth: 0.8,
    backgroundColor: COLOR_PRESETS[1].backgroundColor, // Charcoal
    textColor: COLOR_PRESETS[1].textColor,
  },
  {
    entry: {
      word: 'wúcháng',
      language: 'zh',
      characters: '無常',
      reading: 'wúcháng',
      partOfSpeech: 'noun',
      definition: 'Impermanence; the Buddhist concept that all things are in constant flux.',
    },
    wordScale: 0.7,
    alignment: 'right',
    verticalAlignment: 'bottom',
    definitionWidth: 0.75,
    backgroundColor: COLOR_PRESETS[2].backgroundColor, // AMOLED
    textColor: COLOR_PRESETS[2].textColor,
  },
  {
    entry: {
      word: 'momentum',
      language: 'en',
      reading: '/mōˈmentəm/',
      partOfSpeech: 'noun',
      definition: 'The strength or force that allows something to continue or to grow stronger or faster as time passes.',
    },
    wordScale: 0.55,
    alignment: 'center',
    verticalAlignment: 'top',
    definitionWidth: 0.85,
    backgroundColor: COLOR_PRESETS[3].backgroundColor, // Beige
    textColor: COLOR_PRESETS[3].textColor,
  },
];

export function LandingPage() {
  const navigate = useNavigate();
  
  const scrollToExamples = () => {
    const examplesSection = document.getElementById('examples');
    if (examplesSection) {
      examplesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-soft animate-page-enter">
      <SEO
        title="Lexiloom — Minimal Word & Definition Wallpaper Generator | Free Online Tool"
        description="Create clean, aesthetic wallpapers from meaningful words, definitions, Japanese and Chinese concepts with pinyin and romaji. Free browser-based wallpaper generator for phone and desktop. Turn words into beautiful, minimal wallpapers instantly."
        canonical="https://lexiloom.com/"
      />
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <div className="flex items-center justify-between animate-fade-in">
          <h1 className="text-2xl lg:text-3xl font-light text-primary">Lexiloom</h1>
          <ThemeToggle />
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Left: Text Content */}
            <div className="flex-1 space-y-6 animate-fade-in">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light text-primary leading-tight">
                Turn meaningful words into minimal wallpapers.
              </h1>
              <p className="text-lg text-secondary leading-relaxed max-w-2xl">
                Create clean, aesthetic wallpapers from words, definitions, Japanese and Chinese concepts with pinyin and romaji support. 
                Learn and reflect every time you unlock your phone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <PrimaryButton 
                  onClick={() => navigate('/app')}
                  className="text-base px-8 py-4 font-medium"
                >
                  Open the tool
                </PrimaryButton>
                <PrimaryButton onClick={scrollToExamples} variant="ghost">
                  See examples
                </PrimaryButton>
              </div>
            </div>

            {/* Right: Mock Phone Preview */}
            <div className="flex-shrink-0 animate-fade-in animate-delay-100">
              <DeviceFrame>
                <WallpaperPreview 
                  entry={MOCK_EXAMPLES[1].entry}
                  wordScale={MOCK_EXAMPLES[1].wordScale}
                  alignment={MOCK_EXAMPLES[1].alignment}
                  verticalAlignment={MOCK_EXAMPLES[1].verticalAlignment}
                  definitionWidth={MOCK_EXAMPLES[1].definitionWidth}
                  backgroundColor={MOCK_EXAMPLES[1].backgroundColor}
                  textColor={MOCK_EXAMPLES[1].textColor}
                />
              </DeviceFrame>
            </div>
          </div>
        </section>

        {/* Examples Section */}
        <section id="examples" className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <h2 className="text-3xl lg:text-4xl font-light text-primary text-center mb-12 lg:mb-16 animate-fade-in">
            See your words as wallpapers.
          </h2>
          <div className="w-full overflow-hidden relative">
            <div className="flex animate-scroll-left">
              {/* Render items multiple times - need enough duplicates for seamless loop */}
              {[...MOCK_EXAMPLES, ...MOCK_EXAMPLES, ...MOCK_EXAMPLES, ...MOCK_EXAMPLES].map((example, index) => (
                <div 
                  key={`example-${index}`}
                  className="flex flex-col items-center space-y-3 flex-shrink-0"
                >
                  <div className="scale-[0.45] sm:scale-[0.55] md:scale-[0.6] lg:scale-[0.65] xl:scale-[0.7] origin-top transition-transform duration-200">
                    <DeviceFrame>
                      <WallpaperPreview 
                        entry={example.entry}
                        wordScale={example.wordScale}
                        alignment={example.alignment}
                        verticalAlignment={example.verticalAlignment}
                        definitionWidth={example.definitionWidth}
                        backgroundColor={example.backgroundColor}
                        textColor={example.textColor}
                      />
                    </DeviceFrame>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 pt-4 pb-16 lg:pt-8 lg:pb-24">
          <h2 className="text-3xl lg:text-4xl font-light text-primary text-center mb-12 lg:mb-16 animate-fade-in">
            Why Lexiloom
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-3 animate-fade-in animate-delay-100">
              <h3 className="text-xl font-medium text-primary">Minimal design, maximum focus</h3>
              <p className="text-secondary leading-relaxed">
                You don't need design skills. Clean typography and thoughtful spacing create beautiful wallpapers automatically.
              </p>
            </div>
            <div className="space-y-3 animate-fade-in animate-delay-200">
              <h3 className="text-xl font-medium text-primary">Multilingual friendly</h3>
              <p className="text-secondary leading-relaxed">
                Supports English, Japanese, Chinese, with automatic pinyin and romaji support for pronunciation.
              </p>
            </div>
            <div className="space-y-3 animate-fade-in animate-delay-300">
              <h3 className="text-xl font-medium text-primary">Learn by seeing</h3>
              <p className="text-secondary leading-relaxed">
                Reinforce vocabulary and concepts every time you check your phone. Turn screen time into learning time.
              </p>
            </div>
            <div className="space-y-3 animate-fade-in animate-delay-300">
              <h3 className="text-xl font-medium text-primary">Export in one click</h3>
              <p className="text-secondary leading-relaxed">
                Ready-to-use wallpapers for phone and desktop. Download instantly and set as your background.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <h2 className="text-3xl lg:text-4xl font-light text-primary text-center mb-12 lg:mb-16 animate-fade-in">
            How it works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-4xl mx-auto">
            <div className="text-center space-y-4 animate-fade-in animate-delay-100">
              <div className="w-12 h-12 rounded-full bg-accent text-button flex items-center justify-center mx-auto text-xl font-medium">
                1
              </div>
              <h3 className="text-xl font-medium text-primary">Choose how to start</h3>
              <p className="text-secondary leading-relaxed">
                Enter a word, describe a meaning, pick a category, or get a random word.
              </p>
            </div>
            <div className="text-center space-y-4 animate-fade-in animate-delay-200">
              <div className="w-12 h-12 rounded-full bg-accent text-button flex items-center justify-center mx-auto text-xl font-medium">
                2
              </div>
              <h3 className="text-xl font-medium text-primary">Adjust and customize</h3>
              <p className="text-secondary leading-relaxed">
                Fine-tune typography, position, alignment, and background to match your style.
              </p>
            </div>
            <div className="text-center space-y-4 animate-fade-in animate-delay-300">
              <div className="w-12 h-12 rounded-full bg-accent text-button flex items-center justify-center mx-auto text-xl font-medium">
                3
              </div>
              <h3 className="text-xl font-medium text-primary">Download and set</h3>
              <p className="text-secondary leading-relaxed">
                Export your wallpaper as a PNG and set it on your device in seconds.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="bg-surface rounded-3xl p-8 lg:p-12 border border-subtle text-center space-y-6 animate-fade-in">
            <h2 className="text-2xl lg:text-3xl font-light text-primary">
              Ready to create your first wallpaper?
            </h2>
            <div className="flex justify-center">
              <PrimaryButton 
                onClick={() => navigate('/app')}
                className="text-lg px-10 py-5 font-medium"
              >
                Open the tool
              </PrimaryButton>
            </div>
            <div className="flex justify-center pt-4">
              <div className="scale-75">
                <DeviceFrame>
                  <WallpaperPreview 
                    entry={MOCK_EXAMPLES[0].entry}
                    wordScale={MOCK_EXAMPLES[0].wordScale}
                    alignment={MOCK_EXAMPLES[0].alignment}
                    verticalAlignment={MOCK_EXAMPLES[0].verticalAlignment}
                    definitionWidth={MOCK_EXAMPLES[0].definitionWidth}
                    backgroundColor={MOCK_EXAMPLES[0].backgroundColor}
                    textColor={MOCK_EXAMPLES[0].textColor}
                  />
                </DeviceFrame>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-12 border-t border-subtle">
        <div className="space-y-4 text-center animate-fade-in">
          <p className="text-lg font-light text-primary">Lexiloom</p>
          <p className="text-xs text-secondary">
            Definitions from Wiktionary via Free Dictionary API. Word search powered by Datamuse.
          </p>
          <nav aria-label="Footer navigation" className="flex justify-center gap-6 pt-4">
            <a href="/app" className="text-xs text-secondary hover:text-primary transition-colors" aria-label="Open wallpaper generator tool">
              Create Wallpaper
            </a>
            <a href="mailto:contact@lexiloom.com" className="text-xs text-secondary hover:text-primary transition-colors" aria-label="Contact Lexiloom">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}


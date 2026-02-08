import { Link } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  backTo?: string;
  backLabel?: string;
}

export function PageLayout({
  children,
  title,
  showBack,
  backTo = '/',
  backLabel = 'Home',
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-soft animate-page-enter">
      <header className="max-w-7xl mx-auto px-4 py-6 lg:py-8">
        <div className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-2xl lg:text-3xl font-light text-primary hover:opacity-80 transition-opacity" aria-label="Lexiloom home">
              Lexiloom
            </Link>
            {showBack && (
              <Link to={backTo} className="text-sm text-secondary hover:text-primary transition-colors">
                ← {backLabel}
              </Link>
            )}
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 pb-16">
        {title && (
          <h1 className="text-3xl lg:text-4xl font-light text-primary mb-8 animate-fade-in">
            {title}
          </h1>
        )}
        {children}
      </main>

      <footer className="max-w-7xl mx-auto px-4 py-12 border-t border-subtle">
        <div className="space-y-4 text-center animate-fade-in">
          <p className="text-lg font-light text-primary">Lexiloom</p>
          <p className="text-xs text-secondary">
            Definitions from Wiktionary via Free Dictionary API. Word search powered by Datamuse.
          </p>
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-6 pt-4">
            <Link to="/app" className="text-xs text-secondary hover:text-primary transition-colors" aria-label="Open wallpaper generator tool">
              Create Wallpaper
            </Link>
            <Link to="/blog" className="text-xs text-secondary hover:text-primary transition-colors" aria-label="Lexiloom blog">
              Blog
            </Link>
            <Link to="/privacy" className="text-xs text-secondary hover:text-primary transition-colors" aria-label="Privacy Policy">
              Privacy
            </Link>
            <Link to="/terms" className="text-xs text-secondary hover:text-primary transition-colors" aria-label="Terms of Use">
              Terms
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

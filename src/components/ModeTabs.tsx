type Mode = 'word' | 'definition' | 'category' | 'random';

interface ModeTabsProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

const MODES: Array<{ id: Mode; label: string }> = [
  { id: 'word', label: 'Word' },
  { id: 'definition', label: 'Meaning' },
  { id: 'category', label: 'Category' },
  { id: 'random', label: 'Random' },
];

export function ModeTabs({ currentMode, onModeChange }: ModeTabsProps) {
  return (
    <div className="inline-flex rounded-full px-1 py-1 bg-surface-muted animate-fade-in">
      {MODES.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`relative px-3 py-1 text-sm font-medium transition-colors duration-150 rounded-full ${
            currentMode === mode.id
              ? 'bg-surface text-primary shadow-sm'
              : 'text-secondary hover:text-primary'
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}

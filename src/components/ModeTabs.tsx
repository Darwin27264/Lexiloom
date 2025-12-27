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
    <div className="flex gap-2 border-b border-white/10 pb-1">
      {MODES.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`px-4 py-2 text-sm font-medium tracking-wide transition-all rounded-t-lg ${
            currentMode === mode.id
              ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-400/10'
              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border-b-2 border-transparent'
          }`}
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
}

import type {
  WallpaperLayoutSettings,
  TextAlignment,
  VerticalAlignment,
} from '../types/wallpaper';

interface WallpaperControlsProps {
  settings: WallpaperLayoutSettings;
  onSettingsChange: (settings: WallpaperLayoutSettings) => void;
}

const HORIZONTAL_ALIGNMENT_OPTIONS: Array<{ value: TextAlignment; label: string }> = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

const VERTICAL_ALIGNMENT_OPTIONS: Array<{ value: VerticalAlignment; label: string }> = [
  { value: 'top', label: 'Top' },
  { value: 'middle', label: 'Middle' },
  { value: 'bottom', label: 'Bottom' },
];

export function WallpaperControls({
  settings,
  onSettingsChange,
}: WallpaperControlsProps) {
  const updateSetting = <K extends keyof WallpaperLayoutSettings>(
    key: K,
    value: WallpaperLayoutSettings[K]
  ) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        updateSetting('backgroundImage', dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    updateSetting('backgroundImage', null);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">
          Word Size
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0.5"
            max="2.0"
            step="0.1"
            value={settings.wordScale}
            onChange={(e) =>
              updateSetting('wordScale', parseFloat(e.target.value))
            }
            className="flex-1 h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <span className="text-xs text-zinc-400 w-12 text-right">
            {(settings.wordScale * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">
          Definition Width
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0.3"
            max="1.0"
            step="0.05"
            value={settings.definitionWidth}
            onChange={(e) =>
              updateSetting('definitionWidth', parseFloat(e.target.value))
            }
            className="flex-1 h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <span className="text-xs text-zinc-400 w-12 text-right">
            {(settings.definitionWidth * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">
          Horizontal Alignment
        </label>
        <div className="flex gap-2">
          {HORIZONTAL_ALIGNMENT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting('alignment', option.value)}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                settings.alignment === option.value
                  ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30'
                  : 'bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-700/50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">
          Vertical Alignment
        </label>
        <div className="flex gap-2">
          {VERTICAL_ALIGNMENT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting('verticalAlignment', option.value)}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                settings.verticalAlignment === option.value
                  ? 'bg-cyan-400/20 text-cyan-400 border border-cyan-400/30'
                  : 'bg-zinc-800/50 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-700/50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">
          Background Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={settings.backgroundColor}
            onChange={(e) => updateSetting('backgroundColor', e.target.value)}
            className="w-12 h-10 rounded-lg cursor-pointer border border-zinc-700 bg-transparent"
          />
          <input
            type="text"
            value={settings.backgroundColor}
            onChange={(e) => updateSetting('backgroundColor', e.target.value)}
            className="flex-1 px-3 py-2 glass-input rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            placeholder="#18181b"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">
          Background Image
        </label>
        {settings.backgroundImage ? (
          <div className="space-y-2">
            <div className="relative aspect-video rounded-lg overflow-hidden border border-zinc-700">
              <img
                src={settings.backgroundImage}
                alt="Background preview"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleRemoveImage}
              className="w-full px-3 py-2 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-all"
            >
              Remove Image
            </button>
          </div>
        ) : (
          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="w-full px-3 py-2 text-xs font-medium text-zinc-300 bg-zinc-800/50 border border-zinc-700/50 rounded-lg hover:bg-zinc-700/50 cursor-pointer transition-all text-center">
              Upload Image
            </div>
          </label>
        )}
      </div>
    </div>
  );
}


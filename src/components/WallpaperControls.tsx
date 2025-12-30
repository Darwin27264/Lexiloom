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

const COLOR_PRESETS: Array<{ name: string; backgroundColor: string; textColor: string }> = [
  { name: 'Cream', backgroundColor: '#FAF9F6', textColor: '#1A1A1A' },
  { name: 'Charcoal', backgroundColor: '#2A2A2A', textColor: '#F5F5F5' },
  { name: 'AMOLED', backgroundColor: '#000000', textColor: '#FFFFFF' },
  { name: 'Beige', backgroundColor: '#F4F1EB', textColor: '#2C2C2C' },
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

  const handlePresetSelect = (preset: typeof COLOR_PRESETS[0]) => {
    onSettingsChange({
      ...settings,
      backgroundColor: preset.backgroundColor,
      textColor: preset.textColor,
      backgroundImage: null, // Clear background image when selecting preset
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">
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
            className="flex-1 h-2 bg-surface-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <span className="text-xs text-secondary w-12 text-right">
            {(settings.wordScale * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">
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
            className="flex-1 h-2 bg-surface-muted rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <span className="text-xs text-secondary w-12 text-right">
            {(settings.definitionWidth * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">
          Horizontal Alignment
        </label>
        <div className="flex gap-2">
          {HORIZONTAL_ALIGNMENT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting('alignment', option.value)}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-full transition-colors duration-150 ${
                settings.alignment === option.value
                  ? 'bg-accent text-button'
                  : 'bg-surface-muted text-secondary hover:text-primary border border-subtle'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">
          Vertical Alignment
        </label>
        <div className="flex gap-2">
          {VERTICAL_ALIGNMENT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => updateSetting('verticalAlignment', option.value)}
              className={`flex-1 px-3 py-2 text-xs font-medium rounded-full transition-colors duration-150 ${
                settings.verticalAlignment === option.value
                  ? 'bg-accent text-button'
                  : 'bg-surface-muted text-secondary hover:text-primary border border-subtle'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">
          Color Presets
        </label>
        <div className="grid grid-cols-2 gap-2">
          {COLOR_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handlePresetSelect(preset)}
              className="relative px-3 py-2 text-xs font-medium rounded-full transition-colors duration-150 border border-subtle hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface"
              style={{
                backgroundColor: preset.backgroundColor,
                color: preset.textColor,
              }}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">
          Text Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={settings.textColor}
            onChange={(e) => updateSetting('textColor', e.target.value)}
            className="w-12 h-10 rounded-lg cursor-pointer border border-subtle bg-transparent"
          />
          <input
            type="text"
            value={settings.textColor}
            onChange={(e) => updateSetting('textColor', e.target.value)}
            className="flex-1 px-3 py-2 bg-surface-muted border border-subtle rounded-xl text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface"
            placeholder="#262626"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">
          Background Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            value={settings.backgroundColor}
            onChange={(e) => updateSetting('backgroundColor', e.target.value)}
            className="w-12 h-10 rounded-lg cursor-pointer border border-subtle bg-transparent"
          />
          <input
            type="text"
            value={settings.backgroundColor}
            onChange={(e) => updateSetting('backgroundColor', e.target.value)}
            className="flex-1 px-3 py-2 bg-surface-muted border border-subtle rounded-xl text-primary text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface"
            placeholder="#F5F3EF"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">
          Background Image
        </label>
        {settings.backgroundImage ? (
          <div className="space-y-2">
            <div className="relative aspect-video rounded-lg overflow-hidden border border-subtle">
              <img
                src={settings.backgroundImage}
                alt="Background preview"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleRemoveImage}
              className="w-full px-3 py-2 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-full hover:opacity-90 transition-opacity duration-150"
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
            <div className="w-full px-3 py-2 text-xs font-medium text-secondary bg-surface-muted border border-subtle rounded-full hover:text-primary cursor-pointer transition-colors duration-150 text-center">
              Upload Image
            </div>
          </label>
        )}
      </div>
    </div>
  );
}

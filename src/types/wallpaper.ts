export type TextAlignment = 'left' | 'center' | 'right';
export type VerticalAlignment = 'top' | 'middle' | 'bottom';

export interface WallpaperLayoutSettings {
  wordScale: number; // 0.5 to 2.0
  alignment: TextAlignment;
  verticalAlignment: VerticalAlignment;
  definitionWidth: number; // 0.3 to 1.0 (30% to 100% of container width)
  backgroundColor: string;
  backgroundImage: string | null;
}

export const DEFAULT_LAYOUT_SETTINGS: WallpaperLayoutSettings = {
  wordScale: 1,
  alignment: 'center',
  verticalAlignment: 'middle',
  definitionWidth: 0.75, // 75% of container width
  backgroundColor: '#18181b', // zinc-900
  backgroundImage: null,
};


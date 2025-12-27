import type { WordEntry } from '../types';
import { buildSubtitle } from '../utils/formatSubtitle';

interface WallpaperPreviewProps {
  entry: WordEntry;
  wordScale?: number;
  alignment?: 'left' | 'center' | 'right';
  verticalAlignment?: 'top' | 'middle' | 'bottom';
  definitionWidth?: number;
  backgroundColor?: string;
  backgroundImage?: string;
}

export function WallpaperPreview({
  entry,
  wordScale = 1,
  alignment = 'center',
  verticalAlignment = 'middle',
  definitionWidth = 0.75,
  backgroundColor,
  backgroundImage,
}: WallpaperPreviewProps) {
  // Build language-aware subtitle
  const subtitle = buildSubtitle(entry);
  
  // Main heading: prefer characters for Japanese/Chinese, otherwise use word
  const primary = entry.characters || entry.word;

  // Calculate vertical alignment classes
  // In flex-col: justify-* controls vertical (main axis)
  const verticalAlignmentClasses = {
    top: 'justify-start',
    middle: 'justify-center',
    bottom: 'justify-end',
  };

  // Calculate horizontal alignment classes
  // In flex-col: items-* controls horizontal (cross axis)
  const horizontalAlignmentClasses = {
    left: 'items-start',
    center: 'items-center',
    right: 'items-end',
  };

  // Calculate text alignment classes
  const textAlignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Base font size with scale applied
  const baseFontSize = 80; // 8xl equivalent
  const scaledFontSize = baseFontSize * wordScale;

  // Background style
  const hasCustomBackground = backgroundImage || (backgroundColor && backgroundColor !== '#18181b');
  const backgroundStyle: React.CSSProperties = backgroundImage
    ? {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
    : backgroundColor && backgroundColor !== '#18181b'
    ? {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor,
      }
    : {};

  return (
    <div
      id="wallpaper-node"
      className="relative w-full h-full overflow-hidden rounded-2xl"
    >
      {/* Background layer */}
      {!hasCustomBackground && (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/90 to-zinc-800/90" />
      )}
      {hasCustomBackground && <div style={backgroundStyle} />}

      {/* Content layer */}
      <div
        className={`absolute inset-0 flex flex-col px-8 py-16 text-zinc-100 ${verticalAlignmentClasses[verticalAlignment]} ${horizontalAlignmentClasses[alignment]}`}
      >
        <div className={`max-w-full ${textAlignmentClasses[alignment]}`}>
          {/* Large word - focal point */}
          <h1
            className="font-serif mb-8 leading-none break-words"
            style={{
              fontFamily: '"Georgia", "Times New Roman", serif',
              fontWeight: 400,
              letterSpacing: '-0.02em',
              fontSize: `${scaledFontSize}px`,
              lineHeight: 1,
            }}
          >
            {primary}
          </h1>

          {/* Subtitle: language-aware pronunciation and label */}
          {subtitle && (
            <p className={`mt-2 text-xs uppercase tracking-[0.2em] text-gray-400 mb-8 ${textAlignmentClasses[alignment]}`}>
              {subtitle}
            </p>
          )}

          {/* Part of speech */}
          {entry.partOfSpeech && (
            <p className={`mt-6 text-xs italic text-gray-400 ${textAlignmentClasses[alignment]}`}>
              {entry.partOfSpeech}
            </p>
          )}

          {/* Dictionary-style definition */}
          {entry.definition && (
            <div
              className={`mt-2 ${textAlignmentClasses[alignment]}`}
              style={{
                maxWidth: `${definitionWidth * 100}%`,
                ...(alignment === 'center' && { marginLeft: 'auto', marginRight: 'auto' }),
                ...(alignment === 'right' && { marginLeft: 'auto' }),
              }}
            >
              <p
                className="text-sm leading-relaxed break-words text-zinc-200"
                style={{
                  fontFamily: '"Georgia", "Times New Roman", serif',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                }}
              >
                {entry.definition}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

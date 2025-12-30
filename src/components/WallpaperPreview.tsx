import { useState, useEffect } from 'react';
import type { WordEntry } from '../types';
import { buildSubtitle } from '../utils/formatSubtitle';

interface WallpaperPreviewProps {
  entry: WordEntry;
  wordScale?: number;
  alignment?: 'left' | 'center' | 'right';
  verticalAlignment?: 'top' | 'middle' | 'bottom';
  definitionWidth?: number;
  textColor?: string;
  backgroundColor?: string;
  backgroundImage?: string;
}

export function WallpaperPreview({
  entry,
  wordScale = 1,
  alignment = 'center',
  verticalAlignment = 'middle',
  definitionWidth = 0.75,
  textColor,
  backgroundColor,
  backgroundImage,
}: WallpaperPreviewProps) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') === 'dark';
    }
    return false;
  });

  // Watch for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

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

  // Get current theme to determine default background
  const lightDefault = '#F5F3EF';
  const darkDefault = '#111315';
  const currentDefault = isDark ? darkDefault : lightDefault;

  // Check if user has set a custom background (different from current theme default)
  // Normalize color comparison by converting to lowercase and removing spaces
  const normalizeColor = (color: string) => color.toLowerCase().trim();
  const hasCustomColor = backgroundColor && normalizeColor(backgroundColor) !== normalizeColor(currentDefault);
  const hasCustomBackground = backgroundImage || hasCustomColor;

  // Background style
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
    : hasCustomColor
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
        <div className="absolute inset-0 bg-soft transition-colors duration-150" />
      )}
      {hasCustomBackground && <div style={backgroundStyle} />}

      {/* Content layer */}
      <div
        className={`absolute inset-0 flex flex-col px-8 py-16 transition-colors duration-150 ${verticalAlignmentClasses[verticalAlignment]} ${horizontalAlignmentClasses[alignment]}`}
        style={textColor ? { color: textColor } : {}}
      >
        <div className={`max-w-full ${textAlignmentClasses[alignment]}`}>
          {/* Large word - focal point */}
          <h1
            className="font-display mb-8 leading-none break-words"
            style={{
              fontWeight: 400,
              letterSpacing: '-0.02em',
              fontSize: `${scaledFontSize}px`,
              lineHeight: 1,
              color: textColor || 'inherit',
            }}
          >
            {primary}
          </h1>

          {/* Subtitle: language-aware pronunciation and label */}
          {subtitle && (
            <p 
              className={`mt-2 text-xs uppercase tracking-[0.2em] mb-8 ${textAlignmentClasses[alignment]}`}
              style={{
                color: textColor || 'inherit',
                opacity: textColor ? 0.8 : 1, // 80% opacity for subtitle
              }}
            >
              {subtitle}
            </p>
          )}

          {/* Part of speech */}
          {entry.partOfSpeech && (
            <p 
              className={`mt-6 text-xs italic ${textAlignmentClasses[alignment]}`}
              style={{
                color: textColor || 'inherit',
                opacity: textColor ? 0.8 : 1, // 80% opacity for part of speech
              }}
            >
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
                className="text-sm leading-relaxed break-words"
                style={{
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  color: textColor || 'inherit',
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

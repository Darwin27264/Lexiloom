import { useState } from 'react';
import { toPng } from 'html-to-image';

export function ExportButton() {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    const node = document.getElementById('wallpaper-node');
    
    if (!node) {
      console.error('Wallpaper preview node not found');
      return;
    }

    setExporting(true);

    try {
      // Get current theme background color
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const backgroundColor = isDark ? '#111315' : '#F5F3EF';
      
      const dataUrl = await toPng(node, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor,
      });

      // Create download link
      const link = document.createElement('a');
      link.download = 'lexiloom-wallpaper.png';
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Export failed:', error);
      // Silently fail - user can try again
    } finally {
      setExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={exporting}
      className="w-full rounded-full px-4 py-2 text-sm font-medium bg-accent text-button hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface animate-fade-in"
    >
      {exporting ? 'Preparing...' : 'Download PNG'}
    </button>
  );
}

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
      const dataUrl = await toPng(node, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#18181b', // zinc-900 (matches wallpaper gradient background)
      });

      // Create download link
      const link = document.createElement('a');
      link.download = 'word-wallpaper.png';
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
      className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-base tracking-wide rounded-xl hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent"
    >
      {exporting ? 'Preparing...' : 'Download PNG'}
    </button>
  );
}

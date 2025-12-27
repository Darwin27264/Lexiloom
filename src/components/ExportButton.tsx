import { useState } from 'react';
import { toPng } from 'html-to-image';
import { PrimaryButton } from './PrimaryButton';

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
    <PrimaryButton onClick={handleExport} disabled={exporting}>
      {exporting ? 'Preparing...' : 'Download PNG'}
    </PrimaryButton>
  );
}

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
}

export function SEO({
  title = 'Lexiloom — Minimal Word & Definition Wallpaper Generator | Free Online Tool',
  description = 'Create clean, aesthetic wallpapers from meaningful words, definitions, Japanese and Chinese concepts with pinyin and romaji. Free browser-based wallpaper generator for phone and desktop. Turn words into beautiful, minimal wallpapers instantly.',
  keywords = 'wallpaper generator, word wallpaper, definition wallpaper, aesthetic wallpaper, minimal wallpaper, typography wallpaper, Japanese wallpaper, Chinese wallpaper, pinyin wallpaper, romaji wallpaper, vocabulary wallpaper, learning wallpaper, phone wallpaper, desktop wallpaper, free wallpaper tool, online wallpaper maker, word art generator, definition art, minimalist design tool',
  canonical,
}: SEOProps) {
  const location = useLocation();
  const baseUrl = 'https://lexiloom.com';
  const canonicalUrl = canonical || `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    };

    updateOGTag('og:title', title);
    updateOGTag('og:description', description);
    updateOGTag('og:url', canonicalUrl);

    // Update Twitter tags
    const updateTwitterTag = (name: string, content: string) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (!twitterTag) {
        twitterTag = document.createElement('meta');
        twitterTag.setAttribute('name', name);
        document.head.appendChild(twitterTag);
      }
      twitterTag.setAttribute('content', content);
    };

    updateTwitterTag('twitter:title', title);
    updateTwitterTag('twitter:description', description);
    updateTwitterTag('twitter:url', canonicalUrl);
  }, [title, description, keywords, canonicalUrl]);

  return null;
}

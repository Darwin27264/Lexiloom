import { Link } from 'react-router-dom';
import { SEO } from './SEO';
import { PageLayout } from './PageLayout';
import { blogPosts } from '../data/blogPosts';

export function BlogListing() {
  return (
    <>
      <SEO
        title="Blog | Lexiloom — Minimal Design, Typography & Word Wallpapers"
        description="Tips and inspiration for minimalist wallpapers, typography, and meaningful words. Learn how to create aesthetic lock screens and reduce digital clutter with Lexiloom."
        canonical="https://lexiloom.com/blog"
        keywords="minimalist blog, word wallpaper tips, typography design, minimal design, aesthetic wallpaper, lock screen ideas, Lexiloom blog"
      />
      <PageLayout title="Blog" showBack backTo="/" backLabel="Home">
        <p className="text-secondary mb-10 animate-fade-in">
          Ideas and inspiration for minimal design, typography, and turning meaningful words into wallpapers.
        </p>
        <ul className="space-y-8 animate-fade-in">
          {blogPosts.map((post) => (
            <li key={post.slug} className="border-b border-subtle pb-8 last:border-0">
              <Link
                to={`/blog/${post.slug}`}
                className="group block"
                aria-label={`Read: ${post.title}`}
              >
                <h2 className="text-xl lg:text-2xl font-medium text-primary group-hover:text-accent transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-secondary text-sm mb-3 line-clamp-2">
                  {post.metaDescription}
                </p>
                <span className="text-xs text-secondary">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {' · '}
                  {post.readTime} min read
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </PageLayout>
    </>
  );
}

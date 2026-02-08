import { useParams, Link } from 'react-router-dom';
import { SEO } from './SEO';
import { PageLayout } from './PageLayout';
import { getPostBySlug } from '../data/blogPosts';

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <PageLayout title="Post not found" showBack backTo="/blog" backLabel="Blog">
        <p className="text-secondary">
          This blog post could not be found.{' '}
          <Link to="/blog" className="text-accent hover:underline">
            Back to blog
          </Link>
        </p>
      </PageLayout>
    );
  }

  const canonical = `https://lexiloom.com/blog/${post.slug}`;

  return (
    <>
      <SEO
        title={`${post.title} | Lexiloom Blog`}
        description={post.metaDescription}
        keywords={post.metaKeywords}
        canonical={canonical}
      />
      <PageLayout showBack backTo="/blog" backLabel="Blog">
        <article className="animate-fade-in">
          <header className="mb-10">
            <h1 className="text-3xl lg:text-4xl font-light text-primary leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-sm text-secondary">
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              {' · '}
              {post.readTime} min read
            </p>
          </header>
          <div className="space-y-8 text-secondary">
            {post.sections.map((section, i) => (
              <section key={i}>
                {section.heading && (
                  <h2 className="text-xl font-medium text-primary mb-3 mt-10 first:mt-0">
                    {section.heading}
                  </h2>
                )}
                <div className="space-y-3">
                  {section.paragraphs.map((para, j) => (
                    <p key={j} className="leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <footer className="mt-12 pt-8 border-t border-subtle">
            <Link
              to="/app"
              className="inline-block text-accent hover:underline font-medium"
            >
              Create your own word wallpaper →
            </Link>
          </footer>
        </article>
      </PageLayout>
    </>
  );
}

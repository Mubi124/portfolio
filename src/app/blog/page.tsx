import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog — Design Notes & Insights',
  description: 'Thoughts on UI/UX, product design, motion, and the craft of building digital experiences by Mubashir Ali.',
  openGraph: {
    title: 'Blog — Mubashir Ali',
    description: 'Thoughts on UI/UX, product design, motion, and the craft of building digital experiences.',
    url: 'https://www.mubashiralidesign.com/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog — Mubashir Ali | UI/UX Designer',
    description: 'Thoughts on UI/UX, product design, motion, and the craft of building digital experiences.',
  },
  alternates: { canonical: 'https://www.mubashiralidesign.com/blog' },
};

export const revalidate = 60;

interface SanityImage {
  asset?: {
    _ref?: string;
  };
}

interface Post {
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  category?: string;
  coverImage?: SanityImage;
  publishedAt?: string;
}

async function getPosts(): Promise<Post[]> {
  return await client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      title, slug, excerpt, category, coverImage, publishedAt
    }`
  );
}

function urlFor(image?: SanityImage) {
  if (!image?.asset?._ref) return null;
  const ref = image.asset._ref;
  const match = ref.match(/^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/);
  if (!match) return null;
  return `https://cdn.sanity.io/images/6272nx4u/production/${match[1]}-${match[2]}.${match[3]}`;
}

function formatDate(date: string) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default async function BlogPage() {
  const posts = await getPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', padding: '8rem 2rem 6rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Back to Home */}
        <Link
          href="/"
          className="blog-back-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: '#b3b3b3',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            letterSpacing: '0.01em',
            marginBottom: '3rem',
            padding: '0.5rem 1rem',
            borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.03)',
            transition: 'color 0.2s, border-color 0.2s, background 0.2s',
          }}
        >
          <span aria-hidden="true" style={{ fontSize: '1rem', lineHeight: 1 }}>←</span>
          Back to Home
        </Link>

        <div style={{ marginBottom: '5rem' }}>

          <p style={{ fontSize: '0.75rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#e8c97a', marginBottom: '1rem', fontWeight: 700 }}>The Blog</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>Design Notes & Insights</h1>
          <p style={{ color: '#888', fontSize: '1.1rem', marginTop: '1.5rem', maxWidth: '560px' }}>Thoughts on UI/UX, product design, motion, and the craft of building digital experiences.</p>
        </div>

        {featured && (
          <Link href={`/blog/${featured.slug?.current}`} style={{ textDecoration: 'none' }}>
            <article className="featured-post" style={{ display: 'flex', gap: '3rem', background: '#121212', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: '4rem', alignItems: 'stretch' }}>
              {urlFor(featured.coverImage) && (
                <div style={{ flex: '0 0 55%', position: 'relative' }}>
                  <Image
                    src={urlFor(featured.coverImage)!}
                    alt={featured.title || 'Featured post cover image'}
                    width={1200}
                    height={675}
                    priority
                    style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '380px' }}
                  />
                </div>
              )}
              <div style={{ flex: '1', padding: '3rem 3rem 3rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#0a0a0a', background: '#e8c97a', padding: '0.35rem 0.85rem', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 800 }}>{featured.category}</span>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>{formatDate(featured.publishedAt || '')}</span>
                </div>
                <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '1.25rem', letterSpacing: '-0.02em' }}>{featured.title}</h2>
                <p style={{ fontSize: '1.05rem', color: '#a0a0a0', lineHeight: 1.6, marginBottom: '2rem' }}>{featured.excerpt}</p>
                <span style={{ color: '#e8c97a', fontWeight: 700, fontSize: '0.95rem' }}>Read article →</span>
              </div>
            </article>
          </Link>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2.5rem' }}>
          {rest.map((post: Post, i: number) => (
            <Link key={i} href={`/blog/${post.slug?.current}`} style={{ textDecoration: 'none' }}>
              <article className="blog-card" style={{ background: '#121212', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', height: '100%', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
                {urlFor(post.coverImage) && (
                  <div style={{ overflow: 'hidden', height: '240px' }}>
                    <Image
                      src={urlFor(post.coverImage)!}
                      alt={post.title || 'Blog post cover image'}
                      width={600}
                      height={400}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                <div style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.68rem', color: '#e8c97a', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>{post.category}</span>
                    <span style={{ fontSize: '0.75rem', color: '#666' }}>·</span>
                    <span style={{ fontSize: '0.75rem', color: '#666' }}>{formatDate(post.publishedAt || '')}</span>
                  </div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff', margin: '0 0 0.85rem', lineHeight: 1.25, letterSpacing: '-0.01em' }}>{post.title}</h2>
                  <p style={{ fontSize: '0.95rem', color: '#a0a0a0', lineHeight: 1.55 }}>{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>No posts yet. Check back soon.</p>
          </div>
        )}
      </div>

      <style>{`
        .blog-card:hover { transform: translateY(-6px); border-color: rgba(232,201,122,0.3) !important; }
        .blog-back-btn:hover { color: #e8c97a !important; border-color: rgba(232,201,122,0.35) !important; background: rgba(232,201,122,0.06) !important; }
        @media (max-width: 900px) {
          .featured-post { flex-direction: column !important; gap: 0 !important; }
          .featured-post > div:first-child { flex: none !important; }
          .featured-post > div:last-child { padding: 2rem !important; }
        }
      `}</style>
    </main>
  );
}

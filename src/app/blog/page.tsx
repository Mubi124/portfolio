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
            <article className="featured-post group" style={{ display: 'flex', gap: '3rem', background: '#121212', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: '4rem', alignItems: 'stretch' }}>
              <div style={{ flex: '0 0 55%', position: 'relative' }} className="overflow-hidden min-h-[320px]">
                {urlFor(featured.coverImage) ? (
                  <Image
                    src={urlFor(featured.coverImage)!}
                    alt={featured.title || 'Featured post cover image'}
                    width={1200}
                    height={675}
                    priority
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full min-h-[380px] bg-gradient-to-br from-[#1c1c1c] via-[#141414] to-[#241e12] flex flex-col items-center justify-center p-8 relative overflow-hidden border-r border-white/5">
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e8c97a_1px,transparent_1px)] [background-size:20px_20px]" />
                    <div className="relative z-10 text-center flex flex-col items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-[#e8c97a]/10 border border-[#e8c97a]/25 flex items-center justify-center text-[#e8c97a]">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7.5h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM6.75 11.625h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75zM16.5 11.625h.75v.75h-.75v-.75z" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold tracking-widest uppercase text-[#e8c97a]">{featured.category || 'Featured Article'}</span>
                    </div>
                  </div>
                )}
              </div>
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
          {rest.map((post: Post, i: number) => {
            const coverUrl = urlFor(post.coverImage);
            return (
              <Link key={i} href={`/blog/${post.slug?.current}`} style={{ textDecoration: 'none' }}>
                <article className="blog-card group" style={{ background: '#121212', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease, border-color 0.3s ease' }}>
                  <div className="relative w-full aspect-video overflow-hidden bg-neutral-900 border-b border-white/5">
                    {coverUrl ? (
                      <Image
                        src={coverUrl}
                        alt={post.title || 'Blog post cover image'}
                        width={600}
                        height={338}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        className="transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#1e1a12] relative overflow-hidden flex flex-col items-center justify-center p-6 group-hover:from-[#222] group-hover:to-[#262015] transition-all duration-300">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e8c97a_1px,transparent_1px)] [background-size:16px_16px]" />
                        <div className="relative z-10 text-center flex flex-col items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-[#e8c97a]/10 border border-[#e8c97a]/20 flex items-center justify-center text-[#e8c97a]">
                            <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                          </div>
                          <span className="text-[0.7rem] font-bold tracking-widest uppercase text-[#e8c97a]/80">{post.category || 'Article'}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '1.75rem', flex: '1', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', marginBottom: '1rem' }}>
                      <span style={{ fontSize: '0.68rem', color: '#e8c97a', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>{post.category}</span>
                      <span style={{ fontSize: '0.75rem', color: '#666' }}>·</span>
                      <span style={{ fontSize: '0.75rem', color: '#666' }}>{formatDate(post.publishedAt || '')}</span>
                    </div>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff', margin: '0 0 0.85rem', lineHeight: 1.25, letterSpacing: '-0.01em' }}>{post.title}</h2>
                    <p style={{ fontSize: '0.95rem', color: '#a0a0a0', lineHeight: 1.55, marginTop: 'auto' }}>{post.excerpt}</p>
                  </div>
                </article>
              </Link>
            );
          })}
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

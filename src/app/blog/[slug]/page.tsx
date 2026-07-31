import { client } from '@/sanity/lib/client';
import type { PortableTextComponents } from '@portabletext/react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';

const PortableText = dynamic(() => import('@portabletext/react').then((mod) => mod.PortableText));

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "post" && defined(slug.current)]{ slug }`
  );
  return slugs.map((s) => ({ slug: s.slug.current }));
}

interface SanityImage {
  asset?: {
    _ref?: string;
  };
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<{ title: string; excerpt: string; coverImage?: SanityImage } | null>(
    `*[_type == "post" && slug.current == $slug][0]{ title, excerpt, coverImage }`,
    { slug }
  );
  if (!post) return {};

  function urlFor(image?: SanityImage) {
    if (!image?.asset?._ref) return null;
    const ref = image.asset._ref;
    const match = ref.match(/^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/);
    if (!match) return null;
    return `https://cdn.sanity.io/images/6272nx4u/production/${match[1]}-${match[2]}.${match[3]}`;
  }

  const ogImage = urlFor(post.coverImage) ?? 'https://www.mubashiralidesign.com/og-image.jpg';

  return {
    title: post.title,
    description: post.excerpt ?? '',
    openGraph: {
      title: post.title,
      description: post.excerpt ?? '',
      images: [{ url: ogImage }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt ?? '',
      images: [ogImage],
    },
  };
}

async function getPost(slug: string) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title, excerpt, category, coverImage, body, publishedAt
    }`,
    { slug }
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
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

const ptComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = urlFor(value);
      if (!url) return null;
      return (
        <Image
          src={url}
          alt={value?.alt || 'Article inline image'}
          width={800}
          height={500}
          style={{ width: '100%', height: 'auto', borderRadius: '12px', margin: '2.5rem 0' }}
        />
      );
    },
  },
  block: {
    h2: ({ children }) => <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#fff', margin: '3rem 0 1.25rem', letterSpacing: '-0.02em' }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', margin: '2.5rem 0 1rem' }}>{children}</h3>,
    normal: ({ children }) => <p style={{ fontSize: '1.1rem', color: '#c0c0c0', lineHeight: 1.85, margin: '0 0 1.5rem' }}>{children}</p>,
    blockquote: ({ children }) => <blockquote style={{ borderLeft: '3px solid #e8c97a', paddingLeft: '1.5rem', margin: '2rem 0', fontStyle: 'italic', color: '#d8d8d8', fontSize: '1.2rem' }}>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul style={{ color: '#c0c0c0', fontSize: '1.1rem', lineHeight: 1.8, margin: '0 0 1.5rem', paddingLeft: '1.5rem' }}>{children}</ul>,
    number: ({ children }) => <ol style={{ color: '#c0c0c0', fontSize: '1.1rem', lineHeight: 1.8, margin: '0 0 1.5rem', paddingLeft: '1.5rem' }}>{children}</ol>,
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', padding: '7rem 2rem 6rem' }}>
      <article style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Navigation row */}
        <nav aria-label="Page navigation" style={{ display: 'flex', gap: '0.75rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
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
              padding: '0.5rem 1rem',
              borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              transition: 'color 0.2s, border-color 0.2s, background 0.2s',
            }}
          >
            <span aria-hidden="true" style={{ fontSize: '1rem', lineHeight: 1 }}>←</span>
            Home
          </Link>
          <Link
            href="/blog"
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
              padding: '0.5rem 1rem',
              borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              transition: 'color 0.2s, border-color 0.2s, background 0.2s',
            }}
          >
            <span aria-hidden="true" style={{ fontSize: '1rem', lineHeight: 1 }}>←</span>
            Blog
          </Link>
        </nav>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#0a0a0a', background: '#e8c97a', padding: '0.4rem 0.9rem', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 800 }}>{post.category}</span>
          <span style={{ fontSize: '0.85rem', color: '#666' }}>{formatDate(post.publishedAt)}</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 900, color: '#fff', margin: '0 0 1.5rem', letterSpacing: '-0.03em', lineHeight: 1.05 }}>{post.title}</h1>

        {post.excerpt && (
          <p style={{ fontSize: '1.3rem', color: '#999', lineHeight: 1.5, marginBottom: '3rem' }}>{post.excerpt}</p>
        )}

        {urlFor(post.coverImage) && (
          <Image
            src={urlFor(post.coverImage)!}
            alt={post.title || 'Blog post cover image'}
            width={1200}
            height={675}
            priority
            style={{ width: '100%', height: 'auto', borderRadius: '20px', marginBottom: '3.5rem' }}
          />
        )}

        <div>
          <PortableText value={post.body} components={ptComponents} />
        </div>

        <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
          <Link href="/blog" style={{ color: '#e8c97a', fontWeight: 700, textDecoration: 'none' }}>← Read more articles</Link>
        </div>
      </article>
      <style>{`
        .blog-back-btn:hover { color: #e8c97a !important; border-color: rgba(232,201,122,0.35) !important; background: rgba(232,201,122,0.06) !important; }
      `}</style>
    </main>
  );
}

import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import CustomPortableText from '@/components/CustomPortableText';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

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
    _type?: string;
  };
  [key: string]: unknown;
}

function getImageUrl(image?: SanityImage | null): string | null {
  if (!image?.asset) return null;
  try {
    return urlFor(image).width(1200).auto('format').url();
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch<{
    title?: string;
    excerpt?: string;
    coverImage?: SanityImage;
    publishedAt?: string;
  } | null>(
    `*[_type == "post" && slug.current == $slug][0]{ title, excerpt, coverImage, publishedAt }`,
    { slug }
  );

  const fallbackTitle = "Blog Post | Mubashir Ali — UX/UI & Product Designer";
  const fallbackDescription = "Read the latest design notes and insights by Mubashir Ali.";
  const fallbackOgImage = "https://www.mubashiralidesign.com/og-image.jpg";
  const canonicalUrl = `https://www.mubashiralidesign.com/blog/${slug}`;

  if (!post) {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
      alternates: { canonical: canonicalUrl },
    };
  }

  const title = post.title ? `${post.title} | Mubashir Ali` : fallbackTitle;
  const description = post.excerpt?.trim() ? post.excerpt : fallbackDescription;
  const coverUrl = getImageUrl(post.coverImage);
  const ogImageUrl = coverUrl ?? fallbackOgImage;
  const publishedTime = post.publishedAt ?? undefined;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title ?? fallbackTitle,
      description,
      url: canonicalUrl,
      siteName: "Mubashir Ali — UX/UI & Product Designer",
      locale: "en_US",
      type: "article",
      publishedTime,
      images: [
        {
          url: ogImageUrl,
          alt: post.title ?? "Blog post cover image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title ?? fallbackTitle,
      description,
      images: [ogImageUrl],
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

function formatDate(date: string) {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const postUrl = `https://www.mubashiralidesign.com/blog/${slug}`;
  const coverUrl = getImageUrl(post.coverImage);
  const imageUrl = coverUrl ?? 'https://www.mubashiralidesign.com/og-image.jpg';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title || 'Blog Post',
    description: post.excerpt || '',
    image: [imageUrl],
    datePublished: post.publishedAt || undefined,
    author: {
      '@type': 'Person',
      name: 'Mubashir Ali',
      url: 'https://www.mubashiralidesign.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Mubashir Ali',
      url: 'https://www.mubashiralidesign.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.mubashiralidesign.com/og-image.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
  };

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', padding: '4rem 2rem 6rem' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article style={{ maxWidth: '760px', margin: '0 auto' }}>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#0a0a0a', background: '#e8c97a', padding: '0.4rem 0.9rem', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 800 }}>{post.category}</span>
          <span style={{ fontSize: '0.85rem', color: '#666' }}>{formatDate(post.publishedAt)}</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 900, color: '#fff', margin: '0 0 1.5rem', letterSpacing: '-0.03em', lineHeight: 1.05 }}>{post.title}</h1>

        {post.excerpt && (
          <p style={{ fontSize: '1.3rem', color: '#999', lineHeight: 1.5, marginBottom: '3rem' }}>{post.excerpt}</p>
        )}

        {coverUrl && (
          <Image
            src={coverUrl}
            alt={post.title || 'Blog post cover image'}
            width={1200}
            height={675}
            priority
            style={{ width: '100%', height: 'auto', borderRadius: '20px', marginBottom: '3.5rem' }}
          />
        )}

        <div>
          <CustomPortableText value={post.body} />
        </div>

        {/* Behance CTA Card */}
        <div style={{ marginTop: '4rem', padding: '2rem', background: '#121212', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', margin: '0 0 0.35rem' }}>See More Work on Behance</h3>
            <p style={{ fontSize: '0.92rem', color: '#a0a0a0', margin: 0 }}>Explore high-resolution visual presentations, UI components, and designs.</p>
          </div>
          <a
            href="https://www.behance.net/mubashirali512"
            target="_blank"
            rel="noopener noreferrer"
            className="behance-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: '#0057ff',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.9rem',
              padding: '0.8rem 1.6rem',
              borderRadius: '100px',
              textDecoration: 'none',
              transition: 'background 0.2s ease, transform 0.2s ease',
              boxShadow: '0 4px 20px rgba(0, 87, 255, 0.25)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.441-5.92 3.594 0 5.217 2.617 4.775 6.095h-7.618c.041 1.705 1.328 2.668 2.97 2.668 1.488 0 2.416-.678 2.766-1.668h2.331zm-7.708-4.22h5.176c-.053-1.487-.945-2.28-2.529-2.28-1.57 0-2.533.784-2.647 2.28zm-10.018 7.22h-6.008v-13h6.365c2.581 0 4.479 1.045 4.479 3.554 0 1.583-.877 2.625-2.072 3.125 1.636.438 2.484 1.737 2.484 3.57 0 2.946-2.428 2.751-5.248 2.751zm-3.508-8.257h3.336c1.196 0 2.052-.456 2.052-1.547 0-1.026-.811-1.445-1.956-1.445h-3.432v2.992zm0 6.008h3.582c1.472 0 2.378-.492 2.378-1.708 0-1.25-.972-1.71-2.438-1.71h-3.522v3.418z"/>
            </svg>
            Follow on Behance
          </a>
        </div>

        <div style={{ marginTop: '4rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
          <Link href="/blog" style={{ color: '#e8c97a', fontWeight: 700, textDecoration: 'none' }}>← Read more articles</Link>
        </div>
      </article>
      <style>{`
        .blog-back-btn:hover { color: #e8c97a !important; border-color: rgba(232,201,122,0.35) !important; background: rgba(232,201,122,0.06) !important; }
        .behance-btn:hover { background: #0046d1 !important; transform: translateY(-2px); }
      `}</style>
    </main>
  );
}


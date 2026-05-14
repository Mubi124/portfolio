import { client } from '@/sanity/lib/client';
import Link from 'next/link';

export const revalidate = 60;

async function getPosts() {
  return await client.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      title, slug, excerpt, category, coverImage, publishedAt
    }`
  );
}

function urlFor(image: any) {
  if (!image?.asset?._ref) return null;
  const ref = image.asset._ref;
  const match = ref.match(/^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/);
  if (!match) return null;
  return `https://cdn.sanity.io/images/6272nx4u/production/${match[1]}-${match[2]}.${match[3]}`;
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', padding: '8rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.75rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#e8c97a', marginBottom: '1rem', fontWeight: 700 }}>Blog</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>Thoughts & Insights</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {posts.map((post: any, i: number) => (
            <Link key={i} href={`/blog/${post.slug?.current}`} style={{ textDecoration: 'none' }}>
              <article style={{ background: '#121212', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden', height: '100%' }}>
                {urlFor(post.coverImage) && (
                  <img src={urlFor(post.coverImage)!} alt={post.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                )}
                <div style={{ padding: '1.5rem' }}>
                  <span style={{ fontSize: '0.7rem', color: '#e8c97a', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>{post.category}</span>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: '0.75rem 0' }}>{post.title}</h2>
                  <p style={{ fontSize: '0.95rem', color: '#a0a0a0', lineHeight: 1.5 }}>{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666' }}>No posts yet. Check back soon.</p>
        )}
      </div>
    </main>
  );
}

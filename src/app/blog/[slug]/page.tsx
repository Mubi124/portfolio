import { client } from '@/sanity/lib/client';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';

export const revalidate = 60;

async function getPost(slug: string) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title, excerpt, category, coverImage, body, publishedAt
    }`,
    { slug }
  );
}

function urlFor(image: any) {
  if (!image?.asset?._ref) return null;
  const ref = image.asset._ref;
  const match = ref.match(/^image-([a-f\d]+)-(\d+x\d+)-(\w+)$/);
  if (!match) return null;
  return `https://cdn.sanity.io/images/6272nx4u/production/${match[1]}-${match[2]}.${match[3]}`;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', padding: '8rem 2rem' }}>
      <article style={{ maxWidth: '760px', margin: '0 auto' }}>
        <span style={{ fontSize: '0.75rem', color: '#e8c97a', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>{post.category}</span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: '#fff', margin: '1rem 0 2rem', letterSpacing: '-0.02em' }}>{post.title}</h1>
        {urlFor(post.coverImage) && (
          <img src={urlFor(post.coverImage)!} alt={post.title} style={{ width: '100%', borderRadius: '16px', marginBottom: '2.5rem' }} />
        )}
        <div style={{ color: '#c0c0c0', fontSize: '1.1rem', lineHeight: 1.8 }}>
          <PortableText value={post.body} />
        </div>
      </article>
    </main>
  );
}

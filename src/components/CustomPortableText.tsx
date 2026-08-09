import React from 'react';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

export interface SanityImageValue {
  _type: 'image';
  _key?: string;
  asset?: {
    _ref?: string;
    _type?: string;
  };
  alt?: string;
  caption?: string;
  [key: string]: unknown;
}

export const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImageValue }) => {
      if (!value?.asset) return null;

      let imageUrl: string | null = null;
      try {
        imageUrl = urlFor(value).width(1200).auto('format').url();
      } catch (err) {
        console.error('Error generating image URL via @sanity/image-url:', err);
        return null;
      }

      if (!imageUrl) return null;

      const altText = value.alt || value.caption || 'Blog article inline image';

      return (
        <figure className="my-10 w-full" style={{ margin: '2.5rem 0', width: '100%' }}>
          <div
            className="relative w-full overflow-hidden rounded-xl bg-[#121212] border border-white/10 shadow-xl"
            style={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
              borderRadius: '16px',
              backgroundColor: '#121212',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Image
              src={imageUrl}
              alt={altText}
              width={1200}
              height={675}
              sizes="(max-width: 768px) 100vw, 760px"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '16px',
                objectFit: 'cover',
              }}
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
          {value.caption && (
            <figcaption
              className="mt-3 text-center text-sm text-neutral-400 font-sans"
              style={{
                marginTop: '0.75rem',
                textAlign: 'center',
                fontSize: '0.875rem',
                color: '#a0a0a0',
              }}
            >
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2
        className="text-2xl md:text-3xl font-extrabold text-white mt-12 mb-5 tracking-tight"
        style={{
          fontSize: '1.85rem',
          fontWeight: 800,
          color: '#fff',
          margin: '3rem 0 1.25rem',
          letterSpacing: '-0.02em',
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className="text-xl md:text-2xl font-bold text-white mt-10 mb-4"
        style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', margin: '2.5rem 0 1rem' }}
      >
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p
        className="text-lg text-neutral-300 leading-relaxed mb-6"
        style={{ fontSize: '1.1rem', color: '#c0c0c0', lineHeight: 1.85, margin: '0 0 1.5rem' }}
      >
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote
        className="border-l-4 border-[#e8c97a] pl-6 my-8 italic text-neutral-200 text-xl font-serif"
        style={{
          borderLeft: '3px solid #e8c97a',
          paddingLeft: '1.5rem',
          margin: '2rem 0',
          fontStyle: 'italic',
          color: '#d8d8d8',
          fontSize: '1.2rem',
        }}
      >
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className="list-disc list-inside text-lg text-neutral-300 leading-relaxed mb-6 pl-4 space-y-2"
        style={{ color: '#c0c0c0', fontSize: '1.1rem', lineHeight: 1.8, margin: '0 0 1.5rem', paddingLeft: '1.5rem' }}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className="list-decimal list-inside text-lg text-neutral-300 leading-relaxed mb-6 pl-4 space-y-2"
        style={{ color: '#c0c0c0', fontSize: '1.1rem', lineHeight: 1.8, margin: '0 0 1.5rem', paddingLeft: '1.5rem' }}
      >
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-[#e8c97a] underline underline-offset-4 hover:text-[#f0d88a] transition-colors"
          style={{ color: '#e8c97a', textDecoration: 'underline' }}
        >
          {children}
        </a>
      );
    },
  },
};

interface CustomPortableTextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  components?: PortableTextComponents;
}

export default function CustomPortableText({ value, components: customComponents }: CustomPortableTextProps) {
  if (!value) return null;
  return <PortableText value={value} components={customComponents || components} />;
}

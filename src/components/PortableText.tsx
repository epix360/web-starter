import Link from 'next/link';
import type { PortableTextComponents } from '@portabletext/react';
import { urlForImage } from '@/sanity/image';

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const src = urlForImage(value).width(1200).url();
      return (
        <figure className="my-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={value.alt || ''} className="rounded-lg" />
          {value.caption && (
            <figcaption className="mt-2 text-sm text-neutral-600">{value.caption}</figcaption>
          )}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href || '#';
      const external = /^https?:\/\//.test(href);
      if (external) {
        return (
          <a
            href={href}
            target={value?.newTab ? '_blank' : undefined}
            rel={value?.newTab ? 'noopener noreferrer' : undefined}
            className="underline underline-offset-2"
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className="underline underline-offset-2">
          {children}
        </Link>
      );
    },
    code: ({ children }) => (
      <code className="rounded bg-neutral-100 px-1 py-0.5 font-mono text-sm">{children}</code>
    ),
  },
  block: {
    h2: ({ children }) => <h2 className="mt-12 font-display text-2xl">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 font-display text-xl">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-neutral-300 pl-4 italic text-neutral-700">
        {children}
      </blockquote>
    ),
  },
};

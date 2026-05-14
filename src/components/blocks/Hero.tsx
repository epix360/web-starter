import Link from 'next/link';
import { urlForImage } from '@/sanity/image';
import { resolveLink } from '@/lib/seo';
import type { HeroBlock } from '@/lib/types';

export function Hero({ block }: { block: HeroBlock }) {
  return (
    <section className="container py-20 md:py-28">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          {block.eyebrow && (
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-brand-700">
              {block.eyebrow}
            </p>
          )}
          <h1 className="font-display text-4xl md:text-5xl">{block.heading}</h1>
          {block.subheading && (
            <p className="mt-6 text-lg text-neutral-700">{block.subheading}</p>
          )}
          {block.ctas && block.ctas.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {block.ctas.map((cta, i) => (
                <Link
                  key={i}
                  href={resolveLink(cta)}
                  target={cta.newTab ? '_blank' : undefined}
                  rel={cta.newTab ? 'noopener noreferrer' : undefined}
                  className={
                    i === 0
                      ? 'inline-flex items-center rounded-md bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700'
                      : 'inline-flex items-center rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-medium hover:bg-neutral-50'
                  }
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          )}
        </div>
        {block.image?.asset && (
          <div className="overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlForImage(block.image).width(1200).url()}
              alt={block.image.alt || ''}
              className="w-full"
            />
          </div>
        )}
      </div>
    </section>
  );
}

import type { MetadataRoute } from 'next';
import { client } from '@/sanity/client';
import { allPageSlugsQuery, allPostSlugsQuery } from '@/sanity/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const [pageSlugs, postSlugs] = await Promise.all([
    client.fetch<string[]>(allPageSlugsQuery),
    client.fetch<string[]>(allPostSlugsQuery),
  ]);

  const pageUrls = pageSlugs.map((slug) => ({
    url: `${baseUrl}/${slug === 'home' ? '' : slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: slug === 'home' ? 1 : 0.8,
  }));

  const postUrls = postSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...pageUrls, postUrls.length ? { url: `${baseUrl}/blog`, priority: 0.7 } : null, ...postUrls].filter(
    (x): x is NonNullable<typeof x> => Boolean(x),
  );
}

import 'server-only';
import type { QueryParams } from 'next-sanity';
import { client } from './client';

/**
 * Server-only Sanity fetch with Next.js cache tags.
 *
 * Usage:
 *   const page = await sanityFetch<Page>({
 *     query: pageBySlugQuery,
 *     params: { slug },
 *     tags: ['page', `page:${slug}`],
 *   });
 *
 * Revalidate via the /api/revalidate route on Sanity webhook.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === 'development' ? 0 : false,
      tags,
    },
  });
}

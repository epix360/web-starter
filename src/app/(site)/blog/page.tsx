import Link from 'next/link';
import { sanityFetch } from '@/sanity/fetch';
import { allPostsQuery } from '@/sanity/queries';
import type { PostListItem } from '@/lib/types';

export const metadata = { title: 'Blog' };

export default async function BlogIndex() {
  const posts = await sanityFetch<PostListItem[]>({
    query: allPostsQuery,
    tags: ['post'],
  });

  return (
    <div className="container py-16">
      <h1 className="font-display text-4xl">Blog</h1>
      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post._id}>
            <Link href={`/blog/${post.slug}`} className="group block">
              {post.coverImage && (
                <div className="aspect-[3/2] overflow-hidden rounded-lg bg-neutral-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.coverImage}
                    alt=""
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
              )}
              <h2 className="mt-4 font-display text-xl">{post.title}</h2>
              {post.excerpt && (
                <p className="mt-2 text-sm text-neutral-600">{post.excerpt}</p>
              )}
              <time
                dateTime={post.publishedAt}
                className="mt-2 block text-xs uppercase tracking-wide text-neutral-500"
              >
                {new Date(post.publishedAt).toLocaleDateString()}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

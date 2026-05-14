/**
 * These are hand-written types to get started.
 * Replace with auto-generated types by running: pnpm sanity:types
 * That produces src/sanity/types.ts which you should import from instead.
 */

import type { PortableTextBlock } from '@portabletext/types';

export type Link = {
  label: string;
  linkType: 'internal' | 'external';
  newTab?: boolean;
  internalSlug?: string;
  internalType?: 'page' | 'post';
  external?: string;
};

export type SiteSettings = {
  title?: string;
  description?: string;
  logo?: string;
  defaultOgImage?: string;
  primaryNav?: Link[];
  footerNav?: Link[];
  socials?: { platform: string; url: string }[];
};

export type SeoFields = {
  title?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
};

export type HeroBlock = {
  _type: 'hero';
  _key: string;
  eyebrow?: string;
  heading: string;
  subheading?: string;
  image?: { asset: { _ref: string }; alt?: string };
  ctas?: Link[];
};

export type RichTextBlock = {
  _type: 'richText';
  _key: string;
  content?: PortableTextBlock[];
};

export type CtaBlock = {
  _type: 'cta';
  _key: string;
  heading: string;
  body?: string;
  link?: Link;
};

export type Section = HeroBlock | RichTextBlock | CtaBlock;

export type Page = {
  _id: string;
  title: string;
  slug: string;
  sections?: Section[];
  seo?: SeoFields;
};

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  coverImage?: string;
  author?: { name: string; slug?: string };
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  coverImage?: { asset: { _ref: string }; alt?: string };
  body?: PortableTextBlock[];
  author?: { name: string; slug?: string; bio?: string; image?: { asset: { _ref: string } } };
  categories?: { title: string; slug: string }[];
  seo?: SeoFields;
};

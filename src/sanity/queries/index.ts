import { groq } from 'next-sanity';

// Fragments
const linkFields = groq`
  label,
  linkType,
  newTab,
  "internalSlug": internal->slug.current,
  "internalType": internal->_type,
  external
`;

const seoFields = groq`
  seo {
    title,
    description,
    noIndex,
    "ogImage": ogImage.asset->url
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    title,
    description,
    "logo": logo.asset->url,
    "defaultOgImage": defaultOgImage.asset->url,
    primaryNav[]{ ${linkFields} },
    footerNav[]{ ${linkFields} },
    socials[]
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    sections[]{
      _type,
      _key,
      // hero
      eyebrow,
      heading,
      subheading,
      image,
      ctas[]{ ${linkFields} },
      // richText
      content,
      // cta
      body,
      link{ ${linkFields} }
    },
    ${seoFields}
  }
`;

export const allPageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)][].slug.current
`;

export const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "coverImage": coverImage.asset->url,
    "author": author->{ name, "slug": slug.current }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage,
    body,
    "author": author->{ name, "slug": slug.current, bio, image },
    "categories": categories[]->{ title, "slug": slug.current },
    ${seoFields}
  }
`;

export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

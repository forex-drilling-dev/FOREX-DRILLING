import { groq } from 'next-sanity';

export const GET_ALL_POSTS_QUERY = groq`
  *[_type == "post" && status == "published" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    cover
  }
`;

export const GET_POST_BY_SLUG_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    status,
    publishedAt,
    excerpt,
    cover,
    body
  }
`;

export const GET_ALL_POST_SLUGS_QUERY = groq`
  *[_type == "post" && status == "published" && defined(slug.current)] {
    "slug": slug.current
  }
`;

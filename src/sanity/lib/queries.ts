import { groq } from 'next-sanity';

export const getProjectsQuery = groq`
  *[_type == "project"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    tags,
    "mainImage": mainImage.asset->url,
    order
  }
`;

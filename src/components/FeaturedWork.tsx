import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import FeaturedWorkClient from './FeaturedWorkClient';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

async function getProjects() {
  return await client.fetch(
    `*[_type == "project"] | order(order asc) {
      title, description, tags, image, caseStudyUrl
    }`
  );
}

export default async function FeaturedWork() {
  const projects = await getProjects();
  const projectsWithUrls = projects.map((p: any) => ({
    ...p,
    imageUrl: p.image ? urlFor(p.image).width(1400).height(900).url() : null,
  }));
  return <FeaturedWorkClient projects={projectsWithUrls} />;
}
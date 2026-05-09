import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourdomain.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    // Note: If projects are fetched dynamically from Sanity later, map over the Sanity slugs here
    // example: ...sanityProjects.map(project => ({ url: `${baseUrl}/projects/${project.slug}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 }))
  ];
}

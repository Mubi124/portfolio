import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: '6272nx4u',
  dataset: 'production',
  apiVersion: '2024-05-08',
  useCdn: true,
});

export const writeClient = createClient({
  projectId: '6272nx4u',
  dataset: 'production',
  apiVersion: '2024-05-08',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

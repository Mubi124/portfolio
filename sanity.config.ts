import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { projectSchema } from './src/sanity/schemas/project';

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  title: 'Portfolio Studio',
  schema: {
    types: [projectSchema],
  },
  plugins: [
    structureTool(),
  ],
});

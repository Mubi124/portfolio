import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { projectSchema } from './src/sanity/schemas/project';

export default defineConfig({
  basePath: '/studio',
  projectId: '6272nx4u',
  dataset: 'production',
  title: 'Portfolio Studio',
  schema: {
    types: [projectSchema],
  },
  plugins: [
    structureTool(),
  ],
});

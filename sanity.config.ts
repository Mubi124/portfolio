import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemas';

export default defineConfig({
  basePath: '/studio',
  projectId: '6272nx4u',
  dataset: 'production',
  title: 'Portfolio Studio',
  schema: { types: schemaTypes },
  plugins: [structureTool()],
});

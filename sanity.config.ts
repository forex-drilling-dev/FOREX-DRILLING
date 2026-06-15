import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { postType } from './lib/sanity/schema/post';

export default defineConfig({
  name: 'default',
  title: 'Forex Drilling CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rhvec802',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/admin',

  plugins: [structureTool()],

  schema: {
    types: [postType],
  },
});

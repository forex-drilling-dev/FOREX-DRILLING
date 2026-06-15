import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rhvec802',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-14',
  // Anonymous public reads happen in the browser (static export). The CDN host
  // (rhvec802.apicdn.sanity.io) is cacheable and instant-enough for news.
  useCdn: true,
});

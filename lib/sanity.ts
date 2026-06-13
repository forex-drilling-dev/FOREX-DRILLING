import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

/**
 * Build-time Sanity reader. Content is fetched ONLY during `next build`
 * (static export) — there is no runtime Sanity call from the shipped site.
 *
 * projectId/dataset are PUBLIC identifiers (not secrets). The dataset is
 * read with the "published" perspective, so drafts never reach the build.
 * If the env is not configured yet, the client is null and every query
 * helper returns empty — the build still succeeds.
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-10-01",
      useCdn: true,
      perspective: "published",
    })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

/**
 * Resolve a Sanity image reference to a CDN URL (cdn.sanity.io).
 * Returns null when Sanity isn't configured or no source is given.
 */
export function urlForImage(source: SanityImageSource | undefined | null) {
  if (!builder || !source) return null;
  return builder.image(source).auto("format").fit("max");
}

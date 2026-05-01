import blurMap from "./blur-data.json";

const blurLookup = blurMap as Record<string, string>;

/**
 * Resolve a /images/foo.jpg path to its optimised WebP equivalent
 * /images/optimized/foo.webp. If the optimised file doesn't exist
 * (e.g. for project covers from Sanity), the original src is returned.
 */
export function optimizedSrc(src: string): string {
  if (!src.startsWith("/images/") || src.startsWith("/images/optimized/")) {
    return src;
  }
  const stem = src.replace("/images/", "").replace(/\.(jpe?g|png)$/i, "");
  return `/images/optimized/${stem}.webp`;
}

/**
 * Lookup the precomputed blur placeholder data URL for a given image.
 * Returns undefined if no preview exists (callers should branch on this).
 */
export function blurPlaceholder(src: string): string | undefined {
  return blurLookup[src];
}

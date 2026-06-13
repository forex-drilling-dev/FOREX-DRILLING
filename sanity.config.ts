import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

/**
 * Sanity Studio config — the editorial "CMS panel".
 *
 * This file is NOT imported by the Next app and never ships to the static
 * site (out/). It powers the HOSTED Studio only:
 *   pnpm studio:dev      → local Studio at http://localhost:3333
 *   pnpm studio:deploy   → hosted Studio at https://<project>.sanity.studio
 *
 * Auth / 2FA / roles are handled entirely by Sanity. No admin code, no
 * sessions, no secrets live on the Yulpa host.
 *
 * projectId/dataset come from the same public env vars the site uses
 * (NEXT_PUBLIC_SANITY_*); SANITY_STUDIO_* are accepted as a fallback for
 * the Sanity CLI's own env convention. Set them in .env.local before
 * running the Studio.
 */
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  process.env.SANITY_STUDIO_PROJECT_ID ??
  "";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ??
  process.env.SANITY_STUDIO_DATASET ??
  "production";

export default defineConfig({
  name: "forex-drilling",
  title: "Forex Drilling — News",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});

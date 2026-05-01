export type Project = {
  slug: string;
  title: string;
  location: string;
  scope: "mining" | "exploration" | "civil" | "groundwater";
  methods: string[];
  outcomes: string;
  cover: string;
};

/**
 * Project case studies are pending real client content.
 * Populate this list (or wire up Sanity via lib/sanity.ts) when ready.
 */
export const projects: Project[] = [];

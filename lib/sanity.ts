import { createClient } from "next-sanity";
import type { Project } from "@/content/projects";
import { projects as placeholderProjects } from "@/content/projects";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion: "2024-01-01", useCdn: true })
  : null;

export async function getProjects(): Promise<Project[]> {
  if (!sanityClient) return placeholderProjects;
  const query = `*[_type == "project"] | order(_createdAt desc) { slug, title, location, scope, methods, outcomes, "cover": cover.asset->url }`;
  try {
    return await sanityClient.fetch<Project[]>(query);
  } catch {
    return placeholderProjects;
  }
}

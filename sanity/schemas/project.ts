export const projectSchema = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r: { required: () => unknown }) => r.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r: { required: () => unknown }) => r.required() },
    { name: "location", title: "Location", type: "string" },
    { name: "scope", title: "Scope", type: "string", options: { list: [{ title: "Mining", value: "mining" }, { title: "Exploration", value: "exploration" }, { title: "Civil", value: "civil" }] } },
    { name: "methods", title: "Drilling methods", type: "array", of: [{ type: "string" }] },
    { name: "outcomes", title: "Outcomes", type: "text", rows: 4 },
    { name: "cover", title: "Cover image", type: "image", options: { hotspot: true } },
  ],
};

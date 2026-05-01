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
 * Placeholder portfolio — to be replaced by Sanity CMS entries.
 * Each cover points to a local client photo (Prodrill logo already removed
 * from the source files); next/image + lib/images.ts will serve the
 * pre-optimised WebP at request time.
 */
export const projects: Project[] = [
  {
    slug: "png-copper-slope-monitoring",
    title: "Copper Mine Slope Monitoring",
    location: "Papua New Guinea",
    scope: "mining",
    methods: ["Diamond Drilling", "VWP Installation", "Inclinometers"],
    outcomes:
      "Delivered 14 geotechnical holes with full instrumentation installation supporting active pit slope monitoring program. Zero lost-time incidents.",
    cover: "/images/site-operations.jpg",
  },
  {
    slug: "greenfield-exploration-asia-pacific",
    title: "Greenfield Exploration Campaign",
    location: "Asia-Pacific",
    scope: "exploration",
    methods: ["RC Drilling", "Diamond Drilling", "Geophysical Logging"],
    outcomes:
      "Completed multi-hole exploration campaign across remote terrain with integrated Krux data capture and full geophysical logging suite.",
    cover: "/images/rig-forest.jpg",
  },
  {
    slug: "groundwater-monitoring-program",
    title: "Groundwater Monitoring Program",
    location: "Asia-Pacific",
    scope: "groundwater",
    methods: ["Sonic Drilling", "Standpipe Piezometers", "Pumping Tests"],
    outcomes:
      "Installed monitoring network across multi-site catchment: sonic-cased holes paired with standpipe piezometers, fully commissioned with baseline pump-test data delivered to client hydrogeology team.",
    cover: "/images/rig-meadow.jpg",
  },
  {
    slug: "remote-multi-rig-mobilisation",
    title: "Remote Multi-Rig Mobilisation",
    location: "Papua New Guinea",
    scope: "exploration",
    methods: ["Multi-Rig Deployment", "Diamond Drilling", "MWD"],
    outcomes:
      "Mobilised concurrent rigs across remote highland terrain. Fly-camp logistics, full crew rotation, real-time data via Krux. Programme completed on schedule with full reporting traceability.",
    cover: "/images/site-aerial-trees.jpg",
  },
];

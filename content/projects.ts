export type Project = {
  slug: string;
  title: string;
  location: string;
  scope: "mining" | "exploration" | "civil";
  methods: string[];
  outcomes: string;
  cover: string;
};

export const projects: Project[] = [
  {
    slug: "png-copper-slope-monitoring",
    title: "Copper Mine Slope Monitoring",
    location: "Papua New Guinea",
    scope: "mining",
    methods: ["Diamond Drilling", "VWP Installation", "Inclinometers"],
    outcomes: "Delivered 14 geotechnical holes with full instrumentation installation supporting active pit slope monitoring program. Zero lost-time incidents.",
    cover: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200",
  },
  {
    slug: "greenfield-exploration-asia-pacific",
    title: "Greenfield Exploration Campaign",
    location: "Asia-Pacific",
    scope: "exploration",
    methods: ["RC Drilling", "Diamond Drilling", "Geophysical Logging"],
    outcomes: "Completed multi-hole exploration campaign across remote terrain with integrated Krux data capture and full geophysical logging suite.",
    cover: "https://images.unsplash.com/photo-1605028925374-2ae8dfa8f5e4?w=1200",
  },
];

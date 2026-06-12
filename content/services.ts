export type ServiceCategory = "drilling" | "instrumentation" | "downhole" | "data";

export type Service = {
  slug: string;
  title: string;
  category: ServiceCategory;
  summary: string;
  body: string;
  applications: string[];
  related: string[];
};

export const services: Service[] = [
  {
    slug: "diamond-drilling",
    title: "Diamond Drilling",
    category: "drilling",
    summary: "High-recovery core drilling for precise geological and geotechnical data.",
    body: "Diamond drilling produces continuous, high-quality core samples suitable for detailed geological logging, geotechnical testing, and resource definition. We deploy diamond rigs sized for both greenfield exploration and active mine environments.",
    applications: ["Resource definition", "Geotechnical core logging", "Slope stability studies", "Deep exploration"],
    related: ["sonic-drilling", "directional-drilling", "downhole-surveying"],
  },
  {
    slug: "sonic-drilling",
    title: "Sonic Drilling",
    category: "drilling",
    summary: "Continuous, high-quality sampling in unconsolidated ground.",
    body: "Sonic drilling combines high-frequency vibration with rotation to advance casing and retrieve continuous core in overburden, tailings, and difficult ground. Our dual-head sonic/diamond rigs transition seamlessly between methods on a single hole.",
    applications: ["Tailings characterisation", "Overburden profiling", "Environmental sampling", "Geotechnical investigation"],
    related: ["diamond-drilling", "spt-push-tube", "instrumentation-installation"],
  },
  {
    slug: "directional-drilling",
    title: "Directional Drilling & Coring",
    category: "drilling",
    summary: "Controlled trajectory drilling to intersect specific targets.",
    body: "Directional drilling and coring services enable precise targeting of geological structures and ore bodies. We apply steering and deviation control to reach subsurface targets where vertical access is impractical.",
    applications: ["Targeted ore body intersection", "Multi-branch drilling", "Structure-specific sampling"],
    related: ["diamond-drilling", "downhole-surveying", "horizontal-drilling"],
  },
  {
    slug: "horizontal-drilling",
    title: "Horizontal Drilling",
    category: "drilling",
    summary: "Depressurisation and horizontal access drilling in active pits.",
    body: "Horizontal drilling, including depressurisation drilling, supports pit dewatering programs, slope stability management, and lateral access to geological features. Essential for groundwater control in active mining operations.",
    applications: ["Pit depressurisation", "Slope stability dewatering", "Lateral target access"],
    related: ["directional-drilling", "pumping-packer-testing", "instrumentation-installation"],
  },
  {
    slug: "air-mud-rotary",
    title: "Air & Mud Rotary Drilling",
    category: "drilling",
    summary: "High-penetration rate rotary drilling for varied ground conditions.",
    body: "Air and mud rotary drilling deliver fast penetration in overburden and weathered rock. We select drilling fluids and parameters to balance speed, hole condition, and sample quality for each target.",
    applications: ["Water well drilling", "Rapid hole advancement", "Monitoring well installation"],
    related: ["reverse-circulation", "spt-push-tube", "instrumentation-installation"],
  },
  {
    slug: "reverse-circulation",
    title: "Reverse Circulation (RC)",
    category: "drilling",
    summary: "High-volume chip sampling for grade control and exploration.",
    body: "RC drilling provides rapid, cost-effective chip samples for grade control, blast hole sampling, and exploration programs. We maintain strict sample integrity protocols to support reliable assay results.",
    applications: ["Grade control", "Greenfield exploration", "Blast hole sampling"],
    related: ["air-mud-rotary", "diamond-drilling", "data-acquisition"],
  },
  {
    slug: "spt-push-tube",
    title: "Standard Penetration Testing (SPT)",
    category: "drilling",
    summary: "In-situ strength testing for geotechnical programs.",
    body: "Standard Penetration Testing measures soil resistance in place, driving a split-spoon sampler under a standardised hammer blow count. SPT N-values are a critical input for foundation design and geotechnical characterisation.",
    applications: ["Foundation design", "Geotechnical characterisation", "Soil strength profiling"],
    related: ["sonic-drilling", "air-mud-rotary", "instrumentation-installation"],
  },
  {
    slug: "push-tube-sampling",
    title: "Push Tube Sampling",
    category: "drilling",
    summary: "Undisturbed soil sampling for laboratory analysis.",
    body: "Thin-walled push tubes recover undisturbed samples in soft to firm soils, preserving in-situ structure and moisture. Samples support laboratory strength and consolidation testing for foundation and geotechnical design.",
    applications: ["Undisturbed soil sampling", "Laboratory strength testing", "Consolidation analysis"],
    related: ["spt-push-tube", "sonic-drilling", "instrumentation-installation"],
  },
  {
    slug: "gas-hot-ground-drilling",
    title: "Gas & Hot Ground Drilling",
    category: "drilling",
    summary: "H2S-aware drilling with full well control.",
    body: "Drilling in gas-bearing or hot ground demands continuous gas monitoring, well-control equipment, and crews trained for H2S environments. Procedures and equipment are matched to the hazard profile of each program.",
    applications: ["H2S environments", "Geothermal programs", "Well control management"],
    related: ["air-mud-rotary", "directional-drilling", "downhole-surveying"],
  },
  {
    slug: "pumping-packer-testing",
    title: "Pumping & Packer Testing",
    category: "drilling",
    summary: "Hydraulic testing for hydrogeological characterisation.",
    body: "Pumping and packer tests quantify aquifer properties and rock mass permeability. Essential inputs for groundwater modelling, mine dewatering design, and slope depressurisation programs.",
    applications: ["Aquifer characterisation", "Rock mass permeability", "Mine dewatering design"],
    related: ["horizontal-drilling", "instrumentation-installation", "downhole-surveying"],
  },
  {
    slug: "downhole-surveying",
    title: "Downhole Surveying & Deviation Control",
    category: "downhole",
    summary: "Gyro, core orientation, and deviation control services.",
    body: "Accurate downhole surveying ensures drillhole position is known with confidence. We deploy gyro surveying, core orientation tools, and deviation control to validate hole trajectories and support geological modelling.",
    applications: ["Gyro trajectory surveys", "Oriented core marking", "Deviation management"],
    related: ["directional-drilling", "diamond-drilling", "geophysical-logging"],
  },
  {
    slug: "instrumentation-installation",
    title: "Instrumentation Installation",
    category: "instrumentation",
    summary: "VWPs, inclinometers, and standpipe piezometers, installed and commissioned.",
    body: "We install Vibrating Wire Piezometers, inclinometers, standpipe piezometers, and associated monitoring systems. Each installation is documented and commissioned to ensure data integrity from day one.",
    applications: ["Slope stability monitoring", "Groundwater monitoring", "Ground deformation tracking"],
    related: ["horizontal-drilling", "pumping-packer-testing", "geophysical-logging"],
  },
  {
    slug: "vibrating-wire-piezometers",
    title: "Vibrating Wire Piezometers (VWP)",
    category: "instrumentation",
    summary: "Pore-water pressure monitoring at discrete depths.",
    body: "Grouted-in vibrating wire piezometers measure pore-water pressure at targeted depths, with multiple sensors installed in a single hole. Readings feed slope stability assessments, dewatering design, and groundwater models.",
    applications: ["Slope stability monitoring", "Dewatering design", "Pore pressure profiling"],
    related: ["instrumentation-installation", "pumping-packer-testing", "horizontal-drilling"],
  },
  {
    slug: "inclinometers",
    title: "Inclinometers",
    category: "instrumentation",
    summary: "Lateral ground deformation measurement over time.",
    body: "Inclinometer casing installed in boreholes tracks lateral ground movement with depth. Repeat surveys build deformation profiles that support monitoring of slopes, embankments, and excavations.",
    applications: ["Slope movement monitoring", "Embankment surveillance", "Excavation monitoring"],
    related: ["instrumentation-installation", "vibrating-wire-piezometers", "diamond-drilling"],
  },
  {
    slug: "standpipe-piezometers",
    title: "Standpipe Piezometers",
    category: "instrumentation",
    summary: "Reliable groundwater level monitoring.",
    body: "Open standpipe piezometers provide simple, robust measurement of groundwater levels and their trends over time. A dependable baseline instrument for hydrogeological characterisation and long-term site monitoring.",
    applications: ["Groundwater level monitoring", "Hydrogeological baselines", "Long-term site surveillance"],
    related: ["instrumentation-installation", "vibrating-wire-piezometers", "pumping-packer-testing"],
  },
  {
    slug: "monitoring-systems",
    title: "Monitoring Systems Installation & Commissioning",
    category: "instrumentation",
    summary: "Dataloggers and telemetry, commissioned and documented.",
    body: "We install and commission the acquisition layer around downhole instruments — dataloggers, telemetry, and readout points. Every installation is verified and documented so monitoring data is trustworthy from the first reading.",
    applications: ["Automated data acquisition", "Remote telemetry", "Commissioning & baseline records"],
    related: ["instrumentation-installation", "vibrating-wire-piezometers", "inclinometers"],
  },
  {
    slug: "borehole-integrity-verification",
    title: "Borehole Integrity Verification",
    category: "downhole",
    summary: "Confirming hole condition before instrumentation or handover.",
    body: "Downhole checks verify borehole condition, casing placement, and grout integrity before instruments are installed or a hole is handed over. Identifying issues early protects both the instrumentation investment and the data it produces.",
    applications: ["Pre-instrumentation checks", "Casing & grout verification", "Hole condition assessment"],
    related: ["geophysical-logging", "downhole-surveying", "instrumentation-installation"],
  },
  {
    slug: "geophysical-logging",
    title: "Geophysical Logging",
    category: "downhole",
    summary: "Downhole geophysics for formation evaluation and verification.",
    body: "Geophysical logging services characterise formation properties downhole and verify borehole integrity. Supports geological interpretation alongside core and chip sample data.",
    applications: ["Formation evaluation", "Borehole integrity verification", "Lithological correlation"],
    related: ["downhole-surveying", "diamond-drilling", "data-acquisition"],
  },
  {
    slug: "data-acquisition",
    title: "Data Acquisition & Digital Drilling Systems",
    category: "data",
    summary: "Krux, MWD, and structured digital workflows.",
    body: "We integrate digital platforms like Krux for data collection and reporting, and Measurement While Drilling (MWD) systems for real-time downhole parameters. Data is captured accurately, traceably, and ready for client technical teams.",
    applications: ["Real-time drilling monitoring", "Structured geological reporting", "MWD interpretation support"],
    related: ["geophysical-logging", "downhole-surveying", "diamond-drilling"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

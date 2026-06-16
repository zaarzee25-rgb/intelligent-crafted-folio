// Centralized dummy data — designed to be drop-in replaced by Supabase queries.
// Every shape here mirrors a future DB table.

export const profile = {
  name: "Arif Pratama",
  initials: "AP",
  role: "IoT Engineer · Fullstack Developer · Researcher",
  location: "Jakarta, Indonesia",
  tagline: "Building Intelligent Systems Through IoT, Software, and Research",
  subtitle:
    "I design and ship production-grade IoT platforms, end-to-end web systems, and applied research — bridging embedded hardware, cloud infrastructure, and human-centered software.",
  email: "hello@arifpratama.dev",
  phone: "+62 812 0000 0000",
  resumeUrl: "#",
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/6281200000000",
    email: "mailto:hello@arifpratama.dev",
  },
};

export const stats = [
  { label: "Projects Delivered", value: "50+" },
  { label: "Research Works", value: "10+" },
  { label: "Years Experience", value: "5+" },
  { label: "Development Hours", value: "1000+" },
];

export const timeline = [
  { year: "2024 — Present", title: "Senior IoT & Platform Engineer", org: "Independent Consultant", body: "Designing distributed sensor networks and dashboards for industrial clients." },
  { year: "2022 — 2024", title: "Fullstack Engineer", org: "PT Nusantara Digital", body: "Built Laravel + React platforms serving 120k+ monthly users." },
  { year: "2020 — 2022", title: "Embedded Systems Engineer", org: "Smart City Initiative", body: "Deployed ESP32 fleets for environmental monitoring across 14 districts." },
  { year: "2019 — 2020", title: "Research Assistant — IoT Lab", org: "Universitas Indonesia", body: "Published work on LoRaWAN mesh reliability under tropical conditions." },
];

export const education = [
  { degree: "M.Sc. Computer Engineering", school: "Universitas Indonesia", year: "2022" },
  { degree: "B.Eng. Electrical & Information Engineering", school: "Institut Teknologi Bandung", year: "2019" },
];

export const values = [
  { title: "Engineering Rigor", body: "Measured decisions. Tested systems. Production over prototype." },
  { title: "Research Mindset", body: "Read the paper. Run the experiment. Question the assumption." },
  { title: "Human-Centered", body: "Hardware, code, and dashboards are useless without the operator who reads them." },
  { title: "Compounding Quality", body: "Small, consistent improvements outperform heroic rewrites." },
];

export type SkillCategory = {
  id: string;
  name: string;
  description: string;
  items: { name: string; level: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "iot",
    name: "IoT & Embedded",
    description: "From microcontroller firmware to LoRa gateways and MQTT brokers.",
    items: [
      { name: "ESP32", level: 95 },
      { name: "Arduino", level: 92 },
      { name: "Raspberry Pi", level: 88 },
      { name: "LoRaWAN", level: 85 },
      { name: "MQTT", level: 90 },
      { name: "Modbus / RS-485", level: 80 },
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    description: "Type-safe, accessible, performant interfaces.",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 93 },
      { name: "TailwindCSS", level: 95 },
      { name: "Framer Motion", level: 85 },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    description: "APIs, queues, schemas, and observability.",
    items: [
      { name: "Node.js", level: 92 },
      { name: "Laravel", level: 88 },
      { name: "Python", level: 90 },
      { name: "PostgreSQL", level: 88 },
      { name: "Redis", level: 80 },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    description: "Ship to production with confidence.",
    items: [
      { name: "Docker", level: 88 },
      { name: "Firebase", level: 85 },
      { name: "Supabase", level: 90 },
      { name: "Cloudflare", level: 82 },
      { name: "Git / CI", level: 92 },
    ],
  },
  {
    id: "ai",
    name: "AI & Data",
    description: "Applied ML for edge devices and analytics.",
    items: [
      { name: "TensorFlow", level: 82 },
      { name: "PyTorch", level: 75 },
      { name: "Pandas / NumPy", level: 88 },
      { name: "TinyML", level: 78 },
    ],
  },
  {
    id: "research",
    name: "Research",
    description: "Literature review, experiment design, writing.",
    items: [
      { name: "Academic Writing", level: 88 },
      { name: "LaTeX", level: 85 },
      { name: "Statistical Analysis", level: 82 },
      { name: "Systematic Review", level: 80 },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  category: "IoT" | "Research" | "Web" | "Mobile" | "AI";
  summary: string;
  tags: string[];
  year: string;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  { id: "p1", title: "AtmosNet — Air Quality Mesh", category: "IoT", summary: "LoRa-based mesh of 240 ESP32 nodes streaming PM2.5 and NO₂ telemetry to a real-time dashboard.", tags: ["ESP32", "LoRaWAN", "InfluxDB", "Next.js"], year: "2024", github: "#", demo: "#" },
  { id: "p2", title: "HarvestOS — Smart Greenhouse", category: "IoT", summary: "Closed-loop control system for hydroponic farms with predictive irrigation.", tags: ["Raspberry Pi", "MQTT", "Python"], year: "2024", github: "#", demo: "#" },
  { id: "p3", title: "Lentera — Logistics Platform", category: "Web", summary: "Multi-tenant fleet management with route optimization and driver mobile app.", tags: ["Next.js", "PostgreSQL", "Mapbox"], year: "2024", github: "#", demo: "#" },
  { id: "p4", title: "Pulse — Clinic SaaS", category: "Web", summary: "Appointment, billing, and EMR system serving 18 clinics across Java.", tags: ["Laravel", "React", "Stripe"], year: "2023", github: "#", demo: "#" },
  { id: "p5", title: "Edge Anomaly Detector", category: "AI", summary: "On-device anomaly detection for industrial vibration sensors using TinyML.", tags: ["TensorFlow Lite", "ESP32", "C++"], year: "2024", github: "#" },
  { id: "p6", title: "VoxResearch — Survey Engine", category: "Web", summary: "Adaptive longitudinal survey platform used by 3 university research groups.", tags: ["NestJS", "React", "Postgres"], year: "2023", github: "#", demo: "#" },
  { id: "p7", title: "LoRa Mesh Reliability Study", category: "Research", summary: "Empirical analysis of LoRa packet loss under monsoon conditions. Published.", tags: ["LoRaWAN", "MATLAB", "R"], year: "2023", demo: "#" },
  { id: "p8", title: "Jaga — Personal Safety App", category: "Mobile", summary: "Offline-first safety app with silent SOS and trusted-contact mesh.", tags: ["React Native", "Supabase"], year: "2024", github: "#", demo: "#" },
  { id: "p9", title: "GridLens — Substation Monitor", category: "IoT", summary: "Modbus-to-cloud bridge for medium-voltage substation telemetry.", tags: ["Modbus", "Node.js", "TimescaleDB"], year: "2024", github: "#" },
  { id: "p10", title: "Karya — Freelance Marketplace", category: "Web", summary: "Two-sided marketplace with escrow payments and dispute workflow.", tags: ["Next.js", "Stripe", "Supabase"], year: "2023", demo: "#" },
  { id: "p11", title: "TaniBot — Field Robot Controller", category: "AI", summary: "ROS2 controller for an autonomous row-crop scouting robot.", tags: ["ROS2", "Python", "OpenCV"], year: "2024", github: "#" },
  { id: "p12", title: "Sinkronisasi — Offline POS", category: "Mobile", summary: "Offline-first POS for traditional markets with conflict-free sync.", tags: ["Flutter", "CRDT", "Supabase"], year: "2023", github: "#", demo: "#" },
];

export const projectFilters: ("All" | Project["category"])[] = ["All", "IoT", "Research", "Web", "Mobile", "AI"];

export type Research = {
  id: string;
  type: "Journal" | "Conference" | "Thesis" | "Preprint";
  title: string;
  venue: string;
  year: string;
  abstract: string;
  link?: string;
};

export const research: Research[] = [
  { id: "r1", type: "Journal", title: "LoRa Mesh Reliability Under Tropical Monsoon Conditions", venue: "IEEE IoT Journal", year: "2024", abstract: "Field study of 180 nodes across 14 months quantifying packet loss vs. precipitation intensity.", link: "#" },
  { id: "r2", type: "Conference", title: "TinyML for Predictive Maintenance on ESP32-S3", venue: "IEEE ICCE Asia", year: "2024", abstract: "Sub-200KB anomaly detection model achieving 94% F1 on rotating machinery.", link: "#" },
  { id: "r3", type: "Journal", title: "Edge-Cloud Trade-offs in Smart Agriculture", venue: "Computers and Electronics in Agriculture", year: "2023", abstract: "Cost and latency comparison across three architectures for greenhouse control.", link: "#" },
  { id: "r4", type: "Conference", title: "A CRDT Approach to Offline POS Synchronization", venue: "ACM SOSP Workshop", year: "2023", abstract: "Operational-transform alternative for low-connectivity retail environments.", link: "#" },
  { id: "r5", type: "Preprint", title: "Survey: Federated Learning on Microcontrollers", venue: "arXiv", year: "2024", abstract: "Survey of 47 papers covering memory, energy, and convergence constraints.", link: "#" },
  { id: "r6", type: "Thesis", title: "Adaptive Sampling Strategies for Battery-Constrained Sensor Nodes (M.Sc.)", venue: "Universitas Indonesia", year: "2022", abstract: "Proposes a reinforcement-learning controller that extends node life by 38%.", link: "#" },
  { id: "r7", type: "Conference", title: "Modbus-to-MQTT Bridging Patterns for Legacy SCADA", venue: "IEEE ISGT", year: "2023", abstract: "Pattern catalog and benchmark for utility-grade telemetry pipelines.", link: "#" },
  { id: "r8", type: "Journal", title: "Human Factors in Operator Dashboards for Industrial IoT", venue: "International Journal of HCI", year: "2024", abstract: "Mixed-methods study with 42 control-room operators across 6 plants.", link: "#" },
];

export const services = [
  {
    id: "s1",
    title: "IoT Development",
    description: "End-to-end IoT systems — from firmware to dashboards.",
    features: ["Firmware (ESP32 / STM32)", "LoRa / MQTT / Modbus", "Time-series storage", "Operator dashboards"],
    benefits: ["Production-grade reliability", "Vendor-neutral architecture", "Audit-ready telemetry"],
  },
  {
    id: "s2",
    title: "Fullstack Development",
    description: "Type-safe web platforms with deliberate architecture.",
    features: ["Next.js / Laravel", "PostgreSQL / Supabase", "Auth & RBAC", "CI/CD"],
    benefits: ["Faster iteration", "Lower maintenance cost", "Scales with the team"],
  },
  {
    id: "s3",
    title: "Dashboard Development",
    description: "Operator-grade dashboards designed with humans in mind.",
    features: ["Real-time streaming", "Alerting & escalation", "Role-based views", "Export & audit"],
    benefits: ["Faster MTTR", "Better operator trust", "Lower training time"],
  },
  {
    id: "s4",
    title: "Research Assistance",
    description: "Methodology, experiment design, and academic writing support.",
    features: ["Literature review", "Statistical analysis", "LaTeX & figures", "Reviewer-ready drafts"],
    benefits: ["Higher acceptance rate", "Faster turnaround", "Defensible methodology"],
  },
  {
    id: "s5",
    title: "System Analysis",
    description: "Independent review of architecture, performance, and security.",
    features: ["Architecture review", "Performance profiling", "Threat modeling", "Migration planning"],
    benefits: ["Clear roadmap", "De-risked decisions", "Documented rationale"],
  },
  {
    id: "s6",
    title: "Technology Consulting",
    description: "Fractional technology leadership for early-stage teams.",
    features: ["Hiring & interviewing", "Vendor selection", "Roadmap planning", "Investor diligence support"],
    benefits: ["Senior judgment on demand", "Cost-aware decisions", "Faster execution"],
  },
];

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: "IoT" | "AI" | "Programming" | "Research" | "Technology" | "Tutorial";
  readMinutes: number;
  date: string;
};

const articleTitles: { t: string; c: Article["category"]; e: string }[] = [
  { t: "Designing LoRa Mesh Networks That Survive Monsoon Season", c: "IoT", e: "What 14 months of field data taught me about radio planning in the tropics." },
  { t: "TinyML in Production: Lessons from 200KB Models", c: "AI", e: "Why your edge model fails in week three — and how to stop it." },
  { t: "A Pragmatic Guide to MQTT Topic Design", c: "IoT", e: "Stop reinventing the topic tree on every project." },
  { t: "TypeScript Patterns for Large Codebases", c: "Programming", e: "Discriminated unions, branded types, and the boring stuff that scales." },
  { t: "Reading Papers Without Losing Your Weekends", c: "Research", e: "A repeatable method for extracting signal from dense academic writing." },
  { t: "Why I Replaced Redux with React Query (Mostly)", c: "Programming", e: "And the three places I still reach for a global store." },
  { t: "Operator Dashboards: The Hidden UX Discipline", c: "Technology", e: "Designing for control rooms is not designing for marketing pages." },
  { t: "Building Offline-First Mobile Apps with CRDTs", c: "Tutorial", e: "A walkthrough of a real-world sync engine for retail." },
  { t: "Modbus to MQTT: Bridging Legacy SCADA", c: "IoT", e: "A pattern catalog for utility-grade telemetry pipelines." },
  { t: "Federated Learning on Microcontrollers — A Survey", c: "AI", e: "Where the field stands, and why the memory wall still wins." },
  { t: "PostgreSQL Indexing: A Field Guide", c: "Programming", e: "When to reach for BRIN, when to stop overthinking GIN." },
  { t: "Designing for Trust in Industrial IoT", c: "Technology", e: "Operators don't read your tooltip. They watch the same chart for 8 hours." },
  { t: "From Prototype to Production: An ESP32 Checklist", c: "Tutorial", e: "The 23 things I check before shipping a fleet." },
  { t: "Writing a Reviewer-Ready Methodology Section", c: "Research", e: "The structure that survives peer review." },
  { t: "Edge vs. Cloud: A Cost Model You Can Actually Use", c: "Technology", e: "Spreadsheet, not vibes." },
  { t: "Realtime Dashboards Without WebSocket Pain", c: "Tutorial", e: "Server-sent events, backpressure, and pragmatic choices." },
  { t: "The Quiet Power of Boring Technology", c: "Programming", e: "Why Laravel + Postgres is still the right answer for most teams." },
  { t: "On-Device Inference for Vibration Anomalies", c: "AI", e: "Spectral features, model compression, and a few hard-won lessons." },
  { t: "Research as a Habit, Not a Project", c: "Research", e: "How a weekly cadence outperforms heroic deadlines." },
  { t: "A Designer-Friendly Guide to Component APIs", c: "Programming", e: "Props, slots, composition — and when to say no." },
];

export const articles: Article[] = articleTitles.map((a, i) => ({
  id: `a${i + 1}`,
  title: a.t,
  excerpt: a.e,
  category: a.c,
  readMinutes: 4 + (i % 8),
  date: new Date(2025, 5 - (i % 12), 28 - (i % 26)).toISOString().slice(0, 10),
}));

export const articleCategories = ["All", "IoT", "AI", "Programming", "Research", "Technology", "Tutorial"] as const;

export const testimonials = [
  { id: "t1", name: "Sarah Lim", role: "CTO, AgriTech Co.", quote: "Arif delivered our greenhouse platform in half the time we expected, with zero downtime since launch." },
  { id: "t2", name: "Dr. Bagus Wijaya", role: "Associate Professor, UI", quote: "A rare engineer who actually reads the literature before writing the code." },
  { id: "t3", name: "Lena Hartono", role: "Head of Operations, Lentera", quote: "Our dispatcher dashboard finally feels like it was built for our team, not for a demo." },
  { id: "t4", name: "Daniel Park", role: "Founder, Pulse Health", quote: "Senior judgment, fast execution, and zero ego. Exactly what an early team needs." },
];

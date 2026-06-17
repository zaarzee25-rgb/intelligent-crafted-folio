// Centralized DB row types + helpers for the portfolio CMS.
// Used by both the admin UI and the public site so we keep one source of truth.

export interface SiteSetting<T = unknown> {
  key: string;
  value: T;
  updated_at: string;
}

export interface ProjectRow {
  id: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  year: string;
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  featured: boolean;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ResearchRow {
  id: string;
  type: string;
  title: string;
  venue: string;
  year: string;
  abstract: string;
  link: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceRow {
  id: string;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  icon: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ArticleRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string | null;
  category: string;
  read_minutes: number;
  cover_url: string | null;
  published: boolean;
  featured: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface TestimonialRow {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar_url: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SkillCategoryRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface SkillItemRow {
  id: string;
  category_id: string;
  name: string;
  level: number;
  sort_order: number;
  created_at: string;
}

export interface ContactMessageRow {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

// Format ISO date / date string in a timezone-stable, locale-stable way to avoid
// SSR/CSR hydration mismatches.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export function formatDate(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  // Use UTC components so server (UTC) and client agree.
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

/**
 * Shared types (SITE-BLUEPRINT.md §2). Extend the unions here when reusing the
 * template for another project.
 */
import type { LucideIcon } from "lucide-react";

export type NavLink = { href: string; label: string };
export type NavItem = NavLink & { children?: NavLink[] };

/** Office card + schema fields. The first office is the head office. */
export type Office = {
  id: string;
  city: string;
  street: string;
  postalCode: string;
  locality: string;
  country: string;
  countryCode: "MA";
  /** Where the address comes from (kept for the content register) */
  source: string;
};

/** Illustration variants drawn by components/ui/illustrations.tsx (no photos approved yet) */
export type IllustrationVariant = "file" | "folder" | "shield" | "globe" | "law" | "digital";

/** Licensed photo / image in /public, with its real size */
export type ImageAsset = { src: string; alt: string; width: number; height: number };

export type ServiceIconName = "file" | "folder" | "shield" | "globe";

export type Service = {
  slug: string;
  number: number;
  title: string;
  /** Full <title> of the service page (written in full, no template) */
  metaTitle: string;
  metaDescription: string;
  /** One-sentence answer to "what is this service?" (hero) */
  lead: string;
  /** FAQ ids relevant to this service */
  faqIds: string[];
  /** Short text for cards */
  summary: string;
  icon: ServiceIconName;
  intro: string[];
  audience: string;
  benefits: string;
  /** Call-to-action label (brief) */
  cta: string;
};

export type Industry = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  image?: ImageAsset;
};

export type Faq = {
  id: string;
  question: string;
  answer: string[];
  /** Internal only (not rendered): legal points to validate before final publication */
  reviewNote?: string;
};

export type PostStatus = "published" | "draft";

export type Post = {
  slug: string;
  status: PostStatus;
  /** Shown publicly on draft pages, explaining why the article is not yet approved */
  draftNote?: string;
  title: string;
  /** Full <title> (written in full, no template) */
  seoTitle: string;
  /** Meta description and listing excerpt */
  excerpt: string;
  category: string;
  author: string;
  /** ISO 8601 publication date, reduced precision allowed ("2026-11"). Omit when not verified. */
  published?: string;
  publishedLabel?: string;
  updated?: string;
  readingMinutes: number;
  keywords: string[];
  cover: { variant: IllustrationVariant; alt: string };
  /** Service slugs this article relates to */
  relatedServices: string[];
};

export type Crumb = { name: string; path: string };

/** Icon card (facts band, pillars, process steps) */
export type IconItem = { icon: LucideIcon; title: string; text: string; href?: string };

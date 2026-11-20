import type { MetadataRoute } from "next";
import { posts } from "@/lib/content/blog-posts";
import { industries, services } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

/** Indexable pages only: drafts and the provisional privacy page are excluded */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: absoluteUrl("/corridor-maroc-europe"), changeFrequency: "monthly", priority: 0.8 },
    ...(industries.length > 0 ? [{ url: absoluteUrl("/secteurs"), changeFrequency: "monthly" as const, priority: 0.7 }] : []),
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/faq"), changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.8 },
  ];
  return [
    ...pages,
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      ...(p.updated || p.published ? { lastModified: p.updated ?? p.published } : {}),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}

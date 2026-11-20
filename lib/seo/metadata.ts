import type { Metadata } from "next";
import { site } from "@/lib/site";

/**
 * buildMetadata(): full page metadata (SITE-BLUEPRINT.md §8).
 *
 * Titles are written in full on each page (`title.absolute`, no template).
 * Next.js replaces (does not merge) a parent's `openGraph`, so every page sets
 * the complete social fields here. Canonical comes from `path`.
 */
export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  noindex = false,
  publishedTime,
  modifiedTime,
  section,
  keywords,
}: {
  /** Full <title>, ~60 characters */
  title: string;
  /** ~150 characters, facts only */
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  keywords?: string[];
}): Metadata {
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: site.defaultTitle };
  return {
    title: { absolute: title },
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: site.locale,
      siteName: site.name,
      url: path,
      title,
      description,
      images: [image],
      ...(type === "article" ? { publishedTime, modifiedTime, section } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

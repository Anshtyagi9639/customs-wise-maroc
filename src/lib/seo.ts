import type { Metadata } from "next";
import { site } from "./site";

/**
 * Builds complete page metadata. Next.js replaces (does not merge) a parent's
 * `openGraph` object, so every page sets the full set of social fields here.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  absoluteTitle = false,
  noindex = false,
  publishedTime,
  modifiedTime,
  section,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  absoluteTitle?: boolean;
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  keywords?: string[];
}): Metadata {
  // Keep <title> within ~65 characters: drop the brand suffix when it would be truncated in results
  const suffixed = `${title} | ${site.name}`;
  const useAbsolute = absoluteTitle || suffixed.length > 65;
  const socialTitle = useAbsolute ? title : suffixed;
  const image = { url: "/opengraph-image", width: 1200, height: 630, alt: site.defaultTitle };
  return {
    title: useAbsolute ? { absolute: title } : title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: site.locale,
      siteName: site.name,
      url: path,
      title: socialTitle,
      description,
      images: [image],
      ...(type === "article" ? { publishedTime, modifiedTime, section } : {}),
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [image.url] },
    robots: noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

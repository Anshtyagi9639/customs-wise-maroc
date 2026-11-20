/**
 * Image registry (SITE-BLUEPRINT.md §4).
 *
 * No licensed photo or video has been approved for Customs Wise Maroc yet, so
 * the site uses its own SVG illustrations (components/ui/illustrations.tsx).
 * When photos arrive: put them in /public/images, register them here with their
 * REAL width/height and alt text, and record the source in the content register.
 */
import type { IllustrationVariant, ImageAsset } from "@/types";

/** Licensed photos (empty until supplied) */
export const photos: Record<string, ImageAsset> = {};

/**
 * Hero background media for the home page. `null` = illustration.
 * Example: { type: "video", src: "/video/hero-1080.mp4", poster: "/video/hero-poster.jpg" }
 */
export const heroMedia: { type: "image"; image: ImageAsset } | { type: "video"; src: string; poster: string } | null = null;

/** Illustration alt texts used by the sections that show them as content images */
export const illustrations = {
  about: { variant: "folder", alt: "Illustration : dossiers et documents douaniers vérifiés" },
} satisfies Record<string, { variant: IllustrationVariant; alt: string }>;

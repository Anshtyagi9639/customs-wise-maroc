import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ImageAsset, IllustrationVariant } from "@/types";
import { CoverArt } from "@/components/ui/illustrations";

/** Card with image (lazy-loaded), title, short text and "En savoir plus" (industries, guides). */
export function ImageCard({
  href,
  title,
  summary,
  image,
  fallback = "globe",
}: {
  href: string;
  title: string;
  summary: string;
  image?: ImageAsset;
  /** Illustration used when no licensed photo exists */
  fallback?: IllustrationVariant;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-brand border border-line bg-salt shadow-card transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <CoverArt variant={fallback} alt="" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-xl font-semibold text-ship">{title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{summary}</p>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-atlantic">
          En savoir plus
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

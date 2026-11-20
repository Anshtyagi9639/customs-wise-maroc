import Image from "next/image";
import type { ReactNode } from "react";
import type { ImageAsset, IllustrationVariant } from "@/types";
import { CoverArt } from "@/components/ui/illustrations";
import { cn } from "@/lib/utils/cn";

/**
 * Alternating text + image row (industries, services overview). `index`
 * alternates the image side and the background.
 */
export function FeatureRow({
  id,
  index,
  kicker,
  title,
  image,
  fallback = "globe",
  aside,
  children,
}: {
  id: string;
  index: number;
  kicker?: string;
  title: string;
  image?: ImageAsset;
  fallback?: IllustrationVariant;
  /** Replaces the image column when provided (e.g. a checklist card) */
  aside?: ReactNode;
  children: ReactNode;
}) {
  const odd = index % 2 === 1;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("scroll-mt-44 py-16 sm:py-24", odd && "bg-mist")}>
      <div data-reveal className="container-site grid items-start gap-10 lg:grid-cols-2">
        <div className={odd ? "lg:order-2" : ""}>
          {kicker && <p className="text-xs font-bold uppercase tracking-widest text-atlantic">{kicker}</p>}
          <h2 id={`${id}-title`} className="mt-2 text-3xl font-semibold text-ship">{title}</h2>
          {children}
        </div>
        <div className={odd ? "lg:order-1" : ""}>
          {aside ?? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-brand shadow-card">
              {image ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
              ) : (
                <CoverArt variant={fallback} alt="" />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

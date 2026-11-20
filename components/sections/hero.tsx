import Image from "next/image";
import type { ReactNode } from "react";
import { CorridorIllustration } from "@/components/ui/illustrations";
import { heroMedia } from "@/lib/content/images";
import { HeroVideo } from "./hero-video";

/**
 * Home hero: full-width dark background (illustration, licensed photo or video
 * from lib/content/images.ts → heroMedia) with a dark overlay, H1, supporting
 * text and buttons.
 */
export function Hero({
  kicker,
  title,
  children,
  actions,
}: {
  kicker?: string;
  /** The page H1 */
  title: string;
  /** Supporting text */
  children?: ReactNode;
  /** Buttons */
  actions?: ReactNode;
}) {
  return (
    <section className="bg-clearance relative isolate overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {heroMedia === null && (
          <>
            <div className="pattern-zellige absolute inset-0 opacity-60" />
            <div className="absolute -right-24 top-1/2 hidden w-[44rem] -translate-y-1/2 opacity-30 lg:block">
              <CorridorIllustration />
            </div>
          </>
        )}
        {heroMedia?.type === "image" && (
          // LCP image: loaded with priority, sized to the viewport
          <Image src={heroMedia.image.src} alt="" fill priority sizes="100vw" className="object-cover" />
        )}
        {heroMedia?.type === "video" && <HeroVideo src={heroMedia.src} poster={heroMedia.poster} />}
        {/* Dark overlay keeps text contrast above WCAG AA on any background */}
        <div className="absolute inset-0 bg-gradient-to-r from-overnight via-overnight/90 to-ship/60" />
      </div>
      <div className="container-site py-20 sm:py-28">
        {kicker && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cargo">{kicker}</p>}
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-6xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-starlight">{children}</div>}
        {actions && <div className="mt-10 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
}

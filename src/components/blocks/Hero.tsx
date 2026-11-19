import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "@/components/ui";
import { CorridorIllustration } from "@/components/CoverArt";

/**
 * Background media for the hero. No approved photo or video exists yet, so the
 * default is the site's own illustration. To use real media, put the file in
 * /public and pass e.g. { type: "image", src: "/hero.jpg", alt: "" }.
 */
export type HeroMedia =
  | { type: "illustration" }
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string };

export function Hero({
  eyebrow,
  title,
  children,
  actions,
  footer,
  media = { type: "illustration" },
}: {
  eyebrow?: string;
  /** The page H1 */
  title: string;
  /** Supporting text */
  children?: ReactNode;
  /** Buttons */
  actions?: ReactNode;
  /** Content under the buttons, e.g. <StatsRow /> */
  footer?: ReactNode;
  media?: HeroMedia;
}) {
  return (
    <section className="surface-dark relative isolate overflow-hidden bg-navy-950 text-white">
      <div aria-hidden={media.type !== "image" || media.alt === "" ? true : undefined} className="absolute inset-0 -z-10">
        {media.type === "illustration" && (
          <>
            <div className="pattern-zellige absolute inset-0 opacity-60" />
            <div className="absolute -right-24 top-1/2 hidden w-[44rem] -translate-y-1/2 opacity-30 lg:block">
              <CorridorIllustration />
            </div>
          </>
        )}
        {media.type === "image" && (
          // LCP image: loaded with priority, sized to the viewport
          <Image src={media.src} alt={media.alt} fill priority sizes="100vw" className="object-cover" />
        )}
        {media.type === "video" && (
          // preload="none" + poster: the video does not block the first paint; hidden for reduced motion
          <video
            className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
            src={media.src}
            poster={media.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
        )}
        {/* Dark overlay keeps text contrast above WCAG AA on any background */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/60" />
      </div>
      <Container className="py-20 sm:py-28">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cargo">{eyebrow}</p>}
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-6xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-navy-100">{children}</div>}
        {actions && <div className="mt-10 flex flex-wrap gap-3">{actions}</div>}
        {footer && <div className="mt-16">{footer}</div>}
      </Container>
    </section>
  );
}

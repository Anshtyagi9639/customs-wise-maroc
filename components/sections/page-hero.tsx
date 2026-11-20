import type { ReactNode } from "react";
import type { Crumb } from "@/types";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

/**
 * Inner-page header: breadcrumbs, H1, one-line intro, optional actions and
 * media (shown from lg up), optional extra content under it (e.g. method cards).
 */
export function PageHero({
  title,
  intro,
  trail,
  actions,
  media,
  meta,
  children,
}: {
  title: string;
  intro?: string;
  /** Breadcrumb trail without the home entry */
  trail: Crumb[];
  /** Buttons (HeroActions) */
  actions?: ReactNode;
  /** Image / illustration */
  media?: ReactNode;
  /** Small line under the intro (e.g. post date) */
  meta?: ReactNode;
  /** Content below the hero text, full width */
  children?: ReactNode;
}) {
  return (
    <section className="bg-clearance pattern-zellige">
      <div className={`container-site py-14 sm:py-20 ${media ? "grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]" : ""}`}>
        <div>
          <Breadcrumbs trail={trail} />
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-starlight">{intro}</p>}
          {meta && <div className="mt-6 text-sm text-starlight">{meta}</div>}
          {actions && <div className="mt-8">{actions}</div>}
        </div>
        {media && <div className="hidden overflow-hidden rounded-brand shadow-2xl lg:block">{media}</div>}
      </div>
      {children && <div className="container-site pb-14 sm:pb-20">{children}</div>}
    </section>
  );
}

/** Row of hero buttons */
export function HeroActions({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-3">{children}</div>;
}

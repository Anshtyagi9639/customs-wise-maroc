import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export type AsideLink = { href: string; label: string };

/**
 * Long-form layout: article column (`prose-cw` content) + sticky aside with
 * related links and a CTA card.
 */
export function ArticleLayout({
  children,
  ctaHref,
  ctaTitle = "Besoin d'aide pour vos formalités ?",
  ctaText = "Décrivez votre opération à notre équipe.",
  ctaLabel = "Demander un devis",
  linksTitle = "Liens utiles",
  links = [],
  before,
}: {
  children: ReactNode;
  ctaHref: string;
  ctaTitle?: string;
  ctaText?: string;
  ctaLabel?: string;
  linksTitle?: string;
  links?: AsideLink[];
  /** Full-width content above the columns (e.g. the cover image) */
  before?: ReactNode;
}) {
  return (
    <div className="container-site py-12">
      {before}
      <div className="grid gap-12 pt-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article className="max-w-3xl">{children}</article>
        <aside className="space-y-6 lg:sticky lg:top-36 lg:self-start" aria-label={linksTitle}>
          {links.length > 0 && (
            <div className="rounded-brand border border-line bg-mist p-6">
              <h2 className="font-sans text-base font-semibold text-ship">{linksTitle}</h2>
              <ul className="mt-4 space-y-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="flex min-h-11 items-center justify-between gap-2 text-sm font-medium text-ship hover:text-atlantic"
                    >
                      {l.label}
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="bg-clearance rounded-brand p-6">
            <p className="font-semibold">{ctaTitle}</p>
            <p className="mt-2 text-sm text-starlight">{ctaText}</p>
            <ButtonLink href={ctaHref} className="mt-5 w-full">
              {ctaLabel}
            </ButtonLink>
          </div>
        </aside>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { PageHero, HeroActions } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { TagChips } from "@/components/sections/tag-chips";
import { CTASection } from "@/components/sections/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { CorridorIllustration } from "@/components/ui/illustrations";
import { ServiceIcon } from "@/components/ui/service-icon";
import { JsonLd } from "@/components/ui/json-ld";
import { getService } from "@/lib/content";
import { corridor } from "@/lib/content/corridor";
import { enquiryHref } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/structured-data/schemas";

const path = "/corridor-maroc-europe";
const title = "Corridor Maroc – UE – Royaume-Uni : notre spécialité";
const description =
  "Procédures douanières, règles d'origine, Incoterms, Tanger Med et Algésiras : nous accompagnons vos échanges entre le Maroc, l'UE et le Royaume-Uni.";
const trail = [{ name: "Corridor Maroc–Europe", path }];

/**
 * Specialist hub. The reference anatomy also has "why it matters", regional
 * differences, process, documents and challenges sections: they need approved
 * copy from the Morocco team and are not built until it exists.
 */
export default function CorridorPage() {
  const related = corridor.relatedServices.map((slug) => getService(slug)).filter((s) => s !== undefined);
  const cta = enquiryHref("commerce-international");
  return (
    <>
      <JsonLd data={[webPageSchema(path, title, description), breadcrumbSchema(trail)]} />
      <PageHero
        trail={trail}
        title={corridor.title}
        intro={corridor.intro[0]}
        media={
          <div className="bg-overnight p-6">
            <CorridorIllustration />
          </div>
        }
        actions={
          <HeroActions>
            <ButtonLink href={cta}>Discuter de votre projet international</ButtonLink>
          </HeroActions>
        }
      />

      {/* Overview */}
      <section id="corridor" aria-labelledby="corridor-title" className="scroll-mt-36 py-16 sm:py-24">
        <div data-reveal className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="corridor-title" kicker={corridor.eyebrow} title="Un corridor stratégique" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
              {corridor.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="rounded-brand bg-mist p-8 ring-1 ring-line">
            <h3 className="font-sans text-base font-semibold text-ship">Thèmes clés</h3>
            <TagChips tags={corridor.tags} className="mt-4" />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="expertise" aria-labelledby="expertise-title" className="scroll-mt-36 bg-mist py-16 sm:py-24">
        <div data-reveal className="container-site">
          <SectionHeading id="expertise-title" kicker="Expertise" title="Nos points d'expertise" />
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {corridor.expertise.map((e) => (
              <li key={e} className="flex gap-4 rounded-brand bg-salt p-6 leading-relaxed text-overnight shadow-card ring-1 ring-line">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-atlantic" aria-hidden="true" />
                {e}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related services */}
      <section id="services-associes" aria-labelledby="related-title" className="scroll-mt-36 py-16 sm:py-24">
        <div data-reveal className="container-site">
          <SectionHeading id="related-title" kicker="Services" title="Services associés" />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full items-start gap-3 rounded-brand border border-line p-5 transition hover:border-atlantic/40 hover:bg-mist"
                >
                  <ServiceIcon icon={s.icon} className="mt-0.5 h-5 w-5 shrink-0 text-atlantic" />
                  <span>
                    <span className="font-semibold text-ship group-hover:text-atlantic">{s.title}</span>
                    <span className="mt-1 block text-sm text-ink-soft">{s.summary}</span>
                  </span>
                  <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-atlantic" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection label="Discuter de votre projet international" href={cta} />
    </>
  );
}

export const metadata: Metadata = buildMetadata({ title, description, path });

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container, ButtonLink, SectionHeading, ServiceGlyph } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/sections";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { CorridorIllustration } from "@/components/CoverArt";
import { corridor } from "@/lib/corridor";
import { getService } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Corridor Maroc – UE – Royaume-Uni : notre spécialité",
  description:
    "Procédures douanières, règles d'origine, Incoterms, Tanger Med et Algésiras : nous accompagnons vos échanges entre le Maroc, l'UE et le Royaume-Uni.",
  path: "/corridor-maroc-europe",
});

const crumbs = [
  { name: "Accueil", href: "/" },
  { name: "Corridor Maroc–Europe", href: "/corridor-maroc-europe" },
];

export default function CorridorPage() {
  const related = corridor.relatedServices.map((slug) => getService(slug)).filter((s) => s !== undefined);
  return (
    <>
      <PageHero
        crumbs={crumbs}
        title={corridor.title}
        intro={corridor.intro[0]}
        aside={
          <div className="bg-navy-950 p-6">
            <CorridorIllustration />
          </div>
        }
      >
        <ButtonLink href="/contact?service=commerce-international">Discuter de votre projet international</ButtonLink>
      </PageHero>

      <section id="corridor" aria-labelledby="corridor-title" className="scroll-mt-36 py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="corridor-title" eyebrow={corridor.eyebrow} title="Un corridor stratégique" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              {corridor.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-sand-50 p-8 ring-1 ring-navy-100">
            <h3 className="font-sans text-base font-semibold text-navy-900">Thèmes clés</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {corridor.tags.map((t) => (
                <li key={t} className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-navy-900 ring-1 ring-navy-100">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section id="expertise" aria-labelledby="expertise-title" className="scroll-mt-36 bg-sand-50 py-16 sm:py-20">
        <Container>
          <SectionHeading id="expertise-title" eyebrow="Expertise" title="Nos points d'expertise" />
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {corridor.expertise.map((e) => (
              <li key={e} className="flex gap-4 rounded-xl bg-white p-6 leading-relaxed text-ink shadow-sm ring-1 ring-navy-100">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />
                {e}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="services-associes" aria-labelledby="related-title" className="scroll-mt-36 py-16 sm:py-20">
        <Container>
          <SectionHeading id="related-title" eyebrow="Services" title="Services associés" />
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {related.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full items-start gap-3 rounded-xl border border-navy-100 p-5 transition hover:border-accent-600/40 hover:bg-sand-50"
                >
                  <ServiceGlyph icon={s.icon} className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
                  <span>
                    <span className="font-semibold text-navy-900 group-hover:text-accent-700">{s.title}</span>
                    <span className="mt-1 block text-sm text-muted">{s.summary}</span>
                  </span>
                  <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-accent-700" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand label="Discuter de votre projet international" href="/contact?service=commerce-international" />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}

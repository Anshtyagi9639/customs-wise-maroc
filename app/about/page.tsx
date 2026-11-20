import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProcessSection } from "@/components/sections/process-section";
import { OfficeList } from "@/components/sections/office-list";
import { ContactDetails } from "@/components/sections/contact-details";
import { CTASection } from "@/components/sections/cta-section";
import { CorridorIllustration } from "@/components/ui/illustrations";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { services } from "@/lib/content";
import { pillars } from "@/lib/content/pages";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/structured-data/schemas";

const path = "/about";
const title = "À propos | Customs Wise Maroc";
const description =
  "Customs Wise Maroc accompagne transporteurs, logisticiens et entreprises dans leurs formalités douanières entre le Maroc, l'UE et le Royaume-Uni.";
const trail = [{ name: "À propos", path }];

export const metadata: Metadata = buildMetadata({ title, description, path });

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[webPageSchema(path, title, description, "AboutPage"), breadcrumbSchema(trail)]} />
      <PageHero
        trail={trail}
        title="À propos de Customs Wise Maroc"
        intro="Customs Wise accompagne les professionnels du transport, de la logistique et du commerce international dans la compréhension et la préparation de leurs formalités douanières."
        media={
          <div className="bg-overnight p-6">
            <CorridorIllustration />
          </div>
        }
      />

      {/* Who we are */}
      <section aria-labelledby="who" className="py-16 sm:py-24">
        <div data-reveal className="container-site grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="who" kicker="Qui sommes-nous" title="Customs Wise, au Maroc" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                Customs Wise Maroc est la présence marocaine de{" "}
                <a href={site.mainSite} rel="noopener" className="font-semibold text-atlantic underline underline-offset-2">
                  Customs Wise
                </a>
                , spécialiste indépendant des formalités douanières au Royaume-Uni et en Irlande.
              </p>
              <p>
                Notre approche associe expertise réglementaire, connaissance des échanges internationaux et
                accompagnement professionnel pour aider les entreprises à mieux maîtriser leurs opérations
                transfrontalières.
              </p>
              <p>
                Situé au carrefour des échanges entre l&apos;Afrique et l&apos;Europe, le Maroc joue un rôle
                stratégique dans les flux commerciaux reliant l&apos;Union européenne et le Royaume-Uni. C&apos;est sur
                ce corridor que nous concentrons notre accompagnement.
              </p>
            </div>
          </div>
          <div className="space-y-5">
            <div className="rounded-brand bg-mist p-7 ring-1 ring-line">
              <h3 className="font-sans text-base font-semibold text-ship">Pour qui ?</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">
                Importateurs, exportateurs, industriels, distributeurs, transporteurs, transitaires et commissionnaires
                de transport opérant entre le Maroc, l&apos;Union européenne et le Royaume-Uni.
              </p>
            </div>
            {!site.isLive && (
              <div className="rounded-brand border border-cargo bg-cargo/15 p-7">
                <h3 className="font-sans text-base font-semibold text-ship">Statut</h3>
                <p className="mt-2 leading-relaxed text-overnight">
                  L&apos;activité de Customs Wise au Maroc est en cours de lancement. Les services présentés sur ce site
                  sont en préparation : contactez-nous pour vérifier leur disponibilité pour votre opération.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section aria-labelledby="approach" className="bg-mist py-16 sm:py-24">
        <div data-reveal className="container-site">
          <SectionHeading id="approach" kicker="Notre approche" title="Préparer plutôt que subir" />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <li key={p.title}>
                <Link
                  href={p.href ?? "/services"}
                  className="group flex h-full flex-col rounded-brand bg-salt p-7 shadow-card ring-1 ring-line transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <p.icon className="h-7 w-7 text-atlantic" aria-hidden="true" />
                  <h3 className="mt-4 font-sans text-lg font-semibold text-ship group-hover:text-atlantic">{p.title}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{p.text}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What we do */}
      <section aria-labelledby="services-list" className="py-16 sm:py-24">
        <div data-reveal className="container-site">
          <SectionHeading id="services-list" kicker="Services" title="Ce que nous proposons" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  className="group flex min-h-12 items-center justify-between gap-4 rounded-brand border border-line p-5 font-semibold text-ship hover:border-atlantic/40 hover:bg-mist hover:text-atlantic"
                >
                  {s.title}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href="/contact#enquiry">Contactez notre équipe</ButtonLink>
          </div>
        </div>
      </section>

      <ProcessSection />

      {/* Our offices */}
      <section aria-labelledby="offices-title" className="bg-clearance pattern-zellige py-16 sm:py-24">
        <div data-reveal className="container-site grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <SectionHeading id="offices-title" kicker="Nous trouver" title="Notre bureau" tone="dark" />
            <div className="mt-8">
              <OfficeList tone="dark" />
            </div>
          </div>
          <div className="self-end text-sm text-starlight">
            <ContactDetails showAddress={false} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

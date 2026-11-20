import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, HeroActions } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { FeatureRow } from "@/components/sections/feature-row";
import { ProcessSection } from "@/components/sections/process-section";
import { ImageCard } from "@/components/sections/image-card";
import { FaqList } from "@/components/sections/faq-list";
import { CTASection } from "@/components/sections/cta-section";
import { ButtonLink } from "@/components/ui/button";
import { CheckList } from "@/components/ui/check-list";
import { CoverArt } from "@/components/ui/illustrations";
import { ServiceIcon } from "@/components/ui/service-icon";
import { JsonLd } from "@/components/ui/json-ld";
import { faqs, industries, services } from "@/lib/content";
import { getServiceDetails } from "@/lib/content/service-details";
import { corridor } from "@/lib/content/corridor";
import { enquiryHref } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, servicesSchema, webPageSchema } from "@/lib/structured-data/schemas";

const path = "/services";
const title = "Nos services douaniers au Maroc | Customs Wise Maroc";
const description =
  "Déclarations douanières, assistance documentaire, conformité et commerce international entre le Maroc, l'Union européenne et le Royaume-Uni.";
const trail = [{ name: "Services", path }];

export const metadata: Metadata = buildMetadata({ title, description, path });

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[webPageSchema(path, title, description), breadcrumbSchema(trail), servicesSchema(services)]} />
      <PageHero
        trail={trail}
        title="Nos services"
        intro="Déclarations, documents, conformité et projets internationaux : un accompagnement douanier pour vos échanges entre le Maroc, l'Union européenne et le Royaume-Uni."
        media={<CoverArt variant="globe" alt="" />}
        actions={
          <HeroActions>
            <ButtonLink href="/contact#enquiry">Demander un devis</ButtonLink>
            <ButtonLink href="#overview" variant="ghost">Voir les services</ButtonLink>
          </HeroActions>
        }
      />

      {/* Overview: anchor links to each service section */}
      <section id="overview" aria-labelledby="overview-title" className="scroll-mt-36 py-16 sm:py-24">
        <div data-reveal className="container-site">
          <SectionHeading
            id="overview-title"
            kicker="Quatre services"
            title="Vos formalités, une seule équipe"
            intro="Chaque service peut être mobilisé seul ou en complément des autres, selon la nature de votre opération."
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="group flex h-full items-start gap-4 rounded-brand border border-line p-5 transition hover:border-atlantic/40 hover:bg-mist"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-brand bg-ship text-cargo">
                    <ServiceIcon icon={s.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-ship group-hover:text-atlantic">{s.title}</span>
                    <span className="mt-1 block text-sm text-ink-soft">{s.summary}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* One section per service */}
      {services.map((s, i) => (
        <FeatureRow
          key={s.slug}
          id={s.slug}
          index={i + 1}
          kicker={`Service 0${s.number}`}
          title={s.title}
          aside={
            <div className="overflow-hidden rounded-brand bg-salt shadow-card ring-1 ring-line">
              <div className="aspect-[20/9]">
                <CoverArt variant={s.icon} alt="" />
              </div>
              <div className="p-7">
                <h3 className="font-sans text-base font-semibold text-ship">Ce que nous prenons en charge</h3>
                <CheckList items={getServiceDetails(s.slug).handles} size="sm" className="mt-4" />
              </div>
            </div>
          }
        >
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{s.intro[0]}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            <span className="font-semibold text-ship">À qui s&apos;adresse ce service ? </span>
            {s.audience}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={`/services/${s.slug}`} variant="outline">
              Voir le détail <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <Link
              href={enquiryHref(s.slug)}
              className="inline-flex min-h-12 items-center px-2 text-sm font-semibold text-atlantic hover:underline"
            >
              {s.cta}
            </Link>
          </div>
        </FeatureRow>
      ))}

      <ProcessSection className="border-t border-line" />

      {industries.length > 0 && (
        <section aria-labelledby="industries-title" className="py-16 sm:py-24">
          <div data-reveal className="container-site">
            <SectionHeading id="industries-title" kicker="Secteurs" title="Secteurs d'activité" />
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <ImageCard href={`/secteurs#${ind.slug}`} title={ind.title} summary={ind.summary} image={ind.image} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Services FAQ */}
      <section aria-labelledby="faq-services" className="py-16 sm:py-24">
        <div data-reveal className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading id="faq-services" kicker="FAQ" title="Questions sur nos services" />
            <Link href="/faq" className="mt-6 inline-flex min-h-12 items-center gap-1 font-semibold text-atlantic hover:underline">
              Toutes les questions <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <FaqList items={faqs} />
        </div>
      </section>

      {/* Related specialist-area band */}
      <section aria-labelledby="specialist-band" className="bg-mist py-12">
        <div data-reveal className="container-site flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-atlantic">{corridor.eyebrow}</p>
            <h2 id="specialist-band" className="mt-2 text-2xl font-semibold text-ship">{corridor.title}</h2>
            <p className="mt-2 text-ink-soft">{corridor.intro[0]}</p>
          </div>
          <ButtonLink href="/corridor-maroc-europe" variant="outline" className="shrink-0">
            Découvrir notre spécialité <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>

      <CTASection title="Vous préparez une opération d'import ou d'export ?" />
    </>
  );
}

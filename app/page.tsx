import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { FactsBand } from "@/components/sections/facts-band";
import { AboutSection } from "@/components/sections/about-section";
import { ServiceGrid } from "@/components/sections/service-grid";
import { SpecialistFeature } from "@/components/sections/specialist-feature";
import { ImageCard } from "@/components/sections/image-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { FaqList } from "@/components/sections/faq-list";
import { EnquirySection } from "@/components/sections/enquiry-section";
import { BlogCards } from "@/components/blog/blog-card";
import { ButtonLink } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { faqs, industries } from "@/lib/content";
import { facts } from "@/lib/content/pages";
import { posts } from "@/lib/content/blog-posts";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { webPageSchema } from "@/lib/structured-data/schemas";

export const metadata: Metadata = buildMetadata({
  title: site.defaultTitle,
  description: site.defaultDescription,
  path: "/",
});

/** Home — section order from SITE-BLUEPRINT.md §6 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageSchema("/", site.defaultTitle, site.defaultDescription)} />

      {/* 1. Hero (brief: H1, intro, CTAs) */}
      <Hero
        kicker="Customs Wise Maroc · Maroc · Union européenne · Royaume-Uni"
        title="Votre partenaire en douane et en commerce international"
        actions={
          <>
            <ButtonLink href="/services" size="lg">
              Découvrez nos services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/contact#enquiry" variant="ghost" size="lg">
              Contactez notre équipe
            </ButtonLink>
          </>
        }
      >
        <p>
          Customs Wise accompagne les professionnels du transport, de la logistique et du commerce
          international dans la compréhension et la préparation de leurs formalités douanières.
        </p>
        <p>
          Notre approche associe expertise réglementaire, connaissance des échanges internationaux et
          accompagnement professionnel pour aider les entreprises à mieux maîtriser leurs opérations
          transfrontalières.
        </p>
      </Hero>

      {/* 2. Facts band */}
      <FactsBand items={facts} />

      {/* 3. About */}
      <AboutSection />

      {/* 4. Services */}
      <section aria-labelledby="services-title" className="bg-mist py-16 sm:py-24">
        <div data-reveal className="container-site">
          <SectionHeading
            id="services-title"
            kicker="Nos services"
            title="Un accompagnement douanier de bout en bout"
            intro="Déclarations, documents, conformité et projets internationaux : nous vous aidons à préparer chaque opération entre le Maroc, l'Union européenne et le Royaume-Uni."
            align="center"
          />
          <div className="mt-12">
            <ServiceGrid />
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/services" variant="outline">
              Voir tous les services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <div className="mt-12 flex flex-col items-start gap-5 rounded-brand bg-salt p-8 shadow-card ring-1 ring-line sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-lg text-ship">
              Contactez Customs Wise pour discuter de vos besoins et identifier les formalités applicables à vos
              marchandises.
            </p>
            <ButtonLink href="/contact#enquiry" className="shrink-0">
              Demander un devis
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 5. Specialist area */}
      <SpecialistFeature />

      {/* 6. Industries — only once approved sectors exist (lib/content → industries) */}
      {industries.length > 0 && (
        <section aria-labelledby="industries-title" className="bg-mist py-16 sm:py-24">
          <div data-reveal className="container-site">
            <SectionHeading id="industries-title" kicker="Secteurs" title="Secteurs d'activité" />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {industries.slice(0, 3).map((i) => (
                <li key={i.slug}>
                  <ImageCard href={`/secteurs#${i.slug}`} title={i.title} summary={i.summary} image={i.image} />
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <ButtonLink href="/secteurs" variant="outline">
                Voir tous les secteurs <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </section>
      )}

      {/* 7. Blog & insights — 3 newest articles */}
      <section aria-labelledby="blog-title" className="py-16 sm:py-24">
        <div data-reveal className="container-site">
          <SectionHeading
            id="blog-title"
            kicker="Blog & actualités"
            title="Actualités douanières au Maroc"
            intro="Réglementation, digitalisation, procédures : nos analyses pour préparer vos opérations."
          />
          <div className="mt-12">
            <BlogCards posts={posts.slice(0, 3)} />
          </div>
          <div className="mt-10">
            <ButtonLink href="/blog" variant="outline">
              Voir tous les articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section aria-labelledby="faq-title" className="bg-mist py-16 sm:py-24">
        <div data-reveal className="container-site grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading
              id="faq-title"
              kicker="FAQ"
              title="Questions fréquentes"
              intro="Les réponses aux questions que nous posent le plus souvent importateurs, exportateurs et transitaires."
            />
            <Link href="/faq" className="mt-6 inline-flex min-h-12 items-center gap-1 font-semibold text-atlantic hover:underline">
              Voir toutes les FAQ <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <FaqList items={faqs.slice(0, 3)} />
        </div>
      </section>

      {/* 9. Enquiry */}
      <EnquirySection />
    </>
  );
}

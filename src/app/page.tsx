import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container, ButtonLink, SectionHeading } from "@/components/ui";
import { ServiceCards, FaqList, PostCard, CtaBand } from "@/components/sections";
import { faqs } from "@/lib/faq";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { CorridorIllustration } from "@/components/CoverArt";

export const metadata: Metadata = pageMetadata({
  title: site.defaultTitle,
  description: site.defaultDescription,
  path: "/",
  absoluteTitle: true,
});

const corridors = [
  { label: "Maroc", detail: "Procédures ADII, ports et plateformes logistiques" },
  { label: "Union européenne", detail: "Formalités et exigences du marché européen" },
  { label: "Royaume-Uni", detail: "Procédures douanières britanniques" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="surface-dark pattern-zellige relative overflow-hidden bg-navy-900 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-navy-700/40 blur-3xl"
        />
        <Container className="relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-[1.35fr_1fr]">
          <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-500">
            Customs Wise Maroc · Maroc · Union européenne · Royaume-Uni
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-6xl">
            Votre partenaire en douane et en commerce international
          </h1>
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-navy-100">
            <p>
              Customs Wise accompagne les professionnels du transport, de la logistique et du commerce
              international dans la compréhension et la préparation de leurs formalités douanières.
            </p>
            <p>
              Notre approche associe expertise réglementaire, connaissance des échanges internationaux et
              accompagnement professionnel pour aider les entreprises à mieux maîtriser leurs opérations
              transfrontalières.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/services" className="px-7 py-3.5 text-base">
              Découvrez nos services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost" className="px-7 py-3.5 text-base">
              Contactez notre équipe
            </ButtonLink>
          </div>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-none">
            <CorridorIllustration />
          </div>
        </Container>
      </section>

      {/* Corridors strip */}
      <section aria-label="Zones couvertes" className="border-b border-navy-100 bg-sand-50">
        <Container>
          <ul className="grid divide-y divide-navy-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {corridors.map((c) => (
              <li key={c.label} className="flex items-start gap-3 py-6 sm:px-6 first:sm:pl-0">
                <Check className="mt-1 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-navy-900">{c.label}</p>
                  <p className="text-sm text-muted">{c.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Services */}
      <section aria-labelledby="services-title" className="py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="services-title"
              eyebrow="Nos services"
              title="Un accompagnement douanier de bout en bout"
              intro="Déclarations, documents, conformité et projets internationaux : nous vous aidons à préparer chaque opération entre le Maroc, l'Union européenne et le Royaume-Uni."
            />
            <Link
              href="/services"
              className="inline-flex shrink-0 items-center gap-1 font-semibold text-accent-700 hover:underline"
            >
              Voir tous les services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12">
            <ServiceCards />
          </div>
          <div className="mt-12 flex flex-col items-start gap-5 rounded-xl bg-navy-50 p-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-lg text-navy-900">
              Contactez Customs Wise pour discuter de vos besoins et identifier les formalités applicables à vos
              marchandises.
            </p>
            <ButtonLink href="/contact" className="shrink-0">
              Demander un devis
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Blog */}
      <section aria-labelledby="blog-title" className="bg-sand-50 py-20 sm:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              id="blog-title"
              eyebrow="Blog & actualités"
              title="Actualités douanières au Maroc"
              intro="Réglementation, digitalisation, procédures : nos analyses pour préparer vos opérations."
            />
            <Link href="/blog" className="inline-flex shrink-0 items-center gap-1 font-semibold text-accent-700 hover:underline">
              Tous les articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading
              id="faq-title"
              eyebrow="FAQ"
              title="Questions fréquentes"
              intro="Les réponses aux questions que nous posent le plus souvent importateurs, exportateurs et transitaires."
            />
            <Link href="/faq" className="mt-6 inline-flex items-center gap-1 font-semibold text-accent-700 hover:underline">
              Voir toutes les questions <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <FaqList items={faqs} />
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

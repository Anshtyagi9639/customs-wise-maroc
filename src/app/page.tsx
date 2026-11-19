import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Globe2, Layers, Ship } from "lucide-react";
import { Container, ButtonLink, SectionHeading } from "@/components/ui";
import { Hero } from "@/components/blocks/Hero";
import { StatsRow, type Stat } from "@/components/blocks/StatsRow";
import { ServiceCardGrid } from "@/components/blocks/ServiceCard";
import { SplitSection } from "@/components/blocks/SplitSection";
import { IndustryCard } from "@/components/blocks/IndustryCard";
import { BlogCard } from "@/components/blocks/BlogCard";
import { FaqAccordion } from "@/components/blocks/FaqAccordion";
import { EnquirySection } from "@/components/enquiry";
import { CoverArt, CorridorIllustration } from "@/components/CoverArt";
import { faqs } from "@/lib/faq";
import { posts } from "@/lib/blog";
import { corridor } from "@/lib/corridor";
import { industries } from "@/lib/industries";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: site.defaultTitle,
  description: site.defaultDescription,
  path: "/",
  absoluteTitle: true,
});

/**
 * Hero highlights. Deliberately non-numeric facts taken from the brief and the main
 * Customs Wise site — no years of experience, client counts or availability claims
 * until the Morocco team provides verified figures.
 */
const highlights: Stat[] = [
  { icon: Globe2, title: "3 zones", text: "Maroc · Union européenne · Royaume-Uni" },
  { icon: Layers, title: "4 services", text: "Déclarations, documents, conformité, commerce international" },
  { icon: Ship, title: "Tanger Med – Algésiras", text: "Le corridor entre l'Afrique et l'Europe" },
  { icon: Building2, title: "Réseau Customs Wise", text: "Expertise douanière au Royaume-Uni et en Irlande" },
];

// "Why choose us" — reformulated from the approved brief only
const reasons = [
  "Une expertise réglementaire : classification, valeur en douane, origine et documents.",
  "Une connaissance des échanges entre le Maroc, l'Union européenne et le Royaume-Uni.",
  "Un accompagnement professionnel, en amont de vos expéditions.",
  "Une approche qui vise à limiter les risques de non-conformité.",
  "Un seul interlocuteur pour vos déclarations, documents, conformité et projets internationaux.",
];

export default function HomePage() {
  const latestPosts = posts.slice(0, 3);
  return (
    <>
      {/* 1. Hero — dark background with overlay, H1, CTAs, highlights row */}
      <Hero
        eyebrow="Customs Wise Maroc · Maroc · Union européenne · Royaume-Uni"
        title="Votre partenaire en douane et en commerce international"
        actions={
          <>
            <ButtonLink href="/services" className="px-7 py-3.5 text-base">
              Découvrez nos services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost" className="px-7 py-3.5 text-base">
              Contactez notre équipe
            </ButtonLink>
          </>
        }
        footer={<StatsRow items={highlights} />}
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

      {/* 2. About */}
      <SplitSection
        id="about-title"
        eyebrow="À propos"
        title="Customs Wise, au Maroc"
        media={
          <div className="relative">
            <div aria-hidden="true" className="absolute -bottom-4 -left-4 h-full w-full rounded-2xl bg-cargo" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <CoverArt variant="folder" alt="Illustration : dossiers et documents douaniers vérifiés" />
            </div>
          </div>
        }
      >
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Customs Wise Maroc est la présence marocaine de Customs Wise, spécialiste indépendant des formalités
          douanières au Royaume-Uni et en Irlande.
        </p>
        <h3 className="mt-8 font-sans text-base font-semibold text-navy-900">Pourquoi choisir Customs Wise ?</h3>
        <ul className="mt-4 space-y-3">
          {reasons.map((r) => (
            <li key={r} className="flex gap-3 leading-relaxed text-ink">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" aria-hidden="true" />
              {r}
            </li>
          ))}
        </ul>
        <Link href="/about" className="mt-8 inline-flex items-center gap-1 font-semibold text-accent-700 hover:underline">
          En savoir plus sur nous <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </SplitSection>

      {/* 3. Services */}
      <section aria-labelledby="services-title" className="bg-navy-50 py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="services-title"
            eyebrow="Nos services"
            title="Un accompagnement douanier de bout en bout"
            intro="Déclarations, documents, conformité et projets internationaux : nous vous aidons à préparer chaque opération entre le Maroc, l'Union européenne et le Royaume-Uni."
            align="center"
          />
          <div className="mt-12">
            <ServiceCardGrid />
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href="/services" variant="secondary">
              Voir tous les services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <div className="mt-12 flex flex-col items-start gap-5 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-navy-100 sm:flex-row sm:items-center sm:justify-between">
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

      {/* 4. Specialist area — split layout, expertise list, tag chips */}
      <SplitSection
        id="corridor-title"
        eyebrow={corridor.eyebrow}
        title={corridor.title}
        tone="dark"
        reverse
        media={<CorridorIllustration />}
      >
        <p className="mt-5 text-lg leading-relaxed text-navy-100">{corridor.intro[0]}</p>
        <ul className="mt-6 space-y-3">
          {corridor.expertise.slice(0, 4).map((e) => (
            <li key={e} className="flex gap-3 text-sm leading-relaxed text-navy-100">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cargo" aria-hidden="true" />
              {e}
            </li>
          ))}
        </ul>
        <ul className="mt-7 flex flex-wrap gap-2" aria-label="Thèmes clés">
          {corridor.tags.map((t) => (
            <li key={t} className="rounded-full border border-white/25 px-3 py-1 text-xs font-medium text-white">
              {t}
            </li>
          ))}
        </ul>
        <ButtonLink href="/corridor-maroc-europe" className="mt-9">
          Découvrir notre spécialité <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </SplitSection>

      {/* 5. Industries — rendered only once approved sectors exist in lib/industries.ts */}
      {industries.length > 0 && (
        <section aria-labelledby="industries-title" className="bg-navy-50 py-20 sm:py-24">
          <Container>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading id="industries-title" eyebrow="Secteurs" title="Secteurs d'activité" />
              <Link href="/secteurs" className="inline-flex shrink-0 items-center gap-1 font-semibold text-accent-700 hover:underline">
                Tous les secteurs <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {industries.slice(0, 3).map((i) => (
                <li key={i.slug}>
                  <IndustryCard industry={i} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* 6. Blog / insights — latest published articles (up to 3) */}
      <section aria-labelledby="blog-title" className="py-20 sm:py-24">
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
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* 7. FAQ */}
      <section aria-labelledby="faq-title" className="border-t border-navy-100 py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading
              id="faq-title"
              eyebrow="FAQ"
              title="Questions fréquentes"
              intro="Les réponses aux questions que nous posent le plus souvent importateurs, exportateurs et transitaires."
            />
            <Link href="/faq" className="mt-6 inline-flex items-center gap-1 font-semibold text-accent-700 hover:underline">
              Voir toutes les FAQ <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <FaqAccordion items={faqs} />
        </Container>
      </section>

      {/* 8. Enquiry — contact details + form */}
      <EnquirySection />
    </>
  );
}

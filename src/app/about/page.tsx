import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, FileCheck2, Handshake, MapPin } from "lucide-react";
import { Container, ButtonLink, SectionHeading } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/sections";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { CorridorIllustration } from "@/components/CoverArt";
import { services } from "@/lib/services";
import { absoluteUrl, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "À propos de Customs Wise Maroc",
  description:
    "Customs Wise Maroc accompagne transporteurs, logisticiens et entreprises dans leurs formalités douanières entre le Maroc, l'UE et le Royaume-Uni.",
  path: "/about",
});

const crumbs = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/about" },
];

// Approach pillars — wording taken from the approved homepage brief
const pillars = [
  {
    icon: FileCheck2,
    title: "Expertise réglementaire",
    text: "Classification, valeur, origine, documents : les fondamentaux qui conditionnent un dédouanement sans difficulté.",
  },
  {
    icon: Compass,
    title: "Connaissance des échanges internationaux",
    text: "Une lecture des flux entre le Maroc, l'Union européenne et le Royaume-Uni, de leurs accords et de leurs contraintes logistiques.",
  },
  {
    icon: Handshake,
    title: "Accompagnement professionnel",
    text: "Une préparation en amont, avec vous, plutôt qu'une réaction au moment où la marchandise arrive au port.",
  },
];

export default function AboutPage() {
  const { address } = site.contact;
  return (
    <>
      <PageHero
        crumbs={crumbs}
        title="À propos de Customs Wise Maroc"
        intro="Customs Wise accompagne les professionnels du transport, de la logistique et du commerce international dans la compréhension et la préparation de leurs formalités douanières."
        aside={
          <div className="bg-navy-950 p-6">
            <CorridorIllustration />
          </div>
        }
      />

      <section aria-labelledby="who" className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="who" eyebrow="Qui sommes-nous" title="Customs Wise, au Maroc" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              <p>
                Customs Wise Maroc est la présence marocaine de{" "}
                <a href={site.mainSite} rel="noopener" className="font-semibold text-accent-700 underline underline-offset-2">
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
            <div className="rounded-xl bg-sand-50 p-7 ring-1 ring-navy-100">
              <h3 className="font-semibold text-navy-900">Pour qui ?</h3>
              <p className="mt-2 leading-relaxed text-muted">
                Importateurs, exportateurs, industriels, distributeurs, transporteurs, transitaires et commissionnaires
                de transport opérant entre le Maroc, l&apos;Union européenne et le Royaume-Uni.
              </p>
            </div>
            <div className="rounded-xl bg-sand-50 p-7 ring-1 ring-navy-100">
              <h3 className="flex items-center gap-2 font-semibold text-navy-900">
                <MapPin className="h-4 w-4 text-accent-600" aria-hidden="true" /> Adresse au Maroc
              </h3>
              <address className="mt-2 not-italic leading-relaxed text-muted">
                {address.street}, {address.postalCode} {address.city}, {address.country}
              </address>
            </div>
            {!site.isLive && (
              <div className="rounded-xl border border-cargo bg-cargo/15 p-7">
                <h3 className="font-semibold text-navy-900">Statut</h3>
                <p className="mt-2 leading-relaxed text-ink">
                  L&apos;activité de Customs Wise au Maroc est en cours de lancement. Les services présentés sur ce site
                  sont en préparation : contactez-nous pour vérifier leur disponibilité pour votre opération.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section aria-labelledby="approach" className="bg-sand-50 py-16 sm:py-20">
        <Container>
          <SectionHeading id="approach" eyebrow="Notre approche" title="Préparer plutôt que subir" />
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {pillars.map((p) => (
              <li key={p.title} className="rounded-xl bg-white p-7 shadow-sm ring-1 ring-navy-100">
                <p.icon className="h-7 w-7 text-accent-600" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-navy-900">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="services-list" className="py-16 sm:py-20">
        <Container>
          <SectionHeading id="services-list" eyebrow="Services" title="Ce que nous proposons" />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-navy-100 p-5 font-semibold text-navy-900 hover:border-accent-600/40 hover:bg-sand-50 hover:text-accent-700"
                >
                  {s.title}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink href="/contact">Contactez notre équipe</ButtonLink>
          </div>
        </Container>
      </section>

      <CtaBand />
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: absoluteUrl("/about"),
            name: "À propos de Customs Wise Maroc",
            inLanguage: "fr-MA",
            about: { "@id": absoluteUrl("/#organization") },
          },
        ]}
      />
    </>
  );
}

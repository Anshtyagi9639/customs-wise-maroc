import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardList, FileSearch, MessagesSquare } from "lucide-react";
import { Container, ButtonLink, SectionHeading } from "@/components/ui";
import { PageHero, CtaBand, FaqList, ServiceCards } from "@/components/sections";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { CoverArt } from "@/components/CoverArt";
import { services } from "@/lib/services";
import { faqs } from "@/lib/faq";
import { absoluteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Nos services douaniers au Maroc",
  description:
    "Déclarations douanières, assistance documentaire, conformité et commerce international entre le Maroc, l'Union européenne et le Royaume-Uni.",
  path: "/services",
});

const crumbs = [
  { name: "Accueil", href: "/" },
  { name: "Services", href: "/services" },
];

// Generic preparation steps — describes how an enquiry is handled, no operational claims
const steps = [
  {
    icon: MessagesSquare,
    title: "Vous décrivez votre opération",
    text: "Nature des marchandises, origine, destination, mode de transport et calendrier.",
  },
  {
    icon: FileSearch,
    title: "Nous identifions les formalités",
    text: "Classification, documents, règles d'origine et exigences applicables à votre flux.",
  },
  {
    icon: ClipboardList,
    title: "Nous préparons avec vous",
    text: "Vérification des informations et coordination avec les intervenants concernés.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        title="Nos services"
        intro="Déclarations, documents, conformité et projets internationaux : un accompagnement douanier pour vos échanges entre le Maroc, l'Union européenne et le Royaume-Uni."
        aside={<CoverArt variant="globe" alt="" />}
      >
        <ButtonLink href="/contact">Demander un devis</ButtonLink>
        <ButtonLink href="#services" variant="ghost">Voir les services</ButtonLink>
      </PageHero>

      <section id="services" aria-labelledby="services-title" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <SectionHeading
            id="services-title"
            eyebrow="Quatre services"
            title="Vos formalités, une seule équipe"
            intro="Chaque service peut être mobilisé seul ou en complément des autres, selon la nature de votre opération."
          />
          <div className="mt-12">
            <ServiceCards />
          </div>
        </Container>
      </section>

      <section aria-labelledby="steps-title" className="bg-sand-50 py-16 sm:py-20">
        <Container>
          <SectionHeading id="steps-title" eyebrow="Démarche" title="Comment se déroule un accompagnement" />
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-xl bg-white p-7 shadow-sm ring-1 ring-navy-100">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 font-display text-lg text-cargo">
                    {i + 1}
                  </span>
                  <s.icon className="h-5 w-5 text-accent-600" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-navy-900">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="faq-services" className="py-16 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading id="faq-services" eyebrow="FAQ" title="Questions sur nos services" />
            <Link href="/faq" className="mt-6 inline-flex items-center gap-1 font-semibold text-accent-700 hover:underline">
              Toutes les questions <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <FaqList items={faqs} />
        </Container>
      </section>

      <CtaBand title="Vous préparez une opération d'import ou d'export ?" />

      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Services de Customs Wise Maroc",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: absoluteUrl(`/services/${s.slug}`),
            })),
          },
        ]}
      />
    </>
  );
}

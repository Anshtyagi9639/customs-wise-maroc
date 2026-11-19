import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ClipboardList, FileSearch, MessagesSquare } from "lucide-react";
import { Container, ButtonLink, SectionHeading, ServiceGlyph } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/sections";
import { FaqAccordion } from "@/components/blocks/FaqAccordion";
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

      {/* Anchor links to each service section */}
      <nav aria-label="Accès rapide aux services" className="sticky top-[6.5rem] z-30 border-b border-navy-100 bg-white/95 backdrop-blur lg:top-[7.5rem]">
        <Container>
          <ul className="-mx-1 flex gap-1 overflow-x-auto py-3 text-sm">
            {services.map((s) => (
              <li key={s.slug} className="shrink-0">
                <a href={`#${s.slug}`} className="inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium text-navy-900 hover:bg-navy-50 hover:text-accent-700">
                  <ServiceGlyph icon={s.icon} className="h-4 w-4 text-accent-600" />
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <div id="services">
        {services.map((s, i) => (
          <section
            key={s.slug}
            id={s.slug}
            aria-labelledby={`${s.slug}-title`}
            className={`scroll-mt-44 py-16 sm:py-20 ${i % 2 ? "bg-sand-50" : ""}`}
          >
            <Container className="grid items-start gap-10 lg:grid-cols-2">
              <div className={i % 2 ? "lg:order-2" : ""}>
                <p className="text-xs font-bold uppercase tracking-widest text-accent-600">Service 0{s.number}</p>
                <h2 id={`${s.slug}-title`} className="mt-2 text-3xl font-semibold text-navy-900">{s.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{s.intro[0]}</p>
                <p className="mt-4 leading-relaxed text-muted">
                  <span className="font-semibold text-navy-900">À qui s&apos;adresse ce service ? </span>
                  {s.audience}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={`/services/${s.slug}`} variant="secondary">
                    Voir le détail <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </ButtonLink>
                  <Link href={`/contact?service=${s.slug}`} className="inline-flex items-center px-2 py-3 text-sm font-semibold text-accent-700 hover:underline">
                    {s.cta}
                  </Link>
                </div>
              </div>
              <div className={`overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-navy-100 ${i % 2 ? "lg:order-1" : ""}`}>
                <div className="aspect-[20/9]">
                  <CoverArt variant={s.icon} alt="" />
                </div>
                <div className="p-7">
                  <h3 className="font-sans text-base font-semibold text-navy-900">Ce que nous prenons en charge</h3>
                  <ul className="mt-4 space-y-2.5">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <section aria-labelledby="steps-title" className="border-t border-navy-100 bg-navy-50 py-16 sm:py-20">
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
          <FaqAccordion items={faqs} />
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

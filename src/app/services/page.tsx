import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Users, TrendingUp } from "lucide-react";
import { Container, ButtonLink, SectionHeading, ServiceGlyph } from "@/components/ui";
import { PageHero, CtaBand, FaqList } from "@/components/sections";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { services } from "@/lib/services";
import { faqs } from "@/lib/faq";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nos services douaniers au Maroc",
  description:
    "Déclarations douanières, assistance documentaire, conformité réglementaire et accompagnement du commerce international entre le Maroc, l'UE et le Royaume-Uni.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

const crumbs = [
  { name: "Accueil", href: "/" },
  { name: "Services", href: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        title="Nos services"
        intro="Déclarations, documents, conformité et projets internationaux : un accompagnement douanier pour vos échanges entre le Maroc, l'Union européenne et le Royaume-Uni."
      >
        <ButtonLink href="/contact">Demander un devis</ButtonLink>
        <ButtonLink href="#apercu" variant="ghost">Voir les services</ButtonLink>
      </PageHero>

      {/* Overview */}
      <section id="apercu" aria-labelledby="apercu-title" className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            id="apercu-title"
            eyebrow="Aperçu"
            title="Vos formalités, une seule équipe"
          />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="group flex h-full items-start gap-3 rounded-lg border border-navy-100 p-5 transition hover:border-accent-500/50 hover:bg-navy-50"
                >
                  <ServiceGlyph icon={s.icon} className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
                  <span className="font-semibold text-navy-900 group-hover:text-accent-700">{s.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Service sections */}
      {services.map((s, i) => (
        <section
          key={s.slug}
          id={s.slug}
          aria-labelledby={`${s.slug}-title`}
          className={`py-16 sm:py-20 ${i % 2 === 0 ? "bg-sand-50" : "bg-white"}`}
        >
          <Container className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                  <ServiceGlyph icon={s.icon} className="h-6 w-6" />
                </span>
                <span className="text-sm font-bold uppercase tracking-widest text-accent-600">Service 0{s.number}</span>
              </div>
              <h2 id={`${s.slug}-title`} className="mt-4 text-3xl font-bold tracking-tight text-navy-900">
                {s.title}
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
                {s.intro.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-navy-100">
                  <h3 className="flex items-center gap-2 font-semibold text-navy-900">
                    <Users className="h-4 w-4 text-accent-600" aria-hidden="true" />À qui s&apos;adresse ce service ?
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.audience}</p>
                </div>
                <div className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-navy-100">
                  <h3 className="flex items-center gap-2 font-semibold text-navy-900">
                    <TrendingUp className="h-4 w-4 text-accent-600" aria-hidden="true" />Quels sont les avantages ?
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.benefits}</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-navy-900 p-7 text-white shadow-lg sm:p-8">
              <h3 className="text-lg font-semibold">Ce que nous prenons en charge</h3>
              <ul className="mt-5 space-y-3">
                {s.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-navy-100">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <ButtonLink href={`/contact?service=${s.slug}`} className="mt-8 w-full text-center">
                {s.cta} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </ButtonLink>
            </div>
          </Container>
        </section>
      ))}

      {/* FAQ */}
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
          ...services.map((s) => ({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": absoluteUrl(`/services#${s.slug}`),
            name: s.title,
            description: s.intro[0],
            serviceType: s.title,
            provider: { "@id": absoluteUrl("/#organization") },
            areaServed: ["Maroc", "Union européenne", "Royaume-Uni"],
            url: absoluteUrl(`/services#${s.slug}`),
            brand: site.brand,
          })),
        ]}
      />
    </>
  );
}

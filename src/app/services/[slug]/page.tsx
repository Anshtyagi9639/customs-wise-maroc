import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Info, TrendingUp, Users, HelpCircle } from "lucide-react";
import { Container, ButtonLink, ServiceGlyph } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/sections";
import { BlogCard } from "@/components/blocks/BlogCard";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { CoverArt } from "@/components/CoverArt";
import { TrackOnMount } from "@/components/analytics/Analytics";
import { getService, services } from "@/lib/services";
import { getFaq } from "@/lib/faq";
import { posts } from "@/lib/blog";
import { absoluteUrl, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const crumbs = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: s.title, href: `/services/${s.slug}` },
  ];
  const relatedFaqs = s.faqIds.map(getFaq).filter((f) => f !== undefined);
  const relatedPosts = posts.filter((p) => p.relatedServices.includes(s.slug));
  const otherServices = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <PageHero
        crumbs={crumbs}
        title={s.title}
        intro={s.lead}
        aside={<CoverArt variant={s.icon} alt={`Illustration du service ${s.title}`} />}
      >
        <ButtonLink href={`/contact?service=${s.slug}`}>{s.cta}</ButtonLink>
      </PageHero>

      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div>
          <h2 className="text-3xl font-semibold text-navy-900">Présentation du service</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
            {s.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <section className="rounded-xl bg-sand-50 p-6 ring-1 ring-navy-100" aria-labelledby="audience">
              <h2 id="audience" className="flex items-center gap-2 font-sans text-lg font-semibold text-navy-900">
                <Users className="h-5 w-5 text-accent-600" aria-hidden="true" />À qui s&apos;adresse ce service ?
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{s.audience}</p>
            </section>
            <section className="rounded-xl bg-sand-50 p-6 ring-1 ring-navy-100" aria-labelledby="benefits">
              <h2 id="benefits" className="flex items-center gap-2 font-sans text-lg font-semibold text-navy-900">
                <TrendingUp className="h-5 w-5 text-accent-600" aria-hidden="true" />Quels sont les avantages ?
              </h2>
              <p className="mt-3 leading-relaxed text-muted">{s.benefits}</p>
              <p className="mt-2 text-sm text-muted">
                Les résultats dépendent de la nature de vos opérations et de la qualité des informations disponibles.
              </p>
            </section>
          </div>

          {relatedFaqs.length > 0 && (
            <section className="mt-12" aria-labelledby="faq-links">
              <h2 id="faq-links" className="flex items-center gap-2 text-2xl font-semibold text-navy-900">
                <HelpCircle className="h-6 w-6 text-accent-600" aria-hidden="true" />
                Questions fréquentes liées
              </h2>
              <ul className="mt-5 divide-y divide-navy-100 rounded-xl border border-navy-100">
                {relatedFaqs.map((f) => (
                  <li key={f.id}>
                    <Link
                      href={`/faq#${f.id}`}
                      className="flex items-center justify-between gap-4 p-5 font-medium text-navy-900 hover:bg-sand-50 hover:text-accent-700"
                    >
                      {f.question}
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-36 lg:self-start">
          <section className="surface-dark rounded-xl bg-navy-900 p-7 text-white shadow-lg sm:p-8" aria-labelledby="scope">
            <h2 id="scope" className="text-2xl font-semibold">Ce que nous prenons en charge</h2>
            <ul className="mt-5 space-y-3">
              {s.items.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-navy-100">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cargo" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href={`/contact?service=${s.slug}`} className="mt-8 w-full text-center">
              {s.cta} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </ButtonLink>
          </section>
          {!site.isLive && (
            <p className="flex gap-2 rounded-lg border border-navy-100 bg-white p-4 text-sm text-muted">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" aria-hidden="true" />
              Customs Wise Maroc est en cours de lancement. Contactez-nous pour vérifier la disponibilité de ce service
              pour votre opération.
            </p>
          )}
        </aside>
      </Container>

      {relatedPosts.length > 0 && (
        <section aria-labelledby="related-posts" className="bg-sand-50 py-16">
          <Container>
            <h2 id="related-posts" className="text-3xl font-semibold text-navy-900">À lire sur le blog</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {relatedPosts.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section aria-labelledby="other-services" className="py-16">
        <Container>
          <h2 id="other-services" className="text-3xl font-semibold text-navy-900">Nos autres services</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {otherServices.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/services/${o.slug}`}
                  className="group flex h-full items-start gap-3 rounded-xl border border-navy-100 p-5 transition hover:border-accent-600/40 hover:bg-sand-50"
                >
                  <ServiceGlyph icon={o.icon} className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
                  <span>
                    <span className="font-semibold text-navy-900 group-hover:text-accent-700">{o.title}</span>
                    <span className="mt-1 block text-sm text-muted">{o.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand
        title="Discutons de vos besoins"
        text="Décrivez-nous vos marchandises et votre itinéraire : nous identifions avec vous les formalités applicables."
        href={`/contact?service=${s.slug}`}
        label={s.cta}
      />

      <TrackOnMount event="view_service" params={{ service_slug: s.slug }} />
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": absoluteUrl(`/services/${s.slug}#service`),
            name: s.title,
            serviceType: s.title,
            description: s.lead,
            url: absoluteUrl(`/services/${s.slug}`),
            provider: { "@id": absoluteUrl("/#organization") },
            areaServed: [
              { "@type": "Country", name: "Maroc" },
              { "@type": "Country", name: "Royaume-Uni" },
              { "@type": "Place", name: "Union européenne" },
            ],
            audience: { "@type": "BusinessAudience", audienceType: s.audience },
          },
        ]}
      />
    </>
  );
}

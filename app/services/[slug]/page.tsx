import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, HelpCircle, Info, TrendingUp, Users } from "lucide-react";
import { PageHero, HeroActions } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { BlogCards } from "@/components/blog/blog-card";
import { ButtonLink } from "@/components/ui/button";
import { CheckList } from "@/components/ui/check-list";
import { CoverArt } from "@/components/ui/illustrations";
import { ServiceIcon } from "@/components/ui/service-icon";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackOnMount } from "@/components/analytics/analytics";
import { getFaq, getService, services } from "@/lib/content";
import { getServiceDetails } from "@/lib/content/service-details";
import { posts } from "@/lib/content/blog-posts";
import { enquiryHref, site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, serviceSchema, webPageSchema } from "@/lib/structured-data/schemas";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const path = `/services/${s.slug}`;
  const trail = [
    { name: "Services", path: "/services" },
    { name: s.title, path },
  ];
  const { handles } = getServiceDetails(s.slug);
  const relatedFaqs = s.faqIds.map(getFaq).filter((f) => f !== undefined);
  const relatedPosts = posts.filter((p) => p.relatedServices.includes(s.slug));
  const otherServices = services.filter((o) => o.slug !== s.slug);

  return (
    <>
      <JsonLd data={[webPageSchema(path, s.metaTitle, s.metaDescription), breadcrumbSchema(trail), serviceSchema(s)]} />
      <PageHero
        trail={trail}
        title={s.title}
        intro={s.lead}
        media={<CoverArt variant={s.icon} alt={`Illustration du service ${s.title}`} />}
        actions={
          <HeroActions>
            <ButtonLink href={enquiryHref(s.slug)}>{s.cta}</ButtonLink>
          </HeroActions>
        }
      />

      <section aria-labelledby="presentation" className="py-16 sm:py-24">
        <div data-reveal className="container-site grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div>
            <h2 id="presentation" className="text-3xl font-semibold text-ship">Présentation du service</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
              {s.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <section className="rounded-brand bg-mist p-6 ring-1 ring-line" aria-labelledby="audience">
                <h3 id="audience" className="flex items-center gap-2 font-sans text-lg font-semibold text-ship">
                  <Users className="h-5 w-5 text-atlantic" aria-hidden="true" />À qui s&apos;adresse ce service ?
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.audience}</p>
              </section>
              <section className="rounded-brand bg-mist p-6 ring-1 ring-line" aria-labelledby="benefits">
                <h3 id="benefits" className="flex items-center gap-2 font-sans text-lg font-semibold text-ship">
                  <TrendingUp className="h-5 w-5 text-atlantic" aria-hidden="true" />Quels sont les avantages ?
                </h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{s.benefits}</p>
                <p className="mt-2 text-sm text-ink-soft">
                  Les résultats dépendent de la nature de vos opérations et de la qualité des informations disponibles.
                </p>
              </section>
            </div>

            {relatedFaqs.length > 0 && (
              <section className="mt-12" aria-labelledby="faq-links">
                <h3 id="faq-links" className="flex items-center gap-2 text-2xl font-semibold text-ship">
                  <HelpCircle className="h-6 w-6 text-atlantic" aria-hidden="true" />
                  Questions fréquentes liées
                </h3>
                <ul className="mt-5 divide-y divide-line rounded-brand border border-line">
                  {relatedFaqs.map((f) => (
                    <li key={f.id}>
                      <Link
                        href={`/faq#${f.id}`}
                        className="flex min-h-12 items-center justify-between gap-4 p-5 font-medium text-ship hover:bg-mist hover:text-atlantic"
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
            <section className="bg-clearance rounded-brand p-7 shadow-lg sm:p-8" aria-labelledby="scope">
              <h2 id="scope" className="text-2xl font-semibold">Ce que nous prenons en charge</h2>
              <CheckList items={handles} tone="dark" size="sm" className="mt-5" />
              <ButtonLink href={enquiryHref(s.slug)} className="mt-8 w-full text-center">
                {s.cta} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </ButtonLink>
            </section>
            {!site.isLive && (
              <p className="flex gap-2 rounded-brand border border-line bg-salt p-4 text-sm text-ink-soft">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-atlantic" aria-hidden="true" />
                Customs Wise Maroc est en cours de lancement. Contactez-nous pour vérifier la disponibilité de ce service
                pour votre opération.
              </p>
            )}
          </aside>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section aria-labelledby="related-posts" className="bg-mist py-16 sm:py-24">
          <div data-reveal className="container-site">
            <h2 id="related-posts" className="text-3xl font-semibold text-ship">À lire sur le blog</h2>
            <div className="mt-8">
              <BlogCards posts={relatedPosts} />
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="other-services" className="py-16 sm:py-24">
        <div data-reveal className="container-site">
          <h2 id="other-services" className="text-3xl font-semibold text-ship">Nos autres services</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {otherServices.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/services/${o.slug}`}
                  className="group flex h-full items-start gap-3 rounded-brand border border-line p-5 transition hover:border-atlantic/40 hover:bg-mist"
                >
                  <ServiceIcon icon={o.icon} className="mt-0.5 h-5 w-5 shrink-0 text-atlantic" />
                  <span>
                    <span className="font-semibold text-ship group-hover:text-atlantic">{o.title}</span>
                    <span className="mt-1 block text-sm text-ink-soft">{o.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="Discutons de vos besoins"
        text="Décrivez-nous vos marchandises et votre itinéraire : nous identifions avec vous les formalités applicables."
        href={enquiryHref(s.slug)}
        label={s.cta}
      />

      <TrackOnMount event="view_service" params={{ service_slug: s.slug }} />
    </>
  );
}

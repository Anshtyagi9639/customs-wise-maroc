import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui";
import { PageHero, CtaBand } from "@/components/sections";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { industries } from "@/lib/industries";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Secteurs d'activité",
  description:
    "Les secteurs d'activité accompagnés par Customs Wise Maroc pour leurs formalités douanières entre le Maroc, l'UE et le Royaume-Uni.",
  path: "/secteurs",
});

const crumbs = [
  { name: "Accueil", href: "/" },
  { name: "Secteurs d'activité", href: "/secteurs" },
];

/**
 * Industries page. While lib/industries.ts is empty, src/proxy.ts serves the
 * branded 404 for /secteurs, so this page is never shown empty.
 */
export default function IndustriesPage() {
  return (
    <>
      <PageHero crumbs={crumbs} title="Secteurs d'activité" />
      {industries.map((i, n) => (
        <section
          key={i.slug}
          id={i.slug}
          aria-labelledby={`${i.slug}-title`}
          className={`scroll-mt-36 py-16 sm:py-20 ${n % 2 ? "bg-sand-50" : ""}`}
        >
          <Container className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h2 id={`${i.slug}-title`} className="text-3xl font-semibold text-navy-900">{i.title}</h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
                {i.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            {i.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                <Image src={i.image.src} alt={i.image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
            )}
          </Container>
        </section>
      ))}
      <CtaBand />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}

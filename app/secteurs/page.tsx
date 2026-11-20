import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { FeatureRow } from "@/components/sections/feature-row";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/ui/json-ld";
import { industries } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/structured-data/schemas";

const path = "/secteurs";
const title = "Secteurs d'activité | Customs Wise Maroc";
const description =
  "Les secteurs d'activité accompagnés par Customs Wise Maroc pour leurs formalités douanières entre le Maroc, l'UE et le Royaume-Uni.";
const trail = [{ name: "Secteurs d'activité", path }];

export const metadata: Metadata = buildMetadata({ title, description, path });

/**
 * Industries: one FeatureRow per sector. While lib/content → industries is
 * empty, proxy.ts serves the branded 404 for /secteurs, so this page is never
 * shown empty.
 */
export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={[webPageSchema(path, title, description), breadcrumbSchema(trail)]} />
      <PageHero trail={trail} title="Secteurs d'activité" />
      {industries.map((i, n) => (
        <FeatureRow key={i.slug} id={i.slug} index={n} title={i.title} image={i.image}>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
            {i.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </FeatureRow>
      ))}
      <CTASection />
    </>
  );
}

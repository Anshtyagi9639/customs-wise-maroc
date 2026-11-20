import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { FaqList } from "@/components/sections/faq-list";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/ui/json-ld";
import { faqs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/structured-data/schemas";

const path = "/faq";
const title = "FAQ douane et dédouanement au Maroc | Customs Wise Maroc";
const description =
  "Documents de dédouanement, représentation directe ou indirecte, calcul des droits de douane : nos réponses aux questions fréquentes sur la douane au Maroc.";
const trail = [{ name: "FAQ", path }];

export const metadata: Metadata = buildMetadata({ title, description, path });

export default function FaqPage() {
  return (
    <>
      <JsonLd data={[webPageSchema(path, title, description, "FAQPage"), breadcrumbSchema(trail), faqSchema(faqs)]} />
      <PageHero
        trail={trail}
        title="Questions fréquentes"
        intro="Documents, représentation en douane, calcul des droits : l'essentiel pour préparer vos opérations d'import-export."
      />
      <section aria-label="Questions et réponses" className="py-16 sm:py-24">
        <div className="container-site max-w-3xl">
          <FaqList items={faqs} headingLevel={2} defaultOpen />
          <p className="mt-10 rounded-brand bg-mist p-6 text-ink-soft">
            Vous ne trouvez pas votre réponse ?{" "}
            <Link href="/contact#enquiry" className="inline-flex items-center gap-1 font-semibold text-atlantic hover:underline">
              Posez-nous votre question <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>
      <CTASection title="Une question sur votre expédition ?" />
    </>
  );
}

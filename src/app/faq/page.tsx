import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHero, FaqList, CtaBand } from "@/components/sections";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { faqs } from "@/lib/faq";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQ douane et dédouanement au Maroc",
  description:
    "Documents de dédouanement, représentation directe ou indirecte, calcul des droits de douane : nos réponses aux questions fréquentes sur la douane au Maroc.",
  path: "/faq",
});

const crumbs = [
  { name: "Accueil", href: "/" },
  { name: "FAQ", href: "/faq" },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        title="Questions fréquentes"
        intro="Documents, représentation en douane, calcul des droits : l'essentiel pour préparer vos opérations d'import-export."
      />
      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <FaqList items={faqs} headingLevel={2} defaultOpen />
        </Container>
      </section>
      <CtaBand title="Une question sur votre expédition ?" />
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer.join(" ") },
            })),
          },
        ]}
      />
    </>
  );
}

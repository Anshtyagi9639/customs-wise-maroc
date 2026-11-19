import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui";
import { PageHero } from "@/components/sections";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ContactDetails } from "@/components/enquiry";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact et demande de devis",
  description:
    "Demandez un devis à Customs Wise Maroc pour vos formalités douanières, documents d'import-export et projets entre le Maroc, l'UE et le Royaume-Uni.",
  path: "/contact",
});

const crumbs = [
  { name: "Accueil", href: "/" },
  { name: "Contact", href: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        title="Demander un devis"
        intro="Dites-nous ce que vous souhaitez importer ou exporter : nous identifions avec vous les formalités et documents applicables à vos marchandises."
      />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-xl border border-navy-100 bg-white p-6 shadow-sm sm:p-9">
            <h2 className="text-2xl font-bold text-navy-900">Votre demande</h2>
            <p className="mt-2 text-muted">Les champs marqués d&apos;un * sont obligatoires.</p>
            <div className="mt-8">
              <Suspense fallback={<div className="h-96 animate-pulse rounded-md bg-navy-50" />}>
                <EnquiryForm />
              </Suspense>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="surface-dark rounded-xl bg-navy-900 p-7 text-white">
              <h2 className="text-lg font-semibold">Customs Wise Maroc</h2>
              <div className="mt-5 text-sm text-navy-100">
                <ContactDetails />
              </div>
            </div>
            <div className="rounded-xl border border-navy-100 bg-sand-50 p-7">
              <h2 className="font-semibold text-navy-900">Pour une réponse plus précise</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted marker:text-accent-600">
                <li>La nature des marchandises (et leur code SH si vous le connaissez)</li>
                <li>Le pays d&apos;origine et la destination</li>
                <li>Le mode de transport et le volume estimé</li>
                <li>Votre calendrier prévisionnel</li>
              </ul>
            </div>
          </aside>
        </Container>
      </section>
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}

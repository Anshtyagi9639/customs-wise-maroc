import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { EnquirySection } from "@/components/sections/enquiry-section";
import { SectionHeading } from "@/components/sections/section-heading";
import { OfficeList } from "@/components/sections/office-list";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/ui/json-ld";
import { offices, site, telHref } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/structured-data/schemas";

const path = "/contact";
const title = "Contact et demande de devis | Customs Wise Maroc";
const description =
  "Demandez un devis à Customs Wise Maroc pour vos formalités douanières, documents d'import-export et projets entre le Maroc, l'UE et le Royaume-Uni.";
const trail = [{ name: "Contact", path }];

export const metadata: Metadata = buildMetadata({ title, description, path });

/** Contact: method cards (only approved methods) → enquiry section → offices. */
export default function ContactPage() {
  const { phone, email } = site.contact;
  const head = offices[0];
  const methods = [
    ...(phone ? [{ icon: Phone, label: "Appelez-nous", value: phone, href: telHref(phone) }] : []),
    ...(email ? [{ icon: Mail, label: "Écrivez-nous", value: email, href: `mailto:${email}` }] : []),
    { icon: MapPin, label: "Rendez-nous visite", value: `${head.street}, ${head.locality}`, href: "#offices" },
  ];
  return (
    <>
      <JsonLd data={[webPageSchema(path, title, description, "ContactPage"), breadcrumbSchema(trail)]} />
      <PageHero
        trail={trail}
        title="Demander un devis"
        intro="Dites-nous ce que vous souhaitez importer ou exporter : nous identifions avec vous les formalités et documents applicables à vos marchandises."
      >
        <ul className="grid gap-4 sm:grid-cols-3">
          {methods.map((m) => (
            <li key={m.label}>
              <a
                href={m.href}
                className="flex h-full min-h-12 items-start gap-3 rounded-brand bg-salt/10 p-5 ring-1 ring-salt/15 transition hover:bg-salt/15"
              >
                <m.icon className="mt-0.5 h-5 w-5 shrink-0 text-cargo" aria-hidden="true" />
                <span>
                  <span className="block font-semibold text-salt">{m.label}</span>
                  <span className="mt-1 block text-sm text-starlight">{m.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <EnquirySection
        title="Votre demande de devis"
        intro="Pour une réponse plus précise, indiquez la nature des marchandises (et leur code SH si vous le connaissez), le pays d'origine et la destination, le mode de transport, le volume estimé et votre calendrier prévisionnel."
        showFaqTeaser
      />

      <section id="offices" aria-labelledby="offices-title" className="scroll-mt-36 bg-mist py-16 sm:py-24">
        <div data-reveal className="container-site">
          <SectionHeading id="offices-title" kicker="Nous trouver" title="Notre bureau" />
          <div className="mt-8">
            <OfficeList />
          </div>
          {(phone || email) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {phone && (
                <Button asChild variant="outline">
                  <a href={telHref(phone)}>
                    <Phone className="h-4 w-4" aria-hidden="true" /> Appelez-nous
                  </a>
                </Button>
              )}
              {email && (
                <Button asChild variant="outline">
                  <a href={`mailto:${email}`}>
                    <Mail className="h-4 w-4" aria-hidden="true" /> Écrivez-nous
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

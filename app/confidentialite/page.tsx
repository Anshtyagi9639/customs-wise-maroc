import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { JsonLd } from "@/components/ui/json-ld";
import { ManageConsentLink } from "@/components/analytics/analytics";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, webPageSchema } from "@/lib/structured-data/schemas";
import { analyticsEnabled } from "@/lib/analytics";

const path = "/confidentialite";
const title = "Politique de confidentialité | Customs Wise Maroc";
const description = "Comment Customs Wise Maroc traite les informations transmises via ce site et utilise les cookies.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path,
  // Provisional text with placeholders — keep out of search results until validated
  noindex: true,
});

const trail = [{ name: "Confidentialité", path }];

/*
 * PROVISIONAL NOTICE — describes what the website technically does.
 * Items in [brackets] must be completed and the whole text validated by the
 * company / a legal adviser (Moroccan law 09-08 – CNDP; GDPR for EU visitors).
 */
export default function PrivacyPage() {
  const tracking = analyticsEnabled();
  return (
    <>
      <JsonLd data={[webPageSchema(path, title, description), breadcrumbSchema(trail)]} />
      <PageHero trail={trail} title="Politique de confidentialité" />
      <div className="container-site max-w-3xl py-16 sm:py-24">
        <div className="prose-cw">
          <p className="rounded-lg border border-cargo bg-cargo/15 p-4 text-sm">
            <strong>Version provisoire.</strong> Ce texte décrit le fonctionnement technique du site. Il doit être
            complété et validé par Customs Wise avant la mise en ligne définitive.
          </p>

          <h2>Responsable du traitement</h2>
          <p>
            [Raison sociale de l&apos;entité Customs Wise au Maroc], 39 Av. Sanhaja, 90060 Tanger, Maroc. Contact pour
            toute question relative à vos données : [adresse e-mail à confirmer].
          </p>

          <h2>Données collectées via le formulaire de contact</h2>
          <p>
            Lorsque vous envoyez une demande, nous recevons les informations que vous saisissez : nom, société, adresse
            e-mail, téléphone (facultatif), service souhaité, origine et destination des marchandises (facultatif) et
            votre message.
          </p>
          <p>
            Ces informations sont utilisées uniquement pour répondre à votre demande et, le cas échéant, préparer une
            proposition. Elles ne sont ni vendues ni utilisées à des fins publicitaires. Elles sont transmises à [nom de
            l&apos;outil de réception des demandes à confirmer] pour être acheminées vers notre équipe et conservées
            [durée de conservation à définir].
          </p>

          <h2>Cookies et mesure d&apos;audience</h2>
          {tracking ? (
            <>
              <p>
                Avec votre accord, ce site utilise Google Analytics (Google LLC) pour mesurer son audience. Ces cookies ne
                sont déposés qu&apos;après acceptation dans le bandeau prévu à cet effet. Les événements mesurés ne
                contiennent aucune donnée saisie dans le formulaire.
              </p>
              <p>
                Votre choix est enregistré dans le stockage local de votre navigateur. Vous pouvez le modifier à tout
                moment : <ManageConsentLink className="font-semibold text-atlantic underline" />.
              </p>
            </>
          ) : (
            <p>
              Ce site n&apos;utilise actuellement aucun cookie de mesure d&apos;audience ni de publicité. Seuls les
              éléments techniques nécessaires à son fonctionnement sont utilisés.
            </p>
          )}

          <h2>Vos droits</h2>
          <p>
            Conformément à la réglementation applicable en matière de protection des données personnelles, vous pouvez
            demander l&apos;accès, la rectification ou la suppression de vos données, ou vous opposer à leur traitement,
            en écrivant à [adresse e-mail à confirmer].
          </p>

          <h2>Hébergement</h2>
          <p>Ce site est hébergé par Vercel Inc. [à confirmer lors de la mise en ligne].</p>
        </div>
      </div>
      <CTASection />
    </>
  );
}

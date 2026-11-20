/**
 * All page copy as data (SITE-BLUEPRINT.md §4). Texts from the client brief are
 * the approved wording: keep them word for word.
 */
import type { Faq, Industry, Service } from "@/types";

// ── Services (brief) ─────────────────────────────────────────────────────────
export const services: Service[] = [
  {
    slug: "declarations-douanieres",
    metaTitle: "Déclarations douanières au Maroc : import et export",
    metaDescription:
      "Déclarations d'import et d'export : classification tarifaire, valeur en douane, origine et droits applicables entre le Maroc, l'UE et le Royaume-Uni.",
    lead: "Nous aidons les entreprises à préparer leurs déclarations d'importation et d'exportation : classification tarifaire, valeur en douane, origine des marchandises et régimes applicables.",
    faqIds: ["documents-dedouanement", "calcul-droits-de-douane", "representation-directe-indirecte"],
    number: 1,
    title: "Déclarations douanières",
    summary:
      "Préparation et gestion de vos formalités d'import et d'export entre le Maroc, l'Union européenne et le Royaume-Uni.",
    icon: "file",
    intro: [
      "Les déclarations douanières sont une étape essentielle de toute opération d'importation ou d'exportation. Une erreur de classification, de valeur ou de documentation peut entraîner des retards, des contrôles supplémentaires et des coûts imprévus.",
      "Customs Wise accompagne les entreprises dans la préparation et la gestion de leurs formalités douanières pour leurs échanges commerciaux entre le Maroc, l'Union européenne et le Royaume-Uni.",
      "Notre objectif : faciliter vos opérations transfrontalières grâce à une préparation rigoureuse des déclarations et une meilleure coordination des formalités.",
    ],
    audience:
      "Aux importateurs, exportateurs, industriels, transporteurs, transitaires et commissionnaires de transport opérant sur les marchés marocain, européen et britannique.",
    benefits:
      "Une meilleure maîtrise des formalités douanières, une réduction des erreurs dans les déclarations et une meilleure anticipation des risques susceptibles de ralentir vos expéditions.",
    cta: "Demander un accompagnement douanier",
  },
  {
    slug: "assistance-documentaire",
    metaTitle: "Assistance documentaire import-export au Maroc",
    metaDescription:
      "Factures, listes de colisage, documents de transport, certificats d'origine et SPS : vérifiez vos documents avant d'expédier entre le Maroc, l'UE et le R.-U.",
    lead: "Nous vérifions et préparons avec vous les documents commerciaux, de transport et d'origine qui accompagnent vos marchandises, avant l'expédition.",
    faqIds: ["documents-dedouanement"],
    number: 2,
    title: "Assistance documentaire",
    summary:
      "Vérification et préparation de vos documents commerciaux, de transport et d'exportation avant chaque expédition.",
    icon: "folder",
    intro: [
      "Dans le commerce international, chaque expédition doit être accompagnée de documents adaptés à la nature des marchandises, à leur origine et à leur destination.",
      "Une facture incorrecte, un certificat manquant ou des informations incohérentes peuvent compliquer le passage en douane et retarder la livraison.",
      "Customs Wise accompagne les professionnels dans la vérification et la préparation de leurs documents commerciaux, de transport et d'exportation afin de faciliter leurs opérations internationales.",
    ],
    audience:
      "Aux importateurs, exportateurs, transitaires, transporteurs et entreprises qui organisent des expéditions entre le Maroc, l'Union européenne et le Royaume-Uni.",
    benefits:
      "Une documentation mieux préparée, une identification anticipée des pièces manquantes et une réduction des risques de blocage liés aux erreurs administratives.",
    cta: "Demander une assistance documentaire",
  },
  {
    slug: "conformite-douaniere",
    metaTitle: "Conformité douanière et réglementaire au Maroc",
    metaDescription:
      "Anticipez les exigences douanières, tarifaires, d'origine et réglementaires applicables à vos produits au Maroc, dans l'UE et au Royaume-Uni.",
    lead: "Nous vous aidons à identifier et à comprendre les obligations douanières, tarifaires, d'origine et réglementaires applicables à vos marchandises.",
    faqIds: ["calcul-droits-de-douane", "representation-directe-indirecte"],
    number: 3,
    title: "Conformité douanière et réglementaire",
    summary:
      "Veille et accompagnement pour anticiper les obligations applicables à vos produits, à leur origine et à leur marché.",
    icon: "shield",
    intro: [
      "Les réglementations douanières et commerciales évoluent régulièrement. Les entreprises qui importent ou exportent doivent respecter les exigences applicables à leurs produits, à leur origine et à leur marché de destination.",
      "Customs Wise aide les professionnels à mieux comprendre ces obligations et à anticiper les exigences réglementaires liées à leurs échanges entre le Maroc, l'Union européenne et le Royaume-Uni.",
      "Notre approche vise à limiter les risques de non-conformité et à faciliter la préparation des opérations commerciales internationales.",
    ],
    audience:
      "Aux entreprises importatrices et exportatrices, industriels, distributeurs, transitaires et professionnels de la logistique soumis à des exigences douanières et réglementaires internationales.",
    benefits:
      "Une meilleure anticipation des obligations légales, une réduction des risques de non-conformité et une meilleure compréhension des exigences applicables aux marchandises.",
    cta: "Obtenir des conseils en conformité réglementaire",
  },
  {
    slug: "commerce-international",
    metaTitle: "Commerce international Maroc – Europe – Royaume-Uni",
    metaDescription:
      "Préparez vos échanges Maroc – Union européenne – Royaume-Uni : accords commerciaux, Incoterms, documents et contraintes logistiques.",
    lead: "Nous accompagnons la préparation de vos projets d'import-export entre le Maroc, l'Union européenne et le Royaume-Uni : accords, Incoterms, documents et logistique.",
    faqIds: ["documents-dedouanement", "calcul-droits-de-douane"],
    number: 4,
    title: "Accompagnement du commerce international",
    summary:
      "Compréhension des marchés, des corridors logistiques et des formalités pour développer vos échanges Maroc – Europe – Royaume-Uni.",
    icon: "globe",
    intro: [
      "Développer son activité à l'international demande bien plus que trouver de nouveaux marchés. Il faut comprendre les circuits commerciaux, anticiper les formalités, coordonner les différents intervenants et maîtriser les contraintes logistiques propres à chaque corridor commercial.",
      "Situé au carrefour des échanges entre l'Afrique et l'Europe, le Maroc joue un rôle stratégique dans les flux commerciaux reliant l'Union européenne et le Royaume-Uni.",
      "Customs Wise accompagne les entreprises dans la compréhension et la préparation de leurs projets de commerce international afin de faciliter leur développement sur ces marchés.",
    ],
    audience:
      "Aux entreprises marocaines souhaitant développer leurs exportations, aux sociétés européennes recherchant des opportunités au Maroc, ainsi qu'aux transporteurs, transitaires et professionnels de la logistique internationale.",
    benefits:
      "Une meilleure compréhension des marchés internationaux, une vision plus claire des exigences commerciales et douanières et une meilleure coordination des opérations transfrontalières.",
    cta: "Discuter de votre projet international",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

// ── Industries ───────────────────────────────────────────────────────────────
/**
 * EMPTY ON PURPOSE: the brief states the target sectors are not confirmed yet.
 * While empty, the home Industries section, the "Secteurs" menu/footer entries
 * and the sitemap entry are hidden, and /secteurs serves the 404 page (proxy.ts).
 * Add approved sectors here (texts and licensed images from the Morocco team).
 */
export const industries: Industry[] = [];

// ── FAQs (brief, adapted to Moroccan law) ────────────────────────────────────
export const faqs: Faq[] = [
  {
    id: "documents-dedouanement",
    question: "Quels documents sont nécessaires pour le dédouanement ?",
    answer: [
      "En règle générale, les documents nécessaires comprennent une facture commerciale, une liste de colisage et un document de transport, ainsi que les licences, certificats d'origine ou documents sanitaires et phytosanitaires (SPS) exigés selon la nature des marchandises et l'itinéraire emprunté.",
      "Nous vous aidons à identifier les documents exacts requis pour votre expédition, en fonction du type de marchandises, de leur origine et de leur destination.",
    ],
  },
  {
    id: "representation-directe-indirecte",
    question:
      "Quelle est la différence entre la représentation directe et la représentation indirecte en douane ?",
    answer: [
      "Dans le cadre de la représentation directe, le représentant en douane agit au nom et pour le compte de l'importateur ou de l'exportateur. La responsabilité juridique de la déclaration et du paiement des droits et taxes incombe généralement au représenté, conformément à la réglementation applicable.",
      "Dans le cadre de la représentation indirecte, le représentant agit en son propre nom, mais pour le compte de son client. Dans les juridictions où ce régime prévoit une responsabilité solidaire, le représentant et son client peuvent être conjointement responsables de l'exactitude de la déclaration et du paiement des droits et taxes.",
      "Les modalités et les responsabilités exactes dépendent de la réglementation douanière applicable dans le pays concerné.",
    ],
    reviewNote:
      "À valider par un juriste/déclarant agréé : correspondance de ces notions avec le Code des douanes et impôts indirects marocain (statut des commissionnaires en douane agréés) — les termes « représentation directe/indirecte » proviennent du droit douanier de l'UE et du Royaume-Uni.",
  },
  {
    id: "calcul-droits-de-douane",
    question: "Comment les droits de douane sont-ils calculés ?",
    answer: [
      "Les droits de douane sont généralement calculés en appliquant le taux correspondant au classement tarifaire du produit à sa valeur en douane.",
      "Cette valeur est généralement fondée sur le prix transactionnel des marchandises, auquel peuvent s'ajouter certains frais, notamment le transport et l'assurance, selon les règles applicables et le point de calcul retenu.",
      "La TVA à l'importation et les autres taxes éventuelles sont ensuite calculées selon leur propre base imposable.",
      "Des taux préférentiels ou des exonérations peuvent être applicables lorsque les marchandises remplissent certaines conditions, notamment en matière d'origine préférentielle et de justificatifs requis.",
    ],
    reviewNote:
      "À valider : base de la valeur en douane au Maroc (CAF à l'importation) et assiette de la TVA à l'importation selon la réglementation en vigueur.",
  },
];

export function getFaq(id: string) {
  return faqs.find((f) => f.id === id);
}

export const faqDisclaimer =
  "Ces réponses sont des informations générales. Elles ne remplacent pas l'analyse de votre opération : les obligations exactes dépendent de vos marchandises, de leur origine, de leur destination et de la réglementation applicable.";

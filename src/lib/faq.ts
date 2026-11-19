export type Faq = {
  id: string;
  question: string;
  answer: string[];
  /** Internal only (not rendered): legal points to validate before final publication */
  reviewNote?: string;
};

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

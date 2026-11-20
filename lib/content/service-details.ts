/**
 * Per-service "Ce que nous prenons en charge" checklists (brief, word for word).
 */
export const serviceDetails: Record<string, { handles: string[] }> = {
  "declarations-douanieres": {
    handles: [
      "Assistance à la préparation des déclarations douanières d'importation et d'exportation.",
      "Vérification de la classification tarifaire des marchandises.",
      "Analyse des éléments de valeur en douane.",
      "Identification des droits de douane, taxes et régimes applicables.",
      "Vérification des informations relatives à l'origine des marchandises.",
      "Orientation sur les procédures douanières propres au Maroc, à l'Union européenne et au Royaume-Uni.",
      "Coordination avec les partenaires et opérateurs douaniers concernés.",
    ],
  },
  "assistance-documentaire": {
    handles: [
      "Vérification des factures commerciales et des listes de colisage.",
      "Analyse des documents de transport.",
      "Vérification des certificats d'origine et justificatifs préférentiels.",
      "Identification des certificats sanitaires et phytosanitaires nécessaires.",
      "Assistance dans la préparation des dossiers d'importation et d'exportation.",
      "Identification des licences, autorisations et documents spécifiques aux marchandises.",
      "Vérification de la cohérence des informations avant expédition.",
    ],
  },
  "conformite-douaniere": {
    handles: [
      "Veille sur les évolutions de la réglementation douanière marocaine, européenne et britannique.",
      "Identification des exigences applicables selon la catégorie de marchandises.",
      "Orientation sur les règles d'origine et les accords commerciaux préférentiels.",
      "Suivi des modifications tarifaires, fiscales et réglementaires.",
      "Identification des exigences sanitaires, phytosanitaires et techniques.",
      "Assistance dans la compréhension des obligations liées aux produits réglementés.",
      "Information sur les nouvelles procédures et formalités administratives.",
    ],
  },
  "commerce-international": {
    handles: [
      "Accompagnement dans la compréhension des échanges commerciaux entre le Maroc, l'Union européenne et le Royaume-Uni.",
      "Informations sur les accords commerciaux et les opportunités d'accès aux marchés.",
      "Orientation sur les Incoterms et leur impact sur les responsabilités commerciales.",
      "Identification des contraintes douanières et logistiques liées aux corridors internationaux.",
      "Informations sur les infrastructures stratégiques, notamment Tanger Med et le port d'Algésiras.",
      "Accompagnement documentaire et réglementaire des projets d'import-export.",
      "Orientation des entreprises dans la préparation de leurs opérations internationales.",
    ],
  },
};

export function getServiceDetails(slug: string) {
  return serviceDetails[slug] ?? { handles: [] };
}

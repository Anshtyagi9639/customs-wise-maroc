export type ServiceIcon = "file" | "folder" | "shield" | "globe";

export type Service = {
  slug: string;
  number: number;
  title: string;
  /** Short text for the homepage card */
  summary: string;
  icon: ServiceIcon;
  intro: string[];
  audience: string;
  benefits: string;
  items: string[];
  cta: string;
};

export const services: Service[] = [
  {
    slug: "declarations-douanieres",
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
    items: [
      "Assistance à la préparation des déclarations douanières d'importation et d'exportation.",
      "Vérification de la classification tarifaire des marchandises.",
      "Analyse des éléments de valeur en douane.",
      "Identification des droits de douane, taxes et régimes applicables.",
      "Vérification des informations relatives à l'origine des marchandises.",
      "Orientation sur les procédures douanières propres au Maroc, à l'Union européenne et au Royaume-Uni.",
      "Coordination avec les partenaires et opérateurs douaniers concernés.",
    ],
    cta: "Demander un accompagnement douanier",
  },
  {
    slug: "assistance-documentaire",
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
    items: [
      "Vérification des factures commerciales et des listes de colisage.",
      "Analyse des documents de transport.",
      "Vérification des certificats d'origine et justificatifs préférentiels.",
      "Identification des certificats sanitaires et phytosanitaires nécessaires.",
      "Assistance dans la préparation des dossiers d'importation et d'exportation.",
      "Identification des licences, autorisations et documents spécifiques aux marchandises.",
      "Vérification de la cohérence des informations avant expédition.",
    ],
    cta: "Demander une assistance documentaire",
  },
  {
    slug: "conformite-reglementaire",
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
    items: [
      "Veille sur les évolutions de la réglementation douanière marocaine, européenne et britannique.",
      "Identification des exigences applicables selon la catégorie de marchandises.",
      "Orientation sur les règles d'origine et les accords commerciaux préférentiels.",
      "Suivi des modifications tarifaires, fiscales et réglementaires.",
      "Identification des exigences sanitaires, phytosanitaires et techniques.",
      "Assistance dans la compréhension des obligations liées aux produits réglementés.",
      "Information sur les nouvelles procédures et formalités administratives.",
    ],
    cta: "Obtenir des conseils en conformité réglementaire",
  },
  {
    slug: "commerce-international",
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
    items: [
      "Accompagnement dans la compréhension des échanges commerciaux entre le Maroc, l'Union européenne et le Royaume-Uni.",
      "Informations sur les accords commerciaux et les opportunités d'accès aux marchés.",
      "Orientation sur les Incoterms et leur impact sur les responsabilités commerciales.",
      "Identification des contraintes douanières et logistiques liées aux corridors internationaux.",
      "Informations sur les infrastructures stratégiques, notamment Tanger Med et le port d'Algésiras.",
      "Accompagnement documentaire et réglementaire des projets d'import-export.",
      "Orientation des entreprises dans la préparation de leurs opérations internationales.",
    ],
    cta: "Discuter de votre projet international",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

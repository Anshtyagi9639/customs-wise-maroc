export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  /** ISO date (YYYY-MM-DD) */
  published: string;
  readingMinutes: number;
  keywords: string[];
  /** Service slugs this article relates to (for contextual links) */
  relatedServices: string[];
};

/** Article metadata. Bodies live in src/content/blog/<slug>.md */
export const posts: Post[] = [
  {
    slug: "portnet-adil-digitalisation-douane-maroc",
    title: "Douane marocaine : PortNet et ADiL accélèrent la digitalisation du commerce extérieur",
    description:
      "Portail PortNet du commerce extérieur, nouvelle version d'ADiL : ce que la digitalisation de 2026 change pour les importateurs, exportateurs et transitaires au Maroc.",
    category: "Digitalisation douanière",
    published: "2026-11-18",
    readingMinutes: 7,
    keywords: [
      "PortNet Maroc",
      "ADiL douane",
      "digitalisation douane Maroc",
      "guichet unique commerce extérieur",
      "dédouanement en ligne Maroc",
      "ADII 2026",
    ],
    relatedServices: ["declarations-douanieres", "assistance-documentaire"],
  },
  {
    slug: "loi-de-finances-2026-regles-douanieres-maroc",
    title: "Loi de finances 2026 : les nouvelles règles douanières que les importateurs marocains doivent connaître",
    description:
      "Article 19 bis, article 76 ter, classification tarifaire : ce que la Loi de finances n° 50-25 change concrètement pour les importateurs au Maroc en 2026.",
    category: "Réglementation douanière",
    published: "2026-11-01",
    readingMinutes: 8,
    keywords: [
      "Loi de finances Maroc 2026",
      "réglementation douanière Maroc",
      "ADII 2026",
      "importation Maroc",
      "Code des douanes marocain",
    ],
    relatedServices: ["conformite-reglementaire", "declarations-douanieres"],
  },
];

import type { CoverVariant } from "@/components/CoverArt";

export type PostStatus = "published" | "draft";

export type Post = {
  slug: string;
  status: PostStatus;
  /** Shown publicly on draft pages, explaining why the article is not yet approved */
  draftNote?: string;
  title: string;
  /** <title>; defaults to title (page suffix is added automatically) */
  seoTitle?: string;
  /** Meta description and listing excerpt */
  excerpt: string;
  category: string;
  author: string;
  /**
   * Publication date as stated by the source. ISO 8601, reduced precision allowed
   * ("2026-11" when only the month is known). Omit when not verified.
   */
  published?: string;
  /** Human-readable form of `published` */
  publishedLabel?: string;
  updated?: string;
  readingMinutes: number;
  keywords: string[];
  cover: { variant: CoverVariant; alt: string };
  /** Service slugs this article relates to (contextual links) */
  relatedServices: string[];
};

/** Article metadata. Bodies live in src/content/blog/<slug>.md */
export const allPosts: Post[] = [
  {
    slug: "loi-de-finances-2026-regles-douanieres-maroc",
    status: "published",
    title: "Loi de finances 2026 : les nouvelles règles douanières que les importateurs marocains doivent connaître",
    seoTitle: "Loi de finances 2026 : nouvelles règles douanières au Maroc",
    excerpt:
      "Article 19 bis, article 76 ter, classification tarifaire : ce que la Loi de finances n° 50-25 change concrètement pour les importateurs au Maroc en 2026.",
    category: "Réglementation douanière",
    author: "Équipe Customs Wise",
    // Source: supplied article ("Date : Novembre 2026") — day not specified
    published: "2026-11",
    publishedLabel: "Novembre 2026",
    readingMinutes: 8,
    keywords: [
      "Loi de finances Maroc 2026",
      "réglementation douanière Maroc",
      "ADII 2026",
      "importation Maroc",
      "Code des douanes marocain",
    ],
    cover: {
      variant: "law",
      alt: "Illustration : document officiel de la Loi de finances 2026 et tampon douanier",
    },
    relatedServices: ["conformite-douaniere", "declarations-douanieres"],
  },
  {
    slug: "portnet-adil-digitalisation-douane-maroc",
    status: "draft",
    draftNote:
      "Brouillon en attente de validation : le texte définitif de cet article n'a pas encore été fourni. Cette version a été rédigée à partir de sources publiques citées en fin d'article et n'est pas indexée par les moteurs de recherche.",
    title: "Douane marocaine : PortNet et ADiL accélèrent la digitalisation du commerce extérieur",
    seoTitle: "PortNet et ADiL : la digitalisation de la douane marocaine",
    excerpt:
      "Portail PortNet du commerce extérieur, nouvelle version d'ADiL : ce que la digitalisation de 2026 change pour les importateurs et transitaires au Maroc.",
    category: "Digitalisation douanière",
    author: "Équipe Customs Wise",
    readingMinutes: 7,
    keywords: [
      "PortNet Maroc",
      "ADiL douane",
      "digitalisation douane Maroc",
      "guichet unique commerce extérieur",
      "BADR douane",
    ],
    cover: {
      variant: "digital",
      alt: "Illustration : écran de guichet unique numérique relié aux ports et à la douane",
    },
    relatedServices: ["declarations-douanieres", "assistance-documentaire"],
  },
];

/** Published articles only — used for listings, sitemap and related links */
export const posts = allPosts.filter((p) => p.status === "published");

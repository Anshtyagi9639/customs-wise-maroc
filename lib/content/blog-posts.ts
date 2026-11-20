import type { Post } from "@/types";

/** Article metadata. Bodies live in lib/content/blog/<slug>.md */
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
    // Published at the client's request on 19/11/2026 (text written from the public sources cited in the article)
    status: "published",
    title: "Douane marocaine : PortNet et ADiL accélèrent la digitalisation du commerce extérieur",
    seoTitle: "PortNet et ADiL : la digitalisation de la douane marocaine",
    excerpt:
      "Portail PortNet du commerce extérieur, nouvelle version d'ADiL : ce que la digitalisation de 2026 change pour les importateurs et transitaires au Maroc.",
    category: "Digitalisation douanière",
    author: "Équipe Customs Wise",
    // Date of publication on this site
    published: "2026-11-19",
    publishedLabel: "19 novembre 2026",
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
export const posts = allPosts
  .filter((p) => p.status === "published")
  // Newest first (ISO dates sort as strings)
  .sort((a, b) => (b.published ?? "").localeCompare(a.published ?? ""));

/** Finds any article, including drafts (drafts are reachable by URL but noindex) */
export function getPost(slug: string) {
  return allPosts.find((p) => p.slug === slug);
}

/** Distinct categories of published posts (blog explorer filter) */
export const blogTopics = [...new Set(posts.map((p) => p.category))];

/**
 * Industries / sectors (Secteurs d'activité).
 *
 * EMPTY ON PURPOSE: the client brief states that the target sectors (food,
 * automotive…) are not confirmed yet. While this list is empty:
 *   - the homepage Industries section is not rendered,
 *   - the "Secteurs" menu entry is hidden,
 *   - /secteurs returns a 404 and is excluded from the sitemap.
 * Add approved sectors here (texts and images supplied by the Morocco team) and
 * everything appears automatically.
 *
 * Example entry:
 *   {
 *     slug: "agroalimentaire",
 *     title: "Agroalimentaire",
 *     summary: "Texte validé par l'équipe…",
 *     body: ["Paragraphe validé…"],
 *     image: { src: "/industries/agroalimentaire.jpg", alt: "Description de la photo" },
 *   }
 */
export type Industry = {
  slug: string;
  title: string;
  /** Short text for the card */
  summary: string;
  /** Paragraphs for the /secteurs page */
  body: string[];
  /** Photo in /public (optional — an illustration is used otherwise) */
  image?: { src: string; alt: string };
};

export const industries: Industry[] = [];

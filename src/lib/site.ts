/**
 * Central site configuration.
 *
 * Contact details: only verified information is displayed. Phone and email for
 * the Moroccan office are not confirmed yet — set them here (or via env) once
 * approved. Empty values are simply not rendered.
 */
export const site = {
  name: "Customs Wise Maroc",
  brand: "Customs Wise",
  tagline: "Douane, import-export et commerce international",
  // Priority: explicit domain → Vercel's production domain (set automatically on Vercel) → local dev
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
    "http://localhost:3000"
  ).replace(/\/$/, ""),
  locale: "fr_MA",
  defaultTitle: "Customs Wise Maroc | Douane, import-export et commerce international",
  defaultDescription:
    "Découvrez Customs Wise, votre partenaire en formalités douanières et commerce international. Expertise Maroc, Royaume-Uni et Europe.",
  contact: {
    // TODO(business): confirm the Moroccan office phone number (international format, e.g. +212…)
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
    // TODO(business): confirm the Moroccan office email address
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
    /**
     * WhatsApp number (international digits, e.g. 212600000000). Shows the floating
     * "Discuter sur WhatsApp" button. Set ONLY after the Morocco team approves public display.
     */
    whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/[^\d]/g, ""),
    /** Opening hours, e.g. "Lundi – vendredi : 9h00 – 18h00". Empty = not displayed (not confirmed yet). */
    hours: process.env.NEXT_PUBLIC_OPENING_HOURS ?? "",
    // Source: "Our offices" section of customswise.ie
    address: {
      street: "39 Av. Sanhaja",
      postalCode: "90060",
      city: "Tanger",
      country: "Maroc",
      countryCode: "MA",
    },
  },
  mainSite: "https://www.customswise.ie",
  /**
   * Social profiles of the Moroccan entity. Empty until official accounts are confirmed
   * (no icons are rendered for missing networks).
   */
  social: [] as { label: string; href: string; network: "linkedin" | "facebook" | "instagram" | "x" }[],
  /**
   * Launch status. Anything other than "live" shows a site-wide notice that the
   * Moroccan activity is being launched, so the site is not read as confirmation
   * that operations have started. Set NEXT_PUBLIC_SITE_STATUS=live once approved.
   */
  isLive: process.env.NEXT_PUBLIC_SITE_STATUS === "live",
  analytics: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    // Ignored when a GTM container is configured (configure GA4 inside GTM instead) to avoid double counting
    ga4Id: process.env.NEXT_PUBLIC_GTM_ID ? "" : (process.env.NEXT_PUBLIC_GA_ID ?? ""),
  },
} as const;

export function absoluteUrl(path = "/") {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

import { industries } from "./industries";

export type NavItem = { href: string; label: string; children?: { href: string; label: string }[] };

/**
 * Main navigation (same order as the reference layout: Home, About, Services,
 * Specialist area, Industries, Blog, Contact). The "Secteurs" entry appears
 * automatically once approved sectors are added in lib/industries.ts.
 */
export const nav: NavItem[] = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  {
    href: "/services",
    label: "Services",
    children: [
      { href: "/services/declarations-douanieres", label: "Déclarations douanières" },
      { href: "/services/assistance-documentaire", label: "Assistance documentaire" },
      { href: "/services/conformite-douaniere", label: "Conformité douanière et réglementaire" },
      { href: "/services/commerce-international", label: "Accompagnement du commerce international" },
    ],
  },
  {
    href: "/corridor-maroc-europe",
    label: "Corridor Maroc–Europe",
    children: [
      { href: "/corridor-maroc-europe#corridor", label: "Le corridor Maroc – UE – Royaume-Uni" },
      { href: "/corridor-maroc-europe#expertise", label: "Nos points d'expertise" },
      { href: "/corridor-maroc-europe#services-associes", label: "Services associés" },
    ],
  },
  ...(industries.length > 0 ? [{ href: "/secteurs", label: "Secteurs" }] : []),
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

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

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "À propos" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

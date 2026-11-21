/**
 * JSON-LD builders (SITE-BLUEPRINT.md §8). Only verified facts: no ratings,
 * reviews, opening hours or identifiers that the client has not confirmed.
 */
import type { Crumb, Faq, Post, Service } from "@/types";
import { absoluteUrl, offices, site } from "@/lib/site";

const LANG = "fr-MA";
const orgRef = { "@id": absoluteUrl("/#organization") };

/** Countries / areas named in the brief */
const areaServed = [
  { "@type": "Country", name: "Maroc" },
  { "@type": "Country", name: "Royaume-Uni" },
  { "@type": "Place", name: "Union européenne" },
];

export function organizationSchema() {
  const { phone, email } = site.contact;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: site.url,
    // Provisional mark until the official logo is supplied (raster, ≥112px as Google requires)
    logo: absoluteUrl("/icons/icon-512.png"),
    description: site.defaultDescription,
    parentOrganization: { "@type": "Organization", name: site.brand, url: site.mainSite },
    address: offices.map((o) => ({
      "@type": "PostalAddress",
      streetAddress: o.street,
      postalCode: o.postalCode,
      addressLocality: o.locality,
      addressCountry: o.countryCode,
    })),
    areaServed: ["MA", "EU", "GB"],
    ...(phone ? { telephone: phone } : {}),
    ...(email ? { email } : {}),
    ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: site.url,
    name: site.name,
    inLanguage: LANG,
    publisher: orgRef,
  };
}

export function webPageSchema(path: string, name: string, description: string, type = "WebPage") {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": absoluteUrl(`${path}#webpage`),
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: LANG,
    isPartOf: { "@id": absoluteUrl("/#website") },
    about: orgRef,
  };
}

/** Trail WITHOUT the home entry: "Accueil" is prepended automatically */
export function breadcrumbSchema(trail: Crumb[]) {
  const items = [{ name: "Accueil", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": absoluteUrl(`/services/${s.slug}#service`),
    name: s.title,
    serviceType: s.title,
    description: s.lead,
    url: absoluteUrl(`/services/${s.slug}`),
    provider: orgRef,
    areaServed,
    audience: { "@type": "BusinessAudience", audienceType: s.audience },
  };
}

export function servicesSchema(list: Service[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Services de ${site.name}`,
    itemListElement: list.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.title,
      url: absoluteUrl(`/services/${s.slug}`),
    })),
  };
}

/** Only for approved, published articles */
export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    ...(post.published ? { datePublished: post.published } : {}),
    ...(post.updated ? { dateModified: post.updated } : {}),
    inLanguage: LANG,
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: orgRef,
  };
}

export function blogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Blog ${site.name}`,
    url: absoluteUrl("/blog"),
    inLanguage: LANG,
    publisher: orgRef,
  };
}

export function faqSchema(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer.join(" ") },
    })),
  };
}

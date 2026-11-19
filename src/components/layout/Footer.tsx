import Link from "next/link";
import { services } from "@/lib/services";
import { industries } from "@/lib/industries";
import { site } from "@/lib/site";
import { Container } from "@/components/ui";
import { ContactDetails } from "@/components/enquiry";
import { Logo } from "./Logo";
import { ManageConsentLink } from "@/components/analytics/Analytics";

const quickLinks = [
  { href: "/about", label: "À propos" },
  { href: "/services", label: "Tous les services" },
  { href: "/corridor-maroc-europe", label: "Corridor Maroc–Europe" },
  ...(industries.length > 0 ? [{ href: "/secteurs", label: "Secteurs d'activité" }] : []),
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="surface-dark mt-auto bg-navy-950 text-navy-100">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1.1fr]">
        <div className="space-y-4">
          <Logo tone="light" />
          <p className="text-sm leading-relaxed text-navy-100/80">
            Votre partenaire en formalités douanières et commerce international entre le Maroc, l&apos;Union
            européenne et le Royaume-Uni.
          </p>
          {/* Social profiles: rendered only once official accounts are configured in lib/site.ts */}
          {site.social.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Réseaux sociaux">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center rounded-full border border-white/20 px-3 text-xs font-semibold hover:bg-white/10"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Nos services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-white hover:underline">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Liens rapides</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white hover:underline">{l.label}</Link>
              </li>
            ))}
            <li>
              <a href={site.mainSite} className="hover:text-white hover:underline" rel="noopener">
                Customs Wise (Royaume-Uni &amp; Irlande)
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Notre bureau au Maroc</h2>
          <div className="mt-4 text-sm">
            <ContactDetails />
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-navy-100/70 sm:flex-row sm:justify-between">
          <p>© 2026 Customs Wise Maroc. Tous droits réservés.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/faq" className="hover:text-white hover:underline">FAQ</Link>
            <Link href="/contact" className="hover:text-white hover:underline">Contact</Link>
            <Link href="/confidentialite" className="hover:text-white hover:underline">Politique de confidentialité</Link>
            <ManageConsentLink className="hover:text-white hover:underline" />
          </div>
        </Container>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { services, industries } from "@/lib/content";
import { offices, site } from "@/lib/site";
import { Logo } from "@/components/ui/logo";
import { ContactDetails } from "@/components/sections/contact-details";
import { ManageConsentLink } from "@/components/analytics/analytics";

const quickLinks = [
  { href: "/about", label: "À propos" },
  { href: "/services", label: "Tous les services" },
  { href: "/corridor-maroc-europe", label: "Corridor Maroc–Europe" },
  ...(industries.length > 0 ? [{ href: "/secteurs", label: "Secteurs d'activité" }] : []),
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

/** Footer: logo + summary, social, services, quick links, contact + hours, offices. */
export function Footer() {
  return (
    <footer className="surface-dark mt-auto bg-overnight text-starlight">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1.1fr]">
        <div className="space-y-4">
          <Logo tone="light" />
          <p className="text-sm leading-relaxed text-starlight/80">
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
                    className="inline-flex min-h-11 items-center rounded-full border border-salt/20 px-4 text-xs font-semibold hover:bg-salt/10"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-salt">Nos services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-salt hover:underline">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-salt">Liens rapides</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-salt hover:underline">{l.label}</Link>
              </li>
            ))}
            <li>
              <a href={site.mainSite} className="hover:text-salt hover:underline" rel="noopener">
                Customs Wise (Royaume-Uni &amp; Irlande)
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-salt">
            {offices.length > 1 ? "Nos bureaux" : "Notre bureau au Maroc"}
          </h2>
          <div className="mt-4 text-sm">
            <ContactDetails />
          </div>
          {offices.length > 1 && (
            <ul className="mt-6 space-y-3 text-sm">
              {offices.slice(1).map((o) => (
                <li key={o.id}>
                  <span className="font-semibold text-salt">{o.city}</span>
                  <address className="not-italic">
                    {o.street}, {o.postalCode} {o.locality}
                  </address>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="border-t border-salt/10">
        <div className="container-site flex flex-col gap-2 py-5 text-xs text-starlight/80 sm:flex-row sm:justify-between">
          <p>© 2026 {site.name}. Tous droits réservés.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/faq" className="hover:text-salt hover:underline">FAQ</Link>
            <Link href="/contact" className="hover:text-salt hover:underline">Contact</Link>
            <Link href="/confidentialite" className="hover:text-salt hover:underline">Politique de confidentialité</Link>
            <ManageConsentLink className="hover:text-salt hover:underline" />
          </div>
        </div>
      </div>
    </footer>
  );
}

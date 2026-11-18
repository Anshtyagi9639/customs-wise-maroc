import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { services } from "@/lib/services";
import { site, telHref } from "@/lib/site";
import { Container } from "@/components/ui";
import { Logo } from "./Logo";

export function Footer() {
  const { phone, email, address } = site.contact;
  return (
    <footer className="mt-auto bg-navy-950 text-navy-100">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo tone="light" />
          <p className="text-sm leading-relaxed text-navy-100/80">
            Votre partenaire en formalités douanières et commerce international entre le Maroc, l&apos;Union
            européenne et le Royaume-Uni.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Nos services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="hover:text-white hover:underline">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Liens utiles</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/services" className="hover:text-white hover:underline">Services</Link></li>
            <li><Link href="/blog" className="hover:text-white hover:underline">Blog</Link></li>
            <li><Link href="/faq" className="hover:text-white hover:underline">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white hover:underline">Contact</Link></li>
            <li>
              <a href={site.mainSite} className="hover:text-white hover:underline" rel="noopener">
                Customs Wise (Royaume-Uni &amp; Irlande)
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Nous contacter</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
              <address className="not-italic">
                {address.street}
                <br />
                {address.postalCode} {address.city}, {address.country}
              </address>
            </li>
            {phone && (
              <li className="flex gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
                <a href={telHref(phone)} className="hover:text-white hover:underline">{phone}</a>
              </li>
            )}
            {email && (
              <li className="flex gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
                <a href={`mailto:${email}`} className="hover:text-white hover:underline">{email}</a>
              </li>
            )}
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-xs text-navy-100/70 sm:flex-row sm:justify-between">
          <p>© 2026 Customs Wise. Tous droits réservés.</p>
          <p>Douane · Import-export · Commerce international</p>
        </Container>
      </div>
    </footer>
  );
}

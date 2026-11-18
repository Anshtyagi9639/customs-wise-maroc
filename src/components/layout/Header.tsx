import Link from "next/link";
import { Phone } from "lucide-react";
import { nav, site, telHref } from "@/lib/site";
import { Container, ButtonLink } from "@/components/ui";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header() {
  const { phone } = site.contact;
  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo />
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-ink transition-colors hover:text-accent-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          {phone && (
            <a
              href={telHref(phone)}
              aria-label={`Appeler Customs Wise Maroc : ${phone}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 text-navy-900 transition-colors hover:bg-navy-50"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          <ButtonLink href="/contact" className="hidden sm:inline-flex">
            Demander un devis
          </ButtonLink>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}

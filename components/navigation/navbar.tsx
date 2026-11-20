import Link from "next/link";
import { ChevronDown, Phone } from "lucide-react";
import { mainNav, primaryCta, site, telHref } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { MobileNav } from "./mobile-nav";
import { NavShell } from "./nav-shell";
import { TopBar } from "./top-bar";

/**
 * Site header: top bar + sticky main bar (logo, dropdown menus from `mainNav`,
 * "Appelez-nous" when a phone is approved, primary CTA). Hides on scroll down
 * and returns on scroll up (NavShell).
 */
export function Navbar() {
  const { phone } = site.contact;
  return (
    <NavShell>
      <TopBar />
      <div className="relative border-b border-line bg-salt/95 backdrop-blur">
        <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-20">
          <Logo />
          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {mainNav.map((item) =>
                item.children ? (
                  // Dropdown: opens on hover and when any link inside receives keyboard focus
                  <li key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      aria-haspopup="true"
                      className="inline-flex items-center gap-1 py-7 text-sm font-medium text-overnight transition-colors hover:text-atlantic"
                    >
                      {item.label}
                      <ChevronDown
                        className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                        aria-hidden="true"
                      />
                    </Link>
                    <ul className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 translate-y-1 rounded-xl border border-line bg-salt p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="block rounded-lg px-4 py-2.5 text-sm text-overnight hover:bg-mist hover:text-atlantic"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm font-medium text-overnight transition-colors hover:text-atlantic">
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            {phone && (
              <a
                href={telHref(phone)}
                className="hidden min-h-12 items-center gap-2 rounded-brand px-3 text-sm font-semibold text-ship hover:bg-mist xl:inline-flex"
              >
                <Phone className="h-4 w-4 text-atlantic" aria-hidden="true" />
                Appelez-nous
              </a>
            )}
            <ButtonLink href={primaryCta.href} className="hidden sm:inline-flex">
              {primaryCta.label}
            </ButtonLink>
            <MobileNav />
          </div>
        </div>
      </div>
    </NavShell>
  );
}

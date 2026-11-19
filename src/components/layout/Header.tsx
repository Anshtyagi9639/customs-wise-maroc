import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { nav } from "@/lib/site";
import { Container, ButtonLink } from "@/components/ui";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { TopBar } from "./TopBar";

export function Header() {
  return (
    <header className="sticky top-0 z-40 shadow-sm">
      <TopBar />
      <div className="relative border-b border-navy-100 bg-white/95 backdrop-blur">
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Logo />
          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {nav.map((item) =>
                item.children ? (
                  // Dropdown: opens on hover and when any link inside receives keyboard focus
                  <li key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      aria-haspopup="true"
                      className="inline-flex items-center gap-1 py-7 text-sm font-medium text-ink transition-colors hover:text-accent-600"
                    >
                      {item.label}
                      <ChevronDown
                        className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                        aria-hidden="true"
                      />
                    </Link>
                    <ul className="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 translate-y-1 rounded-xl border border-navy-100 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="block rounded-lg px-4 py-2.5 text-sm text-ink hover:bg-navy-50 hover:text-accent-700"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm font-medium text-ink transition-colors hover:text-accent-600">
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <ButtonLink href="/contact" className="hidden sm:inline-flex">
              Demander un devis
            </ButtonLink>
            <MobileNav />
          </div>
        </Container>
      </div>
    </header>
  );
}

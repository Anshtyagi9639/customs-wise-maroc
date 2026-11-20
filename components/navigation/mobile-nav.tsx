"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNav, primaryCta } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the menu on navigation
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-12 w-12 items-center justify-center rounded-md text-ship hover:bg-mist"
      >
        {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
      </button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Navigation mobile"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-6.5rem)] overflow-y-auto border-b border-line bg-salt shadow-lg"
        >
          <ul className="container-site space-y-1 py-4">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="block rounded-md px-3 py-3 text-base font-medium text-overnight hover:bg-mist aria-[current=page]:text-atlantic"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-2 ml-3 border-l border-line pl-3">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="block rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-mist hover:text-atlantic"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-2">
              <Link href={primaryCta.href} className={cn(buttonVariants(), "w-full")}>
                {primaryCta.label}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

import Link from "next/link";
import { cn } from "@/lib/utils/cn";

/**
 * PROVISIONAL brand mark ("CW" monogram, ship + cargo), drawn by us — same
 * geometry as app/icon.svg, public/logos/* and public/icons/*. Replace all of
 * them together when the official Customs Wise Maroc logo is supplied.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={cn("h-9 w-9 shrink-0", className)}>
      <rect width="64" height="64" rx="13" fill="#0a3542" />
      <path
        d="M29.13 23.87 A11.5 11.5 0 1 0 29.13 40.13"
        fill="none"
        stroke="#f9ed32"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M35.5 21 L40.5 43 L46 30 L51.5 43 L56.5 21"
        fill="none"
        stroke="#f9ed32"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Logo: mark + "CUSTOMSWISE" wordmark + "MAROC" tag. `tone="light"` on dark backgrounds. */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const dark = tone === "dark";
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="Customs Wise Maroc — accueil">
      <LogoMark className={dark ? "" : "rounded-[10px] ring-1 ring-salt/25"} />
      <span className="inline-flex items-baseline gap-1.5">
        <span className={cn("font-display text-2xl font-semibold uppercase tracking-wide", dark ? "text-ship" : "text-salt")}>
          Customs<span className={dark ? "text-atlantic" : "text-cargo"}>Wise</span>
        </span>
        <span
          className={cn(
            "rounded-sm px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest",
            dark ? "bg-ship text-salt" : "bg-salt/15 text-salt",
          )}
        >
          Maroc
        </span>
      </span>
    </Link>
  );
}

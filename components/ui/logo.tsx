import Link from "next/link";

/** Text wordmark — replace with the approved Customs Wise Maroc logo file when available. */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const main = tone === "dark" ? "text-ship" : "text-salt";
  return (
    <Link href="/" className="group inline-flex items-baseline gap-1.5" aria-label="Customs Wise Maroc — accueil">
      <span className={`font-display text-2xl font-semibold uppercase tracking-wide ${main}`}>
        Customs<span className={tone === "dark" ? "text-atlantic" : "text-cargo"}>Wise</span>
      </span>
      <span
        className={`rounded-sm px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest ${
          tone === "dark" ? "bg-ship text-salt" : "bg-salt/15 text-salt"
        }`}
      >
        Maroc
      </span>
    </Link>
  );
}

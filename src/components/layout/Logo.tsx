import Link from "next/link";

/** Text wordmark — replace with the approved Customs Wise Maroc logo file when available. */
export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const main = tone === "dark" ? "text-navy-900" : "text-white";
  return (
    <Link href="/" className="group inline-flex items-baseline gap-1.5" aria-label="Customs Wise Maroc — accueil">
      <span className={`text-xl font-extrabold tracking-tight ${main}`}>
        Customs<span className="text-accent-600">Wise</span>
      </span>
      <span
        className={`rounded-sm px-1.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest ${
          tone === "dark" ? "bg-navy-900 text-white" : "bg-white/15 text-white"
        }`}
      >
        Maroc
      </span>
    </Link>
  );
}

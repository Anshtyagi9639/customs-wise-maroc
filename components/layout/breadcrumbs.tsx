import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "@/types";

/** Breadcrumb trail (on dark page heroes). `trail` excludes the home entry. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const items = [{ name: "Accueil", path: "/" }, ...trail];
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-starlight">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => (
          <li key={`${c.path}-${i}`} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-salt">{c.name}</span>
            ) : (
              <Link href={c.path} className="hover:text-salt hover:underline">{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

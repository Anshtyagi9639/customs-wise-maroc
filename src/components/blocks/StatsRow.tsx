import type { LucideIcon } from "lucide-react";

export type Stat = { icon: LucideIcon; title: string; text: string };

/** Row of 4 icon highlights (used in the hero, on a dark background). */
export function StatsRow({ items }: { items: Stat[] }) {
  return (
    <ul className="grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((h) => (
        <li key={h.title} className="flex items-start gap-4 bg-navy-950/70 p-6 backdrop-blur">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cargo text-navy-950">
            <h.icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-lg uppercase tracking-wide text-white">{h.title}</p>
            <p className="mt-1 text-sm text-navy-100">{h.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

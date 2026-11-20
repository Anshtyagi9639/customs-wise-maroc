import type { IconItem } from "@/types";

/** Band of short verified facts with icons (home, under the hero). */
export function FactsBand({ items }: { items: IconItem[] }) {
  return (
    <section aria-label="Repères" className="bg-ship">
      <ul data-reveal className="container-site grid gap-px bg-salt/10 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((h) => (
          <li key={h.title} className="flex items-start gap-4 bg-ship p-6">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cargo text-overnight">
              <h.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-lg uppercase tracking-wide text-salt">{h.title}</p>
              <p className="mt-1 text-sm text-starlight">{h.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

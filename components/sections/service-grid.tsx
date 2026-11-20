import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types";
import { services } from "@/lib/content";
import { ServiceIcon } from "@/components/ui/service-icon";

/** One service card: icon, title, short description, "En savoir plus". */
export function ServiceCard({ service: s }: { service: Service }) {
  return (
    <Link
      href={`/services/${s.slug}`}
      className="group flex h-full flex-col rounded-brand border border-line bg-salt p-7 shadow-card transition hover:-translate-y-1 hover:border-atlantic/40 hover:shadow-lg"
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-brand bg-ship text-cargo transition-colors group-hover:bg-atlantic">
        <ServiceIcon icon={s.icon} className="h-7 w-7" />
      </span>
      <h3 className="mt-6 text-xl font-semibold leading-snug text-ship">{s.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{s.summary}</p>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-atlantic">
        En savoir plus
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

/** One card per entry in `services` (4 today — no placeholders). */
export function ServiceGrid() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s) => (
        <li key={s.slug}>
          <ServiceCard service={s} />
        </li>
      ))}
    </ul>
  );
}

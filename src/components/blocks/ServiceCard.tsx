import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services, type Service } from "@/lib/services";
import { ServiceGlyph } from "@/components/ui";

/** One service card: icon, title, short description, "En savoir plus". */
export function ServiceCard({ service: s }: { service: Service }) {
  return (
    <Link
      href={`/services/${s.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-accent-600/40 hover:shadow-lg"
    >
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-navy-900 text-cargo transition-colors group-hover:bg-accent-600">
        <ServiceGlyph icon={s.icon} className="h-7 w-7" />
      </span>
      <h3 className="mt-6 text-xl font-semibold leading-snug text-navy-900">{s.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.summary}</p>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-700">
        En savoir plus
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

/** Grid of all services (4 today — one card per real service, no placeholders). */
export function ServiceCardGrid() {
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

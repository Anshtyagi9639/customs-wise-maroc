import { processSteps } from "@/lib/content/pages";
import { SectionHeading } from "./section-heading";

/** "Comment se déroule un accompagnement" — 3 generic steps (no delay or result promise). */
export function ProcessSection({ className = "bg-mist" }: { className?: string }) {
  return (
    <section aria-labelledby="process-title" className={`py-16 sm:py-24 ${className}`}>
      <div data-reveal className="container-site">
        <SectionHeading id="process-title" kicker="Démarche" title="Comment se déroule un accompagnement" />
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {processSteps.map((s, i) => (
            <li key={s.title} className="rounded-brand bg-salt p-7 shadow-card ring-1 ring-line">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ship font-display text-lg text-cargo">
                  {i + 1}
                </span>
                <s.icon className="h-5 w-5 text-atlantic" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-sans text-lg font-semibold text-ship">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

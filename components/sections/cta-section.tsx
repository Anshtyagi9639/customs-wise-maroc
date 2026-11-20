import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { primaryCta } from "@/lib/site";

/** Closing enquiry call to action, at the end of most pages. */
export function CTASection({
  title = "Parlons de vos opérations d'import-export",
  text = "Contactez Customs Wise pour discuter de vos besoins et identifier les formalités applicables à vos marchandises.",
  href = primaryCta.href,
  label = primaryCta.label,
}: {
  title?: string;
  text?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-clearance pattern-zellige">
      <div data-reveal className="container-site flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 id="cta-title" className="text-3xl font-semibold">{title}</h2>
          <p className="mt-3 text-lg text-starlight">{text}</p>
        </div>
        <ButtonLink href={href} size="lg" className="shrink-0">
          {label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </section>
  );
}

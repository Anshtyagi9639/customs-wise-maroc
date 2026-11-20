import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { site } from "@/lib/site";
import { ContactDetails } from "./contact-details";

/**
 * Enquiry section (#enquiry): intro + contact details on the left, form on the
 * right. One per page (home and contact), so field ids stay unique.
 */
export function EnquirySection({
  title = "Faire une demande",
  intro = "Contactez Customs Wise pour discuter de vos besoins et identifier les formalités applicables à vos marchandises.",
  showFaqTeaser = false,
  extra,
}: {
  title?: string;
  intro?: string;
  /** Link to the FAQ under the contact details (contact page) */
  showFaqTeaser?: boolean;
  /** Extra content under the contact details */
  extra?: ReactNode;
}) {
  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="scroll-mt-36 border-t border-line py-16 sm:py-24">
      <div data-reveal className="container-site grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div className="bg-clearance pattern-zellige rounded-brand p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cargo">Contact</p>
          <h2 id="enquiry-title" className="mt-2 text-3xl font-semibold sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-starlight">{intro}</p>
          <div className="mt-8 text-sm text-starlight">
            <ContactDetails />
          </div>
          {extra}
          {showFaqTeaser && (
            <Link
              href="/faq"
              className="mt-8 inline-flex min-h-12 items-center gap-1 text-sm font-semibold text-cargo hover:underline"
            >
              Consultez d&apos;abord nos questions fréquentes <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
          {!site.isLive && (
            <p className="mt-8 rounded-brand bg-salt/10 p-4 text-sm text-starlight">
              Customs Wise Maroc est en cours de lancement : votre demande nous permet de vérifier la disponibilité du
              service pour votre opération.
            </p>
          )}
        </div>
        <div className="rounded-brand border border-line bg-salt p-6 shadow-card sm:p-9">
          <h3 className="text-2xl font-semibold text-ship">Votre demande</h3>
          <p className="mt-2 text-ink-soft">Les champs marqués d&apos;un * sont obligatoires.</p>
          <div className="mt-8">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-brand bg-mist" />}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

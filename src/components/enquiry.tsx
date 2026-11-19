import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/ui";
import { site, telHref } from "@/lib/site";

/** Contact details list — only approved values are rendered (empty env = hidden). */
export function ContactDetails({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { phone, email, address, hours } = site.contact;
  const icon = `mt-0.5 h-5 w-5 shrink-0 ${tone === "dark" ? "text-cargo" : "text-accent-600"}`;
  const link = tone === "dark" ? "hover:text-white hover:underline" : "hover:text-accent-700 hover:underline";
  return (
    <ul className="space-y-4">
      <li className="flex gap-3">
        <MapPin className={icon} aria-hidden="true" />
        <address className="not-italic">
          {address.street}
          <br />
          {address.postalCode} {address.city}, {address.country}
        </address>
      </li>
      {phone && (
        <li className="flex gap-3">
          <Phone className={icon} aria-hidden="true" />
          <a href={telHref(phone)} className={link}>{phone}</a>
        </li>
      )}
      {email && (
        <li className="flex gap-3">
          <Mail className={icon} aria-hidden="true" />
          <a href={`mailto:${email}`} className={link}>{email}</a>
        </li>
      )}
      {hours && (
        <li className="flex gap-3">
          <Clock className={icon} aria-hidden="true" />
          <span>{hours}</span>
        </li>
      )}
    </ul>
  );
}

/**
 * Homepage enquiry block: contact details on the left, enquiry form on the right.
 * (Not used on /contact, which already hosts the form, to keep field ids unique.)
 */
export function EnquirySection() {
  return (
    <section id="demande" aria-labelledby="enquiry-title" className="scroll-mt-36 bg-navy-50 py-20 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div className="surface-dark pattern-zellige rounded-2xl bg-navy-900 p-8 text-navy-100 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cargo">Contact</p>
          <h2 id="enquiry-title" className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
            Faire une demande
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            Contactez Customs Wise pour discuter de vos besoins et identifier les formalités applicables à vos
            marchandises.
          </p>
          <div className="mt-8 text-sm">
            <ContactDetails />
          </div>
          {!site.isLive && (
            <p className="mt-8 rounded-lg bg-white/10 p-4 text-sm">
              Customs Wise Maroc est en cours de lancement : votre demande nous permet de vérifier la disponibilité du
              service pour votre opération.
            </p>
          )}
        </div>
        <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-9">
          <h3 className="text-2xl font-semibold text-navy-900">Votre demande</h3>
          <p className="mt-2 text-muted">Les champs marqués d&apos;un * sont obligatoires.</p>
          <div className="mt-8">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-md bg-navy-50" />}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}

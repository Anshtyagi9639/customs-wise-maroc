"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertTriangle, Loader2, Send } from "lucide-react";
import { contactSchema, serviceOptions, type ContactInput, type ContactResult } from "@/lib/contact-schema";
import { submitEnquiry } from "@/app/contact/actions";
import { buttonClass } from "@/components/ui";
import { track } from "@/lib/analytics";

const field =
  "mt-1.5 block w-full rounded-md border border-navy-100 bg-white px-3.5 py-2.5 text-ink shadow-sm placeholder:text-muted/60 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30 aria-[invalid=true]:border-red-600";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-700">
      {message}
    </p>
  );
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<ContactResult | null>(null);
  const started = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", company: "", email: "", phone: "", service: "", origin: "", destination: "", message: "", website: "" },
  });

  // Pre-select the service when arriving from a service CTA (?service=slug)
  useEffect(() => {
    const s = searchParams.get("service");
    if (s && serviceOptions.some((o) => o.value === s)) setValue("service", s);
  }, [searchParams, setValue]);

  const onSubmit = async (data: ContactInput) => {
    setResult(null);
    try {
      const res = await submitEnquiry(data);
      setResult(res);
      if (res.status === "success") {
        // Conversion is recorded only once the server confirms the enquiry was delivered
        track("generate_lead", { service: data.service });
        reset();
      } else {
        track("form_error", { error_type: res.status });
      }
    } catch {
      setResult({ status: "error" });
      track("form_error", { error_type: "network" });
    }
  };

  // Client-side validation failure: report which fields failed (names only, never values)
  const onInvalid = (errs: Record<string, unknown>) => {
    track("form_error", { error_type: "validation", fields: Object.keys(errs).join(",") });
  };

  const onFirstInteraction = () => {
    if (started.current) return;
    started.current = true;
    track("form_start", { form_id: "contact" });
  };

  if (result?.status === "success") {
    return (
      <div role="status" className="rounded-xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-green-700" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold text-navy-900">Merci, votre demande a bien été envoyée.</h3>
        <p className="mt-2 text-muted">Notre équipe revient vers vous dans les meilleurs délais.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} onFocus={onFirstInteraction} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-navy-900">
            Nom <span aria-hidden="true" className="text-accent-600">*</span>
          </label>
          <input id="name" autoComplete="name" className={field} aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="company" className="text-sm font-medium text-navy-900">Société</label>
          <input id="company" autoComplete="organization" className={field} {...register("company")} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-navy-900">
            E-mail professionnel <span aria-hidden="true" className="text-accent-600">*</span>
          </label>
          <input id="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-navy-900">Téléphone</label>
          <input id="phone" type="tel" autoComplete="tel" className={field} aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="text-sm font-medium text-navy-900">
          Type de demande <span aria-hidden="true" className="text-accent-600">*</span>
        </label>
        <select id="service" className={field} aria-invalid={!!errors.service}
          aria-describedby={errors.service ? "service-error" : undefined} {...register("service")}>
          <option value="">Choisissez…</option>
          {serviceOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <FieldError id="service-error" message={errors.service?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="origin" className="text-sm font-medium text-navy-900">Pays d&apos;origine des marchandises</label>
          <input id="origin" className={field} placeholder="Ex. : Maroc" {...register("origin")} />
        </div>
        <div>
          <label htmlFor="destination" className="text-sm font-medium text-navy-900">Pays de destination</label>
          <input id="destination" className={field} placeholder="Ex. : Royaume-Uni" {...register("destination")} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-navy-900">
          Parlez-nous de vos marchandises et de votre itinéraire{" "}
          <span aria-hidden="true" className="text-accent-600">*</span>
        </label>
        <textarea id="message" rows={6} className={field} aria-invalid={!!errors.message}
          placeholder="Type de marchandises, code SH si connu, mode de transport, volume, calendrier…"
          aria-describedby={errors.message ? "message-error" : undefined} {...register("message")} />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>

      {/* Honeypot: hidden from users and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Laissez ce champ vide</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-accent-600" aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined} {...register("consent")} />
          <span>
            J&apos;accepte que Customs Wise utilise ces informations pour répondre à ma demande (
            <a href="/confidentialite" className="underline hover:text-navy-900">politique de confidentialité</a>).{" "}
            <span aria-hidden="true" className="text-accent-600">*</span>
          </span>
        </label>
        <FieldError id="consent-error" message={errors.consent?.message} />
      </div>

      {result && result.status !== "invalid" && (
        <div role="alert" className="flex gap-3 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            {result.status === "not_configured"
              ? "L'envoi en ligne n'est pas encore activé. Votre demande n'a pas été transmise : merci de nous contacter directement par téléphone ou par e-mail."
              : "Une erreur est survenue et votre demande n'a pas été transmise. Merci de réessayer ou de nous contacter directement."}
          </p>
        </div>
      )}
      {result?.status === "invalid" && (
        <p role="alert" className="text-sm text-red-700">{result.message}</p>
      )}

      <button type="submit" disabled={isSubmitting} className={buttonClass("primary", "w-full px-7 py-3.5 text-base disabled:opacity-70 sm:w-auto")}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Envoi en cours…
          </>
        ) : (
          <>
            Envoyer ma demande <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}

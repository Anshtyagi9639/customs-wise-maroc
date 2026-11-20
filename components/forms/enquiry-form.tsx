"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, AlertTriangle, Loader2, Send } from "lucide-react";
import { enquirySchema, enquiryServiceOptions, type EnquiryInput, type EnquiryResult } from "@/lib/validation/enquiry";
import { submitEnquiry } from "@/lib/enquiry/actions";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

const field =
  "mt-1.5 block min-h-12 w-full rounded-brand border border-line bg-salt px-3.5 py-2.5 text-overnight shadow-sm placeholder:text-pebble focus:border-atlantic focus:outline-none focus:ring-2 focus:ring-atlantic/30 aria-[invalid=true]:border-error";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-error">
      {message}
    </p>
  );
}

/**
 * Enquiry form: client-side Zod validation, server action delivery, honeypot field,
 * consent checkbox. Success is shown only after the server confirms delivery.
 */
export function EnquiryForm() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState<EnquiryResult | null>(null);
  const started = useRef(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", company: "", email: "", phone: "", service: "", origin: "", destination: "", message: "", website: "" },
  });

  // Pre-select the service when arriving from a service CTA (?service=slug)
  useEffect(() => {
    const s = searchParams.get("service");
    if (s && enquiryServiceOptions.some((o) => o.value === s)) setValue("service", s);
  }, [searchParams, setValue]);

  const onSubmit = async (data: EnquiryInput) => {
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
      <div role="status" className="rounded-xl border border-transit/40 bg-transit/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-transit" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-semibold text-ship">Merci, votre demande a bien été envoyée.</h3>
        <p className="mt-2 text-ink-soft">Notre équipe revient vers vous dans les meilleurs délais.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} onFocus={onFirstInteraction} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ship">
            Nom <span aria-hidden="true" className="text-atlantic">*</span>
          </label>
          <input id="name" autoComplete="name" className={field} aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="company" className="text-sm font-medium text-ship">Société</label>
          <input id="company" autoComplete="organization" className={field} {...register("company")} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ship">
            E-mail professionnel <span aria-hidden="true" className="text-atlantic">*</span>
          </label>
          <input id="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-ship">Téléphone</label>
          <input id="phone" type="tel" autoComplete="tel" className={field} aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} />
          <FieldError id="phone-error" message={errors.phone?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="text-sm font-medium text-ship">
          Type de demande <span aria-hidden="true" className="text-atlantic">*</span>
        </label>
        <select id="service" className={field} aria-invalid={!!errors.service}
          aria-describedby={errors.service ? "service-error" : undefined} {...register("service")}>
          <option value="">Choisissez…</option>
          {enquiryServiceOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <FieldError id="service-error" message={errors.service?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="origin" className="text-sm font-medium text-ship">Pays d&apos;origine des marchandises</label>
          <input id="origin" className={field} placeholder="Ex. : Maroc" {...register("origin")} />
        </div>
        <div>
          <label htmlFor="destination" className="text-sm font-medium text-ship">Pays de destination</label>
          <input id="destination" className={field} placeholder="Ex. : Royaume-Uni" {...register("destination")} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ship">
          Parlez-nous de vos marchandises et de votre itinéraire{" "}
          <span aria-hidden="true" className="text-atlantic">*</span>
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
        <label className="flex items-start gap-3 text-sm text-ink-soft">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-atlantic" aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined} {...register("consent")} />
          <span>
            J&apos;accepte que Customs Wise utilise ces informations pour répondre à ma demande (
            <a href="/confidentialite" className="underline hover:text-ship">politique de confidentialité</a>).{" "}
            <span aria-hidden="true" className="text-atlantic">*</span>
          </span>
        </label>
        <FieldError id="consent-error" message={errors.consent?.message} />
      </div>

      {result && result.status !== "invalid" && (
        <div role="alert" className="flex gap-3 rounded-md border border-haul bg-haul/15 p-4 text-sm text-overnight">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            {result.status === "not_configured"
              ? "L'envoi en ligne n'est pas encore activé. Votre demande n'a pas été transmise : merci de nous contacter directement par téléphone ou par e-mail."
              : result.status === "rate_limited"
                ? "Vous avez envoyé plusieurs demandes en peu de temps. Merci de patienter quelques minutes avant de réessayer."
                : "Une erreur est survenue et votre demande n'a pas été transmise. Merci de réessayer ou de nous contacter directement."}
          </p>
        </div>
      )}
      {result?.status === "invalid" && (
        <p role="alert" className="text-sm text-error">{result.message}</p>
      )}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Envoi en cours…
          </>
        ) : (
          <>
            Envoyer la demande <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}

"use server";

import { contactSchema, type ContactResult } from "@/lib/contact-schema";

/**
 * Enquiry submission — INTEGRATION POINT.
 *
 * Set CONTACT_WEBHOOK_URL (server-only env var) to an endpoint that accepts a
 * JSON POST, e.g. a Make/Zapier/Power Automate webhook or a Formspree form
 * endpoint, which then emails the team / creates a CRM lead.
 *
 * Until it is configured, the form reports that sending is unavailable instead
 * of pretending the enquiry was received.
 */
export async function submitEnquiry(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "invalid", message: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const { website, consent: _consent, ...data } = parsed.data;
  void _consent;
  // Honeypot filled → silently accept without forwarding (bot)
  if (website) return { status: "success" };

  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) return { status: "not_configured" };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...data, source: "customs-wise-maroc", submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("Enquiry webhook failed", res.status);
      return { status: "error" };
    }
    return { status: "success" };
  } catch (err) {
    console.error("Enquiry webhook error", err);
    return { status: "error" };
  }
}

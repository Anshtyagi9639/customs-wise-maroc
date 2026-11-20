/**
 * Enquiry delivery (server only).
 *
 * Two channels, both optional, configured with server env vars:
 *  1. Email via the Resend HTTP API — EMAIL_API_KEY + EMAIL_FROM + ENQUIRY_TO_EMAIL
 *     (optional EMAIL_API_URL). The visitor's address is set as Reply-To.
 *  2. Webhook (JSON POST) — CONTACT_WEBHOOK_URL (existing name) or ENQUIRY_WEBHOOK_URL,
 *     optional ENQUIRY_WEBHOOK_SECRET sent as the `X-Enquiry-Secret` header.
 *
 * The enquiry counts as delivered only if at least one configured channel
 * accepts it. With no channel configured the result is "not_configured".
 */
import { enquiryServiceOptions, type EnquiryInput } from "@/lib/validation/enquiry";

type Payload = Omit<EnquiryInput, "consent" | "website">;
export type DeliveryResult = "delivered" | "not_configured" | "failed";

const TIMEOUT = 10_000;

function escapeHtml(v: string) {
  return v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

async function sendEmail(data: Payload): Promise<boolean | null> {
  const key = process.env.EMAIL_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.ENQUIRY_TO_EMAIL;
  if (!key || !from || !to) return null; // channel not configured

  const serviceLabel = enquiryServiceOptions.find((o) => o.value === data.service)?.label ?? data.service;
  const rows: [string, string | undefined][] = [
    ["Nom", data.name],
    ["Société", data.company],
    ["E-mail", data.email],
    ["Téléphone", data.phone],
    ["Type de demande", serviceLabel],
    ["Origine", data.origin],
    ["Destination", data.destination],
  ];
  const html =
    `<h2>Nouvelle demande — Customs Wise Maroc</h2><table>` +
    rows
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><th align="left">${k}</th><td>${escapeHtml(v!)}</td></tr>`)
      .join("") +
    `</table><p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>`;

  try {
    const res = await fetch(process.env.EMAIL_API_URL || "https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        reply_to: data.email,
        subject: `Demande de devis — ${serviceLabel} — ${data.name}`,
        html,
      }),
      signal: AbortSignal.timeout(TIMEOUT),
    });
    if (!res.ok) console.error("Enquiry email failed", res.status);
    return res.ok;
  } catch (err) {
    console.error("Enquiry email error", err);
    return false;
  }
}

async function sendWebhook(data: Payload): Promise<boolean | null> {
  const endpoint = process.env.CONTACT_WEBHOOK_URL || process.env.ENQUIRY_WEBHOOK_URL;
  if (!endpoint) return null;
  const secret = process.env.ENQUIRY_WEBHOOK_SECRET;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(secret ? { "X-Enquiry-Secret": secret } : {}),
      },
      body: JSON.stringify({ ...data, source: "customs-wise-maroc", submittedAt: new Date().toISOString() }),
      signal: AbortSignal.timeout(TIMEOUT),
    });
    if (!res.ok) console.error("Enquiry webhook failed", res.status);
    return res.ok;
  } catch (err) {
    console.error("Enquiry webhook error", err);
    return false;
  }
}

export async function deliverEnquiry(data: Payload): Promise<DeliveryResult> {
  const [email, webhook] = await Promise.all([sendEmail(data), sendWebhook(data)]);
  if (email === null && webhook === null) return "not_configured";
  return email === true || webhook === true ? "delivered" : "failed";
}

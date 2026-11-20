"use server";

import { headers } from "next/headers";
import { enquirySchema, type EnquiryResult } from "@/lib/validation/enquiry";
import { deliverEnquiry } from "./deliver";
import { isRateLimited } from "./rate-limit";

/**
 * Enquiry server action: re-validates with the shared Zod schema, discards
 * honeypot submissions, rate-limits per IP, then delivers (email and/or
 * webhook — see deliver.ts). Success is returned only after delivery.
 */
export async function submitEnquiry(input: unknown): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    return { status: "invalid", message: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const { website, consent: _consent, ...data } = parsed.data;
  void _consent;
  // Honeypot filled → silently accept without forwarding (bot)
  if (website) return { status: "success" };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (isRateLimited(ip)) return { status: "rate_limited" };

  const result = await deliverEnquiry(data);
  if (result === "not_configured") return { status: "not_configured" };
  return result === "delivered" ? { status: "success" } : { status: "error" };
}

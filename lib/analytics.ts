/**
 * Analytics event helper (client-side).
 *
 * Events are pushed to `window.dataLayer` (read by GTM or by gtag.js for GA4).
 * Nothing is sent unless an analytics ID is configured AND the visitor has
 * accepted analytics cookies — see components/analytics/Analytics.tsx.
 *
 * Never put personal data (names, emails, phone numbers, message text) in params.
 */
export type AnalyticsEvent =
  | "generate_lead"
  | "form_start"
  | "form_error"
  | "click_email"
  | "click_phone"
  | "view_service"
  | "view_blog"
  | "click_quote_cta"
  // Only fires when the WhatsApp button is shown (NEXT_PUBLIC_WHATSAPP_NUMBER set after approval)
  | "click_whatsapp";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const CONSENT_KEY = "cwm-analytics-consent"; // "granted" | "denied"
export const CONSENT_EVENT = "cwm:consent-change";
export const OPEN_CONSENT_EVENT = "cwm:open-consent";

export function readConsent(): "granted" | "denied" | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: "granted" | "denied") {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable: choice applies to this page view only */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

export function analyticsEnabled() {
  return Boolean(process.env.NEXT_PUBLIC_GTM_ID || process.env.NEXT_PUBLIC_GA_ID);
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined" || !analyticsEnabled() || readConsent() !== "granted") return;
  window.dataLayer = window.dataLayer || [];
  if (process.env.NEXT_PUBLIC_GTM_ID) {
    window.dataLayer.push({ event, ...params });
  } else {
    // Standard gtag stub: events queued before gtag.js loads are processed once it does
    if (typeof window.gtag !== "function") {
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
      };
    }
    window.gtag("event", event, params);
  }
  if (process.env.NODE_ENV !== "production") console.debug("[analytics]", event, params);
}

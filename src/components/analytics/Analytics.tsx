"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  CONSENT_EVENT,
  OPEN_CONSENT_EVENT,
  analyticsEnabled,
  readConsent,
  track,
  writeConsent,
} from "@/lib/analytics";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
// GTM takes precedence: when both are set, configure GA4 inside GTM to avoid double counting
const GA_ID = GTM_ID ? "" : (process.env.NEXT_PUBLIC_GA_ID ?? "");

function subscribe(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/**
 * Consent banner + tag loading + delegated click tracking.
 * Renders nothing at all when no analytics ID is configured.
 */
export function Analytics() {
  const consent = useSyncExternalStore(subscribe, readConsent, () => "denied" as const);
  const [reopened, setReopened] = useState(false);
  const pathname = usePathname();
  const enabled = analyticsEnabled();

  // "Gérer les cookies" link in the footer reopens the banner
  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  // Delegated tracking for phone / email / WhatsApp / quote CTA links (no personal data sent)
  useEffect(() => {
    if (!enabled) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const location = a.closest("header") ? "header" : a.closest("footer") ? "footer" : "content";
      if (href.startsWith("tel:")) track("click_phone", { link_location: location });
      else if (href.startsWith("mailto:")) track("click_email", { link_location: location });
      else if (href.startsWith("https://wa.me/")) track("click_whatsapp", { link_location: location });
      else if (href === "/contact" || href.startsWith("/contact?") || href === "/#demande")
        track("click_quote_cta", { link_location: location, link_text: a.textContent?.trim().slice(0, 60) });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [enabled]);

  // SPA page views for GA4 via gtag (GTM handles history changes itself)
  useEffect(() => {
    if (GA_ID && consent === "granted" && typeof window.gtag === "function") {
      window.gtag("event", "page_view", { page_path: pathname });
    }
  }, [pathname, consent]);

  if (!enabled) return null;

  const showBanner = consent === null || reopened;

  return (
    <>
      {consent === "granted" && GTM_ID && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
      {consent === "granted" && GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true,send_page_view:false});gtag('event','page_view',{page_path:location.pathname});`}
          </Script>
        </>
      )}

      {showBanner && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-title"
          className="surface-dark fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-xl bg-navy-900 p-5 text-white shadow-2xl sm:p-6"
        >
          <h2 id="consent-title" className="text-lg font-semibold">
            Mesure d&apos;audience
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-navy-100">
            Avec votre accord, nous utilisons des cookies de mesure d&apos;audience (Google Analytics) pour comprendre
            l&apos;utilisation du site et l&apos;améliorer. Aucun cookie de ce type n&apos;est déposé si vous refusez.{" "}
            <Link href="/confidentialite" className="underline hover:text-white">
              En savoir plus
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                writeConsent("granted");
                setReopened(false);
              }}
              className="rounded-md bg-cargo px-5 py-2.5 text-sm font-semibold text-navy-950 hover:bg-haul"
            >
              Accepter
            </button>
            <button
              type="button"
              onClick={() => {
                writeConsent("denied");
                setReopened(false);
              }}
              className="rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Refuser
            </button>
          </div>
          {consent === "granted" && (
            <p className="mt-3 text-xs text-navy-100">
              Si vous retirez votre consentement, les cookies déjà déposés peuvent être supprimés depuis les
              paramètres de votre navigateur.
            </p>
          )}
        </div>
      )}
    </>
  );
}

/** Fires a single analytics event when mounted (e.g. view_service, view_blog) */
export function TrackOnMount({ event, params }: { event: "view_service" | "view_blog"; params: Record<string, string> }) {
  const key = JSON.stringify(params);
  useEffect(() => {
    track(event, JSON.parse(key) as Record<string, string>);
  }, [event, key]);
  return null;
}

/** Footer link that reopens the consent banner (only rendered when analytics is configured) */
export function ManageConsentLink({ className = "" }: { className?: string }) {
  if (!analyticsEnabled()) return null;
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}>
      Gérer les cookies
    </button>
  );
}

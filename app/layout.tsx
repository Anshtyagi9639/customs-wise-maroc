import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { FloatingChatButton } from "@/components/chatbot/floating-chat-button";
import { SiteNotice } from "@/components/layout/site-notice";
import { RevealObserver } from "@/components/layout/reveal-observer";
import { Analytics } from "@/components/analytics/analytics";
import { JsonLd } from "@/components/ui/json-ld";
import { organizationSchema, websiteSchema } from "@/lib/structured-data/schemas";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted (SIL Open Font License) — same families as customswise.ie, no runtime download
const openSans = localFont({
  src: "./fonts/open-sans-latin.woff2",
  weight: "400 700",
  variable: "--font-open-sans",
  display: "swap",
});
const oswald = localFont({
  src: "./fonts/oswald-latin.woff2",
  weight: "400 700",
  variable: "--font-oswald",
  display: "swap",
});

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

// Site-wide defaults; every page sets its own full title with buildMetadata()
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...buildMetadata({ title: site.defaultTitle, description: site.defaultDescription, path: "/" }),
  applicationName: site.name,
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
  },
};

export const viewport: Viewport = { themeColor: "#0a3542" };

/**
 * In development only, ask the browser not to auto-translate the page: Chrome's
 * "Translate to English" rewrites the HTML (lang, texts) before React hydrates,
 * which triggers a "Hydration failed" overlay. Production keeps translation
 * available for visitors (React recovers silently there).
 */
const devNoTranslate = process.env.NODE_ENV === "development";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      translate={devNoTranslate ? "no" : undefined}
      className={`${openSans.variable} ${oswald.variable} h-full antialiased${devNoTranslate ? " notranslate" : ""}`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-brand focus:bg-cargo focus:px-4 focus:py-3 focus:font-semibold focus:text-overnight focus:shadow"
        >
          Aller au contenu
        </a>
        <SiteNotice />
        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingChatButton />
        <RevealObserver />
        <Analytics />
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
      </body>
    </html>
  );
}

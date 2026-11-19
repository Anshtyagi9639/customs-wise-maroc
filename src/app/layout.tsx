import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteNotice } from "@/components/layout/SiteNotice";
import { Analytics } from "@/components/analytics/Analytics";
import { JsonLd, organizationLd, websiteLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...pageMetadata({ title: site.defaultTitle, description: site.defaultDescription, path: "/", absoluteTitle: true }),
  title: { default: site.defaultTitle, template: "%s | Customs Wise Maroc" },
  applicationName: site.name,
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
  },
};

export const viewport: Viewport = { themeColor: "#0a3542" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${openSans.variable} ${oswald.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow"
        >
          Aller au contenu
        </a>
        <SiteNotice />
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}

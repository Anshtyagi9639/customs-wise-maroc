import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd, organizationLd, websiteLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.defaultTitle, template: "%s | Customs Wise Maroc" },
  description: site.defaultDescription,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.defaultTitle,
    description: site.defaultDescription,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: site.defaultTitle, description: site.defaultDescription },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0b2545" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}

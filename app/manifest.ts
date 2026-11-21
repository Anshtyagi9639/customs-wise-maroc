import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** Web app manifest ("Add to Home Screen"). Colours = brand tokens ship / salt. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "CW Maroc",
    description: site.defaultDescription,
    lang: "fr-MA",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a3542",
    // Provisional "CW" mark (public/icons) — replace with the official logo when supplied
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

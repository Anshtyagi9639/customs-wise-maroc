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
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

import { NextResponse, type NextRequest } from "next/server";
import { allPosts } from "@/lib/posts";
import { services } from "@/lib/services";

const known: Record<string, Set<string>> = {
  blog: new Set(allPosts.map((p) => p.slug)),
  services: new Set(services.map((s) => s.slug)),
};

/**
 * Unknown slugs under /blog and /services are rewritten to a non-existent route
 * so they get the custom 404 page with a real 404 status (partial prerendering
 * would otherwise stream a 200 before notFound() runs).
 */
export function proxy(request: NextRequest) {
  const [, section, ...rest] = request.nextUrl.pathname.replace(/\/$/, "").split("/");
  const slug = rest.join("/");
  if (slug && known[section] && !known[section].has(slug)) {
    return NextResponse.rewrite(new URL("/__introuvable", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/blog/:slug+", "/services/:slug+"] };

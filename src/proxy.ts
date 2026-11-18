import { NextResponse, type NextRequest } from "next/server";
import { posts } from "@/lib/posts";

const knownSlugs = new Set(posts.map((p) => p.slug));

/**
 * Unknown article slugs are rewritten to a non-existent route so they get the
 * custom 404 page with a real 404 status (partial prerendering would otherwise
 * stream a 200 before notFound() runs).
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.replace(/^\/blog\//, "").replace(/\/$/, "");
  if (slug && !knownSlugs.has(slug)) {
    return NextResponse.rewrite(new URL("/__introuvable", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: "/blog/:slug+" };

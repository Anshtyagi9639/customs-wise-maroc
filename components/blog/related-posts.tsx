import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/types";
import { BlogCard } from "./blog-card";

/** "À lire aussi" band under an article (renders nothing when empty) */
export function RelatedPosts({ posts, title = "À lire aussi" }: { posts: Post[]; title?: string }) {
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby="related-title" className="bg-mist py-16 sm:py-24">
      <div data-reveal className="container-site">
        <div className="flex items-end justify-between gap-4">
          <h2 id="related-title" className="text-3xl font-semibold text-ship">{title}</h2>
          <Link href="/blog" className="inline-flex min-h-12 items-center gap-1 text-sm font-semibold text-atlantic hover:underline">
            Tous les articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

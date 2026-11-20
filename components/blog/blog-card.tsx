import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/types";
import { CoverArt } from "@/components/ui/illustrations";
import { PostMeta } from "./post-meta";

/** Blog card: cover, category label, title, summary, date, "Lire l'article". */
export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-brand border border-line bg-salt shadow-card transition hover:shadow-lg">
      <div className="aspect-[20/9] overflow-hidden">
        <CoverArt variant={post.cover.variant} alt="" />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-atlantic">{post.category}</p>
        <h3 className="mt-3 text-xl font-semibold leading-snug text-ship">
          <Link href={`/blog/${post.slug}`} className="hover:text-atlantic">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{post.excerpt}</p>
        <p className="mt-5 text-sm text-ink-soft">
          <PostMeta post={post} />
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex min-h-12 items-center gap-1 text-sm font-semibold text-atlantic hover:underline"
          aria-label={`Lire l'article : ${post.title}`}
        >
          Lire l&apos;article <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

/** Grid of blog cards (home: the 3 newest) */
export function BlogCards({ posts }: { posts: Post[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <BlogCard key={p.slug} post={p} />
      ))}
    </div>
  );
}

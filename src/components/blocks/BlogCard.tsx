import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/lib/blog";
import { CoverArt } from "@/components/CoverArt";
import { PostMeta } from "@/components/sections";

/** Blog / insights card: cover, category label, title, summary, date, "Lire l'article". */
export function BlogCard({ post }: { post: Post }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-navy-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="aspect-[20/9] overflow-hidden">
        <CoverArt variant={post.cover.variant} alt="" />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent-600">{post.category}</p>
        <h3 className="mt-3 text-xl font-semibold leading-snug text-navy-900">
          <Link href={`/blog/${post.slug}`} className="hover:text-accent-700">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{post.excerpt}</p>
        <p className="mt-5 text-sm text-muted">
          <PostMeta post={post} />
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-700 hover:underline"
          aria-label={`Lire l'article : ${post.title}`}
        >
          Lire l&apos;article <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}


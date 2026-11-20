import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/types";
import { ButtonLink } from "@/components/ui/button";
import { CoverArt } from "@/components/ui/illustrations";
import { PostMeta } from "./post-meta";

/** Newest article, shown large at the top of /blog */
export function FeaturedPost({ post }: { post: Post }) {
  return (
    <article className="grid overflow-hidden rounded-brand border border-line bg-salt shadow-card lg:grid-cols-2">
      <div className="aspect-[20/9] lg:aspect-auto">
        <CoverArt variant={post.cover.variant} alt="" />
      </div>
      <div className="flex flex-col justify-center p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-atlantic">À la une · {post.category}</p>
        <h2 className="mt-3 text-2xl font-semibold leading-snug text-ship sm:text-3xl">
          <Link href={`/blog/${post.slug}`} className="hover:text-atlantic">
            {post.title}
          </Link>
        </h2>
        <p className="mt-4 leading-relaxed text-ink-soft">{post.excerpt}</p>
        <p className="mt-4 text-sm text-ink-soft">
          <PostMeta post={post} />
        </p>
        <div className="mt-6">
          <ButtonLink href={`/blog/${post.slug}`} aria-label={`Lire l'article : ${post.title}`}>
            Lire l&apos;article <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

import type { Post } from "@/types";

/** Date (or "Brouillon") + reading time */
export function PostMeta({ post }: { post: Post }) {
  return (
    <>
      {post.published ? (
        <time dateTime={post.published}>{post.publishedLabel ?? post.published}</time>
      ) : (
        <span>Brouillon</span>
      )}{" "}
      · {post.readingMinutes} min de lecture
    </>
  );
}

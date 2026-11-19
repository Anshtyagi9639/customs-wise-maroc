import { readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

import { allPosts, posts, type Post } from "./posts";

export { allPosts, posts, type Post };

/** Finds any article, including drafts (drafts are reachable by URL but noindex) */
export function getPost(slug: string) {
  return allPosts.find((p) => p.slug === slug);
}

export async function getPostHtml(slug: string) {
  "use cache";
  const file = path.join(process.cwd(), "src", "content", "blog", `${slug}.md`);
  const md = await readFile(file, "utf8");
  const html = marked.parse(md, { async: false }) as string;
  // External links: no referrer leakage / opener access
  return html.replace(/<a href="(https?:\/\/)/g, '<a rel="noopener noreferrer" href="$1');
}

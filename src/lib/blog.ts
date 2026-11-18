import { readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

import { posts, type Post } from "./posts";

export { posts, type Post };

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export async function getPostHtml(slug: string) {
  "use cache";
  const file = path.join(process.cwd(), "src", "content", "blog", `${slug}.md`);
  const md = await readFile(file, "utf8");
  return marked.parse(md, { async: false }) as string;
}

const dateFmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function formatDate(iso: string) {
  return dateFmt.format(new Date(`${iso}T00:00:00Z`));
}

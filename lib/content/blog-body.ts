import { readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

/** Renders lib/content/blog/<slug>.md to HTML (cached; bundled via outputFileTracingIncludes). Server only. */
export async function getPostHtml(slug: string) {
  "use cache";
  const file = path.join(process.cwd(), "lib", "content", "blog", `${slug}.md`);
  const md = await readFile(file, "utf8");
  const html = marked.parse(md, { async: false }) as string;
  // External links: no referrer leakage / opener access
  return html.replace(/<a href="(https?:\/\/)/g, '<a rel="noopener noreferrer" href="$1');
}

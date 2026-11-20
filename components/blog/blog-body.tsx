/** Renders an article's HTML (produced server-side from our own Markdown files) */
export function BlogBody({ html }: { html: string }) {
  return <div className="prose-cw" dangerouslySetInnerHTML={{ __html: html }} />;
}

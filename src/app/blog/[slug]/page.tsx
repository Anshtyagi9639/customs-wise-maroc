import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, CalendarDays, Clock, UserRound } from "lucide-react";
import { Container, ButtonLink, ServiceGlyph } from "@/components/ui";
import { Breadcrumbs, CtaBand } from "@/components/sections";
import { BlogCard } from "@/components/blocks/BlogCard";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { CoverArt } from "@/components/CoverArt";
import { TrackOnMount } from "@/components/analytics/Analytics";
import { allPosts, getPost, getPostHtml, posts } from "@/lib/blog";
import { getService } from "@/lib/services";
import { absoluteUrl, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.seoTitle ?? post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.published,
    modifiedTime: post.updated,
    section: post.category,
    keywords: post.keywords,
    // Drafts stay out of search engines until approved
    noindex: post.status === "draft",
  });
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = await getPostHtml(post.slug);
  const isDraft = post.status === "draft";
  const related = posts.filter((p) => p.slug !== post.slug);
  const relatedServices = post.relatedServices.map(getService).filter((s) => s !== undefined);
  const crumbs = [
    { name: "Accueil", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <>
      {isDraft && (
        <div role="note" className="border-b border-freight/40 bg-freight/15">
          <Container className="flex gap-3 py-4 text-sm text-ink">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-freight" aria-hidden="true" />
            <p>{post.draftNote}</p>
          </Container>
        </div>
      )}

      <header className="surface-dark pattern-zellige bg-navy-900 text-white">
        <Container className="max-w-4xl py-14 sm:py-16">
          <Breadcrumbs items={[...crumbs.slice(0, 2), { name: post.category, href: crumbs[2].href }]} />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-accent-500">{post.category}</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-navy-100">{post.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm text-navy-100">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {post.published ? (
                <time dateTime={post.published}>{post.publishedLabel ?? post.published}</time>
              ) : (
                "Brouillon — non publié"
              )}
            </span>
            {post.updated && (
              <span>
                Mis à jour : <time dateTime={post.updated}>{post.updated}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readingMinutes} min de lecture
            </span>
            <span className="inline-flex items-center gap-1.5">
              <UserRound className="h-4 w-4" aria-hidden="true" />
              {post.author}
            </span>
          </div>
        </Container>
      </header>

      <Container className="max-w-6xl pt-10">
        <figure className="aspect-[20/9] overflow-hidden rounded-xl shadow-lg">
          <CoverArt variant={post.cover.variant} alt={post.cover.alt} />
        </figure>
      </Container>

      <Container className="grid max-w-6xl gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article className="article max-w-3xl" dangerouslySetInnerHTML={{ __html: html }} />

        <aside className="space-y-6 lg:sticky lg:top-36 lg:self-start" aria-label="Services liés">
          <div className="rounded-xl border border-navy-100 bg-sand-50 p-6">
            <h2 className="font-sans text-base font-semibold text-navy-900">Services liés</h2>
            <ul className="mt-4 space-y-3">
              {relatedServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="flex items-start gap-2 text-sm font-medium text-navy-900 hover:text-accent-700"
                  >
                    <ServiceGlyph icon={s.icon} className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-dark rounded-xl bg-navy-900 p-6 text-white">
            <p className="font-semibold">Besoin d&apos;aide pour vos formalités ?</p>
            <p className="mt-2 text-sm text-navy-100">Décrivez votre opération à notre équipe.</p>
            <ButtonLink
              href={relatedServices[0] ? `/contact?service=${relatedServices[0].slug}` : "/contact"}
              className="mt-5 w-full"
            >
              Demander un devis
            </ButtonLink>
          </div>
        </aside>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-sand-50 py-16">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <h2 id="related-title" className="text-3xl font-semibold text-navy-900">À lire aussi</h2>
              <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-accent-700 hover:underline">
                Tous les articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <CtaBand />

      <TrackOnMount event="view_blog" params={{ article_slug: post.slug, article_status: post.status }} />
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          // Article schema only for approved, published articles
          ...(isDraft
            ? []
            : [
                {
                  "@context": "https://schema.org",
                  "@type": "BlogPosting",
                  headline: post.title,
                  description: post.excerpt,
                  ...(post.published ? { datePublished: post.published } : {}),
                  ...(post.updated ? { dateModified: post.updated } : {}),
                  inLanguage: "fr-MA",
                  keywords: post.keywords.join(", "),
                  articleSection: post.category,
                  mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
                  author: { "@type": "Organization", name: site.name, url: site.url },
                  publisher: { "@id": absoluteUrl("/#organization") },
                },
              ]),
        ]}
      />
    </>
  );
}

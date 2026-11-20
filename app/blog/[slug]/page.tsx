import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, CalendarDays, Clock, UserRound } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { ArticleLayout } from "@/components/layout/article-layout";
import { BlogBody } from "@/components/blog/blog-body";
import { RelatedPosts } from "@/components/blog/related-posts";
import { CoverArt } from "@/components/ui/illustrations";
import { JsonLd } from "@/components/ui/json-ld";
import { TrackOnMount } from "@/components/analytics/analytics";
import { getService } from "@/lib/content";
import { allPosts, getPost, posts } from "@/lib/content/blog-posts";
import { getPostHtml } from "@/lib/content/blog-body";
import { enquiryHref } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema, breadcrumbSchema } from "@/lib/structured-data/schemas";

export function generateStaticParams() {
  return allPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle,
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
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const relatedServices = post.relatedServices.map(getService).filter((s) => s !== undefined);
  const path = `/blog/${post.slug}`;
  const trail = [
    { name: "Blog", path: "/blog" },
    { name: post.category, path },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(trail), ...(isDraft ? [] : [articleSchema(post)])]} />
      {isDraft && (
        <div role="note" className="border-b border-freight/40 bg-freight/15">
          <div className="container-site flex gap-3 py-4 text-sm text-overnight">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-freight" aria-hidden="true" />
            <p>{post.draftNote}</p>
          </div>
        </div>
      )}

      <PageHero
        trail={trail}
        title={post.title}
        intro={post.excerpt}
        meta={
          <div className="flex flex-wrap gap-5">
            <span className="font-semibold uppercase tracking-[0.18em] text-cargo">{post.category}</span>
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
        }
      />

      <ArticleLayout
        ctaHref={enquiryHref(relatedServices[0]?.slug)}
        linksTitle="Services liés"
        links={relatedServices.map((s) => ({ href: `/services/${s.slug}`, label: s.title }))}
        before={
          <figure className="aspect-[20/9] overflow-hidden rounded-brand shadow-lg">
            <CoverArt variant={post.cover.variant} alt={post.cover.alt} />
          </figure>
        }
      >
        <BlogBody html={html} />
      </ArticleLayout>

      <RelatedPosts posts={related} />
      <CTASection />

      <TrackOnMount event="view_blog" params={{ article_slug: post.slug, article_status: post.status }} />
    </>
  );
}

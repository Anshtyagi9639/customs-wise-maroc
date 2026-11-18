import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, CalendarDays } from "lucide-react";
import { Container, ButtonLink, ServiceGlyph } from "@/components/ui";
import { Breadcrumbs, PostCard } from "@/components/sections";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { formatDate, getPost, getPostHtml, posts } from "@/lib/blog";
import { getService } from "@/lib/services";
import { absoluteUrl, site } from "@/lib/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.published,
      section: post.category,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = await getPostHtml(post.slug);
  const related = posts.filter((p) => p.slug !== post.slug);
  const relatedServices = post.relatedServices.map(getService).filter((s) => s !== undefined);
  const crumbs = [
    { name: "Accueil", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.category, href: `/blog/${post.slug}` },
  ];

  return (
    <>
      <header className="pattern-zellige bg-navy-900 text-white">
        <Container className="max-w-4xl py-14 sm:py-20">
          <Breadcrumbs items={crumbs} />
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-accent-500">{post.category}</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-navy-100">{post.description}</p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm text-navy-100">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.published}>{formatDate(post.published)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {post.readingMinutes} min de lecture
            </span>
            <span>Par l&apos;équipe Customs Wise</span>
          </div>
        </Container>
      </header>

      <Container className="grid max-w-6xl gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <article className="article max-w-3xl" dangerouslySetInnerHTML={{ __html: html }} />

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start" aria-label="Services liés">
          <div className="rounded-xl border border-navy-100 bg-sand-50 p-6">
            <h2 className="font-semibold text-navy-900">Services liés</h2>
            <ul className="mt-4 space-y-3">
              {relatedServices.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services#${s.slug}`}
                    className="flex items-start gap-2 text-sm font-medium text-navy-900 hover:text-accent-700"
                  >
                    <ServiceGlyph icon={s.icon} className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-navy-900 p-6 text-white">
            <p className="font-semibold">Besoin d&apos;aide pour vos formalités ?</p>
            <p className="mt-2 text-sm text-navy-100">Parlez de votre opération avec notre équipe.</p>
            <ButtonLink href="/contact" className="mt-5 w-full">
              Demander un devis
            </ButtonLink>
          </div>
        </aside>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-sand-50 py-16">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <h2 id="related-title" className="text-2xl font-bold text-navy-900">À lire aussi</h2>
              <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-semibold text-accent-700 hover:underline">
                Tous les articles <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.published,
            dateModified: post.published,
            inLanguage: "fr-MA",
            keywords: post.keywords.join(", "),
            articleSection: post.category,
            mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
            author: { "@type": "Organization", name: site.name, url: site.url },
            publisher: { "@id": absoluteUrl("/#organization") },
          },
        ]}
      />
    </>
  );
}

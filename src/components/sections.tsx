import Link from "next/link";
import { ArrowRight, ChevronRight, Plus, Info } from "lucide-react";
import { faqDisclaimer, type Faq } from "@/lib/faq";
import { services } from "@/lib/services";
import type { Post } from "@/lib/blog";
import { Container, ButtonLink } from "@/components/ui";
import { CoverArt } from "@/components/CoverArt";

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-navy-100">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-white">{c.name}</span>
            ) : (
              <Link href={c.href} className="hover:text-white hover:underline">{c.name}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  title,
  intro,
  crumbs,
  children,
  aside,
}: {
  title: string;
  intro?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="surface-dark pattern-zellige bg-navy-900 text-white">
      <Container className={`py-14 sm:py-20 ${aside ? "grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]" : ""}`}>
        <div>
          <Breadcrumbs items={crumbs} />
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">{intro}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {aside && <div className="hidden overflow-hidden rounded-xl shadow-2xl lg:block">{aside}</div>}
      </Container>
    </section>
  );
}

export function ServiceCards() {
  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {services.map((s) => (
        <li key={s.slug}>
          <Link
            href={`/services/${s.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-navy-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-accent-600/40 hover:shadow-md"
          >
            <div className="aspect-[20/9] overflow-hidden">
              <CoverArt variant={s.icon} alt="" className="transition-transform duration-500 group-hover:scale-[1.03]" />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <p className="text-xs font-bold uppercase tracking-widest text-accent-600">Service 0{s.number}</p>
              <h3 className="mt-2 text-xl font-semibold text-navy-900">{s.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-muted">{s.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-700">
                Découvrir ce service
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FaqList({
  items,
  headingLevel = 3,
  defaultOpen = false,
}: {
  items: Faq[];
  headingLevel?: 2 | 3;
  /** Open all answers (FAQ page: readable without interaction, anchor links land on visible text) */
  defaultOpen?: boolean;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div>
      <div className="divide-y divide-navy-100 rounded-xl border border-navy-100 bg-white">
        {items.map((f) => (
          <details key={f.id} id={f.id} open={defaultOpen || undefined} className="group scroll-mt-28 p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-start justify-between gap-4 text-lg font-semibold text-navy-900">
              <Heading className="font-sans text-lg font-semibold">{f.question}</Heading>
              <Plus
                className="mt-1 h-5 w-5 shrink-0 text-accent-600 transition-transform group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <div className="mt-4 space-y-3 leading-relaxed text-muted">
              {f.answer.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
      <p className="mt-4 flex gap-2 text-sm text-muted">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {faqDisclaimer}
      </p>
    </div>
  );
}

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

export function PostCard({ post }: { post: Post }) {
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

export function CtaBand({
  title = "Parlons de vos opérations d'import-export",
  text = "Contactez Customs Wise pour discuter de vos besoins et identifier les formalités applicables à vos marchandises.",
  href = "/contact",
  label = "Demander un devis",
}: {
  title?: string;
  text?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="surface-dark pattern-zellige bg-navy-900 text-white">
      <Container className="flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="mt-3 text-lg text-navy-100">{text}</p>
        </div>
        <ButtonLink href={href} className="shrink-0 px-7 py-3.5 text-base">
          {label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </Container>
    </section>
  );
}

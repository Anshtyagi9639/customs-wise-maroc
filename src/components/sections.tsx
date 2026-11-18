import Link from "next/link";
import { ArrowRight, ChevronRight, Plus } from "lucide-react";
import type { Faq } from "@/lib/faq";
import { services } from "@/lib/services";
import { formatDate, type Post } from "@/lib/blog";
import { Container, ButtonLink, ServiceGlyph } from "@/components/ui";

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
}: {
  title: string;
  intro?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="pattern-zellige bg-navy-900 text-white">
      <Container className="py-14 sm:py-20">
        <Breadcrumbs items={crumbs} />
        <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-navy-100">{intro}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
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
            href={`/services#${s.slug}`}
            className="group flex h-full flex-col rounded-xl border border-navy-100 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-500/50 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent-100 text-accent-700">
                <ServiceGlyph icon={s.icon} className="h-6 w-6" />
              </span>
              <span className="text-sm font-bold text-navy-100" aria-hidden="true">
                0{s.number}
              </span>
            </div>
            <h3 className="mt-5 text-xl font-semibold text-navy-900">{s.title}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-muted">{s.summary}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-700">
              En savoir plus
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-navy-100 rounded-xl border border-navy-100 bg-white">
      {items.map((f) => (
        <details key={f.question} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-start justify-between gap-4 text-lg font-semibold text-navy-900">
            <h3>{f.question}</h3>
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
  );
}

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-navy-100 bg-white p-7 shadow-sm transition hover:shadow-md">
      <p className="text-xs font-semibold uppercase tracking-wider text-accent-600">{post.category}</p>
      <h3 className="mt-3 text-xl font-semibold leading-snug text-navy-900">
        <Link href={`/blog/${post.slug}`} className="hover:text-accent-700">
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{post.description}</p>
      <p className="mt-5 text-sm text-muted">
        <time dateTime={post.published}>{formatDate(post.published)}</time> · {post.readingMinutes} min de lecture
      </p>
      <Link
        href={`/blog/${post.slug}`}
        className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent-700 hover:underline"
        aria-label={`Lire l'article : ${post.title}`}
      >
        Lire l&apos;article <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
}

export function CtaBand({
  title = "Parlons de vos opérations d'import-export",
  text = "Contactez Customs Wise pour discuter de vos besoins et identifier les formalités applicables à vos marchandises.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="pattern-zellige bg-navy-900 text-white">
      <Container className="flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="mt-3 text-lg text-navy-100">{text}</p>
        </div>
        <ButtonLink href="/contact" className="shrink-0 px-7 py-3.5 text-base">
          Demander un devis <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </ButtonLink>
      </Container>
    </section>
  );
}

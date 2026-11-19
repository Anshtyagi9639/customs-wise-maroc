import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { Post } from "@/lib/blog";
import { Container, ButtonLink } from "@/components/ui";

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

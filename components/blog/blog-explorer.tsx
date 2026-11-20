"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Post } from "@/types";
import { cn } from "@/lib/utils/cn";
import { BlogCard } from "./blog-card";

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

/** Search + topic filter over the published articles */
export function BlogExplorer({ posts, topics }: { posts: Post[]; topics: string[] }) {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return posts.filter(
      (p) =>
        (!topic || p.category === topic) &&
        (!q || normalize([p.title, p.excerpt, p.category, ...p.keywords].join(" ")).includes(q)),
    );
  }, [posts, query, topic]);

  const chip = (active: boolean) =>
    cn(
      "min-h-11 rounded-full px-4 text-sm font-medium transition-colors",
      active ? "bg-ship text-salt" : "bg-salt text-ship ring-1 ring-line hover:bg-mist",
    );

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="group" aria-label="Filtrer par thème" className="flex flex-wrap gap-2">
          <button type="button" className={chip(topic === null)} aria-pressed={topic === null} onClick={() => setTopic(null)}>
            Tous les thèmes
          </button>
          {topics.map((t) => (
            <button key={t} type="button" className={chip(topic === t)} aria-pressed={topic === t} onClick={() => setTopic(t)}>
              {t}
            </button>
          ))}
        </div>
        <label className="relative block md:w-72">
          <span className="sr-only">Rechercher un article</span>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un article…"
            className="block min-h-12 w-full rounded-brand border border-line bg-salt pl-9 pr-3 text-overnight placeholder:text-pebble focus:border-atlantic focus:outline-none"
          />
        </label>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {results.length} article{results.length > 1 ? "s" : ""}
      </p>
      {results.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-brand bg-mist p-6 text-ink-soft">Aucun article ne correspond à votre recherche.</p>
      )}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Industry } from "@/lib/industries";
import { CoverArt } from "@/components/CoverArt";

/** Industry card: image (lazy-loaded), title, short text, "En savoir plus". */
export function IndustryCard({ industry: i }: { industry: Industry }) {
  return (
    <Link
      href={`/secteurs#${i.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {i.image ? (
          <Image
            src={i.image.src}
            alt={i.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <CoverArt variant="globe" alt="" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-xl font-semibold text-navy-900">{i.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{i.summary}</p>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-700">
          En savoir plus
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

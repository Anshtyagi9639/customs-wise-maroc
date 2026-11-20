import { Info, Plus } from "lucide-react";
import type { Faq } from "@/types";
import { faqDisclaimer } from "@/lib/content";

/**
 * FAQ accordion built on native <details>/<summary>: keyboard accessible
 * (Enter/Space), works without JavaScript, and anchor links (#id) land on an item.
 */
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
      <div className="divide-y divide-line rounded-brand border border-line bg-salt">
        {items.map((f) => (
          <details
            key={f.id}
            id={f.id}
            open={defaultOpen || undefined}
            className="group scroll-mt-36 p-6 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex min-h-12 cursor-pointer items-start justify-between gap-4 text-lg font-semibold text-ship">
              <Heading className="font-sans text-lg font-semibold">{f.question}</Heading>
              <Plus
                className="mt-1 h-5 w-5 shrink-0 text-atlantic transition-transform group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <div className="mt-4 space-y-3 leading-relaxed text-ink-soft">
              {f.answer.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
      <p className="mt-4 flex gap-2 text-sm text-ink-soft">
        <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {faqDisclaimer}
      </p>
    </div>
  );
}

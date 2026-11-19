import type { ReactNode } from "react";
import { Container } from "@/components/ui";

/**
 * Two-column section: text on one side, media (image / illustration) on the other.
 * Stacks on mobile with the text first.
 */
export function SplitSection({
  id,
  eyebrow,
  title,
  media,
  children,
  reverse = false,
  tone = "light",
}: {
  /** Heading id, used for aria-labelledby */
  id: string;
  eyebrow?: string;
  title: string;
  media: ReactNode;
  children: ReactNode;
  /** Put the media on the left on large screens */
  reverse?: boolean;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section
      aria-labelledby={id}
      className={`py-20 sm:py-24 ${dark ? "surface-dark bg-navy-900 text-white" : ""}`}
    >
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className={reverse ? "lg:order-2" : ""}>
          {eyebrow && (
            <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${dark ? "text-cargo" : "text-accent-600"}`}>
              {eyebrow}
            </p>
          )}
          <h2
            id={id}
            className={`mt-2 text-3xl font-semibold tracking-tight sm:text-4xl ${dark ? "text-white" : "text-navy-900"}`}
          >
            {title}
          </h2>
          {children}
        </div>
        <div className={reverse ? "lg:order-1" : ""}>{media}</div>
      </Container>
    </section>
  );
}

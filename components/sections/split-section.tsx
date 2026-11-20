import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { SectionHeading } from "./section-heading";

/**
 * Two-column section: text on one side, media on the other. Stacks on mobile
 * with the text first. `tone="dark"` renders on the brand gradient.
 */
export function SplitSection({
  id,
  kicker,
  title,
  media,
  children,
  reverse = false,
  tone = "light",
  className,
}: {
  /** Heading id, used for aria-labelledby */
  id: string;
  kicker?: string;
  title: string;
  media: ReactNode;
  children: ReactNode;
  /** Put the media on the left on large screens */
  reverse?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <section aria-labelledby={id} className={cn("py-16 sm:py-24", tone === "dark" && "bg-clearance", className)}>
      <div data-reveal className="container-site grid items-center gap-12 lg:grid-cols-2">
        <div className={reverse ? "lg:order-2" : ""}>
          <SectionHeading id={id} kicker={kicker} title={title} tone={tone} />
          {children}
        </div>
        <div className={reverse ? "lg:order-1" : ""}>{media}</div>
      </div>
    </section>
  );
}

import { cn } from "@/lib/utils/cn";

/** Kicker + H2 + optional intro. Use `tone="dark"` on .bg-clearance sections. */
export function SectionHeading({
  kicker,
  title,
  intro,
  id,
  align = "left",
  tone = "light",
  className,
}: {
  kicker?: string;
  title: string;
  intro?: string;
  /** Heading id — referenced by the section's aria-labelledby */
  id?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={cn(align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl", className)}>
      {kicker && (
        <p className={cn("text-xs font-semibold uppercase tracking-[0.18em]", dark ? "text-cargo" : "text-atlantic")}>
          {kicker}
        </p>
      )}
      <h2 id={id} className={cn("mt-2 text-3xl font-semibold tracking-tight sm:text-4xl", dark ? "text-salt" : "text-ship")}>
        {title}
      </h2>
      {intro && <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-starlight" : "text-ink-soft")}>{intro}</p>}
    </div>
  );
}

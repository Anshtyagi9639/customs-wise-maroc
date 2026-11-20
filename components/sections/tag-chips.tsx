import { cn } from "@/lib/utils/cn";

/** Key-term chips (non-interactive) */
export function TagChips({
  tags,
  tone = "light",
  className,
}: {
  tags: readonly string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Thèmes clés">
      {tags.map((t) => (
        <li
          key={t}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            tone === "dark" ? "border border-salt/25 text-salt" : "bg-salt text-ship ring-1 ring-line",
          )}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

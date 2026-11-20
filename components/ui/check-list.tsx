import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/** Bulleted list with check icons. `tone="dark"` on .bg-clearance backgrounds. */
export function CheckList({
  items,
  tone = "light",
  size = "md",
  className,
}: {
  items: readonly string[];
  tone?: "light" | "dark";
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            "flex gap-3 leading-relaxed",
            size === "sm" ? "text-sm" : "",
            tone === "dark" ? "text-starlight" : "text-ink-soft",
          )}
        >
          <CheckCircle2
            className={cn("mt-0.5 shrink-0", size === "sm" ? "h-4 w-4" : "h-5 w-5", tone === "dark" ? "text-cargo" : "text-atlantic")}
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

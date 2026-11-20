import { MapPin } from "lucide-react";
import { offices } from "@/lib/site";
import { cn } from "@/lib/utils/cn";

/** Office cards (real addresses only, from lib/site.ts → offices). */
export function OfficeList({ tone = "light", headingLevel = 3 }: { tone?: "light" | "dark"; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const dark = tone === "dark";
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {offices.map((o, i) => (
        <li
          key={o.id}
          className={cn(
            "rounded-brand p-6",
            dark ? "bg-salt/10 ring-1 ring-salt/15" : "bg-salt shadow-card ring-1 ring-line",
          )}
        >
          <H className={cn("flex items-center gap-2 font-sans text-base font-semibold", dark ? "text-salt" : "text-ship")}>
            <MapPin className={cn("h-4 w-4", dark ? "text-cargo" : "text-atlantic")} aria-hidden="true" />
            {o.city}
            {i === 0 && offices.length > 1 && (
              <span className="text-xs font-normal opacity-80">· siège</span>
            )}
          </H>
          <address className={cn("mt-2 not-italic leading-relaxed", dark ? "text-starlight" : "text-ink-soft")}>
            {o.street}
            <br />
            {o.postalCode} {o.locality}, {o.country}
          </address>
        </li>
      ))}
    </ul>
  );
}

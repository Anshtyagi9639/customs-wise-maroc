import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { CheckList } from "@/components/ui/check-list";
import { CorridorIllustration } from "@/components/ui/illustrations";
import { corridor } from "@/lib/content/corridor";
import { SplitSection } from "./split-section";
import { TagChips } from "./tag-chips";

/** Home highlight of the specialist area (corridor Maroc – UE – Royaume-Uni). */
export function SpecialistFeature() {
  return (
    <SplitSection
      id="corridor-title"
      kicker={corridor.eyebrow}
      title={corridor.title}
      tone="dark"
      reverse
      media={<CorridorIllustration />}
    >
      <p className="mt-5 text-lg leading-relaxed text-starlight">{corridor.intro[0]}</p>
      <CheckList items={corridor.expertise.slice(0, 4)} tone="dark" size="sm" className="mt-6" />
      <TagChips tags={corridor.tags} tone="dark" className="mt-7" />
      <ButtonLink href="/corridor-maroc-europe" className="mt-9">
        Découvrir notre spécialité <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </ButtonLink>
    </SplitSection>
  );
}

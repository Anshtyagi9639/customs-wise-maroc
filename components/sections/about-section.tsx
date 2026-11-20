import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CheckList } from "@/components/ui/check-list";
import { CoverArt } from "@/components/ui/illustrations";
import { aboutIntro, reasons } from "@/lib/content/pages";
import { illustrations } from "@/lib/content/images";
import { SplitSection } from "./split-section";

/** Home "À propos": who we are, why choose us, image, link to /about. */
export function AboutSection() {
  const img = illustrations.about;
  return (
    <SplitSection
      id="about-title"
      kicker="À propos"
      title="Customs Wise, au Maroc"
      media={
        <div className="relative">
          <div aria-hidden="true" className="absolute -bottom-4 -left-4 h-full w-full rounded-brand bg-cargo" />
          <div className="relative aspect-[4/3] overflow-hidden rounded-brand shadow-xl">
            <CoverArt variant={img.variant} alt={img.alt} />
          </div>
        </div>
      }
    >
      <p className="mt-4 text-lg leading-relaxed text-ink-soft">{aboutIntro}</p>
      <h3 className="mt-8 font-sans text-base font-semibold text-ship">Pourquoi choisir Customs Wise ?</h3>
      <CheckList items={reasons} className="mt-4" />
      <Link href="/about" className="mt-8 inline-flex min-h-12 items-center gap-1 font-semibold text-atlantic hover:underline">
        En savoir plus sur nous <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </SplitSection>
  );
}

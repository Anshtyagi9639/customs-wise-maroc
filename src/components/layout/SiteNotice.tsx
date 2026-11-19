import Link from "next/link";
import { Info } from "lucide-react";
import { site } from "@/lib/site";

/** Site-wide launch notice — hidden once NEXT_PUBLIC_SITE_STATUS=live */
export function SiteNotice() {
  if (site.isLive) return null;
  return (
    <div className="bg-cargo text-navy-950">
      <p className="mx-auto flex max-w-6xl items-start gap-2 px-4 py-2 text-sm sm:items-center sm:px-6 lg:px-8">
        <Info className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" aria-hidden="true" />
        <span>
          Customs Wise Maroc est en cours de lancement : les services présentés sont en préparation.{" "}
          <Link href="/contact" className="font-semibold underline underline-offset-2">
            Contactez-nous
          </Link>{" "}
          pour vérifier leur disponibilité pour votre opération.
        </span>
      </p>
    </div>
  );
}

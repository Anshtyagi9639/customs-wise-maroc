import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { primaryCta, site, telHref } from "@/lib/site";

/** Thin dark bar above the main header: phone ("Appelez-nous") when approved, enquiry button. */
export function TopBar() {
  const { phone, email, address } = site.contact;
  return (
    <div className="surface-dark bg-overnight text-starlight">
      <div className="container-site flex h-10 items-center justify-between gap-4 text-xs sm:text-sm">
        <div className="flex min-w-0 items-center gap-5">
          {phone ? (
            <a href={telHref(phone)} className="inline-flex items-center gap-2 hover:text-salt">
              <Phone className="h-3.5 w-3.5 text-cargo" aria-hidden="true" />
              <span className="hidden sm:inline">Appelez-nous :</span> {phone}
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 truncate">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-cargo" aria-hidden="true" />
              {address.city}, {address.country} · Maroc · Union européenne · Royaume-Uni
            </span>
          )}
          {email && (
            <a href={`mailto:${email}`} className="hidden items-center gap-2 hover:text-salt md:inline-flex">
              <Mail className="h-3.5 w-3.5 text-cargo" aria-hidden="true" />
              {email}
            </a>
          )}
        </div>
        <Link href={primaryCta.href} className="hidden shrink-0 font-semibold text-cargo hover:text-salt sm:inline">
          Faire une demande →
        </Link>
      </div>
    </div>
  );
}

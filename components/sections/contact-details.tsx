import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { offices, site, telHref } from "@/lib/site";
import { cn } from "@/lib/utils/cn";

/**
 * Contact details: head office address, then phone, email and opening hours
 * when approved (empty env values are not rendered).
 */
export function ContactDetails({ tone = "dark", showAddress = true }: { tone?: "dark" | "light"; showAddress?: boolean }) {
  const { phone, email, hours } = site.contact;
  const head = offices[0];
  const icon = cn("mt-0.5 h-5 w-5 shrink-0", tone === "dark" ? "text-cargo" : "text-atlantic");
  const link = tone === "dark" ? "hover:text-salt hover:underline" : "hover:text-atlantic hover:underline";
  return (
    <ul className="space-y-4">
      {showAddress && (
        <li className="flex gap-3">
          <MapPin className={icon} aria-hidden="true" />
          <address className="not-italic">
            {head.street}
            <br />
            {head.postalCode} {head.locality}, {head.country}
          </address>
        </li>
      )}
      {phone && (
        <li className="flex gap-3">
          <Phone className={icon} aria-hidden="true" />
          <a href={telHref(phone)} className={link}>{phone}</a>
        </li>
      )}
      {email && (
        <li className="flex gap-3">
          <Mail className={icon} aria-hidden="true" />
          <a href={`mailto:${email}`} className={link}>{email}</a>
        </li>
      )}
      {hours && (
        <li className="flex gap-3">
          <Clock className={icon} aria-hidden="true" />
          <span>{hours}</span>
        </li>
      )}
    </ul>
  );
}

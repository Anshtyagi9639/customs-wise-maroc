import Link from "next/link";
import type { ComponentProps } from "react";
import { FileText, FolderCheck, ShieldCheck, Globe2, type LucideProps } from "lucide-react";
import type { ServiceIcon } from "@/lib/services";

type Variant = "primary" | "secondary" | "light" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-accent-600 text-white hover:bg-accent-700 shadow-sm",
  secondary: "bg-navy-900 text-white hover:bg-navy-800 shadow-sm",
  light: "bg-white text-navy-900 hover:bg-navy-50 shadow-sm",
  ghost: "border border-white/40 text-white hover:bg-white/10",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition-colors ${variants[variant]} ${extra}`;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

const icons = { file: FileText, folder: FolderCheck, shield: ShieldCheck, globe: Globe2 } as const;

export function ServiceGlyph({ icon, ...props }: { icon: ServiceIcon } & LucideProps) {
  const Icon = icons[icon];
  return <Icon aria-hidden="true" {...props} />;
}

export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`} {...props} />;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  id,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  id?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-600">{eyebrow}</p>
      )}
      <h2 id={id} className="mt-2 text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

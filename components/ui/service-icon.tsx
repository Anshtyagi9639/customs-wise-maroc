import { FileText, FolderCheck, Globe2, ShieldCheck, type LucideProps } from "lucide-react";
import type { ServiceIconName } from "@/types";

const icons = { file: FileText, folder: FolderCheck, shield: ShieldCheck, globe: Globe2 } as const;

/** Decorative icon for a service */
export function ServiceIcon({ icon, ...props }: { icon: ServiceIconName } & LucideProps) {
  const Icon = icons[icon];
  return <Icon aria-hidden="true" {...props} />;
}

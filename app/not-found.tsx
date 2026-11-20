import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: { absolute: "Page introuvable | Customs Wise Maroc" },
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-clearance pattern-zellige flex min-h-[70vh] items-center">
      <div className="container-site max-w-2xl py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-cargo">Erreur 404</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Cette page est introuvable</h1>
        <p className="mt-4 text-lg text-starlight">La page que vous cherchez n&apos;existe pas ou a été déplacée.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
          <ButtonLink href="/services" variant="ghost">
            Nos services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

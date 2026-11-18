import type { Metadata } from "next";
import { Container, ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent-600">Erreur 404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-navy-900">Cette page est introuvable</h1>
        <p className="mt-4 text-lg text-muted">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Retour à l&apos;accueil</ButtonLink>
          <ButtonLink href="/services" variant="secondary">Nos services</ButtonLink>
        </div>
      </Container>
    </section>
  );
}

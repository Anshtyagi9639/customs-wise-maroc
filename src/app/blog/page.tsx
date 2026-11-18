import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHero, PostCard, CtaBand } from "@/components/sections";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog douane Maroc : réglementation et actualités",
  description:
    "Loi de finances, digitalisation PortNet et ADiL, procédures ADII : les analyses de Customs Wise Maroc sur la douane et le commerce international.",
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog" },
};

const crumbs = [
  { name: "Accueil", href: "/" },
  { name: "Blog", href: "/blog" },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        crumbs={crumbs}
        title="Blog & actualités douanières"
        intro="Réglementation, digitalisation et bonnes pratiques : nos analyses pour les importateurs, exportateurs et professionnels de la logistique."
      />
      <section className="py-16 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </Container>
      </section>
      <CtaBand />
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}

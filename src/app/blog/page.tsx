import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { PageHero, PostCard, CtaBand } from "@/components/sections";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";
import { posts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog douane Maroc : réglementation et actualités",
  description:
    "Loi de finances, procédures ADII, digitalisation : les analyses de Customs Wise Maroc sur la douane et le commerce international.",
  path: "/blog",
});

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
        <Container>
          <h2 className="sr-only">Articles publiés</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Blog Customs Wise Maroc",
            url: absoluteUrl("/blog"),
            inLanguage: "fr-MA",
            publisher: { "@id": absoluteUrl("/#organization") },
          },
        ]}
      />
    </>
  );
}

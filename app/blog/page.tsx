import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CTASection } from "@/components/sections/cta-section";
import { FeaturedPost } from "@/components/blog/featured-post";
import { BlogExplorer } from "@/components/blog/blog-explorer";
import { JsonLd } from "@/components/ui/json-ld";
import { blogTopics, posts } from "@/lib/content/blog-posts";
import { buildMetadata } from "@/lib/seo/metadata";
import { blogSchema, breadcrumbSchema, webPageSchema } from "@/lib/structured-data/schemas";

const path = "/blog";
const title = "Blog douane Maroc : réglementation et actualités";
const description =
  "Loi de finances, procédures ADII, digitalisation : les analyses de Customs Wise Maroc sur la douane et le commerce international.";
const trail = [{ name: "Blog", path }];

export const metadata: Metadata = buildMetadata({ title, description, path });

export default function BlogPage() {
  const featured = posts[0];
  return (
    <>
      <JsonLd data={[webPageSchema(path, title, description, "CollectionPage"), breadcrumbSchema(trail), blogSchema()]} />
      <PageHero
        trail={trail}
        title="Blog & actualités douanières"
        intro="Réglementation, digitalisation et bonnes pratiques : nos analyses pour les importateurs, exportateurs et professionnels de la logistique."
      />
      {featured && (
        <section aria-labelledby="featured-title" className="pt-16 sm:pt-24">
          <div data-reveal className="container-site">
            <h2 id="featured-title" className="sr-only">Article à la une</h2>
            <FeaturedPost post={featured} />
          </div>
        </section>
      )}
      <section aria-labelledby="all-posts" className="py-16 sm:py-24">
        <div className="container-site">
          <h2 id="all-posts" className="mb-8 text-3xl font-semibold text-ship">Tous les articles</h2>
          <BlogExplorer posts={posts} topics={blogTopics} />
        </div>
      </section>
      <CTASection />
    </>
  );
}

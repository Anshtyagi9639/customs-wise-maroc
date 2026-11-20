# Customs Wise Maroc — site web

Site en français de Customs Wise Maroc (douane, import-export, commerce international entre le Maroc, l'Union européenne et le Royaume-Uni).

**Stack :** Next.js 16.4 (App Router, Server Components, Server Actions), React 19.3, TypeScript strict, Tailwind CSS 4.3, Lucide, React Hook Form + Zod 4, Marked (articles Markdown). Pas de base de données ni de CMS.

## Démarrer

```bash
npm ci                        # installe selon package-lock.json (Node ≥ 20.9)
cp .env.example .env.local    # puis compléter les valeurs (toutes facultatives)
npm run dev                   # http://localhost:3000
npm run lint
npm run typecheck             # tsc --noEmit
npm run build && npm start
```

## Pages

| Route | Contenu |
|---|---|
| `/` | Accueil : hero + 4 repères, À propos, 4 services, spécialité (corridor), blog, FAQ, demande (coordonnées + formulaire) |
| `/services` | Une section par service avec liens d'ancrage (`#declarations-douanieres`…), démarche, FAQ |
| `/services/declarations-douanieres` | Déclarations douanières |
| `/services/assistance-documentaire` | Assistance documentaire |
| `/services/conformite-douaniere` | Conformité douanière et réglementaire |
| `/services/commerce-international` | Accompagnement du commerce international |
| `/corridor-maroc-europe` | Page spécialité : corridor Maroc – UE – Royaume-Uni (textes du brief) |
| `/secteurs` | Secteurs d'activité — **masquée (404)** tant que `lib/industries.ts` est vide |
| `/about` | À propos (faits vérifiés uniquement) |
| `/blog`, `/blog/[slug]` | Liste et articles (brouillons accessibles par URL, `noindex`) |
| `/faq` | Questions fréquentes (+ `FAQPage`) |
| `/contact` | Demande de devis (`?service=<slug>` pré-sélectionne le service) |
| `/confidentialite` | Politique de confidentialité — **provisoire**, `noindex` |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Générés automatiquement |

Slug inconnu sous `/blog` ou `/services` → vraie 404 (`proxy.ts`), ainsi que `/secteurs` tant qu'aucun secteur n'est validé. Redirections 308 : `/services/conformite-reglementaire` → `/services/conformite-douaniere`, `/faqs` → `/faq`.

## Organisation du code

Structure reprise de `SITE-BLUEPRINT.md` (modèle Customs Wise) : les pages sont fines, elles assemblent des sections et lisent leurs textes dans `lib/`.

```
app/                      Routes (App Router), layout, template (animation d'entrée), sitemap, robots, manifest, icônes, image Open Graph
components/
  sections/               Hero, FactsBand, AboutSection, ServiceGrid, SpecialistFeature, SplitSection, FeatureRow,
                          ImageCard, FaqList, EnquirySection, ContactDetails, OfficeList, ProcessSection, CTASection, PageHero…
  layout/                 ArticleLayout, Breadcrumbs, RevealObserver (apparition au défilement), SiteNotice (bandeau de lancement)
  navigation/             Navbar (masquée en descendant, réapparaît en remontant), TopBar, MobileNav
  footer/                 Footer
  blog/                   BlogCard, FeaturedPost, BlogExplorer (recherche + filtre), RelatedPosts, BlogBody, PostMeta
  forms/                  EnquiryForm
  chatbot/                FloatingChatButton (WhatsApp, masqué tant qu'aucun numéro n'est validé)
  analytics/              Consentement + GA4/GTM + suivi des clics
  ui/                     Button (cva, asChild), CheckList, Logo, JsonLd, ServiceIcon, illustrations SVG
lib/
  site.ts                 Faits de l'entreprise, offices, mainNav, primaryCta
  content/                Tous les textes : services, FAQ, secteurs (index.ts), listes « Ce que nous prenons en charge »
                          (service-details.ts), spécialité (corridor.ts), textes de sections (pages.ts), images (images.ts),
                          articles (blog-posts.ts + blog/*.md)
  seo/metadata.ts         buildMetadata() : titre complet, description, canonique, Open Graph, Twitter
  structured-data/        Schémas JSON-LD (Organization, WebSite, WebPage, BreadcrumbList, Service, BlogPosting, FAQPage…)
  validation/enquiry.ts   Schéma Zod partagé navigateur / serveur
  enquiry/                Server action, envoi (e-mail Resend et/ou webhook), limitation de débit
  utils/cn.ts
types/index.ts            Types partagés
proxy.ts                  404 réelles pour slugs inconnus et /secteurs vide
```

**Écarts volontaires avec le blueprint :** site en français (`fr-MA`) ; pas de chatbot uWebChat, de CMS de blog, de vidéo ni de pages « Insights » (aucun contenu fourni) ; pas de `typescript.ignoreBuildErrors` (le build vérifie les types) ; Turbopack au lieu de `--webpack` ; URL `/faq` conservée (`/faqs` redirige) ; section « Key things to settle » non créée (aucun texte validé).

## Modifier le contenu

- **Services :** `lib/content/index.ts` (textes, titre SEO complet, FAQ liées) et `lib/content/service-details.ts` (listes « Ce que nous prenons en charge »)
- **FAQ :** `lib/content/index.ts` → `faqs` (champ `reviewNote` = note interne non affichée)
- **Coordonnées, bureaux, menu, bouton principal, réseaux sociaux, statut de lancement :** `lib/site.ts` + variables d'environnement
- **Spécialité (corridor) :** `lib/content/corridor.ts` (bloc d'accueil + page `/corridor-maroc-europe`)
- **Textes des sections (repères, « Pourquoi nous choisir », approche, démarche) :** `lib/content/pages.ts`
- **Secteurs d'activité :** `lib/content/index.ts` → `industries` (vide). Dès qu'un secteur y est ajouté : section d'accueil (3 cartes), entrée « Secteurs » du menu et du pied de page, page `/secteurs` et sitemap apparaissent automatiquement.
- **Photos / vidéo :** fichiers dans `public/`, à déclarer dans `lib/content/images.ts` avec leurs vraies dimensions (`heroMedia` pour l'accueil : image, ou vidéo `…-1080.mp4` + `…-720.mp4` + poster).
- **Ajouter un article :** créer `lib/content/blog/<slug>.md` (Markdown, sans H1), puis ajouter une entrée dans `allPosts` de `lib/content/blog-posts.ts` (avec `seoTitle` complet).
  - `status: "draft"` → accessible par URL avec bandeau « brouillon », `noindex`, exclu du sitemap et des listes.
  - `status: "published"` → indexé, listé (du plus récent au plus ancien), `BlogPosting`. Renseigner `published` (ISO) uniquement si la date est vérifiée.

## Variables d'environnement

Aucune n'est obligatoire pour construire et faire fonctionner le site. Voir `.env.example`.

| Variable | Type | Rôle |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | Domaine de production. À défaut : `VERCEL_PROJECT_PRODUCTION_URL` (fourni par Vercel), puis `http://localhost:3000` |
| `NEXT_PUBLIC_SITE_STATUS` | public | `live` retire le bandeau « en cours de lancement » |
| `NEXT_PUBLIC_CONTACT_PHONE` / `_EMAIL` | public | Coordonnées du bureau marocain (masquées si vides) |
| `NEXT_PUBLIC_OPENING_HOURS` | public | Horaires affichés dans le bloc contact (masqués si vides) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | public | Bouton flottant WhatsApp — **uniquement après validation** (masqué si vide) |
| `CONTACT_WEBHOOK_URL` (ou `ENQUIRY_WEBHOOK_URL`) | **secret serveur** | Réception des demandes (POST JSON) |
| `ENQUIRY_WEBHOOK_SECRET` | **secret serveur** | Facultatif, envoyé dans l'en-tête `X-Enquiry-Secret` |
| `EMAIL_API_KEY`, `EMAIL_FROM`, `ENQUIRY_TO_EMAIL`, `EMAIL_API_URL` | **secret serveur** | Envoi des demandes par e-mail (API Resend), Reply-To = visiteur |
| `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA_ID` | public | Analytics (GTM prioritaire). Vides = aucun suivi, aucun bandeau |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION` | public | Vérification Search Console / Bing |

Les variables `NEXT_PUBLIC_*` sont intégrées **au build** : redéployer après modification.

### Formulaire de contact

`EnquiryForm` (validation Zod côté navigateur) → server action `lib/enquiry/actions.ts` : nouvelle validation, champ piège (envoi de robot accepté silencieusement, jamais transmis), **5 demandes / 10 minutes par adresse IP** (par instance serveur) → `lib/enquiry/deliver.ts` : e-mail (Resend) et/ou webhook. Sans aucun canal configuré, le formulaire indique que l'envoi en ligne n'est pas actif ; si aucun canal n'accepte la demande, le visiteur en est informé. Le message de succès et l'événement `generate_lead` n'apparaissent qu'après confirmation de la transmission.

Champs transmis : `name`, `company`, `email`, `phone`, `service`, `origin`, `destination`, `message`, `source`, `submittedAt`.

### Analytics et consentement

Aucun script de mesure n'est chargé sans identifiant **et** sans accord explicite du visiteur (bandeau Accepter / Refuser, lien « Gérer les cookies » dans le pied de page). Événements : `form_start`, `form_error`, `generate_lead`, `click_phone`, `click_email`, `click_quote_cta`, `click_whatsapp` (si le bouton est activé), `view_service`, `view_blog` — sans aucune donnée personnelle.

## Déploiement (Vercel)

1. Pousser la branche `main` sur GitHub.
2. Vercel → *Add New Project* → importer le dépôt. L'application est à la racine : **Root Directory = `./`**.
3. Framework : Next.js (détecté). Build : `npm run build`. Output Directory : par défaut (ne rien saisir). Install : par défaut. Node.js : 22.x ou 24.x.
4. Ajouter les variables d'environnement souhaitées (Production ; Preview si besoin).
5. Déployer, puis relier le domaine définitif et renseigner `NEXT_PUBLIC_SITE_URL` (redéployer).
6. Vérifier en production : pages principales, `/robots.txt`, `/sitemap.xml`, une URL inconnue (404), envoi d'une demande de test.

Les déploiements *Preview* renvoient un `robots.txt` qui interdit l'indexation. Ne pas ajouter `output: "export"` : le site utilise des fonctions serveur (formulaire, proxy).

## Search Console / Bing Webmaster Tools

1. Vérifier le domaine (DNS TXT recommandé, ou balise meta via les variables de vérification).
2. Soumettre `https://<domaine>/sitemap.xml`.
3. Suivre l'indexation et les performances ; demander l'indexation des pages services.

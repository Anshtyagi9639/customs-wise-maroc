# Customs Wise Maroc — site web

Site en français de Customs Wise Maroc (douane, import-export, commerce international entre le Maroc, l'Union européenne et le Royaume-Uni).

**Stack :** Next.js 16.4 (App Router, Server Components, Server Actions), React 19.3, TypeScript strict, Tailwind CSS 4.3, Lucide, React Hook Form + Zod 4, Marked (articles Markdown). Pas de base de données ni de CMS.

## Démarrer

```bash
npm ci                        # installe selon package-lock.json (Node ≥ 20.9)
cp .env.example .env.local    # puis compléter les valeurs (toutes facultatives)
npm run dev                   # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build && npm start
```

## Pages

| Route | Contenu |
|---|---|
| `/` | Accueil : hero, 4 services, blog, FAQ, CTA |
| `/services` | Vue d'ensemble des 4 services, démarche, FAQ |
| `/services/declarations-douanieres` | Déclarations douanières |
| `/services/assistance-documentaire` | Assistance documentaire |
| `/services/conformite-douaniere` | Conformité douanière et réglementaire |
| `/services/commerce-international` | Accompagnement du commerce international |
| `/about` | À propos (faits vérifiés uniquement) |
| `/blog`, `/blog/[slug]` | Liste et articles (brouillons accessibles par URL, `noindex`) |
| `/faq` | Questions fréquentes (+ `FAQPage`) |
| `/contact` | Demande de devis (`?service=<slug>` pré-sélectionne le service) |
| `/confidentialite` | Politique de confidentialité — **provisoire**, `noindex` |
| `/sitemap.xml`, `/robots.txt`, `/opengraph-image` | Générés automatiquement |

Slug inconnu sous `/blog` ou `/services` → vraie 404 (`src/proxy.ts`). `/services/conformite-reglementaire` redirige (308) vers `/services/conformite-douaniere`.

## Organisation du code

```
src/
  app/                    Routes (App Router), sitemap, robots, image Open Graph, polices auto-hébergées
  components/
    layout/               Header, MobileNav, Footer, Logo, SiteNotice (bandeau « en cours de lancement »)
    analytics/            Analytics (consentement + GA4/GTM + suivi des clics), TrackOnMount, ManageConsentLink
    forms/                ContactForm
    seo/                  JsonLd + générateurs (Organization, WebSite, BreadcrumbList)
    CoverArt.tsx          Illustrations SVG originales (services, articles, schéma des corridors)
    sections.tsx, ui.tsx  Sections et composants réutilisables
  content/blog/*.md       Corps des articles
  lib/                    site, seo, services, faq, posts/blog, analytics, contact-schema
  proxy.ts                404 réelles pour slugs inconnus
```

## Modifier le contenu

- **Services :** `src/lib/services.ts` (textes, titre/description SEO, FAQ liées)
- **FAQ :** `src/lib/faq.ts` (champ `reviewNote` = note interne non affichée)
- **Coordonnées, statut de lancement, analytics :** `src/lib/site.ts` + variables d'environnement
- **Ajouter un article :** créer `src/content/blog/<slug>.md` (Markdown, sans H1), puis ajouter une entrée dans `allPosts` de `src/lib/posts.ts`.
  - `status: "draft"` → accessible par URL avec bandeau « brouillon », `noindex`, exclu du sitemap et des listes.
  - `status: "published"` → indexé, listé, `BlogPosting`. Renseigner `published` (ISO, ex. `2026-11` si seul le mois est connu) uniquement si la date est vérifiée.

## Variables d'environnement

Aucune n'est obligatoire pour construire et faire fonctionner le site. Voir `.env.example`.

| Variable | Type | Rôle |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | Domaine de production. À défaut : `VERCEL_PROJECT_PRODUCTION_URL` (fourni par Vercel), puis `http://localhost:3000` |
| `NEXT_PUBLIC_SITE_STATUS` | public | `live` retire le bandeau « en cours de lancement » |
| `NEXT_PUBLIC_CONTACT_PHONE` / `_EMAIL` | public | Coordonnées du bureau marocain (masquées si vides) |
| `CONTACT_WEBHOOK_URL` | **secret serveur** | Réception des demandes (POST JSON) |
| `NEXT_PUBLIC_GTM_ID` / `NEXT_PUBLIC_GA_ID` | public | Analytics (GTM prioritaire). Vides = aucun suivi, aucun bandeau |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION` | public | Vérification Search Console / Bing |

Les variables `NEXT_PUBLIC_*` sont intégrées **au build** : redéployer après modification.

### Formulaire de contact

`src/app/contact/actions.ts` valide la demande côté serveur (Zod), écarte silencieusement les envois de robots (champ piège) et transmet la demande en JSON à `CONTACT_WEBHOOK_URL`. Sans cette variable, le formulaire indique que l'envoi en ligne n'est pas actif ; si le service de réception répond en erreur, le visiteur en est informé. Le message de succès et l'événement `generate_lead` n'apparaissent qu'après confirmation de la transmission.

Champs transmis : `name`, `company`, `email`, `phone`, `service`, `origin`, `destination`, `message`, `source`, `submittedAt`.

### Analytics et consentement

Aucun script de mesure n'est chargé sans identifiant **et** sans accord explicite du visiteur (bandeau Accepter / Refuser, lien « Gérer les cookies » dans le pied de page). Événements : `form_start`, `form_error`, `generate_lead`, `click_phone`, `click_email`, `click_quote_cta`, `view_service`, `view_blog` — sans aucune donnée personnelle.

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

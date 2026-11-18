# Customs Wise Maroc — site web

Site vitrine en français de Customs Wise Maroc (douane, import-export, commerce international).

**Stack :** Next.js 16 (App Router, Server Components), React 19, TypeScript strict, Tailwind CSS 4, Lucide, React Hook Form + Zod, Marked (articles Markdown). Pas de base de données ni de CMS.

## Démarrer

```bash
npm ci            # installe selon package-lock.json (Node ≥ 20.9)
cp .env.example .env.local   # puis compléter les valeurs
npm run dev       # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build && npm start
```

## Pages

| Route | Contenu |
|---|---|
| `/` | Accueil : hero, 4 services, blog, FAQ, CTA |
| `/services` | Les 4 services (ancres `#declarations-douanieres`, `#assistance-documentaire`, `#conformite-reglementaire`, `#commerce-international`) |
| `/blog`, `/blog/[slug]` | Liste et articles |
| `/faq` | Questions fréquentes (+ schéma FAQPage) |
| `/contact` | Formulaire de demande de devis (`?service=<slug>` pré-sélectionne le service) |
| `/sitemap.xml`, `/robots.txt` | Générés automatiquement |

## Modifier le contenu

- **Services :** `src/lib/services.ts`
- **FAQ :** `src/lib/faq.ts`
- **Coordonnées, nom, domaine :** `src/lib/site.ts` et variables d'environnement
- **Ajouter un article :** créer `src/content/blog/<slug>.md` (Markdown, sans titre H1 — le titre vient des métadonnées), puis ajouter une entrée dans `posts` de `src/lib/blog.ts` (titre, description, catégorie, date ISO, temps de lecture, mots-clés, services liés). Le sitemap et la page blog se mettent à jour seuls.

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Domaine de production (URL canoniques, sitemap, Open Graph) |
| `NEXT_PUBLIC_CONTACT_PHONE` | Téléphone du bureau marocain (masqué si vide) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | E-mail du bureau marocain (masqué si vide) |
| `CONTACT_WEBHOOK_URL` | **Serveur uniquement.** Point de réception des demandes (POST JSON) |

Les variables `NEXT_PUBLIC_*` sont intégrées **au moment du build** : après les avoir modifiées, relancer `npm run build` (ou redéployer sur Vercel).

### Formulaire de contact

`src/app/contact/actions.ts` valide la demande (Zod, côté serveur), filtre les robots (champ piège) et l'envoie en JSON à `CONTACT_WEBHOOK_URL` (webhook Make/Zapier/Power Automate, endpoint Formspree…). **Tant que cette variable n'est pas définie, le formulaire indique au visiteur que l'envoi en ligne n'est pas encore actif** — aucune demande n'est perdue silencieusement.

Champs transmis : `name`, `company`, `email`, `phone`, `service`, `message`, `source`, `submittedAt`.

## Déploiement (Vercel)

1. Pousser ce dossier sur un dépôt GitHub.
2. Vercel → *Add New Project* → importer le dépôt. Si le dépôt contient aussi les PDF, définir **Root Directory = `customs-wise-maroc`**.
3. Framework : Next.js (détecté). Build : `npm run build`. Node 20+.
4. Ajouter les variables d'environnement ci-dessus (Production et Preview).
5. Déployer, puis relier le domaine définitif et mettre à jour `NEXT_PUBLIC_SITE_URL`.

Les déploiements *Preview* renvoient un `robots.txt` qui interdit l'indexation.

## Google Search Console

1. Ajouter une propriété *Domaine* et la vérifier via l'enregistrement DNS TXT fourni.
2. *Sitemaps* → soumettre `https://<domaine>/sitemap.xml`.
3. Suivre *Pages* (indexation) et *Performances* ; inspecter les URL des nouveaux articles après publication.

## À compléter avant la mise en ligne

- [ ] Téléphone et e-mail du bureau marocain
- [ ] Destination des demandes du formulaire (`CONTACT_WEBHOOK_URL`)
- [ ] Domaine de production
- [ ] Logo officiel (actuellement un logotype texte : `src/components/layout/Logo.tsx`) et favicon
- [ ] Photos approuvées (aucune image tierce utilisée pour l'instant)
- [ ] Politique de confidentialité / mentions légales (à fournir par l'entreprise)
- [ ] Secteurs d'activité ciblés (section « Industries » non créée)
- [ ] Analytics (GA4 / GTM) avec bandeau de consentement, si souhaité

/**
 * Copy used by page sections (home facts band, about pillars, process steps…).
 * Kept here so pages stay thin (SITE-BLUEPRINT.md §2). Wording is unchanged
 * from the approved pages; nothing here is a new factual claim.
 */
import {
  Building2,
  ClipboardList,
  Compass,
  FileCheck2,
  FileSearch,
  Globe2,
  Handshake,
  Layers,
  MessagesSquare,
  Ship,
} from "lucide-react";
import type { IconItem } from "@/types";

/**
 * Facts band (home). Deliberately non-numeric: no years of experience, client
 * counts or availability claims until the Morocco team provides verified figures.
 */
export const facts: IconItem[] = [
  { icon: Globe2, title: "3 zones", text: "Maroc · Union européenne · Royaume-Uni" },
  { icon: Layers, title: "4 services", text: "Déclarations, documents, conformité, commerce international" },
  { icon: Ship, title: "Tanger Med – Algésiras", text: "Le corridor entre l'Afrique et l'Europe" },
  { icon: Building2, title: "Réseau Customs Wise", text: "Expertise douanière au Royaume-Uni et en Irlande" },
];

/** About section (home) */
export const aboutIntro =
  "Customs Wise Maroc est la présence marocaine de Customs Wise, spécialiste indépendant des formalités douanières au Royaume-Uni et en Irlande.";

/** "Pourquoi choisir Customs Wise ?" — reformulated from the brief only */
export const reasons = [
  "Une expertise réglementaire : classification, valeur en douane, origine et documents.",
  "Une connaissance des échanges entre le Maroc, l'Union européenne et le Royaume-Uni.",
  "Un accompagnement professionnel, en amont de vos expéditions.",
  "Une approche qui vise à limiter les risques de non-conformité.",
  "Un seul interlocuteur pour vos déclarations, documents, conformité et projets internationaux.",
];

/** About page "Notre approche" pillars — wording from the approved homepage brief */
export const pillars: IconItem[] = [
  {
    icon: FileCheck2,
    title: "Expertise réglementaire",
    text: "Classification, valeur, origine, documents : les fondamentaux qui conditionnent un dédouanement sans difficulté.",
    href: "/services/declarations-douanieres",
  },
  {
    icon: Compass,
    title: "Connaissance des échanges internationaux",
    text: "Une lecture des flux entre le Maroc, l'Union européenne et le Royaume-Uni, de leurs accords et de leurs contraintes logistiques.",
    href: "/corridor-maroc-europe",
  },
  {
    icon: Handshake,
    title: "Accompagnement professionnel",
    text: "Une préparation en amont, avec vous, plutôt qu'une réaction au moment où la marchandise arrive au port.",
    href: "/services",
  },
];

/** Generic preparation steps — how an enquiry is handled, no operational claims */
export const processSteps: IconItem[] = [
  {
    icon: MessagesSquare,
    title: "Vous décrivez votre opération",
    text: "Nature des marchandises, origine, destination, mode de transport et calendrier.",
  },
  {
    icon: FileSearch,
    title: "Nous identifions les formalités",
    text: "Classification, documents, règles d'origine et exigences applicables à votre flux.",
  },
  {
    icon: ClipboardList,
    title: "Nous préparons avec vous",
    text: "Vérification des informations et coordination avec les intervenants concernés.",
  },
];

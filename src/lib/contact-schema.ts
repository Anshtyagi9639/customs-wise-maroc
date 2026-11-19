import { z } from "zod";
import { services } from "./services";

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "autre", label: "Autre demande" },
] as const;

const serviceValues = serviceOptions.map((o) => o.value) as [string, ...string[]];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Veuillez indiquer votre nom.").max(100),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  email: z.string().trim().email("Veuillez indiquer une adresse e-mail valide.").max(200),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[+\d\s().-]*$/, "Numéro de téléphone invalide.")
    .optional()
    .or(z.literal("")),
  service: z.enum(serviceValues, { message: "Veuillez choisir un type de demande." }),
  origin: z.string().trim().max(120).optional().or(z.literal("")),
  destination: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Décrivez brièvement vos marchandises et votre itinéraire (10 caractères minimum).")
    .max(4000),
  consent: z.literal(true, { message: "Votre accord est nécessaire pour que nous puissions vous répondre." }),
  /** Honeypot — humans leave it empty; a filled value is silently discarded by the server action */
  website: z.string().max(500).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactResult =
  | { status: "success" }
  | { status: "not_configured" }
  | { status: "invalid"; message: string }
  | { status: "error" };

import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

/** Floating WhatsApp button — rendered only when an approved number is configured. */
export function FloatingChatButton() {
  const number = site.contact.whatsapp;
  if (!number) return null;
  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp"
      aria-label="Discuter avec nous sur WhatsApp (nouvelle fenêtre)"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-[#157a3f] px-5 py-3.5 text-sm font-semibold text-white shadow-xl transition hover:bg-[#106534] focus-visible:outline-offset-4"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span className="hidden sm:inline">Discuter avec nous</span>
    </a>
  );
}

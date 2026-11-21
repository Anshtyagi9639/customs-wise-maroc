import { ImageResponse } from "next/og";

export const alt = "Customs Wise Maroc — douane, import-export et commerce international";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social-sharing image for every page (generated at build time, no external assets) */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0a3542 0%, #062530 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* Provisional brand mark (same geometry as app/icon.svg) */}
          <svg width="76" height="76" viewBox="0 0 64 64">
            <rect width="64" height="64" rx="13" fill="#0a3542" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <path d="M29.13 23.87 A11.5 11.5 0 1 0 29.13 40.13" fill="none" stroke="#f9ed32" strokeWidth="6.5" strokeLinecap="round" />
            <path
              d="M35.5 21 L40.5 43 L46 30 L51.5 43 L56.5 21"
              fill="none"
              stroke="#f9ed32"
              strokeWidth="6.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, letterSpacing: 2 }}>
            CUSTOMS<span style={{ color: "#f9ed32" }}>WISE</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              padding: "6px 12px",
              background: "rgba(255,255,255,0.15)",
              borderRadius: 4,
              letterSpacing: 3,
            }}
          >
            MAROC
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 950 }}>
            Votre partenaire en douane et en commerce international
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#d5dfe4" }}>
            Maroc · Union européenne · Royaume-Uni
          </div>
        </div>
        <div style={{ display: "flex", height: 8, width: 180, background: "#f9ed32", borderRadius: 4 }} />
      </div>
    ),
    size,
  );
}

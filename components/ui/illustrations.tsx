/**
 * Original vector illustrations used as service and article visuals.
 * Inline SVG: no third-party images, no layout shift, crisp at any size.
 */
import type { IllustrationVariant } from "@/types";

/** @deprecated alias kept for readability */
export type CoverVariant = IllustrationVariant;

const palette = {
  ship: "#0a3542",
  deep: "#062530",
  atlantic: "#176a90",
  holyhead: "#2eacb1",
  cargo: "#f9ed32",
  freight: "#f79420",
  mist: "#f1f5f7",
  line: "#d5dfe4",
};

function Motif({ variant }: { variant: CoverVariant }) {
  const p = palette;
  switch (variant) {
    case "file":
      // Customs declaration form with stamp
      return (
        <g>
          <rect x="230" y="40" width="150" height="190" rx="8" fill={p.mist} />
          <rect x="250" y="64" width="80" height="10" rx="3" fill={p.atlantic} />
          {[92, 112, 132, 152].map((y) => (
            <rect key={y} x="250" y={y} width="110" height="7" rx="3" fill={p.line} />
          ))}
          <rect x="250" y="176" width="50" height="34" rx="3" fill="none" stroke={p.atlantic} strokeWidth="3" />
          <circle cx="345" cy="195" r="26" fill="none" stroke={p.freight} strokeWidth="5" />
          <circle cx="345" cy="195" r="15" fill="none" stroke={p.freight} strokeWidth="3" />
        </g>
      );
    case "folder":
      // Stack of trade documents and a check mark
      return (
        <g>
          <rect x="250" y="70" width="140" height="160" rx="8" fill={p.atlantic} opacity="0.55" />
          <rect x="230" y="55" width="140" height="170" rx="8" fill={p.mist} />
          {[82, 102, 122, 142, 162].map((y) => (
            <rect key={y} x="248" y={y} width={y === 82 ? 70 : 104} height="7" rx="3" fill={y === 82 ? p.atlantic : p.line} />
          ))}
          <circle cx="360" cy="200" r="30" fill={p.cargo} />
          <path d="M346 200 l10 10 l18 -20" fill="none" stroke={p.ship} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case "shield":
      // Compliance shield over regulation lines
      return (
        <g>
          {[70, 100, 130, 160, 190].map((y) => (
            <rect key={y} x="200" y={y} width="200" height="6" rx="3" fill={p.atlantic} opacity="0.35" />
          ))}
          <path d="M300 48 l70 26 v56 c0 48 -32 80 -70 96 c-38 -16 -70 -48 -70 -96 v-56 z" fill={p.mist} />
          <path d="M300 70 l50 18 v42 c0 34 -22 58 -50 70 c-28 -12 -50 -36 -50 -70 v-42 z" fill={p.atlantic} />
          <path d="M280 136 l14 14 l28 -30" fill="none" stroke={p.cargo} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case "globe":
      // Morocco – Europe – UK corridor
      return (
        <g>
          <path d="M210 205 C 250 140, 300 120, 330 100 S 380 60, 395 50" fill="none" stroke={p.cargo} strokeWidth="4" strokeDasharray="10 9" />
          <circle cx="210" cy="205" r="12" fill={p.freight} />
          <circle cx="330" cy="100" r="10" fill={p.holyhead} />
          <circle cx="395" cy="50" r="10" fill={p.mist} />
          <text x="210" y="238" textAnchor="middle" fill={p.mist} fontSize="15" fontFamily="sans-serif">Maroc</text>
          <text x="330" y="132" textAnchor="middle" fill={p.mist} fontSize="15" fontFamily="sans-serif">UE</text>
          <text x="395" y="82" textAnchor="middle" fill={p.mist} fontSize="15" fontFamily="sans-serif">R.-U.</text>
          <path d="M240 150 h44 l10 -14 h10 l-6 14 h20 l6 -6 h6 l-4 10 l4 10 h-6 l-6 -6 h-20 l6 14 h-10 l-10 -14 h-44 z" fill={p.mist} opacity="0.9" transform="rotate(-28 290 150)" />
        </g>
      );
    case "law":
      // Finance law document with gavel-like seal
      return (
        <g>
          <rect x="220" y="40" width="160" height="200" rx="8" fill={p.mist} />
          <rect x="240" y="62" width="120" height="14" rx="3" fill={p.ship} />
          <text x="300" y="73" textAnchor="middle" fill={p.cargo} fontSize="11" fontWeight="bold" fontFamily="sans-serif">LF 2026</text>
          {[96, 114, 132, 150, 168].map((y) => (
            <rect key={y} x="240" y={y} width={y === 168 ? 70 : 120} height="7" rx="3" fill={p.line} />
          ))}
          <circle cx="345" cy="205" r="24" fill={p.freight} />
          <text x="345" y="210" textAnchor="middle" fill={p.ship} fontSize="13" fontWeight="bold" fontFamily="sans-serif">Art.</text>
        </g>
      );
    case "digital":
      // Single window screen connected to port / customs nodes
      return (
        <g>
          <rect x="225" y="60" width="150" height="100" rx="8" fill={p.mist} />
          <rect x="237" y="72" width="126" height="16" rx="3" fill={p.atlantic} />
          {[0, 1, 2].map((i) => (
            <rect key={i} x={237 + i * 44} y="98" width="36" height="48" rx="4" fill={i === 1 ? p.cargo : p.line} />
          ))}
          <rect x="290" y="160" width="20" height="18" fill={p.mist} />
          <rect x="268" y="176" width="64" height="8" rx="3" fill={p.mist} />
          {[200, 300, 400].map((x) => (
            <g key={x}>
              <path d={`M300 184 L${x} 222`} stroke={p.holyhead} strokeWidth="3" />
              <circle cx={x} cy="226" r="9" fill={x === 300 ? p.freight : p.holyhead} />
            </g>
          ))}
        </g>
      );
  }
}

export function CoverArt({
  variant,
  alt,
  className = "",
}: {
  variant: CoverVariant;
  /** Pass an empty string when the image is purely decorative */
  alt: string;
  className?: string;
}) {
  const decorative = alt === "";
  return (
    <svg
      viewBox="0 0 600 270"
      preserveAspectRatio="xMidYMid slice"
      className={`block h-full w-full ${className}`}
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": alt })}
    >
      <defs>
        <linearGradient id={`bg-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.ship} />
          <stop offset="100%" stopColor={palette.deep} />
        </linearGradient>
      </defs>
      <rect width="600" height="270" fill={`url(#bg-${variant})`} />
      <circle cx="560" cy="20" r="120" fill={palette.atlantic} opacity="0.25" />
      <circle cx="40" cy="270" r="90" fill={palette.holyhead} opacity="0.12" />
      <Motif variant={variant} />
    </svg>
  );
}

/** Homepage hero illustration: Tanger – Algésiras – Europe – UK corridor */
export function CorridorIllustration() {
  const p = palette;
  return (
    <svg
      viewBox="0 0 420 360"
      className="h-auto w-full"
      role="img"
      aria-label="Schéma des échanges entre le Maroc (Tanger), l'Union européenne et le Royaume-Uni"
    >
      <rect x="10" y="10" width="400" height="340" rx="20" fill={p.deep} opacity="0.55" />
      <path d="M95 290 C 140 250, 160 230, 190 215" fill="none" stroke={p.cargo} strokeWidth="4" strokeDasharray="10 8" className="route-line" />
      <path d="M190 215 C 230 170, 260 150, 290 130" fill="none" stroke={p.cargo} strokeWidth="4" strokeDasharray="10 8" className="route-line" />
      <path d="M290 130 C 310 100, 320 85, 335 65" fill="none" stroke={p.cargo} strokeWidth="4" strokeDasharray="10 8" className="route-line" />
      {[
        { x: 95, y: 290, label: "Tanger", sub: "Maroc", c: p.freight, left: false },
        { x: 190, y: 215, label: "Algésiras", sub: "Espagne", c: p.holyhead, left: false },
        { x: 290, y: 130, label: "Union européenne", sub: "", c: p.holyhead, left: true },
        { x: 335, y: 65, label: "Royaume-Uni", sub: "", c: p.mist, left: true },
      ].map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="14" fill={n.c} opacity="0.25" />
          <circle cx={n.x} cy={n.y} r="8" fill={n.c} />
          <text x={n.left ? n.x - 18 : n.x + 18} y={n.y + 5} textAnchor={n.left ? "end" : "start"} fill={p.mist} fontSize="15" fontWeight="600" fontFamily="sans-serif">
            {n.label}
          </text>
          {n.sub && (
            <text x={n.x + 18} y={n.y + 23} fill={p.line} fontSize="12" fontFamily="sans-serif">
              {n.sub}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

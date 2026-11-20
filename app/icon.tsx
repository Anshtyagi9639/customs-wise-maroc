import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** App icon: "CW" monogram on the brand dark colour (text logo until the official logo is supplied) */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a3542",
          color: "#f9ed32",
          fontSize: 260,
          fontWeight: 700,
          letterSpacing: -10,
          fontFamily: "sans-serif",
        }}
      >
        CW
      </div>
    ),
    size,
  );
}

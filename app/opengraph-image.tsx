import { ImageResponse } from "next/og";
export const runtime = "edge"; // <-- add this line

export const alt = "ShopLite — accessible Next.js store";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "linear-gradient(135deg,#4f46e5,#9333ea)", color: "white" }}>
        <div style={{ fontSize: 120 }}>🛍️</div>
        <div style={{ fontSize: 84, fontWeight: 800 }}>ShopLite</div>
        <div style={{ fontSize: 36, opacity: 0.9 }}>Zustand · Zod · Server Actions</div>
      </div>
    ),
    size
  );
}

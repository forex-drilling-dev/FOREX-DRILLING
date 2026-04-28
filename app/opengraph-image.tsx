import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Forex Drilling — Specialized Drilling Services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#070D1A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "64px 72px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "#C8902A",
          }}
        />

        {/* Mono label */}
        <div
          style={{
            color: "#C8902A",
            fontSize: 14,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 400,
            marginBottom: 24,
          }}
        >
          SINGAPORE · ASIA-PACIFIC
        </div>

        {/* Headline */}
        <div
          style={{
            color: "#EDE9E0",
            fontSize: 80,
            fontWeight: 800,
            lineHeight: 0.9,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            marginBottom: 32,
          }}
        >
          FOREX{" "}
          <span style={{ color: "#E8B84B" }}>DRILLING.</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "#9A9485",
            fontSize: 22,
            fontWeight: 300,
            lineHeight: 1.5,
            maxWidth: 640,
          }}
        >
          Specialized drilling services across the Asia-Pacific region.
          Based in Singapore, operating in Papua New Guinea.
        </div>
      </div>
    ),
    { ...size },
  );
}

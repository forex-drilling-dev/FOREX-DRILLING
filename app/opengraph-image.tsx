import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Forex Drilling · Specialized drilling services";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Official brand palette — must mirror app/globals.css @theme values
const NAVY      = "#11284E"; // deep navy bg
const NAVY_MID  = "#163767"; // primary navy (accent bar)
const AMBER     = "#E3AA00"; // ocre yellow
const AMBER_HI  = "#F4C13C"; // bright yellow accent
const WHITE     = "#EDE9E0"; // off-white text
const MUTED     = "#9CA3AF"; // muted body text

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: NAVY,
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
        {/* Top accent bar — primary navy mid */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: AMBER,
          }}
        />

        {/* Mono label */}
        <div
          style={{
            color: AMBER,
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
            color: WHITE,
            fontSize: 80,
            fontWeight: 800,
            lineHeight: 0.9,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            marginBottom: 32,
          }}
        >
          FOREX{" "}
          <span style={{ color: AMBER_HI }}>DRILLING.</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            color: MUTED,
            fontSize: 22,
            fontWeight: 300,
            lineHeight: 1.5,
            maxWidth: 640,
          }}
        >
          Specialised drilling services across the Asia-Pacific region.
          Based in Singapore, operating in Papua New Guinea.
        </div>
      </div>
    ),
    { ...size },
  );
}

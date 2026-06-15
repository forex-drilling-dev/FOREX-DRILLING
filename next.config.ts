import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  trailingSlash: true,
  images: {
    // Static export: images are not optimized at runtime. News cover/inline
    // images are served from the Sanity CDN (cdn.sanity.io). `unoptimized`
    // bypasses the optimizer and its remote-host allowlist.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

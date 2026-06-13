import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  trailingSlash: true,
  images: {
    // Static export: images are not optimized at runtime. News cover/inline
    // images are served same-origin from /uploads/news/ by the PHP CMS.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;

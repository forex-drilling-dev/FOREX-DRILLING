#!/usr/bin/env node
// Optimise client photos at build time:
//  - Resize to a sane max width (the originals are full DSLR resolution,
//    3744 × 5616 = wasted bandwidth on every device).
//  - Re-encode JPEG → AVIF (best) + WebP (fallback) at hero/thumb sizes.
//  - Generate a tiny 16-pixel blur preview for next/image placeholder.
//
// Run: pnpm exec node scripts/optimize-images.mjs (also runs as prebuild)
// Output:
//   public/images/optimized/<name>.avif        — max 1920w, hero quality
//   public/images/optimized/<name>.webp        — max 1920w, hero quality
//   public/images/optimized/<name>-sm.webp     — max  960w, mobile quality
//   public/images/optimized/<name>-sm.avif     — max  960w, mobile quality
//   lib/blur-data.json                          — 16px preview blobs

import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const SRC_DIR = "public/images";
const OUT_DIR = "public/images/optimized";
const BLUR_OUT = "lib/blur-data.json";

// Hero size — 1920px wide is enough for any laptop / desktop / 2× retina
// up to a 960px CSS width. Tablets and phones receive the -sm variant.
const HERO_MAX_WIDTH = 1920;
const MOBILE_MAX_WIDTH = 960;

// AVIF is ~30 % smaller than WebP at similar visual quality.
// WebP stays as a fallback for the small share of browsers that still
// lack AVIF support (~2 % at time of writing).
const AVIF_QUALITY = 55;
const WEBP_QUALITY = 75;

const BLUR_PIXELS = 16;

await fs.mkdir(OUT_DIR, { recursive: true });

const files = (await fs.readdir(SRC_DIR)).filter(
  (f) => /\.(jpe?g|png)$/i.test(f) && !f.startsWith("."),
);

const blurMap = {};
let totalIn = 0;
let totalOut = 0;

for (const file of files) {
  const src = path.join(SRC_DIR, file);
  const stem = path.parse(file).name;
  const srcSize = (await fs.stat(src)).size;
  totalIn += srcSize;

  // Shared pipeline: auto-rotate from EXIF, then branch into the
  // hero + mobile variants. Reusing one Sharp instance per output
  // keeps memory bounded for the 3744 × 5616 originals.
  const base = sharp(src).rotate();
  const { width: srcWidth = 0 } = await base.metadata();

  // Hero variants — capped at 1920w, never upscaled.
  const heroPipeline = base.clone().resize({
    width: Math.min(HERO_MAX_WIDTH, srcWidth),
    withoutEnlargement: true,
    fit: "inside",
  });

  const heroAvifOut = path.join(OUT_DIR, `${stem}.avif`);
  const heroWebpOut = path.join(OUT_DIR, `${stem}.webp`);
  await heroPipeline.clone().avif({ quality: AVIF_QUALITY }).toFile(heroAvifOut);
  await heroPipeline.clone().webp({ quality: WEBP_QUALITY }).toFile(heroWebpOut);

  // Mobile variants — capped at 960w. Most heroes render at 375–414 CSS
  // px on phones, this gives a clean 2× retina source without paying for
  // the desktop pixels.
  const mobilePipeline = base.clone().resize({
    width: Math.min(MOBILE_MAX_WIDTH, srcWidth),
    withoutEnlargement: true,
    fit: "inside",
  });
  const mobileAvifOut = path.join(OUT_DIR, `${stem}-sm.avif`);
  const mobileWebpOut = path.join(OUT_DIR, `${stem}-sm.webp`);
  await mobilePipeline.clone().avif({ quality: AVIF_QUALITY }).toFile(mobileAvifOut);
  await mobilePipeline.clone().webp({ quality: WEBP_QUALITY }).toFile(mobileWebpOut);

  // Tiny blur preview as base64 data URL (kept inline — this is the ONE
  // legitimate use of base64 for images: ~400 bytes per file, prevents
  // the white flash before the hero loads).
  const blurBuf = await base
    .clone()
    .resize(BLUR_PIXELS, null, { fit: "inside" })
    .webp({ quality: 50 })
    .toBuffer();
  blurMap[`/images/${file}`] = `data:image/webp;base64,${blurBuf.toString("base64")}`;

  const heroSize = (await fs.stat(heroWebpOut)).size;
  const heroAvifSize = (await fs.stat(heroAvifOut)).size;
  const mobileSize = (await fs.stat(mobileWebpOut)).size;
  totalOut += heroAvifSize + mobileSize; // count what we'll actually serve

  const pct = ((1 - heroAvifSize / srcSize) * 100).toFixed(0);
  console.log(
    `  ${file.padEnd(34)} ${(srcSize / 1024).toFixed(0).padStart(5)}kb  →  ` +
      `avif ${(heroAvifSize / 1024).toFixed(0)}kb / webp ${(heroSize / 1024).toFixed(0)}kb / mobile ${(mobileSize / 1024).toFixed(0)}kb  (-${pct}% on AVIF)`,
  );
}

await fs.mkdir("lib", { recursive: true });
await fs.writeFile(BLUR_OUT, JSON.stringify(blurMap, null, 2));

console.log(
  `\n✓ ${files.length} images optimised → ${OUT_DIR}` +
    `\n✓ Blur previews → ${BLUR_OUT}` +
    `\n✓ Total bandwidth: ${(totalIn / 1024 / 1024).toFixed(1)} MB source → ${(totalOut / 1024 / 1024).toFixed(1)} MB served (avif+mobile)`,
);

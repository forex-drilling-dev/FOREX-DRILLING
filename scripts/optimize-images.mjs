#!/usr/bin/env node
// Optimise client photos at build time:
//  - Re-encode JPEG → WebP at quality 78 (huge size win)
//  - Generate a tiny 16-pixel blur preview for next/image placeholder
//
// Run: pnpm exec node scripts/optimize-images.mjs
// Output: public/images/optimized/<name>.webp + lib/blur-data.json
//
// next/image picks the .webp via the URL we pass in; the blur placeholder
// data is imported into a typed map exposed to components.

import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const SRC_DIR = "public/images";
const OUT_DIR = "public/images/optimized";
const BLUR_OUT = "lib/blur-data.json";

const QUALITY = 78;
const BLUR_PIXELS = 16;

await fs.mkdir(OUT_DIR, { recursive: true });

const files = (await fs.readdir(SRC_DIR)).filter(
  (f) => /\.(jpe?g|png)$/i.test(f) && !f.startsWith("."),
);

const blurMap = {};

for (const file of files) {
  const src = path.join(SRC_DIR, file);
  const stem = path.parse(file).name;
  const webpOut = path.join(OUT_DIR, `${stem}.webp`);

  // 1) WebP at 78% quality
  await sharp(src)
    .rotate()
    .webp({ quality: QUALITY })
    .toFile(webpOut);

  // 2) Tiny blur preview as base64 data URL
  const blurBuf = await sharp(src)
    .rotate()
    .resize(BLUR_PIXELS, null, { fit: "inside" })
    .webp({ quality: 50 })
    .toBuffer();

  blurMap[`/images/${file}`] = `data:image/webp;base64,${blurBuf.toString("base64")}`;

  const srcSize = (await fs.stat(src)).size;
  const outSize = (await fs.stat(webpOut)).size;
  const pct = ((1 - outSize / srcSize) * 100).toFixed(0);
  console.log(
    `  ${file.padEnd(40)} ${(srcSize / 1024).toFixed(0)}kb → ${(outSize / 1024).toFixed(0)}kb (-${pct}%)`,
  );
}

await fs.mkdir("lib", { recursive: true });
await fs.writeFile(BLUR_OUT, JSON.stringify(blurMap, null, 2));

console.log(`\n✓ ${files.length} images optimised → ${OUT_DIR}`);
console.log(`✓ Blur previews → ${BLUR_OUT}`);

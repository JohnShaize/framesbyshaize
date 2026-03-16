import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const input = "image-src/hero/hero-bg2.jpg";
const outputDir = "public/hero";

await fs.mkdir(outputDir, { recursive: true });

const variants = [
  { name: "hero-bg2-mobile", width: 1920 },
  { name: "hero-bg2-desktop", width: 1920 },
];

for (const variant of variants) {
  const base = sharp(input)
    .rotate()
    .resize({
      width: variant.width,
      withoutEnlargement: true,
    });

  await base
    .clone()
    .webp({ quality: 86, effort: 6 })
    .toFile(path.join(outputDir, `${variant.name}.webp`));

  await base
    .clone()
    .avif({ quality: 62, effort: 6 })
    .toFile(path.join(outputDir, `${variant.name}.avif`));
}

console.log("Hero images optimized successfully.");
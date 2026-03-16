import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const input = "image-src/about/hero.jpg";
const outputDir = "public/about";

await fs.mkdir(outputDir, { recursive: true });

const base = sharp(input)
  .rotate()
  .resize({
    width: 1400,
    withoutEnlargement: true,
  });

await base
  .clone()
  .webp({ quality: 84, effort: 6 })
  .toFile(path.join(outputDir, "about-portrait.webp"));

await base
  .clone()
  .avif({ quality: 62, effort: 6 })
  .toFile(path.join(outputDir, "about-portrait.avif"));

console.log("About image optimized successfully.");
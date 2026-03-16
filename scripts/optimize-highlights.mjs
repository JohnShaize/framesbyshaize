import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const inputDir = "image-src/highlights";
const outputDir = "public/highlights";

await fs.mkdir(outputDir, { recursive: true });

const files = await fs.readdir(inputDir);

const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

for (const file of imageFiles) {
  const inputPath = path.join(inputDir, file);
  const parsed = path.parse(file);
  const baseName = parsed.name;

  const image = sharp(inputPath).rotate();
  const metadata = await image.metadata();

  // Grid image
  await image
    .clone()
    .resize({
      width: 900,
      withoutEnlargement: true,
    })
    .webp({ quality: 78, effort: 6 })
    .toFile(path.join(outputDir, `${baseName}-thumb.webp`));

  // Lightbox image
  await image
    .clone()
    .resize({
      width: 2000,
      withoutEnlargement: true,
    })
    .webp({ quality: 86, effort: 6 })
    .toFile(path.join(outputDir, `${baseName}-full.webp`));

  console.log(`Generated: ${baseName} | ${metadata.width}x${metadata.height}`);
}

console.log("Highlight images optimized successfully.");
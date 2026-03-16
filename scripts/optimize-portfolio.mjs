import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const inputDir = "image-src/portfolio";
const outputDir = "public/portfolio";

await fs.mkdir(outputDir, { recursive: true });

const files = await fs.readdir(inputDir);

const imageFiles = files.filter((file) =>
  /\.(jpg|jpeg|png|webp)$/i.test(file),
);

for (const file of imageFiles) {
  const inputPath = path.join(inputDir, file);
  const parsed = path.parse(file);
  const baseName = parsed.name;

  const image = sharp(inputPath).rotate();
  const metadata = await image.metadata();

  const thumbWidth = 900;
  const fullWidth = 3200;

  await image
    .clone()
    .resize({
      width: thumbWidth,
      withoutEnlargement: true,
    })
    .webp({ quality: 76, effort: 6 })
    .toFile(path.join(outputDir, `${baseName}-thumb.webp`));

  await image
    .clone()
    .resize({
      width: fullWidth,
      withoutEnlargement: true,
    })
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(outputDir, `${baseName}-full.webp`));

  console.log(
    `Generated: ${baseName} | ${metadata.width}x${metadata.height}`,
  );
}

console.log("Portfolio images optimized successfully.");
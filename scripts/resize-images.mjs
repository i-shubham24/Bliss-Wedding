// Pre-sizes the client's own pictures (public/reels, public/insta) into light WebP files at
// public/img/<width>/<folder>/<name>.webp. src/lib/image-loader.ts picks the closest width.
// Run again after adding pictures: node scripts/resize-images.mjs
import { mkdirSync, readdirSync } from "node:fs";
import { join, parse } from "node:path";
import sharp from "sharp";

const WIDTHS = [240, 480, 960];
const root = new URL("../public/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

for (const folder of ["reels", "insta"]) {
  for (const file of readdirSync(join(root, folder)).filter((f) => f.endsWith(".jpg"))) {
    for (const w of WIDTHS) {
      const out = join(root, "img", String(w), folder);
      mkdirSync(out, { recursive: true });
      await sharp(join(root, folder, file))
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 74 })
        .toFile(join(out, `${parse(file).name}.webp`));
    }
  }
}
console.log("resized", WIDTHS.join(", "));

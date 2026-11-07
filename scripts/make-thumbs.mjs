// Generates display-sized copies of photos into public/images/thumbs/,
// mirroring the source folder structure.
//
// Why: the site is a static export (GitHub Pages), so next/image runs with
// `unoptimized: true` and serves files as-is. Gallery tiles and inline photos
// render at roughly 300-600px wide, but the originals are 1600px+ wide.
// Pages use the thumbs for tiles/inline images and keep the originals for the
// full-screen lightbox.
//
// Usage: npm run thumbs   (re-run after adding or replacing a photo, then commit
// the generated files -- CI does not run this script)

import { readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve("public/images");
const OUT = path.join(ROOT, "thumbs");

// Folders/files that get thumbnails (SV2 screenshots are already ~20KB, so skipped)
const SOURCES = ["cal-poly", "berklee", "studio.webp"];

// 960px covers gallery tiles on 2x displays and inline photos on 1x displays
const WIDTH = 960;
const QUALITY = 78;

async function* walk(p) {
  const s = await stat(p);
  if (s.isFile()) {
    yield p;
    return;
  }
  for (const entry of await readdir(p)) yield* walk(path.join(p, entry));
}

let made = 0;
let skipped = 0;

for (const source of SOURCES) {
  for await (const file of walk(path.join(ROOT, source))) {
    if (!file.endsWith(".webp")) continue;

    const out = path.join(OUT, path.relative(ROOT, file));
    const [src, dst] = await Promise.all([
      stat(file),
      stat(out).catch(() => null),
    ]);

    // Skip if the thumbnail is already newer than its source
    if (dst && dst.mtimeMs >= src.mtimeMs) {
      skipped++;
      continue;
    }

    await mkdir(path.dirname(out), { recursive: true });
    await sharp(file)
      .resize({ width: WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out);

    const kb = (n) => `${Math.round(n / 1024)}KB`;
    console.log(
      `${path.relative(ROOT, file)}: ${kb(src.size)} -> ${kb((await stat(out)).size)}`
    );
    made++;
  }
}

console.log(`\n${made} thumbnail(s) written, ${skipped} up to date.`);

// Prepares a generated or supplied photo for the site: writes <name>-{1920,1280,768}.{avif,webp,jpg} into src/assets/img/photos/.
// Usage: node scripts/prep-image.mjs <input.(png|jpg|webp)> <name>
import path from 'node:path';
import fs from 'node:fs';
import sharp from 'sharp';
const [input, name] = process.argv.slice(2);
if (!input || !name) { console.error('usage: prep-image.mjs <input> <name>'); process.exit(1); }
const OUT = path.resolve(import.meta.dirname, '..', 'src/assets/img/photos');
fs.mkdirSync(OUT, { recursive: true });
const src = sharp(path.resolve(input)).rotate();
const meta = await src.metadata();
const base = src.resize({ width: 1920, height: 1080, fit: 'cover', position: 'attention' });
for (const w of [1920, 1280, 768]) {
  const r = base.clone().resize(w);
  const a = await r.clone().avif({ quality: 50, effort: 5 }).toFile(path.join(OUT, `${name}-${w}.avif`));
  const p = await r.clone().webp({ quality: 72 }).toFile(path.join(OUT, `${name}-${w}.webp`));
  const j = await r.clone().jpeg({ quality: 74, mozjpeg: true }).toFile(path.join(OUT, `${name}-${w}.jpg`));
  console.log(`${name}-${w}: avif ${a.size} webp ${p.size} jpg ${j.size}`);
}
console.log(`source ${meta.width}×${meta.height} → src/assets/img/photos/${name}-*`);

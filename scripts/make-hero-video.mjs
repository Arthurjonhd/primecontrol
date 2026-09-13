// Prepares the hero clip from the client's drone footage (design/source/drone.mp4):
// re-encodes to VP9/WebM under 4 MB inside real Chrome (MediaRecorder), and extracts poster frames.
// Usage: node scripts/make-hero-video.mjs [startSeconds] [clipSeconds] [posterSeconds]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'design/source/drone.mp4'); // client footage, never deployed
const OUT = path.join(ROOT, 'src/assets/video/hero-drone.webm');
const POSTER_DIR = path.join(ROOT, 'src/assets/img/hero');
const PREVIEW_DIR = path.join(ROOT, 'design/qa/video');
fs.mkdirSync(PREVIEW_DIR, { recursive: true });
const START = Number(process.argv[2] ?? 0);
const CLIP = Number(process.argv[3] ?? 18);
const POSTER_T = Number(process.argv[4] ?? 4.5); // poster frame: the tower, not the propeller close-up
const W = 1280, H = 720, MAX_BYTES = 3.6 * 1024 * 1024;

const b = await chromium.launch({ channel: 'chrome' });
const page = await b.newPage({ viewport: { width: W, height: H } });
// the source is handed over as a data: URL so Chrome can seek freely (no byte-range server needed)
const dataUrl = 'data:video/mp4;base64,' + fs.readFileSync(SRC).toString('base64');
await page.setContent(`<!doctype html><body style="margin:0;background:#000"><video id="v" muted playsinline preload="auto"></video><canvas id="c" width="${W}" height="${H}"></canvas>`);
await page.evaluate((u) => { document.getElementById('v').src = u; }, dataUrl);
const meta = await page.evaluate(() => new Promise((res, rej) => { const v = document.getElementById('v'); v.onloadedmetadata = () => res({ duration: v.duration, w: v.videoWidth, h: v.videoHeight }); v.onerror = () => rej(new Error('video failed to load')); }));
console.log('source', meta);

const frame = (t, w) => page.evaluate(async ({ t, w }) => {
  const v = document.getElementById('v'); v.currentTime = t; await new Promise((r) => (v.onseeked = r));
  const c = document.createElement('canvas'); const h = Math.round(w * v.videoHeight / v.videoWidth); c.width = w; c.height = h;
  c.getContext('2d').drawImage(v, 0, 0, w, h); return c.toDataURL('image/png').split(',')[1];
}, { t, w });

// preview frames for review
for (const f of [0.1, 0.3, 0.5, 0.7, 0.9]) {
  const t = Math.min(meta.duration - 0.1, f * meta.duration);
  fs.writeFileSync(path.join(PREVIEW_DIR, `frame-${Math.round(t)}s.jpg`), await sharp(Buffer.from(await frame(t, 720), 'base64')).jpeg({ quality: 75 }).toBuffer());
}
// poster frame
const posterPng = Buffer.from(await frame(Math.min(POSTER_T, meta.duration - 0.1), 1920), 'base64');
for (const w of [1920, 1280, 768]) {
  const base = sharp(posterPng).resize(w);
  await base.clone().avif({ quality: 48, effort: 6 }).toFile(path.join(POSTER_DIR, `drone-${w}.avif`));
  await base.clone().webp({ quality: 70 }).toFile(path.join(POSTER_DIR, `drone-${w}.webp`));
  await base.clone().jpeg({ quality: 72, mozjpeg: true }).toFile(path.join(POSTER_DIR, `drone-${w}.jpg`));
}
console.log('posters written');

const clip = Math.min(CLIP, meta.duration - START);
let bps = Math.min(3_000_000, Math.floor(MAX_BYTES * 8 / clip));
for (let attempt = 0; attempt < 3; attempt++) {
  const b64 = await page.evaluate(async ({ start, clip, bps, W, H }) => {
    const v = document.getElementById('v'); const c = document.getElementById('c'); const ctx = c.getContext('2d');
    v.currentTime = start; await new Promise((r) => (v.onseeked = r));
    const stream = c.captureStream(30);
    const rec = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9', videoBitsPerSecond: bps });
    const chunks = []; rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
    const done = new Promise((r) => (rec.onstop = r));
    let raf; const draw = () => { ctx.drawImage(v, 0, 0, W, H); raf = requestAnimationFrame(draw); };
    rec.start(250); await v.play(); draw();
    await new Promise((r) => { const tick = () => (v.currentTime >= start + clip || v.ended ? r() : setTimeout(tick, 50)); tick(); });
    v.pause(); cancelAnimationFrame(raf); rec.stop(); await done;
    const blob = new Blob(chunks, { type: 'video/webm' }); const buf = await blob.arrayBuffer();
    let s = ''; const bytes = new Uint8Array(buf); for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(s);
  }, { start: START, clip, bps, W, H });
  const buf = Buffer.from(b64, 'base64');
  fs.writeFileSync(OUT, buf);
  console.log(`attempt ${attempt + 1}: ${clip.toFixed(1)} s at ${(bps / 1e6).toFixed(2)} Mbps → ${(buf.length / 1024 / 1024).toFixed(2)} MB`);
  if (buf.length <= 4 * 1024 * 1024) break;
  bps = Math.floor(bps * 0.75);
}
await b.close();

// Re-encodes a client MP4 to VP9/WebM at a byte budget inside real Chrome (MediaRecorder) and extracts posters.
// Usage: node scripts/encode-video.mjs <source.mp4> <outName> [maxMB=3.6] [posterSeconds=4.5] [clipSeconds=all]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const [SRC, NAME, MAXMB = '3.6', POSTER_T = '4.5', CLIP_ARG] = process.argv.slice(2);
const CODEC = process.env.CODEC || 'vp8'; // vp8: broadest playback + remuxable by the bundled ffmpeg; vp9: smaller but not remuxable here
if (!SRC || !NAME) { console.error('usage: encode-video.mjs <source.mp4> <outName> [maxMB] [posterSeconds] [clipSeconds]'); process.exit(1); }
const OUT = path.join(ROOT, 'src/assets/video', NAME + '.webm');
const POSTER_DIR = path.join(ROOT, 'src/assets/img/video');
fs.mkdirSync(POSTER_DIR, { recursive: true });
const W = 1280, H = 720, MAX_BYTES = Number(MAXMB) * 1024 * 1024;

const b = await chromium.launch({ channel: 'chrome' });
const page = await b.newPage({ viewport: { width: W, height: H } });
const dataUrl = 'data:video/mp4;base64,' + fs.readFileSync(path.resolve(SRC)).toString('base64');
await page.setContent(`<!doctype html><body style="margin:0;background:#000"><video id="v" muted playsinline preload="auto"></video><canvas id="c" width="${W}" height="${H}"></canvas>`);
await page.evaluate((u) => { document.getElementById('v').src = u; }, dataUrl);
const meta = await page.evaluate(() => new Promise((res, rej) => { const v = document.getElementById('v'); v.onloadedmetadata = () => res({ duration: v.duration, w: v.videoWidth, h: v.videoHeight }); v.onerror = () => rej(new Error('video failed to load')); }));
console.log(NAME, 'source', meta);

const frame = (t, w) => page.evaluate(async ({ t, w }) => {
  const v = document.getElementById('v'); v.currentTime = t; await new Promise((r) => (v.onseeked = r));
  const c = document.createElement('canvas'); const h = Math.round(w * v.videoHeight / v.videoWidth); c.width = w; c.height = h;
  c.getContext('2d').drawImage(v, 0, 0, w, h); return c.toDataURL('image/png').split(',')[1];
}, { t, w });
const posterPng = Buffer.from(await frame(Math.min(Number(POSTER_T), meta.duration - 0.1), 1920), 'base64');
for (const w of [1920, 1280, 768]) {
  const base = sharp(posterPng).resize(w);
  await base.clone().avif({ quality: 48, effort: 5 }).toFile(path.join(POSTER_DIR, `${NAME}-${w}.avif`));
  await base.clone().webp({ quality: 70 }).toFile(path.join(POSTER_DIR, `${NAME}-${w}.webp`));
  await base.clone().jpeg({ quality: 72, mozjpeg: true }).toFile(path.join(POSTER_DIR, `${NAME}-${w}.jpg`));
}
const clip = Math.min(CLIP_ARG ? Number(CLIP_ARG) : meta.duration, meta.duration);
let bps = Math.min(3_000_000, Math.floor(MAX_BYTES * 8 / clip));
for (let attempt = 0; attempt < 3; attempt++) {
  const b64 = await page.evaluate(async ({ clip, bps, W, H, codec }) => {
    const v = document.getElementById('v'); const c = document.getElementById('c'); const ctx = c.getContext('2d');
    v.currentTime = 0; await new Promise((r) => (v.onseeked = r));
    const rec = new MediaRecorder(c.captureStream(30), { mimeType: 'video/webm;codecs=' + codec, videoBitsPerSecond: bps });
    const chunks = []; rec.ondataavailable = (e) => e.data.size && chunks.push(e.data); const done = new Promise((r) => (rec.onstop = r));
    let raf; const draw = () => { ctx.drawImage(v, 0, 0, W, H); raf = requestAnimationFrame(draw); };
    rec.start(250); await v.play(); draw();
    await new Promise((r) => { const tick = () => (v.currentTime >= clip || v.ended ? r() : setTimeout(tick, 50)); tick(); });
    v.pause(); cancelAnimationFrame(raf); rec.stop(); await done;
    const buf = await new Blob(chunks, { type: 'video/webm' }).arrayBuffer();
    let s = ''; const bytes = new Uint8Array(buf); for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(s);
  }, { clip, bps, W, H, codec: CODEC });
  const buf = Buffer.from(b64, 'base64'); fs.writeFileSync(OUT, buf);
  console.log(`  ${clip.toFixed(1)} s at ${(bps / 1e6).toFixed(2)} Mbps → ${(buf.length / 1048576).toFixed(2)} MB`);
  if (buf.length <= MAX_BYTES * 1.1) break; bps = Math.floor(bps * 0.8);
}
await b.close();
// Remux so the container carries duration and cues (MediaRecorder output has neither). Works for VP8 with the bundled ffmpeg.
try {
  const { execFileSync } = await import('node:child_process');
  const mp = path.join(process.env.LOCALAPPDATA, 'ms-playwright');
  const ffmpeg = path.join(mp, fs.readdirSync(mp).find((d) => d.startsWith('ffmpeg')), 'ffmpeg-win64.exe');
  const tmp = OUT + '.remux.webm';
  execFileSync(ffmpeg, ['-y', '-hide_banner', '-loglevel', 'error', '-i', OUT, '-c', 'copy', '-fflags', '+genpts', tmp]);
  fs.renameSync(tmp, OUT);
  console.log('  remuxed with duration + cues:', (fs.statSync(OUT).size / 1048576).toFixed(2), 'MB');
} catch (e) { console.warn('  remux skipped:', String(e.message).slice(0, 200)); }

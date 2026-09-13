// Renders the placeholder hero clip: a 12 s slow push-in on the graded aerial poster,
// recorded with Playwright (VP8/WebM) so the real <video> pipeline is exercised end to end.
// Replace src/assets/video/hero-miami-night.webm with client drone footage when available (keep < 4 MB).
// Usage: node scripts/make-hero-video.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const POSTER = path.join(ROOT, 'src', 'assets', 'img', 'hero', 'miami-night-1920.jpg');
const OUT = path.join(ROOT, 'src', 'assets', 'video', 'hero-miami-night.webm');
const TMP = path.join(ROOT, 'node_modules', '.cache', 'hero-video');
fs.rmSync(TMP, { recursive: true, force: true }); fs.mkdirSync(TMP, { recursive: true });

const W = 1440, H = 810, SECONDS = 12;
const dataUrl = 'data:image/jpeg;base64,' + fs.readFileSync(POSTER).toString('base64');
const html = `<!doctype html><style>
html,body{margin:0;height:100%;background:#15243b;overflow:hidden}
.f{position:fixed;inset:0;background:url(${dataUrl}) center/cover no-repeat;transform:scale(1);animation:z ${SECONDS}s linear forwards}
@keyframes z{from{transform:scale(1)}to{transform:scale(1.08)}}
</style><div class="f"></div>`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: W, height: H }, recordVideo: { dir: TMP, size: { width: W, height: H } } });
const page = await ctx.newPage();
await page.setContent(html);
await page.waitForTimeout((SECONDS + 0.5) * 1000);
await page.close();
await ctx.close();
await browser.close();

const raw = fs.readdirSync(TMP).find((f) => f.endsWith('.webm'));
const rawPath = path.join(TMP, raw);
// trim the first second (page warm-up frames) without re-encoding
const ffmpeg = path.join(process.env.LOCALAPPDATA, 'ms-playwright', fs.readdirSync(path.join(process.env.LOCALAPPDATA, 'ms-playwright')).find((d) => d.startsWith('ffmpeg')), 'ffmpeg-win64.exe');
fs.mkdirSync(path.dirname(OUT), { recursive: true });
try {
  execFileSync(ffmpeg, ['-y', '-hide_banner', '-loglevel', 'error', '-ss', '1', '-i', rawPath, '-c', 'copy', '-an', OUT]);
} catch (e) {
  console.warn('trim failed, using raw recording:', e.message);
  fs.copyFileSync(rawPath, OUT);
}
const size = fs.statSync(OUT).size;
console.log(`wrote ${path.relative(ROOT, OUT)}: ${(size / 1024 / 1024).toFixed(2)} MB (${size} bytes)`);
if (size > 4 * 1024 * 1024) { console.error('ERROR: hero video exceeds 4 MB'); process.exit(1); }

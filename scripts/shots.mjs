// Phase-review screenshots of the built site. Usage:
//   node scripts/shots.mjs            → every page at 390 / 820 / 1440, full page → design/qa/
//   node scripts/shots.mjs hero       → hero fold at 1440 + 1024, animation frames with/without reduced motion
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { start } from './serve.mjs';

const OUT = path.resolve(import.meta.dirname, '..', 'design', 'qa');
fs.mkdirSync(OUT, { recursive: true });
const PORT = 4174;
const server = await start(PORT);
const base = `http://localhost:${PORT}`;
const mode = process.argv[2] || 'pages';
const browser = await chromium.launch();

const pages = fs.readdirSync(path.resolve(import.meta.dirname, '..', 'dist'), { recursive: true })
  .filter((f) => f.endsWith('.html')).map((f) => f.split(path.sep).join('/'))
  .filter((f) => !process.argv[3] || f.includes(process.argv[3]));

if (mode === 'pages') {
  for (const width of [390, 820, 1440]) {
    const ctx = await browser.newContext({ viewport: { width, height: width < 500 ? 844 : 900 }, deviceScaleFactor: 1, isMobile: width < 500, hasTouch: width < 500 });
    for (const p of pages) {
      const page = await ctx.newPage();
      await page.goto(`${base}/${p}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(4500); // let the hero animation finish
      const name = p.replace(/\/?index\.html$/, '') || 'home';
      await page.screenshot({ path: path.join(OUT, `${name.replace(/\//g, '_')}-${width}.png`), fullPage: true });
      console.log('shot', name, width);
      await page.close();
    }
    await ctx.close();
  }
}

if (mode === 'hero') {
  for (const width of [1440, 1024]) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${base}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(7000);
    await page.screenshot({ path: path.join(OUT, `hero-${width}.png`) });
    await page.close(); await ctx.close();
  }
  // animation frames, motion allowed
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
    const page = await ctx.newPage();
    await page.goto(`${base}/`, { waitUntil: 'domcontentloaded' });
    const t0 = Date.now();
    for (const at of [300, 1200, 2000, 3000]) {
      await page.waitForTimeout(Math.max(0, at - (Date.now() - t0)));
      await page.screenshot({ path: path.join(OUT, `hero-anim-${String(at).padStart(4, '0')}ms.png`), clip: { x: 800, y: 250, width: 640, height: 600 } });
    }
    const playing = await page.evaluate(() => { const v = document.querySelector('[data-hero-video]'); return v ? { src: v.currentSrc, playing: !v.paused && !v.ended && v.readyState > 2 } : null; });
    console.log('video', playing);
    await page.close(); await ctx.close();
  }
  // reduced motion
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(`${base}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT, `hero-reduced-motion-0300ms.png`), clip: { x: 800, y: 250, width: 640, height: 600 } });
    const v = await page.evaluate(() => { const v = document.querySelector('[data-hero-video]'); return v ? { hasSource: !!v.querySelector('source'), paused: v.paused } : null; });
    console.log('reduced-motion video', v);
    await page.close(); await ctx.close();
  }
}

await browser.close();
server.close();

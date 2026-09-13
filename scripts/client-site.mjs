// Captures the client's previous website (their own content, usable as source material) into research/client-site/.
import { chromium } from 'playwright';
import fs from 'node:fs'; import path from 'node:path';
const OUT = path.resolve('research/client-site'); fs.mkdirSync(OUT, { recursive: true });
const ORIGIN = 'https://caimanautomation.com';
const b = await chromium.launch({ channel: 'chrome' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36' });
const page = await ctx.newPage();
await page.goto(ORIGIN + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
const links = await page.evaluate((o) => [...new Set([...document.querySelectorAll('a[href]')].map(a => a.href).filter(h => h.startsWith(o) && !h.match(/\.(jpg|png|pdf|zip)$/i) && !h.includes('#')))], ORIGIN);
const targets = [ORIGIN + '/', ...links.filter(l => l !== ORIGIN + '/' && l !== ORIGIN)].slice(0, 20);
const all = [];
for (const url of targets) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(800);
    const slug = (new URL(url).pathname.replace(/^\/|\/$/g, '') || 'home').replace(/[^\w-]+/g, '_');
    await page.screenshot({ path: path.join(OUT, slug + '.png'), fullPage: true });
    const data = await page.evaluate(() => {
      const txt = el => (el.innerText || '').replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
      return { title: document.title, description: document.querySelector('meta[name=description]')?.content || '', h1: [...document.querySelectorAll('h1')].map(txt), headings: [...document.querySelectorAll('h2,h3')].map(txt).filter(Boolean), text: txt(document.body), images: [...document.images].filter(i => i.naturalWidth > 300).map(i => ({ src: i.currentSrc, alt: i.alt, w: i.naturalWidth, h: i.naturalHeight })).slice(0, 40), mailto: [...document.querySelectorAll('a[href^="mailto:"]')].map(a => a.href), tel: [...document.querySelectorAll('a[href^="tel:"]')].map(a => a.href) };
    });
    all.push({ url, slug, ...data });
    fs.writeFileSync(path.join(OUT, slug + '.txt'), `# ${data.title}\n${url}\n\n${data.text}\n`);
    console.log('ok', url, data.text.length, 'chars');
  } catch (e) { console.log('ERR', url, e.message.split('\n')[0]); }
}
fs.writeFileSync(path.join(OUT, 'pages.json'), JSON.stringify(all, null, 2));
await b.close();

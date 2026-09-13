// Phase 0 benchmark capture. Run: node scripts/benchmark.mjs
// Screenshots each reference site at 1440px and 390px (viewport + full page)
// and records structural facts (title, h1, nav, CTAs, fonts, colors, video, timing)
// into research/benchmark-data.json. Nothing here copies content into the site.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('research/screens');
fs.mkdirSync(OUT, { recursive: true });

const SITES = [
  { id: 'acc', name: 'Advanced Control Corp', pages: [
    ['home', 'https://www.advancedcontrolcorp.com/'],
    ['solutions', 'https://www.advancedcontrolcorp.com/solutions/'],
    ['services', 'https://www.advancedcontrolcorp.com/services/'] ] },
  { id: 'jci', name: 'Johnson Controls', pages: [
    ['home', 'https://www.johnsoncontrols.com/'],
    ['solutions', 'https://www.johnsoncontrols.com/openblue', 'https://www.johnsoncontrols.com/building-automation-and-controls'] ] },
  { id: 'siemens', name: 'Siemens Smart Infrastructure', pages: [
    ['home', 'https://www.siemens.com/global/en/products/buildings.html'],
    ['solutions', 'https://www.siemens.com/global/en/products/buildings/building-x.html', 'https://www.siemens.com/global/en/products/buildings/automation.html', 'https://www.siemens.com/global/en/products/buildings/digital-building-lifecycle.html'] ] },
  { id: 'se', name: 'Schneider Electric', pages: [
    ['home', 'https://www.se.com/us/en/'],
    ['solutions', 'https://www.se.com/us/en/work/campaign/innovation/buildings.jsp', 'https://www.se.com/us/en/work/solutions/for-business/buildings.jsp', 'https://www.se.com/us/en/product-category/1200-building-management-system/', 'https://www.se.com/us/en/work/products/building-management/'] ] },
  { id: 'honeywell', name: 'Honeywell Building Automation', pages: [
    ['home', 'https://buildings.honeywell.com/us/en'],
    ['solutions', 'https://buildings.honeywell.com/us/en/products/by-category/building-management', 'https://buildings.honeywell.com/us/en/brands/our-brands/building-management-systems', 'https://buildings.honeywell.com/us/en/solutions'] ] },
  { id: 'trane', name: 'Trane Commercial', pages: [
    ['home', 'https://www.trane.com/commercial/north-america/us/en.html'],
    ['solutions', 'https://www.trane.com/commercial/north-america/us/en/products-systems/building-management-systems.html', 'https://www.trane.com/commercial/north-america/us/en/products-systems/controls-and-building-automation.html', 'https://www.trane.com/commercial/north-america/us/en/products-systems/building-automation-systems.html', 'https://www.trane.com/commercial/north-america/us/en/controls.html', 'https://www.trane.com/commercial/north-america/us/en/products-systems.html'] ] },
  { id: 'crestron', name: 'Crestron', pages: [
    ['home', 'https://www.crestron.com/'],
    ['solutions', 'https://www.crestron.com/Products/Featured-Solutions/Crestron-Home'] ] },
  { id: 'lutron', name: 'Lutron', pages: [
    ['home', 'https://www.lutron.com/en-US/pages/default.aspx'],
    ['solutions', 'https://www.lutron.com/en-US/Residential-Commercial-Solutions/Pages/Commercial-Solutions/Commercial-Solutions.aspx'] ] },
];

const VIEWPORTS = [ ['1440', { width: 1440, height: 900 }], ['390', { width: 390, height: 844 }] ];

const extract = () => {
  const txt = el => (el?.innerText || el?.textContent || '').replace(/\s+/g, ' ').trim();
  const vis = el => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none'; };
  const nav = [...document.querySelectorAll('header a, nav a')].filter(vis).map(txt).filter(t => t && t.length < 40);
  const h1s = [...document.querySelectorAll('h1')].map(txt).filter(Boolean);
  const h2s = [...document.querySelectorAll('h2')].map(txt).filter(Boolean).slice(0, 30);
  const ctas = [...document.querySelectorAll('a,button')].filter(vis).map(txt).filter(t => /(contact|quote|consult|demo|learn|explore|get started|talk|request|find|discover|start|see|watch|shop|sales)/i.test(t) && t.length < 45);
  const fonts = {}; const colors = {};
  for (const el of document.querySelectorAll('h1,h2,h3,p,a,button,li')) {
    if (!vis(el)) continue; const s = getComputedStyle(el);
    const f = s.fontFamily.split(',')[0].replace(/["']/g, '').trim(); fonts[f] = (fonts[f] || 0) + 1;
    for (const c of [s.color, s.backgroundColor]) if (c && !c.includes('0, 0, 0, 0')) colors[c] = (colors[c] || 0) + 1;
  }
  const top = o => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, 8).map(e => e[0]);
  const h1 = document.querySelector('h1');
  const h1Style = h1 ? (s => ({ family: s.fontFamily.split(',')[0], size: s.fontSize, weight: s.fontWeight, lineHeight: s.lineHeight }))(getComputedStyle(h1)) : null;
  const videos = [...document.querySelectorAll('video')].map(v => ({ src: v.currentSrc || v.src || [...v.querySelectorAll('source')].map(s => s.src).join('|'), autoplay: v.autoplay, muted: v.muted, poster: v.poster, w: v.getBoundingClientRect().width, h: v.getBoundingClientRect().height }));
  const imgs = [...document.images].filter(vis).length;
  const nav_t = performance.getEntriesByType('navigation')[0];
  const res = performance.getEntriesByType('resource');
  const bytes = res.reduce((a, r) => a + (r.transferSize || 0), 0);
  const trust = txt(document.body).match(/\b(\d{2,3}\+?\s*(years|projects|buildings|countries|customers|clients)|since\s+\d{4}|certified|licensed|ISO\s?\d+|award)\b/gi) || [];
  return { title: document.title, description: document.querySelector('meta[name=description]')?.content || '', h1s, h1Style, h2s, nav: [...new Set(nav)].slice(0, 40), ctas: [...new Set(ctas)].slice(0, 20), fonts: top(fonts), colors: top(colors), videos, imgs, requests: res.length, transferKB: Math.round(bytes / 1024), domContentLoadedMs: nav_t ? Math.round(nav_t.domContentLoadedEventEnd) : null, loadMs: nav_t ? Math.round(nav_t.loadEventEnd) : null, trust: [...new Set(trust.map(t => t.toLowerCase()))].slice(0, 15), docHeight: document.documentElement.scrollHeight };
};

const ONLY = process.argv.slice(2);
const browser = await chromium.launch({ channel: process.env.CHANNEL || undefined, headless: process.env.HEADED ? false : true });
const data = [];
for (const site of SITES) {
  if (ONLY.length && !ONLY.includes(site.id)) continue;
  for (const [pageId, ...urls] of site.pages) {
    let url = urls[0];
    for (const [vpId, vp] of VIEWPORTS) {
      const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, isMobile: vp.width < 500, hasTouch: vp.width < 500, userAgent: vp.width < 500 ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', locale: 'en-US' });
      const page = await ctx.newPage();
      const rec = { site: site.id, name: site.name, page: pageId, viewport: vpId, url };
      const t0 = Date.now();
      try {
        let resp;
        for (const u of urls) { url = u; resp = await page.goto(u, { waitUntil: 'domcontentloaded', timeout: 45000 }); rec.url = u; if (!resp || resp.status() < 400) break; }
        rec.status = resp?.status(); rec.finalUrl = page.url();
        await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
        rec.wallMs = Date.now() - t0;
        // dismiss common cookie banners
        for (const sel of ['#onetrust-accept-btn-handler', 'button:has-text("Accept All")', 'button:has-text("Accept all")', 'button:has-text("Accept")', 'button:has-text("I agree")', '[aria-label="Close"]']) {
          const b = page.locator(sel).first(); if (await b.isVisible({ timeout: 300 }).catch(() => false)) { await b.click({ timeout: 2000 }).catch(() => {}); break; }
        }
        await page.waitForTimeout(1500);
        const base = `${site.id}-${pageId}-${vpId}`;
        await page.screenshot({ path: path.join(OUT, `${base}-fold.png`) });
        // scroll to trigger lazy content, then full page
        await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); });
        await page.waitForTimeout(800);
        await page.screenshot({ path: path.join(OUT, `${base}-full.png`), fullPage: true }).catch(async e => { rec.fullErr = e.message; });
        Object.assign(rec, await page.evaluate(extract));
        console.log('ok ', base, rec.status, rec.wallMs + 'ms', rec.transferKB + 'KB');
      } catch (e) { rec.error = e.message.split('\n')[0]; console.log('ERR', site.id, pageId, vpId, rec.error); }
      data.push(rec);
      await ctx.close();
    }
  }
}
await browser.close();
const prevPath = 'research/benchmark-data.json';
let prev = fs.existsSync(prevPath) ? JSON.parse(fs.readFileSync(prevPath, 'utf8')) : [];
const key = r => `${r.site}-${r.page}-${r.viewport}`;
const merged = [...prev.filter(r => !data.some(n => key(n) === key(r))), ...data];
fs.writeFileSync(prevPath, JSON.stringify(merged, null, 2));
console.log('wrote research/benchmark-data.json');

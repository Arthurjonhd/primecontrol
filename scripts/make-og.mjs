// Renders src/assets/img/og-image.jpg (1200×630) from the brand tokens. Usage: node scripts/make-og.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const brand = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/partials/brand.json'), 'utf8'));
const font = fs.readFileSync(path.join(ROOT, 'src/assets/fonts/archivo-variable-latin.woff2')).toString('base64');
const poster = fs.readFileSync(path.join(ROOT, 'src/assets/img/hero/miami-night-1280.jpg')).toString('base64');
const html = `<!doctype html><style>
@font-face{font-family:Archivo;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-stretch:62% 125%}
html,body{margin:0;width:1200px;height:630px;overflow:hidden;font-family:Archivo,Arial,sans-serif;color:#fff}
.bg{position:absolute;inset:0;background:url(data:image/jpeg;base64,${poster}) center/cover}
.scrim{position:absolute;inset:0;background:linear-gradient(90deg,rgb(21 36 59/.92) 0%,rgb(21 36 59/.75) 55%,rgb(21 36 59/.35) 100%)}
.c{position:absolute;left:72px;right:72px;top:64px;bottom:64px;display:flex;flex-direction:column;justify-content:space-between}
.brand{display:flex;align-items:center;gap:14px;font-stretch:112%;font-weight:600;font-size:30px;letter-spacing:-.01em}
h1{margin:0;font-stretch:112%;font-weight:600;font-size:72px;line-height:1.02;letter-spacing:-.015em;max-width:14ch}
p{margin:18px 0 0;font-size:28px;color:rgb(255 255 255/.75);max-width:30ch;line-height:1.3}
</style><div class="bg"></div><div class="scrim"></div><div class="c">
<div class="brand"><svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#fff" stroke-width="1.5"><rect x="1.5" y="1.5" width="21" height="21" rx="1.5"/><line x1="1.5" y1="12" x2="22.5" y2="12"/><rect x="13" y="8.5" width="4" height="7" rx="1" fill="#7CC4FF" stroke="none"/></svg>${brand.name}</div>
<div><h1>One interface for every system in your building.</h1><p>${brand.descriptor}.</p></div></div>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html); await p.waitForTimeout(400);
const out = path.join(ROOT, 'src/assets/img/og-image.jpg');
await p.screenshot({ path: out, type: 'jpeg', quality: 82 });
await b.close();
console.log('wrote', path.relative(ROOT, out), fs.statSync(out).size, 'bytes');

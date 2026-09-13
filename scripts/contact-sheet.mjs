// Builds one compact contact sheet PNG per site from the captured screenshots (review aid only).
import { chromium } from 'playwright';
import fs from 'node:fs'; import path from 'node:path';
const dir = path.resolve('research/screens'); const out = path.resolve('research/sheets'); fs.mkdirSync(out, { recursive: true });
const sites = ['acc','jci','siemens','se','honeywell','trane','crestron','lutron'];
const b = await chromium.launch();
for (const s of sites) {
  const files = fs.readdirSync(dir).filter(f => f.startsWith(s + '-')).sort();
  const full1440 = files.filter(f => f.includes('-1440-full')); const full390 = files.filter(f => f.includes('-390-full')); const rest = files.filter(f => !f.includes('-full'));
  const img = (f, w) => `<figure style="margin:0"><img src="../screens/${f}" style="width:${w}px;display:block;border:1px solid #999"><figcaption style="font:11px sans-serif">${f}</figcaption></figure>`;
  const html = `<body style="margin:8px;background:#eee;font-family:sans-serif"><h2 style="margin:0 0 8px;font-size:16px">${s}</h2><div style="display:flex;gap:10px;align-items:flex-start">${full1440.map(f => img(f, 420)).join('')}${full390.map(f => img(f, 150)).join('')}<div style="display:flex;flex-direction:column;gap:8px">${rest.map(f => img(f, 300)).join('')}</div></div></body>`;
  const p = await b.newPage({ viewport: { width: 1800, height: 1000 } });
  const hp = path.join(out, s + '.html'); fs.writeFileSync(hp, html); await p.goto('file:///' + hp.split(path.sep).join('/')); await p.waitForTimeout(800);
  await p.screenshot({ path: path.join(out, s + '.png'), fullPage: true }); await p.close();
  console.log('sheet', s);
}
await b.close();

// Lighthouse for the built site. Usage: node scripts/lighthouse.mjs [path ...]   (default: / and /solutions/building-automation/)
// Writes design/qa/lighthouse-<name>-<mobile|desktop>.{html,json} and prints the four scores.
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
const run = promisify(execFile);
import { start } from './serve.mjs';

const OUT = path.resolve(import.meta.dirname, '..', 'design', 'qa');
fs.mkdirSync(OUT, { recursive: true });
const PORT = 4177;
const server = await start(PORT);
const targets = process.argv.slice(2).length ? process.argv.slice(2) : ['/', '/solutions/building-automation/'];
const lh = path.resolve(import.meta.dirname, '..', 'node_modules', 'lighthouse', 'cli', 'index.js');
const rows = [];
for (const t of targets) {
  const name = t === '/' ? 'home' : t.replace(/^\/|\/$/g, '').replace(/\//g, '_');
  for (const form of ['mobile', 'desktop']) {
    const base = path.join(OUT, `lighthouse-${name}-${form}`);
    const args = [lh, `http://localhost:${PORT}${t}`, '--output=json', '--output=html', `--output-path=${base}`, '--quiet',
      '--chrome-flags=--headless=new --no-sandbox', '--only-categories=performance,accessibility,best-practices,seo'];
    if (form === 'desktop') args.push('--preset=desktop');
    // chrome-launcher often fails to delete its temp profile on Windows (EPERM) after the report is written; tolerate that.
    // async so the in-process static server keeps answering while Lighthouse runs
    try { await run(process.execPath, args, { maxBuffer: 64 * 1024 * 1024 }); } catch (e) { if (!fs.existsSync(`${base}.report.json`)) { console.error('lighthouse failed for', t, form, String(e.stderr).slice(-400)); continue; } }
    const json = JSON.parse(fs.readFileSync(`${base}.report.json`, 'utf8'));
    const c = json.categories;
    const s = (k) => Math.round(c[k].score * 100);
    rows.push({ page: t, form, performance: s('performance'), accessibility: s('accessibility'), 'best-practices': s('best-practices'), seo: s('seo'), LCP: json.audits['largest-contentful-paint'].displayValue, CLS: json.audits['cumulative-layout-shift'].displayValue, bytes: Math.round(json.audits['total-byte-weight'].numericValue / 1024) + ' KB' });
  }
}
console.table(rows);
fs.writeFileSync(path.join(OUT, 'lighthouse-summary.json'), JSON.stringify(rows, null, 2));
server.close();

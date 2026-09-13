// Build: src/ → dist/. Injects partials, brand tokens and page metadata; copies assets;
// writes sitemap.xml, robots.txt and .nojekyll. No bundling, no transforms of CSS/JS.
// Usage: node scripts/build.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const brand = JSON.parse(fs.readFileSync(path.join(SRC, 'partials', 'brand.json'), 'utf8'));
const site = { url: brand.siteUrl.replace(/\/$/, '') };

const partials = {};
for (const f of fs.readdirSync(path.join(SRC, 'partials'))) {
  if (f.endsWith('.html')) partials[f.replace(/\.html$/, '')] = fs.readFileSync(path.join(SRC, 'partials', f), 'utf8');
}

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
  const p = path.join(dir, d.name);
  if (d.isDirectory()) return d.name === 'partials' || d.name === 'assets' ? [] : walk(p);
  return d.name.endsWith('.html') ? [p] : [];
});

const get = (obj, key) => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);

function render(src, ctx, depth = 0) {
  if (depth > 5) throw new Error('partial recursion');
  let out = src.replace(/\{\{>\s*([\w-]+)\s*\}\}/g, (_, name) => {
    if (!partials[name]) throw new Error(`Unknown partial: ${name}`);
    return render(partials[name], ctx, depth + 1);
  });
  out = out.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (m, key) => {
    const v = get(ctx, key);
    if (v === undefined) throw new Error(`Unknown token ${m} in ${ctx.page.file}`);
    return String(v);
  });
  return out;
}

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });
fs.cpSync(path.join(SRC, 'assets'), path.join(DIST, 'assets'), { recursive: true });
// never ship internal notes
for (const f of walk(path.join(DIST, 'assets')).concat()) { /* html in assets is not expected */ }
fs.rmSync(path.join(DIST, 'assets', 'img', 'CREDITS.md'), { force: true });

const pages = [];
for (const file of walk(SRC)) {
  const rel = path.relative(SRC, file).split(path.sep).join('/');
  const raw = fs.readFileSync(file, 'utf8');
  const m = raw.match(/<!--\s*page\s*(\{[\s\S]*?\})\s*-->/);
  if (!m) throw new Error(`Missing <!--page {...}--> block in ${rel}`);
  const page = JSON.parse(m[1]);
  page.file = rel;
  const depth = rel.split('/').length - 1;
  const root = '../'.repeat(depth);
  const urlPath = page.path ?? ('/' + rel.replace(/index\.html$/, ''));
  page.path = urlPath;
  let html = render(raw.replace(m[0], ''), { brand, site, page, root });
  if (page.nav) html = html.replace(new RegExp(`(<a [^>]*data-nav="${page.nav}")`), '$1 aria-current="page"');
  html = html.replace(/ data-nav="[\w-]+"/g, '');
  const out = path.join(DIST, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  if (!page.noindex) pages.push({ loc: site.url + urlPath, priority: page.priority ?? (depth === 0 ? '1.0' : '0.7') });
  console.log('built', rel);
}

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages.map((p) => `  <url><loc>${p.loc}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`).join('\n') +
  `\n</urlset>\n`);
fs.writeFileSync(path.join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`);
fs.writeFileSync(path.join(DIST, '.nojekyll'), '');
console.log(`\n${pages.length} pages → dist/`);

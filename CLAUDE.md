# Prime Control — marketing website (v1)

## Purpose
Static marketing site for a building automation and control-systems integrator in South Florida
(BMS/BAS, Lutron lighting & shading, Crestron automation, access control & CCTV, energy monitoring,
indoor air quality, service & support). Audience: property managers, HOA boards, developers,
architects/engineers, luxury homeowners.

## Stack rules (non-negotiable)
- Plain HTML5 + ONE CSS file (`src/assets/css/main.css`, custom properties) + vanilla JS (`src/assets/js/main.js`).
- No frameworks, no CSS/JS libraries, no external CDNs. Self-hosted fonts or system stacks only.
- Source pages live in `src/`. Header and footer are partials in `src/partials/`.
  `node scripts/build.mjs` injects the partials and brand tokens into every page and writes the final
  site to `dist/`. `dist/` is committed and is the deploy target. Never hand-edit `dist/`; never hand-edit
  the header/footer inside a page — edit the partial and rebuild.
- Every page: unique `<title>` + meta description, Open Graph, canonical, one `<h1>`, semantic landmarks.
- Mobile-first, 360px → 1920px. Lighthouse ≥ 90 across the board on Home and one Solutions page.
- Motion budget: the Home hero only. Everything else static or user-triggered. Honour `prefers-reduced-motion`.
- Deployable as-is to any static host: relative paths, `index.html` per folder.

## Brand name variable
The legal name is not final ("Prime Control" / "Prime Control Systems" / "Prime Control Corp").
The name lives in ONE place: `src/partials/brand.json` (`name`, `shortName`, `legalName`). The build script
replaces `{{brand.name}}` / `{{brand.legalName}}` tokens in every page and partial. Do not hard-code the name.

## Placeholders (must stay visibly marked until the client provides real data)
`[PHONE]`, `[EMAIL]`, `[ADDRESS]`, `[FL LICENSE #]`, `[WEB3FORMS_KEY]`, `[DOMAIN]`, placeholder logo/wordmark (SVG),
placeholder project tiles, hidden testimonials block, placeholder map embed, service-area list (Miami,
Fort Lauderdale, Palm Beach — confirm with client). Full list in `TODO.md`.

## Content rules
- NEVER copy sentences, headlines, images or video from competitor or reference sites. `research/` is for
  structure and hierarchy only. All copy is original.
- No invented statistics, years in business, project counts or testimonials.
- All text lives in HTML (no text in images) so a Spanish version can be added later.
- Florida requires contractor license numbers on advertising: keep the `[FL LICENSE #]` slot in the footer.
- Solutions are grouped BY SYSTEM in navigation, URLs and page titles (BMS, Lutron lighting & shading,
  Crestron automation, access control & video, energy, air quality, service). The customer OUTCOME is the
  first sentence of every solution block and every solution page. Do not regroup by outcome.
- Brand marks in the trust bar stay as plain-text wordmarks until the client confirms authorized-dealer
  status for Lutron, Crestron and Trane. Licensed logos are a blocker logged in `TODO.md`.

## Process
- Work in phases (0 research → 1 design plan → 2 Home → 3 inner pages → QA).
- Stop at the end of every phase: summarize, and show screenshots at 390 / 820 / 1440 before continuing.
- Commit after each phase with a clear message. Keep `CHANGELOG.md` and `TODO.md` current.

## Publishing
- `research/` and `design/` are internal. They must never be deployed or served: they live outside `src/`,
  the build never copies them into `dist/`, and `.deployignore` / host config excludes them explicitly.
- The repo stays private until the client approves the site (see `TODO.md`).

## Media and images
- Client videos go to `design/source/` (never deployed); `node scripts/encode-video.mjs <mp4> <name> [MB] [posterSec]`
  writes `src/assets/video/<name>.webm` (VP9, under budget) and posters to `src/assets/img/video/`.
- Generated/supplied photos: `node scripts/prep-image.mjs <file> <name>` → `src/assets/img/photos/<name>-*`.
  The prompts and file names every slot expects are in `design/image-brief.md`.
- Media bands (`src/partials/band-*.html`) are fixed-background sections; add one per page between content sections.

## Layout
```
src/                  source pages (index.html, solutions/<slug>/index.html, markets/, about/, contact/, privacy/, 404.html)
src/partials/         header.html, footer.html, head.html, brand.json
src/assets/{css,js,img,video,fonts}
scripts/              build.mjs (src → dist), benchmark.mjs, screenshot/QA scripts
dist/                 built site — deploy target (committed)
research/             Phase 0 benchmarks — internal, never deployed
design/               Phase 1 plan + tokens — internal, never deployed
```

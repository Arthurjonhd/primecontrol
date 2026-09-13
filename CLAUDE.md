# Prime Control — marketing website (v1)

## Purpose
Static marketing site for a building automation and control-systems integrator in South Florida
(BMS/BAS, Lutron lighting & shading, Crestron automation, access control & CCTV, energy monitoring,
indoor air quality, service & support). Audience: property managers, HOA boards, developers,
architects/engineers, luxury homeowners.

## Stack rules (non-negotiable)
- Plain HTML5 + ONE CSS file (`assets/css/main.css`, custom properties) + vanilla JS (`assets/js/main.js`).
- No frameworks, no CSS/JS libraries, no build step required to view the site.
- Header and footer are partials in `partials/`; `node scripts/build.mjs` injects them into every page.
  Never hand-edit the header/footer inside a page — edit the partial and rebuild.
- Self-hosted fonts or system stacks only. No external CDNs.
- Every page: unique `<title>` + meta description, Open Graph, canonical, one `<h1>`, semantic landmarks.
- Mobile-first, 360px → 1920px. Lighthouse ≥ 90 across the board on Home and one Solutions page.
- Motion budget: the Home hero only. Everything else static or user-triggered. Honour `prefers-reduced-motion`.
- Deployable as-is to any static host: relative paths, `index.html` per folder.

## Brand name variable
The legal name is not final ("Prime Control" / "Prime Control Systems" / "Prime Control Corp").
The name lives in ONE place: `partials/brand.json` (`name`, `shortName`, `legalName`). The build script
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

## Layout
`/assets/{css,js,img,video}`, `/partials`, `/solutions/<slug>/index.html`, `/markets`, `/about`, `/contact`,
`/privacy`, `/research`, `/design`, `/scripts`. Keep `CHANGELOG.md` and `TODO.md` current; commit after each phase.

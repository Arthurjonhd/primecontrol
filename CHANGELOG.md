# Changelog

## Phase 0 — Benchmark research (2026-09-13)
- Playwright capture script (`scripts/benchmark.mjs`) for 8 reference sites at 1440 px and 390 px, home + one solutions page.
- Lutron captured through the real Chrome session (bot protection blocks scripted browsers); desktop only.
- `research/benchmarks.md` with per-site notes, cross-site patterns, "What we take from each" and "What we deliberately do differently".
- `research/benchmark-data.json`, `research/screens/`, `research/sheets/` (contact sheets).
- Project hygiene: `CLAUDE.md`, `TODO.md`, `.gitignore`.

## Phase 0 review fixes (2026-09-13)
- benchmarks.md: no typography taken from Trane (Inter not adopted); Siemens is a palette reference only and the layered-building illustration will be original; added the "group by system, lead with outcome" rule.
- CLAUDE.md: src/ → scripts/build.mjs → dist/ (committed, deploy target); text-only wordmarks until dealer status is confirmed; Process and Publishing sections; research/ and design/ never deployed.
- TODO.md: dealer-status and private-repo blockers.

## Phase 1 — Design system and plan (2026-09-13)
- `design/plan.md`: 6 colour tokens with computed AA contrast table, Archivo (width axis) + B612 typography with justification and 8-step fluid type scale, ASCII wireframes for Home (desktop + mobile), a Solutions page and Contact, original layered-building illustration spec, provisional wordmark spec, motion policy (hero only), content principles, and a review-against-the-brief table of template defaults replaced.
- ui-ux-pro-max design-system output consulted and rejected (documented in plan §6).

## Phase 1 review fixes (2026-09-13)
- Hero headline shortened to "One interface for every system in your building." with a 24ch measure and a 42→64 px scale step so the text and wireframe agree.
- Middle dots removed from all wireframes; plan states the build uses rules and spacing, never "·".
- §3.6: the "one interface" node is the Home & commercial automation (Crestron) family; all seven families are in the hero story.
- Business commitments moved to TODO.md under "Claims the client must confirm".

## Phase 2 — Home page (2026-09-13)
- Build pipeline: `src/` → `scripts/build.mjs` → `dist/` (partials, brand tokens, per-page metadata, sitemap.xml, robots.txt, .nojekyll). `dist/` is committed and is the deploy target.
- Partials: head (meta, OG, canonical, JSON-LD HomeAndConstructionBusiness), header (flat nav, phone, CTA, mobile panel with focus trap), footer (nav, contact placeholders, service area, license slot, photo credit), consult (band + Web3Forms form with honeypot, validation, plain-language success/error).
- `src/assets/css/main.css`: tokens from the plan, Archivo (width axis) + B612 self-hosted, fluid type scale, all Home sections.
- Home hero: graded CC BY-SA aerial poster (AVIF/WebP/JPEG at 768/1280/1920), 1.38 MB WebM push-in clip loaded only on desktop without reduced-motion or data-saver, original SVG layer diagram animating once (~2.8 s) on desktop, static on mobile and under reduced motion.
- Hero headline restructured to span the full width on desktop so it sets as two lines at 1440 and 1024 (plan updated).
- QA scripts: `scripts/shots.mjs` (390/820/1440 full pages, hero frames with and without reduced motion), `scripts/lighthouse.mjs` (mobile + desktop), `scripts/make-og.mjs`, `scripts/make-hero-video.mjs`.
- Lighthouse Home: mobile 98 / 100 / 100 / 100, desktop 100 / 100 / 100 / 100 (performance / accessibility / best practices / SEO). CLS 0. Home weight 203 KB mobile; 1.7 MB desktop including the 1.38 MB clip.

## Home review fixes + client requests (2026-09-13)
- Diagram: full-page captures (and any viewport re-emulation, e.g. tablet rotation across 1024 px) restarted the CSS animation, leaving the layers invisible. JS now adds `is-done` after the sequence so the finished state is pinned and can never replay.
- Mobile diagram: last label shortened to "HVAC and BMS"; at 360 px the labels end 60 px inside the viewport.
- Mobile header: phone icon (`tel:` link, 44 px target) between the wordmark and the menu button below 1024 px.
- Home header: `.js.home` selector fixed to `.js .home`, so the header is actually fixed and turns white on scroll.
- Hero media: client drone footage (`design/source/drone.mp4`, never deployed) encoded to `src/assets/video/hero-drone.webm` (10 s, 1280×720, VP9, 3.74 MB) via Chrome MediaRecorder; posters from the 4.5 s frame. Placeholder aerial, its credit line and CREDITS entry removed.
- Pinned hero (client request): hero is `position: sticky`, sections slide over it on scroll; video pauses once covered. Documented in plan §4 addendum.
- TODO.md: "Strings to remove before launch" table with file and line; hero still request logged.
- Client's previous site (caimanautomation.com) captured to `research/client-site/` as source material for About, Contact and Solutions (their own content, adapted, not copied verbatim).
- Lighthouse Home after changes: mobile 98 / 100 / 100 / 100, desktop 100 / 100 / 100 / 100, CLS 0.

## Phase 3 — Inner pages (2026-09-13)
- `scripts/gen-solutions.mjs` generates the seven solution pages from one data block (name, outcome, what it is, what we deliver, buildings, related, platform tags) with the layered-building art lit for the relevant layer; `scripts/solutions.json` is its summary.
- Pages: `/solutions/` index, seven `/solutions/<slug>/`, `/markets/` (anchored sections), `/about/`, `/contact/`, `/privacy/`, `404.html` (noindex, excluded from sitemap).
- About and Contact draw on the client's previous site (research/client-site) rewritten for South Florida: founder, three experience highlights, values. Cited projects flagged for client confirmation.
- Markets: light industrial now mentions control panels (PLC, VFD, remote I/O) from the client's industrial background; Service & support lists panel design and assembly.
- Build: brand tokens inside page titles/descriptions are rendered; `.block`, chips, contact grid and light form-card styles added.
- Gate on /solutions/building-automation/: mobile 99 / 100 / 100 / 100, desktop 100 / 100 / 100 / 100, CLS 0, 161 KB.

## Client direction round 2 (2026-09-13)
- Typeface: Hanken Grotesk replaces Archivo (client asked for Lutron's face; Lutron Sans is proprietary, this is the closest OFL match). B612 unchanged. Plan §2 addendum.
- Hero footage: `design/source/drone2.mp4` → `src/assets/video/hero-drone.webm` (3.68 MB), posters in `src/assets/img/video/`.
- Media bands (`partials/band-bms`, `band-ceiling`, `band-tower`): fixed-background sections revealed on scroll, on Home, Solutions index, every solution page, Markets and About. Videos `band-bms.webm` (2.55 MB) and `band-ceiling.webm` (2.59 MB) load lazily on desktop only; posters elsewhere. `scripts/encode-video.mjs` generalised.
- Markets rebuilt as image tabs (keyboard-operable, hash-linked, no-JS fallback shows all panels); solution rows carry images on Home and Solutions index.
- Building automation page: click-to-load YouTube facade for the BMS demo video (youtube-nocookie, nothing loads until play).
- `design/image-brief.md`: prompts, sizes and file names for every image slot (7 markets, 7 solutions, optional bands); `scripts/prep-image.mjs` prepares delivered images. Interim slots show a marked placeholder.
- Lighthouse: Home mobile 94 / 100 / 100 / 100, desktop 100 / 100 / 100 / 100; building-automation mobile 96 / 100 / 100 / 100, desktop 100 across.

## Video playback fixes (2026-09-13)
- Clips re-encoded as VP8 and remuxed with ffmpeg so the WebM container carries duration and cues (MediaRecorder output has neither): hero 2.64 MB, band-bms 1.93 MB, band-ceiling 1.94 MB. `scripts/encode-video.mjs` takes `CODEC=vp8|vp9` and remuxes automatically.
- Preview server: HTTP Range support (206) and `Cache-Control: no-cache` so re-encoded media is never served stale during review.
- Build: content-hash `?v=` on video, CSS and JS URLs so visitors' caches update when assets change.

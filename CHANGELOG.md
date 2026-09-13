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

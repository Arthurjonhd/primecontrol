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

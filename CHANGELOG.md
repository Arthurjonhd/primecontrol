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

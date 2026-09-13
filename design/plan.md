# Phase 1 — Design system and plan

Internal document. Never deployed. Read `research/benchmarks.md` first; this plan answers it.

The subject is a South Florida integrator that makes every system in a building answer to one interface. The
audience is property managers, HOA boards, developers, engineers and owners of large homes. The page's job
is to make a technical, expensive, long-term purchase feel legible and safe, and to get a consultation
request. Everything below serves that.

The one memorable thing on the site is the hero: an aerial of a building over which the control layers
draw themselves in, one by one. Everything else is quiet.

---

## 1. Colour tokens

Direction from the brief: "control room at night meets Miami architecture". Deep navy/graphite for the
hero and footer, plenty of white, one electric-blue family used only for interaction and system highlights.

| Token | Hex | Role |
|---|---|---|
| `--c-night` | `#15243B` | Base dark. Hero, consultation band, footer, the layered diagram's ground. Also the body-text colour on light surfaces. A real navy, not tinted black. |
| `--c-slate` | `#4E5D73` | Secondary text on light surfaces, form helper text, rules at 30% alpha. Never used on night. |
| `--c-paper` | `#F4F6F9` | Cool off-white for alternating light sections. Deliberately cool; no cream. |
| `--c-white` | `#FFFFFF` | Main light surface, cards on paper, text on night. |
| `--c-signal` | `#0F6BDB` | Accent on light surfaces: links, buttons, focus rings, active states. |
| `--c-signal-light` | `#7CC4FF` | The same accent family lifted for dark surfaces: diagram strokes and labels, links on night, focus ring on night. |

Six tokens. Secondary text on night uses `rgb(255 255 255 / .72)`, never slate. Error and success states
use two utility colours that are not part of the palette (`#B42318` on white, `#0E7A4D` on white) and
appear only inside the form.

Verified WCAG contrast (computed, not estimated):

| Pair | Ratio | Use |
|---|---|---|
| night on white | 15.6 : 1 | body text |
| night on paper | 14.4 : 1 | body text on alternate sections |
| slate on white | 6.7 : 1 | secondary text |
| slate on paper | 6.2 : 1 | secondary text |
| signal on white | 5.1 : 1 | link text, AA |
| signal on paper | 4.7 : 1 | link text, AA |
| white on signal | 5.1 : 1 | primary button label, AA |
| signal-light on night | 8.3 : 1 | diagram labels, links on dark |
| white on night | 15.6 : 1 | hero copy |

Rules: `--c-signal` never appears as a fill for large areas. No gradients except the single vertical
scrim over the hero video (`night` at 0 → 85% alpha) that keeps the copy readable. No glow, no blur.

Why this is not the generic dark-mode look: only three surfaces are dark (hero, consultation band,
footer) and they are navy, not black; the accent is a mid-saturation blue that has to pass AA as text on
white, which rules out neon; the light sections carry most of the page.

---

## 2. Typography

Two families, clearly distinct, each with a job. Both are SIL Open Font License and self-hosted as woff2.
No Inter, no Google Fonts CDN, no system-stack fallback as the design.

### Archivo (variable: weight 100–900, width 62–125) — the editorial voice

Archivo is a grotesque drawn for headlines and signage, with a real width axis. Two widths from one file
give the site its typographic identity without a second family:

- **Headlines** are set at width 112, weight 600, tight leading and slightly negative tracking. The
  extended setting reads as architectural signage and building-lobby lettering, which is where this
  client's customers see type every day. It also fills a wide hero line without going huge.
- **Body and UI** are set at width 100, weights 400/500. Normal width keeps 60–70 characters per line
  readable.

One family, two widths, is the deliberate choice. A single woff2 (roman only, ~110 KB subset) covers
both. No italics are loaded; emphasis is done with weight 500.

### B612 (400, 700, plus italics) — the instrument voice

B612 was designed and tested for aircraft cockpit displays: maximum legibility at small sizes on dark
screens. That is literally a control-room typeface, and it is used only where the text is speaking as the
system rather than as the company:

- labels in the hero layer diagram and the layered-building illustration;
- platform and protocol names (Lutron, Crestron, Trane, BACnet, Modbus, LonWorks, Niagara) wherever they
  appear as tags, including the trust bar's text wordmarks;
- the step numbers in "How we work";
- the placeholder tokens (`[PHONE]`, `[FL LICENSE #]`) so they are impossible to miss in review.

Rule: if the string names a system, protocol, measurement or step number, it is B612. If a human is
speaking, it is Archivo. That rule is the whole justification, and it is what stops B612 from becoming
"a monospace face for small labels", which it is not: it is proportional and reads like an instrument
panel, not like code.

Font budget: Archivo variable roman subset ≈ 110 KB, B612 regular + bold ≈ 60 KB. Total ≈ 170 KB, within
the 1.5 MB Home budget. `font-display: swap` with size-adjusted local fallbacks (`Arial` for Archivo,
`Verdana` for B612) so there is no layout shift.

### Type scale

Base 16 px on mobile rising to 18 px from 1024 px. Ratio 1.25 (major third) on mobile, opening to 1.333
(perfect fourth) on desktop via `clamp()`. Elements of Typographic Style: body leading ≈ 1.5, heads
tighter, measure 45–75 characters.

| Step | Token | Mobile → Desktop | Leading | Use |
|---|---|---|---|---|
| −1 | `--t-small` | 14 → 15 px | 1.5 | captions, form help, footer meta |
| 0 | `--t-body` | 16 → 18 px | 1.55 | body, form fields |
| 1 | `--t-lede` | 19 → 22 px | 1.45 | intro paragraphs, outcome sentences |
| 2 | `--t-h4` | 22 → 26 px | 1.25 | solution names in lists, form legend |
| 3 | `--t-h3` | 27 → 34 px | 1.15 | subsection heads |
| 4 | `--t-h2` | 34 → 46 px | 1.1 | section heads |
| 5 | `--t-h1` | 42 → 60 px | 1.05 | inner-page H1 |
| 6 | `--t-hero` | 42 → 64 px | 1.0 | Home hero H1 only |

Measure: `--measure: 62ch` on all prose; lede 48ch. Hero headline: the text is "One interface for every system in your building." (48 characters) set in a 30ch measure (Archivo at width 112 runs wider than the ch unit suggests) so it breaks as two balanced lines at 1440 ("One interface for every / system in your building.") and stays at two lines down to 1024. On desktop the headline spans the full hero width; the paragraph and buttons sit below it on the left with the layer diagram beside them on the right (the 7 + 5 copy/diagram split alone left only ~600 px for the headline). Verified by screenshot at 1440 and 1024 in Phase 2.
Headline tracking: −0.015em at steps 4–6, 0 elsewhere. B612 labels: 13–15 px, tracking +0.02em, never
all-caps (B612's lowercase is its legible form).

No tracked-out uppercase anywhere. No eyebrow labels. Section heads are sentences ("Every system,
one interface.") and the head carries the section on its own.

---

## 3. Layout concept

Content is left-aligned throughout, including the hero. Nothing is centred except the mobile menu.
Container 1200 px max, 12-column grid, gutters 20 / 32 / 48 px at 360 / 768 / 1280. Section rhythm on a
4 px scale: section padding 64 px mobile → 128 px desktop; intra-section 24 / 40 / 64.

The recurring structural device is the **4 + 8 split**: a short heading and one-sentence framing sit in
the left third, content sits in the right two thirds. That single device, used calmly, replaces card
grids. Where the content really is a list, it is a list with rules, not boxes. Boxes are reserved for
things that are physically tiles: project images and the form card.

Border radius: 6 px on controls (buttons, inputs), 2 px on images and tiles. Nothing else is rounded.
No drop shadows on light sections. Rules are `slate` at 30% alpha, 1 px.

Separators: the build uses rules and spacing to separate items, never the middle dot "·" or any other
typographic joiner. Wherever a wireframe below shows items on one line, they are separated by space in
the drawing and by a rule or a gap in the build.

### 3.1 Home — desktop (1440)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ [mark] Prime Control     Solutions  Markets  About  Contact     [PHONE]  ▐Request a consultation▌ │
├──────────────────────────────────────────────────────────────────────────────────┤
│░░░░░░░░░░░░░░░░░░░░░░░ aerial video / poster, night scrim ░░░░░░░░░░░░░░░░░░░░░░│
│░                                                          ┌───────────────────┐ ░│
│░  One interface for every                                 │  ── Air quality   │ ░│  ← SVG layers draw in
│░  system in your building.                                │  ── Energy        │ ░│    one by one (the
│░                                                          │  ── Access & video│ ░│    only motion moment)
│░  Design, installation, programming and service for       │  ── Lighting/shade│ ░│
│░  HVAC, lighting, shades, access, video, energy and air.  │  ── HVAC (BMS)    │ ░│
│░                                                          │        ▼          │ ░│
│░  ▐Request a consultation▌   See solutions                │   [one interface] │ ░│
│░                                                          └───────────────────┘ ░│
├──────────────────────────────────────────────────────────────────────────────────┤
│ We integrate   Lutron   Crestron   Trane   BACnet   Modbus   LonWorks   Niagara  │  ← text wordmarks, B612,
├──────────────────────────────────────────────────────────────────────────────────┤    overlaps the fold edge
│                                                                                  │
│ Solutions            ┌────────────────────────────────────────────────────────┐ │
│ Grouped by system,   │ Building automation (BMS / BAS)              [night]   │ │  ← one lead tile, dark,
│ because that is how  │ Outcome sentence first.  Mini layered diagram.  Link  │ │    for the anchor system
│ you will search.     └────────────────────────────────────────────────────────┘ │
│                      Lighting & shading (Lutron)      │ Access control & video   │  ← five rows in two
│                      outcome sentence   link          │ outcome sentence   link  │    columns, rules only,
│                      ─────────────────────────────────┼───────────────────────── │    no boxes
│                      Home & commercial automation     │ Energy monitoring        │
│                      ─────────────────────────────────┼───────────────────────── │
│                      Indoor air quality               │ Service & support        │
├──────────────────────────────────────────────────────────────────────────────────┤
│ Buildings we work in      Residential ─────────────────────── one line each      │  ← definition list,
│ (paper section)           Condominiums & HOA ─────────────────────────────────── │    7 rows, no icons
│                           Commercial offices ─────  Hospitality ─── Healthcare … │
├──────────────────────────────────────────────────────────────────────────────────┤
│ How we work                                                                      │
│  1 Design ──── 2 Engineer ──── 3 Install & program ──── 4 Train ──── 5 Service   │  ← numbered because it
│    two lines     two lines      two lines                two lines    two lines  │    IS a sequence
├──────────────────────────────────────────────────────────────────────────────────┤
│ Why one integrator        One contractor for every system   │  Open protocols   │  ← 2×2 text blocks,
│ (paper section)           ─────────────────────────────────┼─────────────────── │    generous space,
│                           A South Florida team              │  Service agreements│    no cards, no stats
├──────────────────────────────────────────────────────────────────────────────────┤
│ Projects   ┌──────────────────────────────┐ ┌──────────────┐                     │  ← one wide tile + two
│            │ [placeholder image]          │ │ [placeholder]│                     │    stacked; clearly
│            │ Project title   [type]       │ ├──────────────┤                     │    marked placeholder
│            └──────────────────────────────┘ │ [placeholder]│                     │
│                                             └──────────────┘                     │
│ (testimonials block: present in markup, hidden until real quotes exist)          │
├──────────────────────────────────────────────────────────────────────────────────┤
│▓▓▓ night band ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓ Talk to an engineer, not a salesperson.     ┌────────────── white form card ──┐▓│
│▓ What happens after you send this:           │ Name        Phone               │▓│
│▓  1 we call within one business day           │ Email       Property type ▾     │▓│
│▓  2 site walk-through                         │ Message                         │▓│
│▓  3 written proposal                          │ ▐Send request▌                  │▓│
│▓ [PHONE]  [EMAIL]                             └─────────────────────────────────┘▓│
├──────────────────────────────────────────────────────────────────────────────────┤
│ footer (night): mark   Solutions list   Company   Contact placeholders           │
│ Service area: Miami   Fort Lauderdale   Palm Beach   all of South Florida        │
│ FL license [FL LICENSE #]   Privacy   social placeholders   © legalName          │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Home — mobile (390)

```
┌──────────────────────┐
│ [mark] Prime Control ☰│  ← phone icon + menu; menu is a full-screen night panel
├──────────────────────┤
│ poster still (no     │
│ video on mobile)     │
│                      │
│ One interface for    │
│ every system in      │
│ your building.       │
│ short paragraph      │
│ ▐Request a consult.▌ │
│ See solutions        │
│ ┌──────────────────┐ │
│ │ layer diagram,   │ │  ← static, all labels visible
│ │ all 5 labels on  │ │
│ └──────────────────┘ │
├──────────────────────┤
│ We integrate         │
│ Lutron  Crestron     │
│ Trane  BACnet …      │  ← wraps to two rows
├──────────────────────┤
│ Solutions            │
│ ┌──────────────────┐ │
│ │ BMS lead tile    │ │
│ └──────────────────┘ │
│ Lighting & shading   │
│ outcome   link       │
│ ───────────────────  │
│ …five rows stacked   │
├──────────────────────┤
│ …sections stack in   │
│ the same order; the  │
│ 4+8 split becomes    │
│ heading over content │
└──────────────────────┘
```

### 3.3 Solutions page (e.g. /solutions/building-automation/) — desktop

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ header (same partial)                                                            │
├──────────────────────────────────────────────────────────────────────────────────┤
│▓ night, short ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│▓ Solutions › Building automation                                                 │
│▓ Building automation (BMS / BAS)                          [small layered figure  │
│▓ Outcome sentence: what changes for the owner, first.      with this layer lit]  │
│▓ ▐Request a consultation▌                                                        │
├──────────────────────────────────────────────────────────────────────────────────┤
│ What it is          │ Two or three plain-language paragraphs. Names the platforms│
│ (sticky label)      │ (Trane, BACnet, Niagara) in B612 tags inline.              │
├─────────────────────┼────────────────────────────────────────────────────────────┤
│ What we deliver     │ • HVAC control and optimisation   • Smoke-control interface│
│                     │ • Chiller plant operations        • After-hours override    │  ← two-column bullets,
│                     │ • Individual unit control         • CO/NO2 monitoring       │    real content
│                     │ • Open-protocol integration       • One graphical interface │
├─────────────────────┼────────────────────────────────────────────────────────────┤
│ Which buildings     │ Condominiums & HOA   Commercial offices   Healthcare        │  ← links to /markets/#…
│                     │ Hospitality   Light industrial                              │
├─────────────────────┼────────────────────────────────────────────────────────────┤
│ Works with          │ Energy monitoring & analytics ─ Indoor air quality ─        │  ← three related links,
│                     │ Access control & video                                      │    one line each
├──────────────────────────────────────────────────────────────────────────────────┤
│▓ same consultation band + form as Home ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
├──────────────────────────────────────────────────────────────────────────────────┤
│ footer                                                                           │
└──────────────────────────────────────────────────────────────────────────────────┘
```

Solutions index (`/solutions/`) reuses the Home solutions section at full length: the lead tile plus the
five rows, with one extra sentence each.

### 3.4 Contact — desktop

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│ header                                                                           │
├──────────────────────────────────────────────────────────────────────────────────┤
│ Request a consultation                                                           │
│ One sentence on who answers and how fast.                                        │
├────────────────────────────────────────┬─────────────────────────────────────────┤
│ ┌── form (white card on paper) ──────┐ │ Call            [PHONE]                 │
│ │ Name*                              │ │ Email           [EMAIL]                 │
│ │ Phone*        Email*               │ │ Office          [ADDRESS]               │
│ │ Property type ▾                    │ │ ┌───────────────────────────────┐       │
│ │ Message                            │ │ │ map embed placeholder         │       │
│ │ (honeypot, hidden)                 │ │ └───────────────────────────────┘       │
│ │ ▐Send request▌                     │ │ Service area                            │
│ │ success / error message area       │ │ Miami-Dade   Broward   Palm Beach       │
│ └────────────────────────────────────┘ │ (list, confirm with client)             │
│                                        │ What happens next  1   2   3            │
├────────────────────────────────────────┴─────────────────────────────────────────┤
│ footer                                                                           │
└──────────────────────────────────────────────────────────────────────────────────┘
```

Mobile: form first, details after, service area last.

### 3.5 Header and navigation

Flat primary nav: Solutions, Markets, About, Contact. Solutions is a plain link to `/solutions/`; there is
no mega-menu in v1 (seven items are visible on the index page in one screen). Right side: `[PHONE]` as a
`tel:` link and the primary button. Header is white on light pages and transparent-over-night on the Home
hero, becoming white on scroll (a user-triggered state change, not decorative motion). Mobile: mark,
phone icon, menu button; the menu is a full-screen night panel with the four links, the phone and the
button, closes on Escape and on link, traps focus while open.

### 3.6 The layered-building illustration (original)

Construction: a simplified section-elevation of a mid-rise South Florida building, a wide podium (parking
and retail) with a slimmer tower above, drawn as 1 px `signal-light` monolines on night. Five horizontal
planes are pulled out to the right of the section, stacked with a slight vertical offset so they read as
sheets rather than as an isometric city. Each plane carries one B612 label and one tiny monoline glyph
(fan blade, sun/shade bar, card and lens, meter needle, air arrows). Leader lines run from each plane to
a single small rectangle under the building labelled "one interface". That node represents the Home &
commercial automation (Crestron) family: the unified interface that the other systems report to. With the
five planes (HVAC/BMS, lighting & shading, access & video, energy, air quality), the interface node, and
service named in the hero paragraph, all seven solution families are present in the hero story. Style: no fills, no colour other
than `signal-light` and a 30% version of it for the building outline, no isometric grid, no icon
library. This is a technical drawing, not an infographic, and is unlike the Siemens flat-isometric
illustration in construction, palette and density.

The same drawing is reused at small size in the BMS lead tile and, with the relevant plane at full
opacity and the others at 30%, in each solutions-page hero. One asset, three uses.

### 3.7 Provisional wordmark (SVG)

"Prime Control" in Archivo width 112 weight 600, night on white / white on night. Mark: a 20 × 20 square
outline with a single horizontal line crossing it and a small filled tick on the line, in `signal`, a
setpoint on a slider. Text stays live text in the SVG (`<text>` with the font applied) so the brand
variable still controls it; a path-outlined version is generated only for the favicon and OG image.

---

## 4. Motion policy

There is exactly one orchestrated moment: the Home hero.

1. Page loads with the poster image painted immediately (explicit width/height, `aspect-ratio`, no
   layout shift). The headline, paragraph and buttons are already in place; they do not fade in.
2. On desktop (≥ 1024 px, `prefers-reduced-motion: no-preference`, and `navigator.connection.saveData`
   not set) the muted, `playsinline`, `preload="metadata"` video starts when its first frame is ready.
   Under 4 MB or it is replaced by the still.
3. 600 ms after the poster paints, the SVG layer diagram draws: five planes and labels appear bottom to
   top at 350 ms intervals with a 300 ms opacity/12 px translate each, then the leader lines and the
   "one interface" node in the final 300 ms. Total ≈ 2.4 s. It runs once; no scroll scrub, no loop.
4. Mobile: no video, poster only, diagram rendered in its final state.
5. `prefers-reduced-motion: reduce`: no video, poster only, diagram rendered in its final state.
   Implemented in CSS (`@media`) and duplicated in JS so the video is never even requested.

Everything else is static or answers a user action: link and button hover/focus 150 ms colour change,
header background on scroll, mobile menu open/close 200 ms, form field focus, form success/error swap.
No scroll-triggered reveals, no parallax, no hover lift on cards, no auto-advancing anything.

---

### Addendum (client request, 2026-09-13): pinned hero background

The hero is `position: sticky; top: 0` and the sections after it carry `z-index: 1` with solid backgrounds,
so as the user scrolls the page slides over the hero while the aerial stays put behind it. This is a
scroll-linked layout, not an animation: nothing moves on its own, nothing is scrubbed, and it needs no
JavaScript. It is kept under `prefers-reduced-motion` for that reason. The hero video pauses once the
hero is fully covered. The placeholder aerial has been replaced by the client's own drone footage
(`design/source/drone.mp4` → `src/assets/video/hero-drone.webm`, 10 s, VP9, under 4 MB).

### Addendum (client direction, 2026-09-13): typeface, media bands, image tabs

- **Typeface.** The client asked for the Lutron typeface. Lutron Sans is proprietary and cannot be
  licensed for this site, so the editorial face is now **Hanken Grotesk** (SIL OFL, variable weight), the
  closest open match to its neutral, light, slightly rounded grotesque. Headlines set at weight 400–500,
  normal width, tracking −0.02em. B612 keeps its instrument role. Archivo is retired.
- **Media bands.** Every page alternates white content sections with full-bleed bands whose media is
  fixed to the viewport (`clip-path: inset(0)` on the band, `position: fixed` on the media). As the page
  scrolls, content slides over the band and the next band reveals behind it. Videos load only on desktop,
  only when the band is within 600 px, and pause when out of view; phones and reduced-motion get the
  poster. This is scroll-linked layout, not animation.
- **Image tabs on Markets.** One image per building type with a description of what we install there,
  modelled on the layout the client pointed to; images are AI-generated to the brief in
  `design/image-brief.md` because no licensable photography fit.
- **Solution rows carry an image** (Honeywell-style) on Home and the Solutions index.
- **Embedded BMS demo video** (YouTube) on the Building automation page behind a click-to-load facade,
  so nothing from YouTube loads until the visitor presses play.

### Addendum (client request, 2026-09-13): video on phones

The client wants the clips to play on phones as well. The desktop-only gate is removed: the hero and the
bands play everywhere except under `prefers-reduced-motion: reduce` or when the browser reports data
saver. Phones get the smaller WebM first with the original MP4 as a fallback for browsers that cannot
play WebM (older iOS); desktop gets the MP4 first on the plant band for quality. Autoplay stays muted and
inline; iOS Low Power Mode still blocks autoplay, in which case the poster shows.

## 5. Content principles

- The outcome is the first sentence of every solution block and every solution page. Grouping stays by
  system in nav, URLs and titles.
- Plain verbs, sentence case, no filler. Buttons say what happens: "Request a consultation", "Send
  request", "See solutions". Success: "Request sent. We call back within one business day." Error: "We
  couldn't send that. Call [PHONE] or email [EMAIL]."
- No superlatives without evidence. No "leading", "seamless", "elevate", "empower", "cutting-edge".
- Nothing is invented: no years, counts, savings percentages or quotes. Placeholders are visible and set
  in B612 so they can't be missed.
- Every string is in HTML. No text in images or SVG rasters. Language switch has a reserved slot in the
  header partial.

---

## 6. Review against the brief: template defaults found and what changed

I worked through what a generic response to "premium technical B2B services site, navy + blue" produces
and checked each choice against it. Also checked against the ui-ux-pro-max design-system query, which
returned "Liquid Glass" style, Cormorant + Montserrat, black + gold, scroll-triggered storytelling with
GSAP reveals. That output was rejected in full: glass and blur are a cost with no meaning here, a serif
display reads as luxury fashion not engineering, gold is off-brief, and scroll storytelling violates the
one-motion-moment rule. Its checklist items (44 px targets, 4.5:1, visible focus, reduced motion) are
kept as the quality floor.

| Default I would have reached for | Why it is a tell | What this plan does instead |
|---|---|---|
| Inter / Manrope / Plus Jakarta for everything | Appears on every generated site; Trane already uses Inter, so it would also read as borrowed | Archivo with its width axis (two widths, one file) for editorial text; B612, a cockpit-display face, only where text speaks as the system. Justified in §2. |
| Tracked-out ALL-CAPS eyebrow above each section head | Template chrome, carries no information | Section heads are sentences and carry the section alone. B612 labels are lowercase. |
| Hero = big headline + three stat tiles + gradient wash | The "big number with small label" default; and the stats would be invented | Hero = aerial + the control layers drawing in over it. The stat tiles are not on the site at all because there is no real data. |
| Six identical solution cards with icons and "Learn more →" | The SaaS card kit | One lead tile for the anchor system, five rows in two columns with rules; links are plain text, no arrows. |
| Markets as a 7-icon grid | Same kit, and the icons would be stock | Definition list, one line each, no icons. |
| Numbered 01/02/03 markers on every section | Numbering only means something for a sequence | Numbers appear once, in "How we work", which is a sequence, and in "what happens next" on the form, also a sequence. |
| Near-black `#0B0B0B` background with neon accent | The dark-mode-with-acid-green look, explicitly excluded | Navy `#15243B` on three surfaces only; the accent must pass AA as text on white, which caps its saturation. |
| Warm cream `#F4F1EA` sections with a serif | The other excluded look, and the ui-ux-pro-max suggestion | Cool `#F4F6F9` paper, no serif anywhere. |
| Uniform 12–16 px radius, soft grey shadow under every block | One radius regardless of hierarchy is the card-kit signature | 6 px on controls, 2 px on images, nothing else rounded, no shadows on light. |
| Fade-and-slide-up on every section, hover-lift on cards | Scattered motion reads as generated | Single orchestrated hero moment; all other motion answers an action. |
| Meta strings joined with middle dots, "→" on links | Template chrome | Rules and spacing separate items; links are underlined text. |
| Generic isometric city illustration from an icon set | Siemens does this; it would look borrowed and it is not ours | Original monoline section-elevation with pulled-out planes, built by hand in SVG (§3.6). |
| Centred hero text and centred section heads | Default for marketing pages | Left-aligned everywhere; the 4 + 8 split is the recurring device. |
| Mega-menu listing every solution | Enterprise-site default, overkill for seven items | Flat four-item nav; the solutions index is one screen. |
| Chat widget, cookie banner, carousel | Seen on five of eight benchmarks | None. Static site, no third-party scripts except the form endpoint. |

Things I considered and kept: the Trane-style band overlapping the fold edge (the trust bar), because it
fixes the "hero then dead space" problem; a full contact form at the bottom of every solutions page,
because three of the benchmarks confirm it is what this market expects.

One accessory removed after the mirror check: I had a small blinking status dot next to "one interface"
in the diagram. It is decoration pretending to be data. Gone.

---

## 7. Open decisions for the client (do not block build)

- Business commitments used in copy ("Talk to an engineer, not a salesperson", "we call within one
  business day", call → site walk-through → written proposal) are built as written and listed in
  `TODO.md` under "Claims the client must confirm".

- Whether the hero uses their own drone footage or the royalty-free placeholder.
- Confirmation of service area wording.
- Whether "Prime Control" or a longer legal name appears in the wordmark (variable handles both).

## 8. What Phase 2 will build from this

`src/assets/css/main.css` with the tokens above as custom properties; `src/partials/{head,header,footer}.html`
and `brand.json`; `scripts/build.mjs`; `src/index.html` with every section in §3.1; the SVG diagram and
wordmark; self-hosted fonts; a poster still and a ≤ 4 MB placeholder clip; a Playwright screenshot script
at 390 / 820 / 1440 for the phase review.

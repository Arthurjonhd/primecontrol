# Phase 0 — Benchmark research

Captured 2026-09-13 with Playwright (Chromium / installed Chrome) at 1440×900 and 390×844.
Screenshots: `research/screens/` (`<site>-<page>-<viewport>-fold.png` = first screen, `-full.png` = whole page).
Per-site contact sheets for quick review: `research/sheets/<site>.png`.
Raw extracted facts (titles, H1/H2, nav, CTAs, fonts, colors, video, transfer size): `research/benchmark-data.json`, summarised in `research/facts-1440.txt`.

**Rule applied throughout:** these sites were studied for structure, hierarchy and market expectations only. No sentence, headline, image or video from any of them is reused in the Prime Control site.

## Capture notes / limitations

| Site | Home | Solutions page used | Notes |
|---|---|---|---|
| Advanced Control Corp | ✔ | `/solutions/` and `/services/` | Clean capture, both viewports. |
| Johnson Controls | ✔ | `/openblue` | Blocks headless UA (403); captured with a desktop UA. Full-page shot at 1440 shows lazy sections blank below the fold, the 390 full-page shot is complete. |
| Siemens | ✔ (redirects to `/en-us/content/smart-building-infrastructure/`) | `/en-us/products/building-x/` | Human-verification page for headless UA; captured with desktop UA. |
| Schneider Electric | ✔ | `/us/en/work/software/ecostruxure-building/` | Home page is a generic corporate portal, not a buildings page. Very slow to reach network-idle (≈15 s). |
| Honeywell | ✔ | `/us/en/products/by-category/building-management` | Intermittent HTTP/2 errors on the headless shell; fine with installed Chrome. The "solutions" page is really a product catalogue. |
| Trane Commercial | ✔ | `/products-systems/smart-building-technology/building-controls-solutions.html` | Clean capture. |
| Crestron | ✔ | `/Products/Featured-Solutions/Crestron-Home` | Clean capture. |
| Lutron | ✔ desktop only | `/us/en/lighting/commercial-lighting` (the old `/Residential-Commercial-Solutions/...` URL redirects there) | Behind an Imperva hCaptcha for any scripted browser. Captured through the real Chrome session instead (`lutron-*-1440-*.jpg`, scrolled segments rather than one full-page image). **No 390 px capture** — the extension cannot shrink the window that far. |

## Per-site observations

### 1. Advanced Control Corp (advancedcontrolcorp.com) — local competitor

- **Hero concept.** Full-viewport autoplay drone video of a glass office tower (a stock Pexels clip, served as a 2160p MP4). Headline "Discover all we do", a one-paragraph welcome, no CTA button in the hero. Video is not muted-with-poster; the page transfers **≈25 MB** on first load because of it.
- **Navigation.** Utility bar with two office phone numbers, then 5 items: Company Profile, Solutions, Services, Insight, Contact Us, plus search. Mobile: hamburger, phone numbers stay visible at the top.
- **Service grouping.** Two separate trees. *Solutions* = Green Building Automation, Energy Monitoring, Security Automation, Air Quality Control & Monitoring. *Services* = Managed Services, Planned Services, Building Advisor. Every group is a full-width alternating image/text band with a "Read more" link; the same layout is repeated 3–4 times on each page.
- **CTAs.** One "Contact Us" nav item and a contact form at the bottom of the home page. No CTA in the hero, no sticky phone/CTA.
- **Trust elements.** "since 1987" in the hero paragraph; two office cards with map thumbnails and phone numbers; "We can help your facility be more: Resilient / Sustainable / Efficient / Secure / Comfortable" strip. No logos of partner platforms, no license number visible, no project counts, no testimonials.
- **Typography.** Proxima Nova, light weight, generous letter-spacing, ALL-CAPS headings. Feels airy but low contrast on imagery.
- **Palette.** Deep teal-green (#1c4a4a-ish) header/footer, mid green accent, white sections, grey stock imagery. Green "eco" gradient footer.
- **Motion.** Hero video only; the rest is static. Rollover on "Read more".
- **Speed impression.** Slow first paint because of the 25 MB video; inner pages are light (1.5–3.3 MB) and fast.
- **Worth borrowing.** The single-integrator positioning (BMS + energy + security + IAQ under one roof) is exactly our market; the aerial-building hero is a good instinct; the local phone numbers in the top bar.
- **Feels dated.** Stock photography with no product-in-context; identical alternating bands; ALL-CAPS light type on busy imagery; hero with no call to action; the same 4-image collage used as decoration; no mention of platforms or protocols anywhere on the home page.

### 2. Johnson Controls (johnsoncontrols.com, OpenBlue)

- **Hero concept.** Carousel of campaign slides (data-center thermal management, etc.) with a bold headline and one button per slide; a "contact an expert" chat widget floats bottom-right on every page. OpenBlue page: single still hero, short subhead, "Learn more".
- **Navigation.** Utility row (Contact an expert, Investors, Careers, Media) + 6 primary: Products & Services, Solutions, Industries, Building Insights, Support, About. OpenBlue gets its own sub-nav (Overview / Product & Solutions / Discover OpenBlue) with a sticky "Contact us" button.
- **Service grouping.** By outcome, not by technology: Workplace Planning, Energy Efficiency & Sustainability, Equipment Performance & Operations, Workplace Experience. Each block = image + heading + 2-line description + "Solutions include:" bullets + "Learn more".
- **CTAs.** "Contact an expert" in the utility bar, "Learn more" on every module, "Contact us / Find a rep" in the footer. Sticky page-level CTA on the solutions page.
- **Trust elements.** "For more than 140 years", customer story with a dollar-savings figure, news feed, sustainability report link.
- **Typography.** Noto Sans, 35–56 px headlines, mixed weights; the contrast between bold and regular carries the hierarchy.
- **Palette.** Navy/ink blue base, bright cyan accent, white. Very corporate.
- **Motion.** Hero carousel auto-advances; otherwise static.
- **Speed impression.** ≈16 s to network idle, ~340 requests (tag managers, chat, consent). Heavy.
- **Worth borrowing.** Outcome-led grouping with "solutions include" bullets; the sticky page-level CTA; the way a complex platform is explained as "one system, four outcomes".
- **Feels dated / avoid.** Carousel heroes; chat widget covering content; enormous nav; enterprise-report tone.

### 3. Siemens Smart Infrastructure / Building X (siemens.com)

- **Hero concept.** Dark navy band with a plain-language H1 ("Smart Buildings: Technology to transform buildings"), no image in the hero itself; a video with a play button sits right below. Building X page: dark hero with a wide landscape photo, product label "Digital platform", **"Request a consultation"** as the primary button plus "Start the tour".
- **Navigation.** Minimal global header (logo, search, cart, login) + a product sub-nav (Overview / Buyer's guide / Resources). Content is long and carries the navigation itself via anchored sections.
- **Service grouping.** Home: "What is…" explainer → "Demands on buildings" (3 short problems) → four-stage maturity path (Traditional → Automated → Smart → Human-centric autonomous) → "We understand your challenges" cards → an isometric "holistic look" illustration → accordion list of 11 product areas → industries → contact form. Building X: Why (3 big stats: 30% / 10% / 24/7) → apps → customers → awards → FAQ → form.
- **CTAs.** "Request a consultation" and "Send us a message" form at the bottom of every page. Buttons are electric-cyan on navy, high contrast.
- **Trust elements.** Big-number outcomes, customer logos and quotes, award badges (ISO 50001, industry awards), FAQ.
- **Typography.** Siemens Sans / Siemens Roman, 48 px H1, everything left-aligned, long measure kept under control with a two-column body layout.
- **Palette.** Deep navy (#000028) + cyan (#00cccc) + white + petrol. The closest existing reference to the "control room at night" direction, but Siemens' cyan is louder than what we want.
- **Motion.** None beyond hover. Video is click-to-play (not autoplay). Respectful of bandwidth.
- **Speed impression.** ~2 MB home, ~6 MB Building X (images). Reasonable.
- **Worth borrowing.** The explainer-first structure ("what it is" before "what we sell"); the idea of a layered-building illustration to explain systems (ours will be original in construction and style); an accordion for the long product list; "Request a consultation" wording; contact form at the end of every page.
- **Feels dated / avoid.** Stat tiles that would be invented in our case; generic "challenges" cards; the corporate flatness of an all-navy page; their cyan is louder than our accent will be. Siemens is a palette reference only.

### 4. Schneider Electric / EcoStruxure Building (se.com)

- **Hero concept.** Home is a corporate portal: product "customer favourites" thumbnails, then a full-width branded tile ("World's most sustainable company") with a mosaic of segment photos (Software, Services, Residential, Federal, Data Centers). EcoStruxure Building page: product render on white, "Impactful Building Software", buttons "Watch the video" / "Recommend a solution".
- **Navigation.** Search-first header; category tiles instead of a classic nav. Mobile has a full-height search bar.
- **Service grouping.** On the EcoStruxure page: by building size (Large & critical buildings / Small & mid-size) then by discipline (Sustainability, Energy, Operations, Asset, Workplace, Real-estate portfolio, Data management), each an icon + 2-line card.
- **CTAs.** "Talk to an expert" and "Recommend a solution" (a guided selector). Newsletter capture in the footer.
- **Trust elements.** "Trusted by" logo strip (Deloitte, AEG, Hilton, JLL, Boston Scientific, Marriott), three customer quotes in a carousel, TIME sustainability ranking.
- **Typography.** Arial Rounded MT (custom SE version). Friendly but soft; not a fit for a technical brand.
- **Palette.** SE green (#3dcd58) + white + dark grey footer. Green-on-black is exactly the look we were told to avoid.
- **Motion.** Carousel of quotes; otherwise static.
- **Speed impression.** ~480 requests, ~15 s to idle. Heavy.
- **Worth borrowing.** "Trusted by" logo row directly below the fold; the "by building size" framing (useful for us: condo vs. single home vs. office); a guided "which solution fits" entry point.
- **Feels dated / avoid.** Portal-style home with no narrative; neon green; small icon cards in a rigid 3×3 grid.

### 5. Honeywell Building Automation (buildings.honeywell.com)

- **Hero concept.** Full-bleed dark photo of a tower with an oversized ALL-CAPS headline ("When buildings connect, insights become outcomes") in white with a red highlight word; a 5-slide carousel with thumbnail tabs underneath. Pause control shown.
- **Navigation.** Products, Industries, Automation Solutions, Brands, Support, News & Media; utility row with "Contact" and partner finder; on mobile "Bulk order" and a cart because it doubles as a store.
- **Service grouping.** Brand strip (Alerton, Onity, Trend, MAS…) → industries as a tabbed list (Airports, Commercial, Data centers, Education, Healthcare…) → case study → "Shop by category" 4×3 icon grid (Control panels, BMS, Fire, Sensors, Services, Intrusion, Video, Access control, Electrical, Software).
- **CTAs.** "Contact sales", "Find a partner", "Start your device selection" (product selector). Contact and support are split into two cards at the end.
- **Trust elements.** Sub-brand logos, analyst award (Frost & Sullivan), case studies with headline outcomes.
- **Typography.** Honeywell Sans, 56 px black-weight caps. Loud.
- **Palette.** Black/charcoal + Honeywell red + white; blue buttons. High contrast, aggressive.
- **Motion.** Hero carousel, industry tab switching; otherwise static.
- **Speed impression.** ~1.2 MB home, ~3.5 MB category page. Fast enough but the chrome (cookie banner, catalogue selector) is noisy on mobile.
- **Worth borrowing.** The industries-as-tabs pattern for our Markets section; a clear "products vs. solutions vs. services" separation; the categories list matches how facility managers think (BMS, access, video, intrusion, sensors).
- **Feels dated / avoid.** Shouty caps + red; e-commerce chrome on a marketing page; icon grids of identical tiles; carousel.

### 6. Trane Commercial (trane.com/commercial)

- **Hero concept.** Full-bleed dusk photo of a tower, one large plain-language headline ("We turn today's buildings into tomorrow's breakthroughs"), a single red pill CTA ("Explore all services"), and **three content cards overlapping the bottom of the hero** (a feature, a press release, a blog post). Autoplay muted video with a poster on the hero, sized and posterised correctly (no layout shift). Controls page uses the same template with a 70 px H1.
- **Navigation.** Floating white pill header: Products, Services, Support, Education & Training, Industries, About + "Customer login" + a prominent outlined "Local contact" button. Very legible.
- **Service grouping.** "How can we help?" numbered 01/02/03 list (Find a document / Training / Transform your building) → services (Optimization, Sustainability, Whole-building, Repair, Equipment rentals) as a compact two-column list → big photo band → insights → "Tools for your trade" audience cards (Contractors, Consulting engineers, Facility managers) → training → contact form → "Help is closer than you think" locator band.
- **CTAs.** "Local contact" pinned in the header; "Contact us", "Find your Trane rep", "Locate a sales office" in the footer; a full contact form on the controls page.
- **Trust elements.** "100 years", "50 years", award mentions in cards, product photography of real controllers and thermostats, FAQ.
- **Typography.** Inter throughout, 70 px / 500 weight headline, tight leading, small uppercase eyebrows ("HOW CAN WE HELP?", "PRESS RELEASE"). This is the cleanest typographic system in the set.
- **Palette.** Near-black and white with a single red accent; grey photography. One accent, used only on buttons and arrows.
- **Motion.** Muted hero video (with poster) and hover states only. Calm.
- **Speed impression.** ~1.4 MB, fast. Best performer in the set apart from Crestron.
- **Worth borrowing.** One headline + one CTA hero; the overlapping cards at the fold; numbered "how can we help" list; audience-specific entry points; a single accent colour discipline; header "Local contact" button.
- **Feels dated / avoid.** Nothing structurally; the red would clash with our direction, and the page runs long. We do **not** adopt Inter or any other typographic detail from Trane; typography is chosen for this brief and justified in `design/plan.md`.

### 7. Crestron (crestron.com)

- **Hero concept.** Product-in-context photography: a rendered conference room with the actual displays, camera bar and touch panel, on a white/grey studio floor. Headline right-aligned next to the image. Below: a "Signature story" band (stadium project) in a blue duotone, then alternating product bands (video, audio, control, Crestron Home) each with a short line and a "Learn more". Two silent autoplay product videos (a camera rotating, a scalable-solution animation) are used inline rather than as the hero.
- **Navigation.** Solutions, Products, How to buy, What's new, Support + Community / Sign in / language. Mobile hamburger with the same order.
- **Service grouping.** By product line, not by outcome. Crestron Home page: What's new → OS updates → products → "Works with Crestron Home" partner logos (Sonos, Lutron, Yale, Apple, Amazon…) → webinars → resources → support.
- **CTAs.** Almost none above the footer; "Learn more" everywhere, "Contact us" only in the footer. The brand sells through dealers, so the site behaves like a catalogue.
- **Trust elements.** Signature project stories, partner-logo grid, dealer/certification language.
- **Typography.** FF Mark Pro (geometric sans), 36–40 px headlines, mixed bold/book. Elegant.
- **Palette.** White, light grey, charcoal, one blue (#0078d4) for links; imagery carries all the colour.
- **Motion.** Inline silent product videos; subtle. Nothing distracting.
- **Speed impression.** ~0.8 MB home, fast; the Home page is 3 MB.
- **Worth borrowing.** Product-in-context photography instead of stock towers; lots of white space and left-aligned copy next to imagery; the partner "works with" logo grid (our trust bar); restrained motion.
- **Feels dated / avoid.** No CTAs; catalogue structure; some bands are pure product marketing with no explanation of value.

### 8. Lutron (lutron.com)

- **Hero concept.** Warm champagne gradient with a search field ("What can we help you find?"), a Residential / Commercial / Hospitality segment switch, and four tall portrait tiles (Lighting, Window Treatments, Controls, Featured) with photography and a single word each. That is the whole home page above the footer. Commercial lighting page: full-bleed hero of a single fixture glowing magenta, then very short editorial sections (headline + one sentence + one button) with large photography.
- **Navigation.** Lighting, Window Treatments, Controls, Experience Lutron, Resources, About Us; utility: Support, Book a tour, Find my sales rep, Find an installer, Region, Sign in.
- **Service grouping.** By product category first, then by audience (residential / commercial / hospitality). The commercial page splits into two "approaches" explained in one paragraph each.
- **CTAs.** "Book a tour", "Find an installer", "Find my sales rep" in the utility bar; blue pill buttons ("Explore …") per section; newsletter form in the footer.
- **Trust elements.** Case studies (BlackRock, Taliesin West), "trusted contractor" program, dealer network. No numbers.
- **Typography.** Lutron Sans (custom), 60 px light-weight headlines, generous line height, very short copy. The most editorial of the set.
- **Palette.** Warm neutral gradient, white, black text, one blue (#0b6bcb) for buttons; photography supplies the mood.
- **Motion.** Hover reveals on tiles; otherwise static. Elegant and quiet.
- **Speed impression.** Light DOM, quick once past the bot check.
- **Worth borrowing.** The confidence to say one sentence per section; tall portrait tiles as an alternative to card grids; the audience switch (residential / commercial / hospitality) which maps to our markets; utility-bar actions with real intent ("Find an installer").
- **Feels dated / avoid.** Warm cream palette (explicitly excluded in the brief); a home page that is only tiles + footer would not tell our story.

## Cross-site patterns (what the market expects)

1. **One plain-language headline + one primary CTA** in the hero (Trane, Siemens, Honeywell). Advanced Control has no CTA there; that is a gap we fill.
2. **A trust row right under the fold** — logos (Schneider, Crestron), years (JCI, Trane) or brand strips (Honeywell).
3. **Solutions explained by outcome before product** (JCI, Siemens), with "includes" bullets.
4. **Industries / markets as a switchable list**, not a card grid (Honeywell tabs, Lutron segment control).
5. **A contact form at the bottom of every solutions page** (Siemens, Trane, Advanced Control).
6. **Single accent colour** used only on buttons and links (Trane red, Lutron/Crestron blue, Siemens cyan).
7. **Photography of real systems in real rooms** beats stock towers (Crestron, Lutron vs. Advanced Control).
8. **Motion is restrained everywhere except one hero video**, always muted; the good ones use a poster and don't shift layout.

## What we take from each

- **Advanced Control Corp:** (1) the "one integrator for the whole building" framing; (2) local phone numbers in the top bar; (3) an aerial-building hero — but ours reveals the systems, not just the façade.
- **Johnson Controls:** (1) outcome-first solution blocks with "what's included" bullets; (2) a sticky page-level "Contact" on solutions pages; (3) explaining one platform as a small number of clear outcomes.
- **Siemens:** (1) "what it is" explainer before "what we sell"; (2) the *idea* of a layered-building illustration to show systems — ours is original in construction and style, with a quieter accent than their cyan; (3) "Request a consultation" as the primary CTA wording. Siemens is a palette reference only.
- **Schneider Electric:** (1) "trusted by / works with" logo row under the fold; (2) framing by building size; (3) a guided "which solution fits" entry point (v2 idea).
- **Honeywell:** (1) markets as tabs/anchors; (2) clean separation of solutions vs. service; (3) the category vocabulary facility managers actually use (BMS, access, video, intrusion).
- **Trane:** (1) one headline + one CTA hero with cards overlapping the fold; (2) numbered "how we work" list; (3) strict one-accent colour discipline. Structure only; no typography is taken from Trane.
- **Crestron:** (1) product-in-context imagery; (2) left-aligned copy beside large imagery with white space; (3) "works with" partner grid as our platform trust bar.
- **Lutron:** (1) one sentence per section, no filler; (2) tall portrait tiles as a non-grid layout for solutions; (3) residential / commercial / hospitality audience switch for Markets.

## What we deliberately do differently

- **Reveal the control layers, not just the building.** The hero overlays labelled system layers (HVAC, lighting & shades, access & video, energy, air quality) as the aerial pulls back. None of the eight sites shows what an integrator actually does in the hero.
- **Group by system, lead with outcome.** Navigation, URLs and page titles stay grouped BY SYSTEM (BMS, Lutron lighting & shading, Crestron automation, access control & video, energy, air quality, service) because that is how local customers search. The OUTCOME goes in the first sentence of every solution block and every solution page. We do not regroup the families by outcome the way JCI and Siemens do.
- **Say what platforms we integrate, on the home page.** Advanced Control never names Lutron, Crestron, Trane, BACnet or Niagara. We put them in a trust bar immediately after the hero and repeat "open protocols, no lock-in" as a differentiator.
- **One accent, cool not warm, no neon.** Navy/graphite + white + a single electric-blue family for interaction only. No SE green, no Honeywell red, no Lutron champagne.
- **No carousels, no chat widgets, no cookie theatre.** Static site, one orchestrated motion moment, everything else user-triggered.
- **No invented numbers.** No "30% savings", no "since 19xx", no project counts until the client supplies real ones. Trust comes from specificity: named platforms, protocols, license slot, service-agreement terms.
- **Vary the solutions layout.** Six families as an editorial list with one large tile, not six identical cards or six identical alternating bands.
- **Local first.** Service-area list, license number slot and phone in the header. The global brands can't do this; the local competitor does it weakly.
- **Fast by construction.** Hero video under 4 MB with a poster and a mobile still; the local competitor ships 25 MB. Lighthouse ≥ 90 is a hard gate.
- **Ready for Spanish.** Every string lives in HTML, nothing baked into images; the header/footer partials are the single place to add a language switch later.

# TODO — items still needed from the client

## Blockers
- [ ] **Authorized-dealer confirmation for Lutron, Crestron and Trane.** Until confirmed, the trust bar uses plain-text wordmarks only; licensed logos cannot be used.
- [ ] **Repo visibility.** Keep the repository private until the client approves the site.

## Claims the client must confirm (built as written for now)
- [ ] About page: founder name (Brayan Turnquest), the Caiman Automation history line, and the three cited projects (Central Bank of The Bahamas facility master system; Lynden Pindling International Airport BMS with NAD for 3+ years; Hotel Iberostar Grand Packard automation). Taken from caimanautomation.com; confirm wording and that they may be cited. `src/about/index.html`
- [ ] Whether "industrial automation" (PLC/VFD/HMI panels) should become an eighth solution family or stay as a note under Light industrial and Service & support
- [ ] "Talk to an engineer, not a salesperson" (consultation band headline)
- [ ] "We call within one business day" (form success message and "what happens next")
- [ ] The three-step process after a request: call → site walk-through → written proposal

## Strings to remove before launch (visible by design during review)
| String | File | Line | Action at launch |
|---|---|---|---|
| "Names shown as text until authorized-dealer status is confirmed. [licensed logos pending]" | `src/index.html` | 96 | Delete the `<p class="trust__note">` once dealer status is confirmed; swap text wordmarks for licensed logos |
| Hidden testimonials "[Quote] / [Name], [Role], [Property]" | `src/index.html` | 232–233 | Fill with real quotes and remove the `hidden` attribute, or delete the section |
| "[confirm with client]" after the service area | `src/partials/footer.html` | 47 | Delete once the service area is confirmed |
| Social links "LinkedIn [link]", "Instagram [link]" | `src/partials/footer.html` | 54–55 | Replace `href="#"` with real profiles and remove `[link]`, or delete the list |
| `siteUrl: https://primecontrol.example` | `src/partials/brand.json` | 6 | Replace with the real domain (drives canonical, OG, sitemap, robots) |
| `[PHONE]`, `[EMAIL]`, `[ADDRESS]`, `[FL LICENSE #]`, `[WEB3FORMS_KEY]` | `src/partials/brand.json` | 7–12 | Replace values; the `.ph` styling disappears with them |
| "[confirm with client]" note under "Where we come from" | `src/about/index.html` | 32 | Delete once the founder story is confirmed |
| Team block "[team pending]" / "[Name]" / "[Role]" | `src/about/index.html` | 69–75 | Fill or delete the block |
| Certifications "[certifications pending]" / "[pending]" | `src/about/index.html` | 78–87 | Fill or delete the block |
| Map placeholder "[map pending]", "[confirm with client]" service-area note | `src/contact/index.html` | 84, 88 | Replace with the map embed; delete the note |
| Privacy "[date]", "[legal review pending]" | `src/privacy/index.html` | 29 | Set the date after counsel review |

Run `grep -rn "\[" src --include=*.html --include=*.json` before launch: it must return nothing.

## Images and video to generate (see design/image-brief.md for prompts and file names)
- [x] Received 2026-09-13: market-residential, -hospitality, -healthcare, -retail, -industrial; sol-lighting-and-shading, -home-and-commercial-automation, -access-control-and-video, -energy-monitoring, -service-and-support; markets-hero ("arriba"). Originals in `design/source/img/`.
- [ ] Still missing: `market-commercial`, `market-condominiums` (interim: frames from the footage), `sol-building-automation`, `sol-indoor-air-quality`
- [ ] The received images have English text baked in (labels, "Prime Control Systems", "Hialeah, FL"). For the Spanish version they will need text-free or Spanish variants; the brief asked for no text in images for that reason.
- [ ] Photos of the three experience projects (Central Bank of The Bahamas, Lynden Pindling International Airport, Hotel Iberostar Grand Packard) if the client has any it may publish
- [ ] Optional band videos (shades lowering, touch-panel scene) and a lobby still
- [ ] Plant video quality: the original `mechanical1.mp4` (6.9 MB, H.264) is now served directly on desktop with the WebM as fallback. For a sharper clip export H.264 MP4, 1920×1080, 10 s, 6–8 Mbps, no audio, and drop it in `design/source/`; run `node scripts/encode-video.mjs <file> band-bms 4.2 3` and copy the MP4 to `src/assets/video/band-bms.mp4`.
- [ ] Confirm the YouTube BMS demo (AbmZgTIiwZU) may stay embedded, or replace it with the client's own screen recording
- [ ] Confirm Hanken Grotesk as the typeface (chosen as the closest open match to Lutron Sans)

## Client inputs
- [ ] Final legal name: Prime Control / Prime Control Systems / Prime Control Corp (single variable in `src/partials/brand.json`)
- [ ] Logo (replaces provisional SVG wordmark in `src/assets/img/`)
- [ ] Phone number(s) → `[PHONE]`
- [ ] Email → `[EMAIL]`
- [ ] Office address → `[ADDRESS]` (and map embed)
- [ ] Florida contractor license number(s) → `[FL LICENSE #]` (footer, legally required on advertising)
- [ ] Confirm service area (currently Miami, Fort Lauderdale, Palm Beach, all of South Florida)
- [ ] Certifications / partner-program levels (Lutron, Crestron, Trane, Niagara, etc.)
- [ ] Photos for the three experience projects now on Home and About (optional)
- [ ] Testimonials (name, role, property) — block is in the markup but hidden
- [ ] Team names / photos for About (the previous site names only the founder, Brayan Turnquest; no other staff are listed there)
- [ ] Web3Forms access key → `[WEB3FORMS_KEY]`
- [ ] Domain name and hosting choice (GitHub Pages / Cloudflare Pages / other)
- [x] Hero video: client drone footage received (`design/source/drone.mp4`, 10 s, 1280×720) and encoded to `src/assets/video/hero-drone.webm`.
- [ ] Hero still for the top: the client wants a different image than the current one. The mobile/reduced-motion poster is currently the 4.5 s frame of the drone clip. Re-run `node scripts/make-hero-video.mjs 0 18 <seconds>` for a different frame, or drop a new 1920×1080 still into `src/assets/img/hero/` as `drone-{1920,1280,768}.{avif,webp,jpg}`.
- [ ] `siteUrl` in `src/partials/brand.json` is `https://primecontrol.example` so canonical/OG/sitemap URLs are valid; replace with the real domain
- [ ] Spanish translation (structure is ready; copy not yet translated)

## Research follow-ups
- [ ] Lutron mobile (390 px) capture — blocked by Imperva captcha for scripted browsers; low priority

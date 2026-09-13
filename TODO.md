# TODO — items still needed from the client

## Blockers
- [ ] **Authorized-dealer confirmation for Lutron, Crestron and Trane.** Until confirmed, the trust bar uses plain-text wordmarks only; licensed logos cannot be used.
- [ ] **Repo visibility.** Keep the repository private until the client approves the site.

## Claims the client must confirm (built as written for now)
- [ ] "Talk to an engineer, not a salesperson" (consultation band headline)
- [ ] "We call within one business day" (form success message and "what happens next")
- [ ] The three-step process after a request: call → site walk-through → written proposal

## Strings to remove before launch (visible by design during review)
| String | File | Line | Action at launch |
|---|---|---|---|
| "Names shown as text until authorized-dealer status is confirmed. [licensed logos pending]" | `src/index.html` | 96 | Delete the `<p class="trust__note">` once dealer status is confirmed; swap text wordmarks for licensed logos |
| "Placeholders until the client provides photography and project details. [3 projects pending]" | `src/index.html` | 206 | Replace with the real intro sentence or delete |
| "Image placeholder" tiles and "[Project name] / [Building type], [City]. [Systems installed]" | `src/index.html` | 210–219 | Replace with real project images and captions |
| Hidden testimonials "[Quote] / [Name], [Role], [Property]" | `src/index.html` | 232–233 | Fill with real quotes and remove the `hidden` attribute, or delete the section |
| "[confirm with client]" after the service area | `src/partials/footer.html` | 47 | Delete once the service area is confirmed |
| Social links "LinkedIn [link]", "Instagram [link]" | `src/partials/footer.html` | 54–55 | Replace `href="#"` with real profiles and remove `[link]`, or delete the list |
| `siteUrl: https://primecontrol.example` | `src/partials/brand.json` | 6 | Replace with the real domain (drives canonical, OG, sitemap, robots) |
| `[PHONE]`, `[EMAIL]`, `[ADDRESS]`, `[FL LICENSE #]`, `[WEB3FORMS_KEY]` | `src/partials/brand.json` | 7–12 | Replace values; the `.ph` styling disappears with them |

Run `grep -rn "\[" src --include=*.html --include=*.json` before launch: it must return nothing.

## Client inputs
- [ ] Final legal name: Prime Control / Prime Control Systems / Prime Control Corp (single variable in `src/partials/brand.json`)
- [ ] Logo (replaces provisional SVG wordmark in `src/assets/img/`)
- [ ] Phone number(s) → `[PHONE]`
- [ ] Email → `[EMAIL]`
- [ ] Office address → `[ADDRESS]` (and map embed)
- [ ] Florida contractor license number(s) → `[FL LICENSE #]` (footer, legally required on advertising)
- [ ] Confirm service area (currently Miami, Fort Lauderdale, Palm Beach, all of South Florida)
- [ ] Certifications / partner-program levels (Lutron, Crestron, Trane, Niagara, etc.)
- [ ] Project photos and 3 featured projects (title, location, systems, 1 image each)
- [ ] Testimonials (name, role, property) — block is in the markup but hidden
- [ ] Team names / photos for About
- [ ] Web3Forms access key → `[WEB3FORMS_KEY]`
- [ ] Domain name and hosting choice (GitHub Pages / Cloudflare Pages / other)
- [x] Hero video: client drone footage received (`design/source/drone.mp4`, 10 s, 1280×720) and encoded to `src/assets/video/hero-drone.webm`.
- [ ] Hero still for the top: the client wants a different image than the current one. The mobile/reduced-motion poster is currently the 4.5 s frame of the drone clip. Re-run `node scripts/make-hero-video.mjs 0 18 <seconds>` for a different frame, or drop a new 1920×1080 still into `src/assets/img/hero/` as `drone-{1920,1280,768}.{avif,webp,jpg}`.
- [ ] `siteUrl` in `src/partials/brand.json` is `https://primecontrol.example` so canonical/OG/sitemap URLs are valid; replace with the real domain
- [ ] Spanish translation (structure is ready; copy not yet translated)

## Research follow-ups
- [ ] Lutron mobile (390 px) capture — blocked by Imperva captcha for scripted browsers; low priority

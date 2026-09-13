# TODO — items still needed from the client

## Blockers
- [ ] **Authorized-dealer confirmation for Lutron, Crestron and Trane.** Until confirmed, the trust bar uses plain-text wordmarks only; licensed logos cannot be used.
- [ ] **Repo visibility.** Keep the repository private until the client approves the site.

## Claims the client must confirm (built as written for now)
- [ ] "Talk to an engineer, not a salesperson" (consultation band headline)
- [ ] "We call within one business day" (form success message and "what happens next")
- [ ] The three-step process after a request: call → site walk-through → written proposal

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
- [ ] Hero video: client drone footage (WebM or MP4, under 4 MB, 16:9) to replace the placeholder push-in clip rendered from a CC BY-SA photo. When replaced, also replace the poster images in `src/assets/img/hero/` and remove the photo credit from the footer partial.
- [ ] `siteUrl` in `src/partials/brand.json` is `https://primecontrol.example` so canonical/OG/sitemap URLs are valid; replace with the real domain
- [ ] Spanish translation (structure is ready; copy not yet translated)

## Research follow-ups
- [ ] Lutron mobile (390 px) capture — blocked by Imperva captcha for scripted browsers; low priority

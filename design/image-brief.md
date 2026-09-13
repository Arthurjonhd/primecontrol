# Image and video brief (AI-generated, unique to Prime Control)

Wikimedia Commons had no usable licensable interiors for these subjects (searched 2026-09-13, see
`research/images/candidates.png`), and the Lutron / Honeywell imagery the client likes is copyrighted, so
every slot below is to be generated. Drop the finished files into the paths given and rebuild; the
placeholders disappear automatically because the markup already references those paths.

## Style rules for every image (paste into the generator as a suffix)

> Photorealistic architectural photography, South Florida, natural daylight with soft shadows, clean
> contemporary interior, no people in the foreground (small figures far away are fine), no text, no logos,
> no watermarks, neutral white and grey palette with warm wood or stone accents, deep blue sky visible where
> there are windows, 16:9, sharp focus, 35 mm lens, editorial quality, understated.

Avoid: neon, lens flare, HDR look, futuristic or CGI feel, visible brand names on devices, stock-photo
smiles, purple/teal grading. The site's own colours (navy, white, one blue) come from the layout, not
the photos.

Sizes: generate at 1920×1080 (or larger, 16:9). Then run
`node scripts/prep-image.mjs <input> <name>` → writes `<name>-{1920,1280,768}.{avif,webp,jpg}` into
`src/assets/img/photos/`.

## Markets (tabs on /markets/ and rows on Home) — file name prefix `market-<slug>`

| Slug | Prompt (subject; add the style suffix) | Shown with |
|---|---|---|
| `residential` | Living room of a modern waterfront home in Miami at late afternoon: floor-to-ceiling glass onto a bay, motorized roller shades half lowered, recessed linear lighting warm, a small wall keypad beside the door, terrazzo floor. | "Residential" tab |
| `condominiums` | Lobby of a new condominium tower in Brickell: double-height ceiling, front desk with a discreet monitor, glass entrance with access-control reader on a stone wall, palms outside. | "Condominiums and HOA" tab |
| `commercial` | Open-plan office floor in a Fort Lauderdale tower: rows of workstations, automated window shades lowered on the sun side, integrated linear ceiling lighting, glass-walled conference room with a wall touch panel. | "Commercial offices" tab |
| `hospitality` | Boutique hotel guest room in South Beach: king bed, sheer and blackout shades on a balcony window, bedside keypad for lights and climate, ocean light. | "Hospitality" tab |
| `healthcare` | Corridor of a modern outpatient clinic: clean white walls, wide doors with card readers, a room-status display, supply diffusers visible in the ceiling. | "Healthcare" tab |
| `retail` | Flagship retail store interior on Lincoln Road: storefront glass with automated shades, accent lighting on product displays, ceiling cameras discreet. | "Retail" tab |
| `industrial` | Light-industrial workshop in Doral: high ceiling, exposed ductwork, a grey electrical control panel open with a variable-frequency drive and PLC inside, an engineer's laptop on a cart. | "Light industrial" tab |

## Solutions (rows on Home and /solutions/, hero art stays the SVG) — prefix `sol-<slug>`

| Slug | Prompt |
|---|---|
| `building-automation` | Close-up of a large wall-mounted touch screen in a plant room showing a chiller plant graphic, blurred pipes and pumps behind, cool white light. |
| `lighting-and-shading` | Detail of a white keypad with engraved scene buttons on a plaster wall, a motorized shade edge and a sunlit window behind. |
| `home-and-commercial-automation` | A 10-inch tabletop touch panel on a boardroom table showing a room-control screen, a large display and camera bar on the wall behind, out of focus. |
| `access-control-and-video` | A slim card reader beside a glass door with a dome camera above, lobby interior behind, morning light. |
| `energy-monitoring` | An electrical room with a row of digital sub-meters showing readings, neat conduit, one meter display sharp. |
| `indoor-air-quality` | A ceiling with linear diffusers and a small white air-quality sensor on the wall, soft daylight, office plants blurred. |
| `service-and-support` | A technician's hands with a laptop connected to an open controller panel, cable labels visible, no face. |

## Media bands (fixed-background sections) — prefix `band-<name>`

Already in use from client footage: `band-bms` (BMS 3D schematic), `band-ceiling` (office with ceiling
fans), `hero-drone` (tower). Optional additions:

| Name | Prompt / idea |
|---|---|
| `band-shades` | 10 s video: office shades lowering in sync as afternoon sun reaches the desks, camera static. |
| `band-touchpanel` | 10 s video: a hand tapping "Meeting" on a wall panel; lights dim, shades close, screen wakes (Lutron-style product-in-use). |
| `band-lobby` | Still: condominium lobby at dusk with the tower lights coming on. |

## About page — side images (4:3, generate at 1600×1200) and one band (16:9)

Prepare side images with `RATIO=1.333 node scripts/prep-image.mjs <file> <name>`; the band with the default ratio.

| Name | Where | Prompt (add the style suffix) |
|---|---|---|
| `about-founder` | Beside "Where we come from" | An automation engineer seen from behind and slightly to the side, standing at an open building-controls panel in a clean plant room, tablet in hand showing a system graphic, cool white light, no face visible. |
| `about-mission` | Behind "Mission / Vision" (full-width band, 16:9) | Wide view of a quiet building operations room at dusk: two large wall displays with floor plans and trend charts, a window with a South Florida skyline, one empty chair, calm and orderly. |
| `about-values` | Beside "What we hold ourselves to" | Close-up of a technician's hands labelling a neatly wired controller inside a panel, cable ties and printed labels visible, shallow depth of field. |
| `team-1`, `team-2`, `team-3` | Team | Real photos only, square crop, plain light background, natural light, no AI portraits. |

## Featured projects (Home) — prefix `project-<n>`

Three real project photos from the client when available; until then the tiles stay as marked
placeholders. Do not generate these: they must be real.

## Videos (optional, if the client wants more motion)

Keep every clip 8–12 s, 1280×720, no audio, static or very slow camera. Encode with
`node scripts/encode-video.mjs <file.mp4> <name> 2.4 3` (2.4 MB budget, poster at 3 s).

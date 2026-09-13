// Generates src/solutions/<slug>/index.html for the seven solution families from the data below,
// plus the shared "art" SVG with the relevant layer lit. Edit this file, run `node scripts/gen-solutions.mjs`,
// then `node scripts/build.mjs`. Copy is original; grouped BY SYSTEM, outcome first.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

const SOLUTIONS = [
  {
    slug: 'building-automation', layer: 0,
    name: 'Building automation (BMS / BAS)', short: 'Building automation',
    title: 'Building automation and BMS / BAS integration, South Florida',
    description: 'BMS and BAS design, installation and programming: HVAC and chiller plant control, Trane systems, BACnet, Modbus, LonWorks and Niagara integration, tenant overrides, garage CO monitoring, one interface for the whole building.',
    outcome: 'Run the whole building from one screen, with HVAC, chiller plant, tenant overrides and garage air monitored and tuned automatically.',
    tags: ['Trane', 'BACnet', 'Modbus', 'LonWorks', 'Niagara'],
    what: [
      'A building management system connects every mechanical and electrical system in the property to one supervisory platform: air handlers, chillers and pumps, individual unit controls, exhaust fans, lighting circuits, meters and safety interfaces. Direct digital controllers run each piece of equipment; the platform above them gives your team one set of graphics, schedules, alarms and reports.',
      'We build on open protocols. Trane controllers, Niagara-based supervisors and any device that speaks BACnet, Modbus or LonWorks sit on the same network, so the building is never tied to one vendor and the next chiller or air handler can come from whoever wins the bid.',
      'For an existing building this often starts with an audit of what is already installed. Much of it can usually be kept, re-networked and brought under a single interface rather than replaced.'
    ],
    deliver: [
      'HVAC control and optimisation: air handlers, VAV and fan-coil units, exhaust and outside-air strategies',
      'Chiller plant operations: staging, sequencing, condenser and chilled-water reset',
      'Individual unit control for condominiums and offices, with occupant schedules',
      'Trane controllers and building automation systems',
      'Open-protocol integration over BACnet, Modbus, LonWorks and Niagara',
      'Pump systems: constant pressure, scheduled operation and sequential rotation',
      'Smoke-control interface with the fire alarm system',
      'Automatic after-hours tenant override with usage billing',
      'Elevator, garage and loading-dock CO and NO2 monitoring with exhaust control',
      'One graphical interface for the whole building, with trends, alarms and reports',
      'Secure remote access for your team and for our service desk'
    ],
    buildings: ['condominiums', 'commercial', 'healthcare', 'hospitality', 'industrial'],
    related: ['energy-monitoring', 'indoor-air-quality', 'access-control-and-video']
  },
  {
    slug: 'lighting-and-shading', layer: 1,
    name: 'Lighting and shading control (Lutron)', short: 'Lighting and shading',
    title: 'Lutron lighting and shading control for homes and commercial buildings, South Florida',
    description: 'Lutron lighting control, motorized shades and drapery, daylight harvesting, scenes and schedules, and energy-code compliance for homes, condominiums, offices, hospitality and retail in South Florida.',
    outcome: 'Rooms that light themselves for the time of day, cut glare and meet energy code without anyone touching a switch.',
    tags: ['Lutron'],
    what: [
      'Lighting control replaces banks of switches with a system that knows the time of day, whether a room is occupied and how much daylight is coming through the glass. Keypads and touch panels call up scenes instead of individual circuits; schedules and sensors do the rest.',
      'Motorized shades and drapery are part of the same system. In South Florida that matters twice over: shades track the sun to cut glare and heat gain during the day, and close on a schedule at night for privacy and security.',
      'We design, install and program Lutron systems for single residences and for commercial floors, and we hand over the documentation that shows the installation meets the lighting-control requirements of the energy code.'
    ],
    deliver: [
      'Residential lighting control: dimming, keypads, scenes and whole-home schedules',
      'Commercial lighting control: occupancy and vacancy sensing, zone schedules, load shedding',
      'Daylight harvesting that dims electric light as daylight rises',
      'Motorized shades, drapery and blackout systems with sun-tracking',
      'Scenes and schedules for rooms, floors and facades',
      'Retrofit control for existing fixtures without rewiring',
      'Energy-code compliance documentation for permitting and inspection',
      'Integration with the BMS, the Crestron interface and audio-video systems',
      'Programming changes and seasonal adjustments under a service agreement'
    ],
    buildings: ['residential', 'commercial', 'hospitality', 'retail'],
    related: ['home-and-commercial-automation', 'building-automation', 'energy-monitoring']
  },
  {
    slug: 'home-and-commercial-automation', layer: 'node',
    name: 'Home and commercial automation (Crestron)', short: 'Home and commercial automation',
    title: 'Crestron home and commercial automation, South Florida',
    description: 'Crestron whole-home and commercial automation: one-touch scenes, audio-video, conference rooms, and lighting, climate, shades, security and cameras on one interface. Design, installation and programming in South Florida.',
    outcome: 'One touch sets the room: lights, climate, shades, security and audio-video together, at home or in the boardroom.',
    tags: ['Crestron'],
    what: [
      'Automation is the interface layer. Lighting, climate, shades, door locks, cameras, intercom, gates, irrigation and audio-video each have their own controls; Crestron puts them behind one touch panel, one keypad on the wall and one app on your phone, so a single press means something like "arriving home" or "start the meeting".',
      'In a residence that means whole-home control and media distribution, from a cinema room to music by the pool. In a commercial space it means conference rooms that switch on, present and video-conference from one panel, and room scheduling that ties into your calendar.',
      'Because we also install the systems underneath, integration is not a hand-off between contractors. Lighting from Lutron, climate from the BMS and cameras from the security system arrive on the interface already talking to each other.'
    ],
    deliver: [
      'Whole-home control on touch panels, keypads, remotes and phones',
      'One-touch scenes: arrive, leave, entertain, night, away',
      'Audio-video distribution, home cinema and outdoor audio',
      'Conference rooms and boardrooms: presentation, video conferencing, scheduling',
      'Climate, shades and lighting on the same interface',
      'Security, cameras, video intercom and gate operators on the same interface',
      'Voice-assistant integration where the client wants it',
      'Irrigation, pool and spa control for residences',
      'Secure remote access and a documented, backed-up program'
    ],
    buildings: ['residential', 'hospitality', 'commercial'],
    related: ['lighting-and-shading', 'access-control-and-video', 'building-automation']
  },
  {
    slug: 'access-control-and-video', layer: 2,
    name: 'Access control and video (ACS / CCTV)', short: 'Access control and video',
    title: 'Access control, CCTV and intrusion systems, South Florida',
    description: 'Access control and identity management, elevator access, IP cameras, PTZ and thermal, license-plate recognition, video management, intrusion detection, and integration with the building management system.',
    outcome: 'Know who is in the building, control where they can go, and see every entrance from one video wall or one phone.',
    tags: ['ACS', 'CCTV', 'Intrusion'],
    what: [
      'An access control system decides who can open which door, at what time, and keeps the record. Cards, fobs and phone credentials replace keys; visitor passes expire on their own; elevator access is limited by floor. Video and intrusion detection sit on the same platform so an alarm shows the camera that matters.',
      'For a condominium or an office building this is also an operations tool. Door-held-open alarms, after-hours entries that switch on lighting and HVAC through the BMS, and license-plate recognition at the garage all come from the same system.',
      'We design the system, run the cabling, install the readers, cameras and panels, program the rules and train the people who will run it.'
    ],
    deliver: [
      'Access control with card, fob and mobile credentials',
      'Identity and visitor management, including expiring passes',
      'Elevator access control by floor and by schedule',
      'IP cameras: fixed, PTZ and thermal',
      'License-plate recognition at garage and gate entrances',
      'Network video recorders and video management software',
      'Intrusion detection with zone partitioning and central-station reporting',
      'Video intercom at lobbies, gates and unit doors',
      'Integration with the BMS and the Crestron interface',
      'Records, audits and reporting for management and compliance'
    ],
    buildings: ['condominiums', 'commercial', 'healthcare', 'retail', 'industrial'],
    related: ['building-automation', 'home-and-commercial-automation', 'service-and-support']
  },
  {
    slug: 'energy-monitoring', layer: 3,
    name: 'Energy monitoring and analytics', short: 'Energy monitoring',
    title: 'Energy monitoring, sub-metering and analytics for buildings, South Florida',
    description: 'Metering and tenant sub-metering, energy dashboards, fault detection and diagnostics, energy conservation projects and utility bill verification for condominiums, commercial and hospitality buildings.',
    outcome: 'See where the energy goes, bill tenants for what they use, and catch faults before the utility bill does.',
    tags: ['Metering', 'Sub-metering', 'Analytics'],
    what: [
      'Energy monitoring starts with meters on the mains, the major loads and, where it pays, each tenant or unit. The readings flow into the building platform in real time and into dashboards your board or owner can read without an engineer in the room.',
      'The value is in what the data catches: a chiller running outside its schedule, a pump that never stops, a tenant space conditioned all weekend, a utility bill that does not match what was measured. Fault detection turns those into alerts with a name and a location.',
      'Where the numbers justify it, we scope and carry out energy conservation projects, then measure the result against the baseline so the saving is verified rather than promised.'
    ],
    deliver: [
      'Electric, water, gas and thermal (BTU) metering on mains and major loads',
      'Tenant and unit sub-metering with billing exports',
      'Dashboards, trends and monthly reports for boards and owners',
      'Fault detection and diagnostics on HVAC and plant',
      'Energy conservation projects: scoping, implementation, measurement and verification',
      'Utility bill verification against metered data',
      'Demand management and load shedding strategies',
      'Integration with the BMS and with utility programs'
    ],
    buildings: ['condominiums', 'commercial', 'hospitality', 'industrial'],
    related: ['building-automation', 'indoor-air-quality', 'service-and-support']
  },
  {
    slug: 'indoor-air-quality', layer: 4,
    name: 'Indoor air quality', short: 'Indoor air quality',
    title: 'Indoor air quality monitoring and control, South Florida',
    description: 'CO2 and NO2 monitoring, demand-control ventilation, humidity control, garage exhaust, healthcare pressure relationships and healthy-building compliance reporting, integrated with the building management system.',
    outcome: 'Keep CO2, humidity and ventilation where a healthy building needs them, with the records to prove it.',
    tags: ['CO2', 'NO2', 'Humidity', 'Demand-control ventilation'],
    what: [
      'Indoor air quality is a control problem before it is a filtration problem. Sensors for CO2, NO2, humidity and particulates tell the ventilation system how much outside air a space actually needs, and the BMS delivers it, no more and no less.',
      'In South Florida humidity is the system that fails buildings: condensation, mould and the energy cost of over-cooling to dry the air. Humidity control sequences, dedicated outside-air handling and monitoring at the space level keep it where the building needs it.',
      'Healthcare, garages and assembly spaces have their own requirements: pressure relationships between rooms, CO and NO2 exhaust control, and records that show compliance over time. We build those into the same platform that runs the rest of the building.'
    ],
    deliver: [
      'CO2, NO2, humidity, temperature and particulate monitoring by space',
      'Demand-control ventilation tied to occupancy and sensor readings',
      'Humidity control sequences and dedicated outside-air strategies',
      'Garage and loading-dock exhaust control from CO and NO2 levels',
      'Pressure relationships and isolation-room monitoring in healthcare',
      'Filtration and outside-air strategies coordinated with the HVAC design',
      'Healthy-building compliance reporting and trend records',
      'Alarms to the people who need them, on the building interface and by message'
    ],
    buildings: ['healthcare', 'commercial', 'condominiums', 'hospitality'],
    related: ['building-automation', 'energy-monitoring', 'service-and-support']
  },
  {
    slug: 'service-and-support', layer: 'all',
    name: 'Service and support', short: 'Service and support',
    title: 'Building automation service, maintenance and 24/7 support, South Florida',
    description: 'Preventive maintenance agreements, 24/7 emergency response, remote monitoring, software upgrades, user training, help desk, and consulting and design-build with engineers for building automation and control systems.',
    outcome: 'Preventive maintenance, 24/7 emergency response and remote monitoring, so the system you paid for keeps doing its job.',
    tags: ['24/7', 'Remote monitoring', 'Maintenance agreements'],
    what: [
      'Control systems drift. Sensors go out of calibration, schedules get overridden and never restored, software falls behind on security patches, and the one person who knew the graphics moves on. A service agreement is how the building keeps the performance it had on the day of hand-over.',
      'Our agreements are written in plain terms: what is inspected and how often, what remote monitoring covers, the response time for an emergency call, and what training is included for new staff. Nothing is left to interpretation.',
      'We also take on systems we did not install. Troubleshooting and optimisation of existing controls, and consulting and design-build work alongside your engineers, are part of the same service desk.'
    ],
    deliver: [
      'Preventive maintenance agreements with a written inspection schedule',
      '24/7 emergency response with a defined response time',
      'Remote monitoring and alarm response from our service desk',
      'Software upgrades, backups and cybersecurity patching',
      'User training at hand-over and for new staff',
      'Help desk for operators and property managers',
      'Troubleshooting and optimisation of existing systems, whoever installed them',
      'Consulting and design-build with your engineers and architects',
      'Control panel design and assembly, including PLC and variable-frequency-drive panels for light industrial spaces'
    ],
    buildings: ['residential', 'condominiums', 'commercial', 'hospitality', 'healthcare', 'retail', 'industrial'],
    related: ['building-automation', 'energy-monitoring', 'access-control-and-video']
  }
];

const MARKETS = {
  residential: 'Residential', condominiums: 'Condominiums and HOA', commercial: 'Commercial offices', hospitality: 'Hospitality',
  healthcare: 'Healthcare', retail: 'Retail', industrial: 'Light industrial'
};

const byslug = Object.fromEntries(SOLUTIONS.map((s) => [s.slug, s]));
// media band per page (fixed-background section between "What it is" and "What we deliver")
const BANDS = {
  'building-automation': 'band-bms', 'indoor-air-quality': 'band-ceiling', 'energy-monitoring': 'band-bms',
  'home-and-commercial-automation': 'band-ceiling', 'lighting-and-shading': 'band-ceiling', 'access-control-and-video': 'band-tower', 'service-and-support': 'band-bms'
};
// third-party demo video (YouTube) shown behind a click-to-load facade
const YT = { 'building-automation': { id: 'AbmZgTIiwZU', title: 'How a building management system looks in operation (third-party demo)' } };
function ytBlock(slug) {
  const y = YT[slug]; if (!y) return '';
  return `
    <div class="container split block">
      <div class="split__head"><h2 class="h3">See a BMS in operation</h2><p class="muted">A third-party demonstration video. Nothing loads from YouTube until you press play.</p></div>
      <div class="yt" data-yt="${y.id}">
        <button class="yt__btn" type="button" data-title="${y.title}">
          <span class="yt__play" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
          <span class="yt__label">Play: ${y.title}</span>
          <span class="yt__note">Opens the YouTube player (youtube-nocookie.com) inside this page.</span>
        </button>
      </div>
    </div>`;
}

// The layered-building art: the relevant plane (or the interface node) at full opacity, the rest dimmed.
function art(highlight) {
  const dim = (i) => (highlight === 'all' || highlight === i ? '1' : '0.3');
  const labels = ['HVAC and BMS', 'Lighting and shades', 'Access and video', 'Energy', 'Air quality'];
  const ys = [330, 274, 218, 162, 106];
  const layers = ys.map((y, i) => `<g opacity="${dim(i)}"><path d="M290 ${y}h130l30-24H320z"/><text x="292" y="${y - 32}">${labels[i]}</text></g>`).join('');
  return `<svg class="dg page-hero__art" viewBox="0 0 480 440" role="img" aria-label="Building control layers with ${highlight === 'node' ? 'the shared interface' : highlight === 'all' ? 'every layer' : labels[highlight]} highlighted" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round" stroke-linecap="round" style="color:#7CC4FF">
          <g opacity=".35"><rect x="30" y="300" width="230" height="56"/><rect x="96" y="88" width="100" height="212"/><rect x="120" y="70" width="52" height="18"/><path d="M96 112h100M96 136h100M96 160h100M96 184h100M96 208h100M96 232h100M96 256h100M96 280h100"/><path d="M10 356h270"/></g>
          ${layers}
          <g opacity="${highlight === 'all' || highlight === 'node' ? '1' : '0.5'}"><path d="M290 106H262V409H206M290 162H262M290 218H262M290 274H262M290 330H262"/><path d="M146 356v36" stroke-dasharray="3 4"/></g>
          <g class="dg__node" opacity="${highlight === 'all' || highlight === 'node' ? '1' : '0.5'}"><rect x="86" y="392" width="120" height="34" rx="3"/><text x="146" y="414" text-anchor="middle">One interface</text></g>
        </svg>`;
}

function page(s) {
  const meta = { title: `${s.title} | {{brand.name}}`, description: s.description, nav: 'solutions' };
  return `<!--page ${JSON.stringify(meta, null, 2)}-->
<!DOCTYPE html>
<html lang="en">
<head>
{{> head}}
</head>
<body>
{{> header}}

<main id="main">
  <section class="page-hero">
    <div class="container">
      <ol class="crumbs" aria-label="Breadcrumb">
        <li><a href="{{root}}index.html">Home</a></li>
        <li><a href="{{root}}solutions/index.html">Solutions</a></li>
        <li aria-current="page">${s.short}</li>
      </ol>
      <div class="page-hero__inner">
        <div>
          <h1 class="h1">${s.name}</h1>
          <p class="lede">${s.outcome}</p>
          <ul class="tags" aria-label="Platforms and systems">${s.tags.map((t) => `<li>${t}</li>`).join('')}</ul>
          <div class="page-hero__actions">
            <a class="btn btn--primary" href="#consult">Request a consultation</a>
          </div>
        </div>
        ${art(s.layer)}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container split block">
      <div class="split__head"><h2 class="h3">What it is</h2></div>
      <div class="prose">
        ${s.what.map((p) => `<p>${p}</p>`).join('\n        ')}
      </div>
    </div>
  </section>

  {{> ${BANDS[s.slug] || 'band-tower'}}}

  <section class="section">
    <div class="container split block">
      <div class="split__head"><h2 class="h3">What we deliver</h2></div>
      <ul class="bullets bullets--two">
        ${s.deliver.map((d) => `<li>${d}</li>`).join('\n        ')}
      </ul>
    </div>
    <div class="container split block">
      <div class="split__head"><h2 class="h3">Which buildings it fits</h2></div>
      <ul class="chips">
        ${s.buildings.map((b) => `<li><a href="{{root}}markets/index.html#${b}">${MARKETS[b]}</a></li>`).join('\n        ')}
      </ul>
    </div>
    <div class="container split block">
      <div class="split__head"><h2 class="h3">Works with</h2><p class="muted">The solutions this one is usually combined with.</p></div>
      <ul class="link-list">
        ${s.related.map((r) => `<li><a href="{{root}}solutions/${r}/index.html">${byslug[r].name}</a> <span class="muted">${byslug[r].outcome}</span></li>`).join('\n        ')}
      </ul>
    </div>${ytBlock(s.slug)}
  </section>

  {{> consult}}
</main>

{{> footer}}
</body>
</html>
`;
}

for (const s of SOLUTIONS) {
  const dir = path.join(ROOT, 'src', 'solutions', s.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(s));
  console.log('wrote solutions/' + s.slug);
}
fs.writeFileSync(path.join(ROOT, 'scripts', 'solutions.json'), JSON.stringify(SOLUTIONS.map(({ slug, name, short, outcome, tags }) => ({ slug, name, short, outcome, tags })), null, 2));

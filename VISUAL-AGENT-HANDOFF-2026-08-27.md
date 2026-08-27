# Visual handoff for aitobianalytics.com (FDE rebuild)
For the image / graphics agent. Read all of it before generating anything. The copy is final and
lives in `src/data.json`; your job is the visual layer: images for every slot below, and, where
it earns its place, native graphics (Three.js, GSAP or similar). Do not change any text.

## 1. What the site is now, and what changed
Before: a personal resume template. "My name is Umair Tareen... VP of Data", four role-title
"services", a portfolio with three "Coming Soon" cards, a blog frozen in April 2026, stock
"AI" imagery (clouds, glowing brains, generic dashboards).

Now: a Forward Deployed Engineer surface for regulated industries. Umair Tareen ships AI into
banks and regulated firms, inside change control, with an audit trail. Twelve years in enterprise
data, a decade across banks, six years at MUFG, then Citi; before that, onsite implementations of
a governance, risk and compliance platform (Nasdaq BWise) for banks, insurers and corporates.
Two products of his own appear as deployments: Ledgerproof (a self-hosted governed-AI gateway
for accounting firms: redaction, policy as code, hash-chained audit log, Evidence Pack) and
Orchest AI (the self-hosted model and agent stack a client owns).

Section by section (nav labels in caps):
- HOME: hero "I ship AI into banks and regulated firms." Rotating line: Forward Deployed
  Engineer / Inside change control, with an audit trail / 12 years in enterprise data / A decade
  across banks. CTA "Book a scoping call". Portrait on the right.
- ABOUT: "What a forward deployed engineer does". The BWise onsite story, adaptability to the
  client's business before their data, expectations managed in the room and after roll-off,
  bedside manner, "asked to work with me again" as the metric. Two stat tiles: 12 years in
  enterprise data, 10 years across banks, with employer and client logos.
- Education: NYIT CS, Quinnipiac MBA (CFA concentration), MSc Artificial Intelligence and the
  Anthropic Claude certification, both in progress.
- HOW I WORK (4 accordion cards): Discovery: turn the vague brief into workstreams / Build inside
  your environment, not next to it / Production with an audit trail / Handover and ownership
  after go-live.
- DEPLOYMENTS (6 cards, each opens a modal with situation, constraint, what shipped, time to
  production, outcome, what broke): Nasdaq BWise GRC implementations · Six years inside one bank
  (MUFG, Citi) · Ledgerproof · Orchest AI · Beast Games Content Intelligence Platform · Enterprise
  AI Cost Optimization Dashboard.
- FIELD NOTES (6 articles, modal): The onsite implementation playbook · What a forward deployed
  engineer actually does · Change control is not the enemy · The audit trail is the product ·
  Own your AI: why open-weight parity did not move enterprise adoption · Agents are not the
  default: loops, harnesses, and when a plain pipeline wins.
- CONTACT: "Book a scoping call". Form, LinkedIn, email.

## 2. Design DNA you must respect
- Stack: React 18 + Vite, Tailwind 3.4, Framer Motion 12 (already installed), react-scroll,
  Magic UI components (blur-fade, border-beam, magic-card, marquee, particles, shimmer-button,
  sparkles-text, typing-animation). No Three.js or GSAP installed today; add them only where
  section 4 says so, and lazy-load them.
- Palette: page dark `#0d0b1c`; card surface `#1b1840`; borders `#2d2956`; accent green
  `rgb(38,175,129)` (#26af81); deep green `rgb(27,69,34)`; section gradient
  `linear-gradient(270deg, rgb(27,69,34) -> rgb(38,175,129))` (the Deployments band is this green
  gradient; everything else is dark navy). Body text white / white-70.
- Type: IBM Plex Sans only. Do not introduce a second family.
- Tone: documentary, institutional, quiet confidence. Banks, offices, operations rooms, real
  hardware, paper and ledgers, control rooms at night. Photographic or clean diagrammatic.
- Refuse list (hard): glowing brains, robot hands, purple-blue "AI" gradients, floating
  holograms, generic "cloud + circuits" collages, stock handshake photos, text baked into images,
  watermarks, any logo of a bank or of Nasdaq, faces other than Umair's.
- Every image renders with `object-cover` and gets cropped top/bottom at some breakpoints: keep
  the subject centred, nothing critical in the top or bottom 15%.
- Weight budget: hero portrait <= 400 KB (WebP), card images <= 250 KB each, article images
  <= 300 KB. Ship WebP with a JPG fallback only if you also update the `<img>` to `<picture>`.

## 3. Image slots (paths are under `public/`; same filename = zero code change)
| Slot | Path | Renders | Brief |
|---|---|---|---|
| Hero portrait | `/images/home-banner.png` | right 40% of viewport, full height, over `#0d0b1c` with green particles | Keep Umair's face (use the existing photo as identity reference). New environment: dark, neutral, cool tones, an office or trading-floor context at night; the purple-gold bokeh must go. 1000x1400 min, portrait. |
| About portrait | `/images/about-banner.png` (also footer) | 256x256 rounded, green border | Tight head-and-shoulders crop of the same shoot, 800x800. |
| How I work 1 | `/images/services-1.jpg` | ~600 wide inside the accordion | Discovery: a working session, whiteboard or table, a scope document being marked up. Documentary, not staged. |
| How I work 2 | `/images/services-2.jpg` | same | Build inside the environment: a release board or change ticket on screen, badge on a lanyard, enterprise setting. |
| How I work 3 | `/images/services-3.jpg` | same | Production with an audit trail: a ledger-like log or hash chain rendered as a physical-feeling object. Abstract allowed here. |
| How I work 4 | `/images/services-4.jpg` | same | Handover: client team at the console, consultant stepping back; or runbook binder and keys. |
| Deploy 1: Nasdaq BWise | new `/images/deploy-grc-onsite.jpg` | 100% x 224px, cropped from top; supply 1600x900 | Onsite at a bank or insurer: risk-committee room, board pack, GRC dashboard on a wall screen. No branding. |
| Deploy 2: six years inside one bank | new `/images/deploy-bank-audit.jpg` | same | Investment-bank data floor at night, or an audit binder beside a terminal. No logos. |
| Deploy 3: Ledgerproof | new `/images/deploy-ledgerproof.jpg` | same | A small accounting office with one server box under a desk, or a console with a redaction log; green accent. |
| Deploy 4: Orchest AI | new `/images/deploy-orchest.jpg` | same | Owned hardware: a GPU workstation or small rack in an ordinary office, a monitor showing a local model running. |
| Deploy 5: Beast Games | `/images/beast-games-dashboard.png` | same | Keep; real screenshot. |
| Deploy 6: Cost dashboard | new `/images/deploy-cost-dashboard.jpg` | same | Model-routing / cost-curve dashboard; abstract if no real screenshot exists. |
| Note 1: onsite playbook | new `/images/blog/onsite-playbook.jpg` | 100% x 192px, cropped from top; supply 1536x1024 | First week onsite: visitor badge, laptop, unfamiliar office. |
| Note 2: what an FDE does | new `/images/blog/fde-job.jpg` | same | Engineer embedded at a customer's desk, building beside the people who use it. |
| Note 3: change control | new `/images/blog/change-control.jpg` | same | A release gate or change-advisory board: calm, orderly, not grim. |
| Note 4: audit trail is the product | new `/images/blog/audit-trail-product.jpg` | same | A printed Evidence Pack or chained log on a desk, examiner's hand. |
| Note 5: own your AI | new `/images/blog/own-your-ai.jpg` | same | A local GPU box with weights downloading; "yours" feeling. |
| Note 6: pipelines, loops, agents | new `/images/blog/pipelines-loops-agents.jpg` | same | Three shapes side by side: straight pipeline, loop, branching agent, clean diagram on dark. |
Unchanged: skill logos (10), client logos (10), header SVG, favicon.

## 4. Native graphics: where they earn their place, and where they do not
The site already has particles in the hero, sparkles on the headline, blur-fade on every
section, a marquee for logos and a shimmer CTA. More motion by default would make it louder,
not better. Add graphics only where they explain something a photo cannot. Three candidates,
in priority order:

1. **"Production with an audit trail" (How I work card 3) and the Ledgerproof deployment card:
   a hash-chain visual.** A row of record blocks, each carrying the hash of the previous; on
   scroll or hover, one block is edited and every block after it turns red as the chain breaks.
   This is the product's core idea and it is the only concept on the site that motion explains
   better than a still. Canvas 2D or SVG + GSAP timeline; Three.js is overkill here. Must degrade
   to a static SVG under `prefers-reduced-motion`.
2. **Field note 6 "Pipelines, loops, agents": an animated diagram.** Three lanes: a straight
   pipeline pulsing left to right; a loop that re-arms on a clock and pauses at a guardrail
   node; an agent that branches over tools. GSAP is the right tool; keep it under 6 s and loop
   quietly. Also render it as the article's still image for the card.
3. **Hero background, optional and only if it stays quiet:** replace the random particle field
   with a slow, sparse 3D lattice or point cloud (Three.js, ~2k points, no bloom, no colour
   beyond the accent green at low opacity) that drifts with the pointer. Cap at 30 fps on
   mobile, lazy-load after first paint, fall back to the existing Particles component. If it
   costs more than 150 KB gzipped or drops Lighthouse performance below 85 on mobile, do not
   ship it.

Do not add: scroll-jacking, full-page WebGL, animated gradients behind text, 3D avatars, hover
tilt on every card, parallax on portraits, sound.

Integration rules: Vite + React; put any 3D or GSAP scene in its own component under
`src/components/graphics/`, `React.lazy` it, gate it behind an IntersectionObserver so it only
runs on screen, and honour `prefers-reduced-motion`. Bundle size today is 533 KB; the whole
graphics layer must add less than 200 KB gzipped total. Keep IBM Plex Sans and the palette
above; use the accent green as the single highlight colour in any graphic.

## 5. What to return
1. The image files at the paths above (new names as listed), WebP preferred plus JPG fallback.
2. A one-line-per-file list of what each image depicts, so the alt text can be updated.
3. For any graphic component: the component file(s), the dependency to add, the exact JSX line
   to mount it and where, and a screenshot or short clip of it running. No edits to
   `src/data.json` copy; if a caption is needed, say so and it will be added by hand.
4. Lighthouse mobile performance before and after, if any graphic is included.

Nothing publishes until the content owner reviews the images against the copy and runs the
build; after that the JSON is repointed to the new filenames and the site is pushed.

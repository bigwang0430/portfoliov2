# portfoliov2 — Page Content (About / Projects / Contact + Furious Frogs detail)

## Context

portfoliov2 currently has working Home + particle background, but About, Projects,
and Contact are blank placeholders (centered heading + back arrow). This change
fills in real content for those three pages and adds one project detail subpage,
carrying over information from the older `../portfolio` project but re-implemented
natively in portfoliov2's stack (React + Vite + Tailwind v4, mono/white/black,
no scrolling on the main pages).

Key constraints preserved:
- Home / About / Projects / Contact stay **no-scroll** (one viewport).
- Project **detail subpages may scroll** internally (the only exception), so the
  full Furious Frogs write-up carries over the way the old portfolio handled it.
- **No new dependencies.** `react-icons` is already installed; no markdown system.

## Approach

The old portfolio stored projects as markdown parsed by a `useProjects` hook +
`react-markdown`. That machinery isn't worth re-adding. Instead, everything is
**data-driven from a single module** so future projects are easy to add (Andy will
add more over time):
- `src/data/projects.js` is the single source of truth: list entries + each
  project's full detail content as structured data.
- A generic `ProjectDetail` page renders any project's detail from that data via a
  `/projects/:slug` route.
- **Adding a project = adding one entry.** External-link projects (no detail) are
  just `{ name, tagline, href, external: true }`. Projects with a detail page add a
  `slug` + a `detail` block; the generic renderer and `:slug` route pick them up
  automatically — no new component or route needed.

## Typography

Keep text small and minimal, anchored to the homepage as the reference:
- Hero "Hi," ≈ homepage title size (`text-4xl`, bold).
- Page/section headings modest (`text-sm`–`text-base`).
- Body text, taglines, bullets at the small nav scale (`text-xs`).
- Project names in the list slightly larger than body (`text-sm`); tech pills
  `text-[10px]`. No oversized text anywhere.

## Shared / structural changes

### `src/components/BackArrow.jsx` (modify)
Add an optional `to` prop, defaulting to `/`. Inner pages keep `→ /`; the detail
page passes `to="/projects"`. Keep the current `RxReset` icon and styling. On the
scrolling detail page the arrow must stay pinned in the corner (rendered outside
the scroll region), not scroll away with content.

### `src/data/projects.js` (new)
Single source of truth. External projects omit `slug`/`detail`; projects with a
detail page include both. Also exports `getProject(slug)`.
```js
export const PROJECTS = [
  {
    name: 'Smashspeed.ai',
    tagline: 'AI-powered shuttlecock speed tracker for badminton. 50,000+ downloads on iOS & Android. Utilized YOLOv5 to create proprietary AI model trained with Google Cloud Platform',
    href: 'https://smashspeed.ca',
    external: true,
  },
  {
    slug: 'furious-frogs',
    name: 'Furious Frogs',
    tagline: 'Competitive robotics programming for FIRST Technology Challenge. Lead programmer of FTC #26025 Furious Frogs, currently #1 in Canada.',
    detail: {
      title: 'Furious Frogs FTC — Lead Programmer',
      summary: '…',
      tech: ['Java', 'Android Studio', 'OpenCV', 'RoadRunner', 'FTC SDK', 'Kalman Filtering', 'State Machines'],
      sections: [
        { title: 'The Journey', body: '…' },
        { title: 'Technical Highlights', subsections: [
          { title: 'Autonomous Pathing & Localization', bullets: ['…'] },
          { title: 'Computer Vision', bullets: ['…'] },
          { title: 'System Architecture', bullets: ['…'] },
        ] },
        { title: 'Impact', bullets: ['…'] },
        { title: 'What I Learned', body: '…' },
      ],
    },
  },
]
```
A `section` may have `body` (paragraph), `bullets` (list), and/or `subsections`
(each `{ title, bullets }`) — flexible enough for any future project's write-up.

### `src/components/ProjectEntry.jsx` (new)
Renders one list entry: name + tagline beneath. `external` → `<a target="_blank"
rel="noopener noreferrer" href>`; otherwise → `<Link to={`/projects/${slug}`}>`. Name
mono `text-sm` white with a subtle hover (shift to `--color-accent`); tagline mono
`text-xs` white/70.

### `src/pages/ProjectDetail.jsx` (new, generic)
Reads `useParams().slug`, looks up `getProject(slug)`, and renders its `detail`
generically: header (title + summary + tech pills), then each section (title +
optional body + optional bullets + optional subsections). Unknown slug or a project
without `detail` → a simple "Project not found" with the back arrow. Scrolls
internally (see below); `<BackArrow to="/projects" />` pinned top-left.

### `src/App.jsx` (modify)
Add a child route: `{ path: 'projects/:slug', element: <ProjectDetail /> }`. One
generic route covers all current and future detail pages.

## Pages

### About (`src/pages/About.jsx`) — no-scroll, centered
- "**Hi,**" rendered large/bold mono (≈`text-6xl`), white.
- Paragraph below in a constrained-width column (≈`max-w-md`, mono `text-sm`,
  `leading-relaxed`, white):
  > I'm Andy from Vancouver Canada. I like to code new and fun things that help
  > others. I'm working on product and web development, as well as AI and machine
  > learning. My hobbies include BJJ and cooking. More coming soon!
- `<BackArrow />` (→ home).

### Projects (`src/pages/Projects.jsx`) — no-scroll, top-aligned
- "**projects**" heading near the top.
- Below it, the two `PROJECTS` rendered via `<ProjectEntry>` (Smashspeed.ai first,
  Furious Frogs second), each name + tagline.
- `<BackArrow />` (→ home).

### Furious Frogs detail — `/projects/furious-frogs` (**scrolls** internally)
Rendered by the generic `ProjectDetail` from the `detail` data of the
`furious-frogs` entry; content carried from the old portfolio, restyled to
portfoliov2's aesthetic. The page is a full-height container with `<BackArrow
to="/projects" />` pinned top-left, and an inner `h-full overflow-y-auto` scroll
region (top padding so content clears the arrow) holding a `max-w` column. Thin
`border-white/10` dividers between sections.

The `furious-frogs` `detail` data holds exactly this content:
- **Header** — title "Furious Frogs FTC — Lead Programmer"; summary: "Autonomous
  navigation and vision systems that took our FTC team from local hobby to #1 in
  Canada and World Championship qualifiers."; tech-tag pills: Java, Android Studio,
  OpenCV, RoadRunner, FTC SDK, Kalman Filtering, State Machines.
- **The Journey** — "What started as curiosity about robotics turned into leading
  the software development for Canada's top-ranked FIRST Tech Challenge team. As
  Lead Programmer, I architected our robot's autonomous systems, subsystem controls,
  and computer vision — code that needed to perform flawlessly in high-stakes
  competition environments."
- **Technical Highlights** — three subsections, each a bulleted list:
  - *Autonomous Pathing & Localization*:
    - Implemented motion profiling libraries with custom odometry integration for precise path following
    - Developed Kalman filter fusion combining wheel odometry and camera-based AprilTag detection for robust localization even when sensors disagreed
    - Built fail-safe state machines to handle unpredictable competition conditions (alliance partners blocking paths, field variations)
  - *Computer Vision*:
    - Created real-time ball tracking using HSV color filtering and OpenCV contour detection
    - Engineered adaptive thresholding to handle inconsistent arena lighting between venues
    - Integrated vision targets directly into autonomous decision-making for dynamic gameplay
  - *System Architecture*:
    - Designed subsystem controls using state machines to manage complex parallel actions (intake running while arm positions, drivetrain navigating)
    - Leveraged FTC libraries (RoadRunner, FTC Dashboard) while extending them for team-specific needs
    - Wrote modular, maintainable Java in Android Studio for rapid iteration during build season
- **Impact** — bulleted:
  - #1 Ranked Team in Canada for the 2025–26 season
  - World Championship Qualification competing against 5,000+ international teams
  - Autonomous routines consistently scoring within ±2cm accuracy across 100+ competition matches
- **What I Learned** — "Building competition robotics taught me that elegant code
  means nothing if it fails under pressure. I learned to balance theoretical
  correctness (Kalman filtering, motion profiling) with practical reliability
  (graceful sensor failures, conservative timeouts). Working at the hardware-software
  interface — debugging why a servo stutters or why odometry drifts — gave me a deep
  appreciation for how software constraints emerge from physical systems."

### Contact (`src/pages/Contact.jsx`) — no-scroll, centered
- "**available to work**" at the top (mono white; may use the accent color).
- A **2×2 grid** of icon links (`react-icons`): GitHub, LinkedIn, Instagram, Email.
  Icons white, hover → `--color-accent`, each `target="_blank" rel="noopener
  noreferrer"`, with `aria-label`s. Links:
  - GitHub — https://github.com/bigwang0430
  - LinkedIn — https://www.linkedin.com/in/andy-wang-994397301
  - Instagram — https://www.instagram.com/_.andywang._
  - Email — https://mail.google.com/mail/?view=cm&to=fengyaoandy@gmail.com
- `<BackArrow />` (→ home).

## Scroll mechanism (detail page)

Global no-scroll is enforced by `body { overflow: hidden }` and Layout's
`<main … overflow-hidden>`. The detail page opts in locally: its scroll region is a
child with `h-full overflow-y-auto`, which scrolls within the fixed main height
while the body (and the fixed particle background) never scroll. No change to
Layout or global CSS is required.

## Verification

- `pnpm dev`, then for each page confirm via the preview tools: correct content
  renders, no console errors.
- About / Projects / Contact show **no scrollbars** (overflow 0); the Furious Frogs
  page **does** scroll and shows all sections; back arrow returns to `/projects`.
- Project links: Smashspeed opens `smashspeed.ca` in a new tab; Furious Frogs routes
  internally. Contact icons open the correct URLs.
- `pnpm build` and `pnpm lint` pass.

## Out of scope

- Additional projects beyond the two listed.
- Editing Home or the particle engine.

---

## Update (2026-06-16) — implemented state

The pages shipped, then the Furious Frogs detail page was redesigned and a particle
toggle was added. Where this section differs from the design above, **this section is
current**.

### Furious Frogs detail — redesigned layout
`ProjectDetail` renders, top to bottom:
1. **Title** — "Furious Frogs FTC Robotics".
2. **Description** — about FTC/robotics generally (no "#1 in Canada").
3. **Project Overview** (heading) → a **2×2 grid of cards** (Role · Rank · Duration ·
   Website → furiousfrogs.org). Cards are `rounded-xl border border-white` (solid
   white outline).
4. **Responsibilities** — a full-width card (Autonomous Programming, Computer Vision,
   Sensor Fusion & Localization, Control Systems & Tuning, Software Architecture).
5. **Tech Stack** — a full-width card with a comma-separated list. This **replaces the
   old tech "pills"** (removed — the border crowded descenders no matter the padding).
6. **Sections** (narrative, one divider each): The Journey, Technical Highlights —
   now with a **Control Systems & Tuning** subsection (PIDF / derivative error /
   feedforward / real-world sensor noise) — **Impact** (5 bullets incl. Worlds 18th,
   rookie provincial finalist, mentoring), **Awards** (new: Design/Think awards, BC
   alliance results), What I Learned.

### Data-model additions
`detail` gained two optional fields the generic renderer understands:
- `overview`: `{ label, value, href? }[]` → the 2×2 card grid (linked values get an
  inline globe icon so values align across cards).
- `responsibilities`: `string[]` → the full-width responsibilities card.

### Particle toggle (new feature)
A top-right `ParticleToggle` (`CgDribbble` icon, mirrors the back arrow) turns the
particle background on/off. State lives in `Layout` (`particlesEnabled`) so it
persists across in-app navigation. On = white icon; off or hover = accent. Color is
applied inline (not a `text-accent` class), no `transition-colors`. Isolated for easy
removal (delete the component + revert three lines in `Layout.jsx`).

### Misc content/style
- Contact heading is "AVAILABLE FOR WORK"; About hero is a large left-aligned "Hi,".
- The particle palette in `defaults.js` is a cyan/pink set on black.
- All content columns share a `max-w-2xl` (672px) cap so About, Projects, and the
  detail page align; the back arrow and particle toggle sit at a `top-12` inset.

### Supersedes above
- The "Furious Frogs detail" content block and "tech pills" / `text-[10px]` styling
  are replaced by the cards described here.
- Any implication that the generic `/projects/:slug` system was out of scope is
  obsolete — that system is implemented and is the core of the Approach section.

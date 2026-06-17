# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager is **pnpm**.

- `pnpm dev` — start the Vite dev server (default http://localhost:5173)
- `pnpm build` — production build to `dist/`
- `pnpm preview` — serve the production build locally
- `pnpm lint` — run ESLint over the project

There is no test framework configured in this project.

## Tech stack

- **React 19** + **React Router 7** (`createBrowserRouter`) — single-page app.
- **Vite 8** for dev/build; **pnpm** is the package manager.
- **Tailwind CSS v4** via `@tailwindcss/vite` — no config file; theme tokens live in `src/index.css` (`@theme`).
- **Three.js** + **@react-three/fiber** — the particle background (`src/lib/medusae/`).
- **react-icons** — back arrow (`RxReset`), particle toggle (`CgDribbble`), contact socials (`Fa*`), website globe (`FaGlobe`).
- **ESLint 9** (flat config). No test framework.

## Big-picture architecture

A single-page personal portfolio: **React 19 + Vite 8 + React Router 7 + Tailwind CSS v4**, with a full-screen **Three.js / @react-three/fiber** particle background. Understanding it requires reading a few files together:

### Full-viewport, no-scroll shell
The whole site is designed to fit one screen with **no scrolling**. This is enforced globally, not per-page:
- `src/index.css` sets `html, body, #root { height: 100% }` and `body { overflow: hidden }`.
- `src/components/Layout.jsx` is the router's root element. It holds a `particlesEnabled` state, conditionally renders `<ParticleBackground/>`, renders `<ParticleToggle/>` (top-right), then a `<main>` (`relative z-10`, full height) containing the routed `<Outlet/>`. Because `Layout` stays mounted across route changes, the toggle state persists during in-app navigation.
- Each page (`src/pages/*`) is its own full-height flex container that centers its own content. When adding a page, follow this pattern — do not introduce scroll.
- **Exception:** project detail pages (`ProjectDetail`) opt into scrolling locally via an inner `h-full overflow-y-auto` region, so long-form content scrolls while the body and the fixed particle background stay put. No global CSS change is needed for this.

### Particle background (the "Medusae" engine)
`src/lib/medusae/` is a **self-contained** particle component and is the most complex part of the codebase:
- `Medusae.jsx` — an `@react-three/fiber` `<Canvas>` rendering an `instancedMesh` driven by inline GLSL vertex/fragment shaders. The effect is a cursor-following "jellyfish halo": particles near the pointer enlarge and shift color. Mouse tracking is a global `pointermove` listener feeding the `uMouse` uniform, smoothed toward the target each frame via `cursor.dragFactor`.
- `defaults.js` — every tunable parameter (cursor, halo, particles, background colors). Per-instance `config` props are shallow-merged over these defaults. Tune the look here, not in the shader.
- Treat the GLSL as known-good; it was carefully ported from a proven implementation. Prefer adjusting `defaults.js`/config over editing shader math.

`src/components/ParticleBackground.jsx` wraps `<Medusae>` in a `fixed inset-0 -z-10 pointer-events-none` layer with a black background so it sits behind all content and never intercepts clicks. **Gotcha:** it dispatches a one-frame `window.resize` after mount — R3F's initial ResizeObserver measurement can land at the default 300×150 and only correct on a resize, which would leave the canvas not filling the viewport. Keep that workaround here in the wrapper, not in the engine.

**Toggle:** `src/components/ParticleToggle.jsx` is a top-right button (mirrors the back arrow, `CgDribbble` icon) that flips `Layout`'s `particlesEnabled`, mounting/unmounting `ParticleBackground`. Its color is set **inline** (`var(--color-accent)` when active or hovered, white otherwise) rather than via a `text-accent` class — deliberately, and with no `transition-colors` (a CSS transition there made the color read/animate unreliably). The feature is isolated for easy removal: delete the component and revert three lines in `Layout.jsx`.

### Routing & navigation
`src/App.jsx` defines `createBrowserRouter` routes under `Layout`: `/` (Home), `/about`, `/projects`, `/projects/:slug` (ProjectDetail), `/contact`.
- Home has no nav bar: the centered "Andy Wang" title sits above `HomeNav`, whose three links (about/projects/contact) ARE the navigation.
- Every non-home page renders `<BackArrow to="…" />` (a reset/loop icon, top-left). It defaults to `/`; the project detail page passes `to="/projects"`.

### Projects data model (designed for easy extension)
`src/data/projects.js` is the **single source of truth** — `PROJECTS` (the list) plus `getProject(slug)`. Adding a project is a data edit only; no new components or routes:
- **External-only** (e.g. Smashspeed.ai → smashspeed.ca): `{ name, tagline, href, external: true }`. `ProjectEntry` renders it as a new-tab external link.
- **With a detail page** (e.g. Furious Frogs): add `slug` + a `detail` block. `detail` supports `title`, `summary`, `overview` (`{ label, value, href? }[]` → a 2×2 card grid), `responsibilities` (`string[]` → a full-width card), `tech` (`string[]` → a full-width "Tech stack" card), and `sections[]`. A `section` may have `body` (paragraph), `bullets` (string[]), and/or `subsections` (each `{ title, bullets }`). The generic `src/pages/ProjectDetail.jsx` renders all of this (cards are `rounded-xl border border-white`; no tech "pills"), and the `/projects/:slug` route serves it.

### HomeNav contracting underline
`src/components/HomeNav.jsx` renders a single 1px underline bar positioned with measured DOM geometry (`getBoundingClientRect` relative to the nav). Default: the bar spans the whole row with a side margin baked into the outer ends. On hovering a link it contracts to bracket that link (+margin); leaving the nav returns it to full span. It recomputes on `window.resize` and after `document.fonts.ready`, because the mono font swap changes text widths. If you change nav items or spacing, this measurement logic still applies automatically.

## Conventions & constraints

- **Tailwind v4 has no config file.** Theme tokens live in `src/index.css` via `@import 'tailwindcss'` and an `@theme` block (e.g. `--font-mono: 'Roboto Mono'`, `--color-accent: #f9de48`). Add design tokens there, not in a `tailwind.config.js`.
- **Visual language:** monospace (Roboto Mono, loaded via Google Fonts `<link>` in `index.html`), all-white text (no greys) on a black background; most pages center their content (About left-aligns its text block). Keep type small: body text is `text-[11px]`, with larger sizes reserved for headings/hero.
- `main.jsx` wraps the app in `StrictMode`, so effects run twice in dev — keep effects idempotent (relevant for the R3F/measurement code above).
- This is `portfoliov2`, a deliberately fresh, standalone project (its own git repo). A sibling `../portfolio` exists but is unrelated; do not import from or depend on it.

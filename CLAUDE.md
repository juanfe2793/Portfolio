# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and technical blog for Juan Felipe Gómez Manzanares (Staff Software Engineer). Built with Docusaurus v3 (Node.js/TypeScript/React 19), deployed to GitHub Pages.

## Build & Development Commands

> Requires Node.js >=20

```bash
npm install                # Install Node dependencies
npm start                  # Local dev server
npm run build              # Production build
npm run typecheck          # TypeScript type checking (tsc)
npm run serve              # Serve the production build locally
npm run clear              # Clear Docusaurus cache (use when builds behave unexpectedly)
```

### Docker
```bash
docker compose --profile dev up     # Dev server with hot-reload on :3000
docker compose --profile prod up    # Production build served on :3000
```

## Architecture

```
src/
  pages/index.tsx           # Home page (hero, about, projects, CTA sections)
  pages/index.module.css    # Home page scoped styles
  components/
    SocialLinks/            # Shared GitHub/LinkedIn/Email icon row
    SkillBadge/             # Pill badge with optional proficiency dots (variant: 'skill' | 'tag')
    Timeline/               # Ordered timeline for CV experience entries (accepts JSX in description)
    ImpactMatrix/           # Impact metrics component
    AIVision/               # AI vision section component
  css/custom.css            # Design system — primary theming entry point
docs/
  portfolio/cv.mdx          # CV page — uses Timeline + SkillBadge components
  case-studies/             # Architecture case study MDX pages
  guides/                   # "The Staff's Playbook" command-reference guides
blog/                       # Blog posts (MDX)
static/img/                 # favicon.svg, avatar.jpg, logo.svg
```

## Design System

The theme is called **"Obsidian Command Center"** — dark-first, high-contrast. All tokens live in `src/css/custom.css` as CSS custom properties.

**Dual-theme tokens** (light / dark differ):

| Token | Light | Dark |
|---|---|---|
| `--paper` | `#FAF7F0` | `#000000` (OLED) |
| `--ink` | `#141414` | `#FFFFFF` |
| `--ink-soft` | `#4A4A48` | `#A1A1AA` |
| `--accent` | `#B43A0B` (burnt orange) | `#00D1FF` (electric blue) |
| `--accent-deep` | `#7C2D12` | `#00A3C7` |

Default color mode is **dark**. Always use these tokens rather than hard-coded colors. Infima variables (`--ifm-color-primary`, etc.) are mapped to these tokens — do not set Infima variables directly.

**Global utility classes** available in MDX/JSX without importing:
- `.eyebrow` — monospace small-caps section label
- `.cs-lead` — large intro paragraph for case studies
- `.cs-metric-grid` / `.cs-metric` / `.cs-metric-value` / `.cs-metric-label` — stat grids
- `.cs-section-tag` — inline accent-colored section marker
- `.glass-panel` — glassmorphism card
- `.bento-grid` — auto-fit grid layout

## Key Config Files

- `docusaurus.config.ts` — site config: navbar labels, redirects, Mermaid theme, `onBrokenLinks: 'throw'` (broken links fail the build)
- `sidebars.ts` — sidebar structure for docs
- `tsconfig.json` — extends `@docusaurus/tsconfig`

**Navbar sections** (label → route):
- CV / Resume → `/docs/portfolio/cv`
- Architecture Hub → `/docs/case-studies`
- The Staff's Playbook → `/docs/guides`
- Blog → `/blog`

A `@docusaurus/plugin-client-redirects` block preserves old `/guides/*` and `/portfolio/cv/` URLs — update it when adding new redirected paths.

Mermaid diagrams are enabled (`@docusaurus/theme-mermaid`); use fenced ` ```mermaid ` blocks in MDX.

## Content Patterns

**CV page** (`docs/portfolio/cv.mdx`): Uses `<Timeline>` with `entries` where `description` accepts a JSX `ReactNode` (wrap in `<>...</>`). Use Docusaurus admonitions (`:::success[...]`) inside the description JSX for achievement callouts.

**Case studies** (`docs/case-studies/*.mdx`): Lead with `<span className="eyebrow">` + `<p className="cs-lead">` + `<div className="cs-metric-grid">` stat block before narrative sections.

**Blog posts**: Include `{/* truncate */}` to set the excerpt boundary for the blog listing page.

## CI/CD

- **`.github/workflows/ci.yml`**: Deploys to GitHub Pages on push to `main`
- **`.github/workflows/test-ci.yml`**: Build + typecheck on PRs and pushes to `main`
- Deployment target: `https://juanfe2793.github.io/Portfolio/`

## Licensing

Dual-licensed: MIT for code, CC BY 4.0 for content.

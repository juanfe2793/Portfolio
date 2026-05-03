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
  data/projects.ts          # FeaturedProjects data source — edit here to add/update projects
  components/
    SocialLinks/            # Shared GitHub/LinkedIn/Email icon row
    SkillBadge/             # Pill badge with optional proficiency dots (variant: 'skill' | 'tag')
    Timeline/               # Ordered timeline for CV experience entries (accepts JSX in description)
    ImpactMatrix/           # Animated impact metrics (uses react-countup + IntersectionObserver)
    AIVision/               # AI vision section on home page
    HomepageFeatures/       # "Domains" expertise ledger on home page
    FeaturedProjects/       # Project cards grid (reads from src/data/projects.ts)
    ProjectCard/            # Individual project card with mini-diagram visualization
    CaseStudyHeader/        # Case study metadata bar (role, duration, stack, impact)
    SeriesNavigation/       # Blog post series prev/next links
    AuthorFooter/           # Author bio card shown at bottom of blog posts
  css/custom.css            # Design system — primary theming entry point
  theme/
    MDXComponents.tsx       # Overrides MDX global scope — adds SkillBadge + Timeline without import
    BlogPostItem/Footer/    # Swizzled blog footer — injects SeriesNavigation + AuthorFooter
docs/
  portfolio/cv.mdx          # CV page
  case-studies/             # Architecture case study MDX pages
    _template.mdx           # Copy this when creating a new case study
  guides/                   # "The Staff's Playbook" command-reference guides
blog/
  _template.mdx             # Copy this when creating a new blog post
  authors.yml               # Author metadata (name, title, url, imageURL)
  tags.yml                  # Canonical tag definitions
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

**CV page** (`docs/portfolio/cv.mdx`): Uses `<Timeline>` and `<SkillBadge>` — both available globally in MDX without importing (registered in `src/theme/MDXComponents.tsx`). `Timeline` `entries` accept `description` as a `ReactNode` (wrap in `<>...</>`). Use Docusaurus admonitions (`:::success[...]`) inside the description JSX for achievement callouts.

**Case studies** (`docs/case-studies/*.mdx`): Copy `_template.mdx`. Import and use `<CaseStudyHeader>` for the metadata bar. Structure: `<span className="eyebrow">` → `<CaseStudyHeader>` → `<p className="cs-lead">` → `<div className="cs-metric-grid">` stat block → narrative sections separated by `---` with `<span className="cs-section-tag">` labels.

```jsx
import CaseStudyHeader from '@site/src/components/CaseStudyHeader';

<CaseStudyHeader
  number="01 / 03"
  role="Staff Software Engineer — Platform Lead"
  duration="2022 – 2023"
  stack={['Kong', 'Terraform', 'AWS EKS']}
  impact="One sentence on the business outcome."
/>
```

**Blog posts** (`blog/*.mdx`): Copy `_template.mdx`. Include `{/* truncate */}` to set the excerpt boundary. For series navigation, add these frontmatter keys — the swizzled footer renders `<SeriesNavigation>` automatically:

```yaml
series: "Series Name"
prev_series_slug: "/blog/previous-post"
prev_series_title: "Previous Post Title"
next_series_slug: "/blog/next-post"
next_series_title: "Next Post Title"
```

**Featured Projects** (`src/data/projects.ts`): Add/edit entries here to update the home page project grid. Each project has `title`, `problem`, `decision`, `impact`, `metrics[]`, `tags[]`, `link`, and `diagram` (with `nodes[]` and `label`).

## CI/CD

- **`.github/workflows/ci.yml`**: Deploys to GitHub Pages on push to `main`
- **`.github/workflows/test-ci.yml`**: Build + typecheck on PRs and pushes to `main`
- Deployment target: `https://juanfe2793.github.io/Portfolio/`

## Licensing

Dual-licensed: MIT for code, CC BY 4.0 for content.

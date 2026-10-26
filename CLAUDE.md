# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and technical blog for Juan Felipe Gómez Manzanares (Staff Software Engineer). Built with Docusaurus v3 (Node.js/TypeScript/React 19), deployed to GitHub Pages.

## Build & Development Commands

> Requires Node.js >=22 and pnpm >=9

```bash
pnpm install               # Install Node dependencies
pnpm start                 # Local dev server
pnpm run build             # Production build
pnpm run typecheck         # TypeScript type checking (tsc)
pnpm run serve             # Serve the production build locally
pnpm run clear             # Clear Docusaurus cache (use when builds behave unexpectedly)
```

### Docker
```bash
docker compose --profile dev up     # Dev server with hot-reload on :3000
docker compose --profile prod up    # Production build served on :3000
```

## Architecture

```
src/
  pages/index.tsx           # Home page (hero, impact, work, leadership, now, writing/contact)
  pages/index.module.css    # Home page scoped styles
  data/projects.ts          # WorkIndex data source — edit here to add/update projects
  components/
    SocialLinks/            # Shared GitHub/LinkedIn/Email icon row (44px targets)
    SkillBadge/             # Pill badge with optional proficiency level (variant: 'skill' | 'tag')
    Timeline/               # Ordered timeline for CV experience entries (accepts JSX in description)
    ImpactLedger/           # Home impact strip: 4 static metrics linking to case studies
    WorkIndex/              # Numbered case-study list (reads src/data/projects.ts); used on home + /docs/case-studies
    CaseStudyHeader/        # Case study meta table (role, timeline, stack, outcome)
    SeriesNavigation/       # Blog post series prev/next links
    AuthorFooter/           # Author bio card shown at bottom of blog posts
  css/custom.css            # Design system — primary theming entry point
  theme/
    MDXComponents.tsx       # Overrides MDX global scope — adds SkillBadge + Timeline without import
    BlogPostItem/Footer/    # Swizzled blog footer — injects SeriesNavigation + AuthorFooter
    Footer/                 # Custom site footer (themeConfig.footer is not used)
docs/
  portfolio/cv.mdx          # CV page
  case-studies/             # Architecture case study MDX pages
    _template.mdx           # Copy this when creating a new case study
  guides/                   # "The Staff's Playbook" command-reference guides
blog/
  _template.mdx             # Copy this when creating a new blog post
  authors.yml               # Author metadata (name, title, url, imageURL)
  tags.yml                  # Canonical tag definitions
static/img/                 # favicon.svg, avatar.jpg, social-card.png (1200x630 OG image)
```

## Design System

The theme is called **"Editorial Architect"**: light-first, typographic, rule-based, one restrained accent. All tokens live in `src/css/custom.css` as CSS custom properties.

**Fonts:** Newsreader (display, h1–h3), Inter (body/UI), JetBrains Mono (labels, code). Use `--font-display`, `--font-body`, `--font-mono`.

**Dual-theme tokens** (light / dark differ):

| Token | Light | Dark |
|---|---|---|
| `--paper` | `#FAF9F6` | `#0E0E10` |
| `--paper-deep` | `#F1EFEA` | `#17171A` |
| `--ink` | `#16161A` | `#ECECEE` |
| `--ink-soft` | `#55555E` | `#A3A3AD` |
| `--rule` / `--rule-strong` | `#E2DFD8` / `#C9C5BC` | `#2A2A30` / `#3D3D45` |
| `--accent` | `#1F3FBF` (cobalt) | `#8AA8FF` |
| `--accent-deep` | `#152C8A` | `#B4C6FF` |
| `--signal` | `#0F7B5F` | `#4FD1A5` |

Also: `--radius`, `--elevation`, `--dur` (200ms), `--ease-out`, `--text-display-{xl,lg,md}`.

Default color mode is **light** and follows `prefers-color-scheme`. Always use these tokens rather than hard-coded colors. Infima variables (`--ifm-color-primary`, etc.) are mapped to these tokens — do not set Infima variables directly. No glassmorphism, gradients, or glow. All motion must respect `prefers-reduced-motion` (a global rule in `custom.css` enforces this).

**Global utility classes** available in MDX/JSX without importing:
- `.eyebrow` / `.section-label` — monospace uppercase labels
- `.cs-lead` — large serif intro paragraph (keep its content on one line in MDX to avoid nested `<p>`)
- `.cs-metric-grid` / `.cs-metric` / `.cs-metric-value` / `.cs-metric-label` — ruled stat grids
- `.cs-section-tag` — inline accent-colored section marker
- `.glass-panel` — flat bordered card (name kept for existing MDX; no blur)
- `.bento-grid` — auto-fit grid layout

## Key Config Files

- `docusaurus.config.ts` — site config: navbar labels, redirects, Mermaid theme, `onBrokenLinks: 'throw'` (broken links fail the build)
- `sidebars.ts` — sidebar structure for docs
- `tsconfig.json` — extends `@docusaurus/tsconfig`

**Navbar sections** (label → route):
- Work → `/docs/case-studies`
- Writing → `/blog`
- Playbook → `/docs/guides`
- CV → `/docs/portfolio/cv`

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

**Selected Work** (`src/data/projects.ts`): Add/edit entries here to update the Selected Work list. Each project has `title`, `problem`, `decision`, `impact`, `metrics[]`, `tags[]`, `link`, `duration`, `scope`, and `diagram` (with `nodes[]` and `label`). `WorkIndex` renders them on the home page and the case study index.

## CI/CD

- **`.github/workflows/ci.yml`**: Deploys to GitHub Pages on push to `main`
- **`.github/workflows/test-ci.yml`**: Build + typecheck on PRs and pushes to `main`
- Deployment target: `https://juanfe2793.github.io/Portfolio/`

## Licensing

Dual-licensed: MIT for code, CC BY 4.0 for content.

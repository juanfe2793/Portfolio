# Architecture

**Analysis Date:** 2026-03-29

## Pattern Overview

**Overall:** Dual-system static site generator architecture with gradual migration from MkDocs to Docusaurus v3.

**Key Characteristics:**
- Two independent builds coexist (MkDocs in root, Docusaurus in `v2/`)
- MkDocs is current production system deployed to GitHub Pages
- Docusaurus is target migration system with placeholder content
- Content migration tracked in `migration-planning/` CSV files
- Shared deployment target: `https://juanfe2793.github.io/Portfolio/`

## Layers

**Root System (MkDocs/Python):**
- Purpose: Current production site, content authoring and deployment
- Location: Root directory with configuration in `mkdocs.yml`
- Contains: Python/MkDocs config, GitHub workflows, Python utilities
- Depends on: Python >=3.11, uv package manager, mkdocs-material theme
- Used by: `.github/workflows/ci.yml` for automated deployment

**v2 System (Docusaurus/Node):**
- Purpose: Future production system and migration target
- Location: `/v2/` directory
- Contains: React 19 components, TypeScript configuration, Docusaurus preset-classic
- Depends on: Node >=20, npm, Docusaurus 3.9.2 with preset-classic
- Used by: Manual builds and local development during migration

**Content Layer (MkDocs):**
- Purpose: Structured content for portfolio, blog, and technical guides
- Location: `/docs/` directory
- Contains: Markdown files organized by section (portfolio, blog, guides)
- Depends on: Material theme extensions for rendering
- Used by: MkDocs build process

**Content Layer (Docusaurus - Target):**
- Purpose: Future content structure for migrated portfolio
- Location: `/v2/docs/` and `/v2/blog/` directories (currently empty placeholders)
- Contains: Tutorial files as scaffolding, awaiting content migration
- Depends on: Docusaurus content plugins
- Used by: Docusaurus build process after migration

**UI Components Layer (Docusaurus):**
- Purpose: Custom React components for page layout and features
- Location: `/v2/src/` directory
- Contains: Page components (`index.tsx`), feature components (`HomepageFeatures`), CSS modules
- Depends on: React 19, Docusaurus theme components
- Used by: Homepage and custom page layouts

**Configuration & Build Layer:**
- Purpose: Build configuration, CI/CD, theme customization
- Location: Root-level configs (`mkdocs.yml`, `.github/workflows/`), `/v2/docusaurus.config.ts`
- Contains: Navigation structure, theme colors, plugins, deployment settings
- Depends on: Platform-specific tooling (Python/uv, Node/npm)
- Used by: Build processes

## Data Flow

**MkDocs Build Flow:**

1. Developer edits markdown in `/docs/` directory
2. Commit pushed to `main` branch
3. GitHub Actions workflow (`.github/workflows/ci.yml`) triggered
4. Python dependencies installed via `uv sync --frozen`
5. `mkdocs build` generates static HTML to `./site` directory
6. Site uploaded to GitHub Pages artifact
7. Deployed to `https://juanfe2793.github.io/Portfolio/`

**Docusaurus Build Flow (Local Development):**

1. Developer runs `npm start` in `/v2/` directory
2. Docusaurus dev server starts with hot reload
3. Changes to components or docs reflected in browser
4. `npm run build` generates static site to `./build` directory
5. Built site can be served locally or deployed

**Content Migration Flow:**

1. Content inventory tracked in `/migration-planning/content_inventory.csv`
2. URL mappings documented in `/migration-planning/url_mapping.csv`
3. Static assets tracked in `/migration-planning/static_assets.csv`
4. Migration audit logged in `/migration-plan/AUDIT_MKDOCS_DEPENDENCIES.md`
5. Content gradually moved from `/docs/` to `/v2/docs/` and `/v2/blog/`

**State Management:**

- **MkDocs**: State via file system (markdown files, YAML config)
- **Docusaurus**: State via file system (markdown in `/v2/docs/`, config in TypeScript)
- **Migration tracking**: CSV files in `/migration-planning/` directory

## Key Abstractions

**Theme & Styling:**
- Purpose: Consistent visual design across site
- Examples: `mkdocs.yml` theme config (Material theme), `/v2/docusaurus.config.ts` prism themes
- Pattern: Centralized theme configuration with CSS customization via `src/css/custom.css`

**Navigation Structure:**
- Purpose: Organize content hierarchy and user navigation
- Examples: `mkdocs.yml` nav section, `/v2/sidebars.ts` (auto-generated from directory)
- Pattern: Declarative navigation config for MkDocs, filesystem-based autogeneration for Docusaurus

**Page Components:**
- Purpose: Reusable UI patterns for homepage and custom pages
- Examples: `src/pages/index.tsx` (homepage), `src/components/HomepageFeatures/index.tsx`
- Pattern: React functional components with TypeScript, using Docusaurus theme hooks

**Content Plugins:**
- Purpose: Transform and process markdown content
- Examples: `mkdocs-material` extensions (admonitions, code highlighting), Docusaurus blog plugin
- Pattern: Configuration-driven plugin system

## Entry Points

**MkDocs Entry:**
- Location: `mkdocs.yml` configuration
- Triggers: `uv run mkdocs serve` or `uv run mkdocs build`
- Responsibilities: Load site config, process markdown files, generate static site

**Docusaurus Entry:**
- Location: `/v2/docusaurus.config.ts` and `/v2/package.json` scripts
- Triggers: `npm start` (dev), `npm run build` (production)
- Responsibilities: Load Docusaurus config, compile React components, build static site

**GitHub Pages Deployment:**
- Location: `.github/workflows/ci.yml`
- Triggers: Push to `main` branch
- Responsibilities: Checkout code, build MkDocs site, deploy to GitHub Pages

**Homepage (Docusaurus):**
- Location: `/v2/src/pages/index.tsx`
- Triggers: Request to `/` route
- Responsibilities: Render hero banner with site title/tagline, display feature components

## Error Handling

**Strategy:** Configuration-driven validation with build-time enforcement.

**Patterns:**
- `onBrokenLinks: 'throw'` in `docusaurus.config.ts` - Fails build on broken links
- `NO_MKDOCS_2_WARNING` environment variable in CI - Suppresses MkDocs warnings
- Blog post validation in Docusaurus: warns on inline tags, inline authors, untruncated posts

## Cross-Cutting Concerns

**Logging:**
- MkDocs: Standard output from `mkdocs build` command, saved to `mkdocs.log`
- Docusaurus: Console output from dev server and build process

**Validation:**
- MkDocs: Markdown syntax via Material theme extensions
- Docusaurus: TypeScript type checking via `tsc` (available via `npm run typecheck`)

**Authentication:**
- None required - Static site generation, no runtime authentication

**Deployment:**
- MkDocs: GitHub Pages via workflow artifact upload
- Docusaurus: Ready for GitHub Pages deployment (config set with `baseUrl: '/Portfolio/'`)

---

*Architecture analysis: 2026-03-29*

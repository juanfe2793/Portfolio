# Architecture

**Analysis Date:** 2026-03-29

## Pattern Overview

**Overall:** Dual-system static site generator architecture with gradual migration from MkDocs to Docusaurus.

**Key Characteristics:**
- Two coexisting build systems in single repository (MkDocs at root, Docusaurus in `v2/`)
- Content-driven architecture (markdown-first for both systems)
- GitHub Pages deployment via GitHub Actions CI/CD
- Shared content strategy with migration planning layer
- Python backend (MkDocs) and Node.js frontend (Docusaurus) both targeting same deployment URL

## Layers

**Entry Point / Site Generation:**
- Purpose: Generates static HTML sites from configuration and content
- Location: Root for MkDocs (`mkdocs.yml`), `v2/` for Docusaurus (`docusaurus.config.ts`)
- Contains: Configuration files, build scripts, deployment configs
- Depends on: Framework core libraries (MkDocs Material, Docusaurus v3), content from `docs/`
- Used by: CI/CD workflows (GitHub Actions)

**Content Layer:**
- Purpose: Stores all markdown content, blog posts, guides, portfolio information
- Location: `docs/` for MkDocs source, `v2/docs/` and `v2/blog/` for Docusaurus (currently empty/placeholder)
- Contains: Markdown files (`.md`), blog metadata (YAML frontmatter), assets (images in `docs/assets/`)
- Depends on: None (static content)
- Used by: Both MkDocs and Docusaurus build systems

**Theme & Styling:**
- Purpose: Visual presentation, component styling, custom CSS
- Location: MkDocs uses Material theme via `mkdocs.yml`. Docusaurus uses theme components at `v2/src/` and custom CSS at `v2/src/css/custom.css`
- Contains: React components (Docusaurus), CSS modules, theme configuration
- Depends on: Component framework (React 19 for Docusaurus), Material Design system
- Used by: Build system to render HTML pages

**Utility Layer:**
- Purpose: Helper scripts for infrastructure and AWS management (unrelated to site itself)
- Location: `utils/aws-scripts/`
- Contains: Python scripts for AWS resource discovery and management
- Depends on: AWS SDK
- Used by: Manual operations, not part of main site build

**Migration Planning Layer:**
- Purpose: Documents content inventory and URL mapping for migration from MkDocs to Docusaurus
- Location: `migration-planning/`
- Contains: CSV files mapping content across systems
- Depends on: None
- Used by: Human reference during migration tasks

## Data Flow

**MkDocs Production Build (Current):**

1. Push to `main` branch triggers GitHub Actions workflow (`.github/workflows/ci.yml`)
2. Action runs `uv sync --frozen` to install Python dependencies from lockfile
3. Action runs `uv run mkdocs build` which:
   - Reads `mkdocs.yml` configuration (site metadata, navigation, theme settings)
   - Scans `docs/` directory for markdown files
   - Applies Material theme and markdown extensions (admonition, pymdownx, emoji, code highlighting)
   - Generates static HTML to `./site/` directory
4. Action uploads `./site` artifact to GitHub Pages
5. GitHub Pages serves site at `https://juanfe2793.github.io/Portfolio/`

**Docusaurus Development Build (Migration Target):**

1. Developer runs `npm start` in `v2/` directory
2. Docusaurus dev server reads `docusaurus.config.ts` configuration
3. Server loads React components from `v2/src/pages/` and `v2/src/components/`
4. Server generates pages from `v2/docs/` (currently contains placeholder tutorial files)
5. Dev server serves at `http://localhost:3000`
6. Production build via `npm run build` generates static output to `v2/build/`

**Content Migration Flow (In-Progress):**

1. Content inventory in `migration-planning/content_inventory.csv` identifies all MkDocs content
2. URL mapping in `migration-planning/url_mapping.csv` defines new paths in Docusaurus
3. Content gradually copied from `docs/` to `v2/docs/` and `v2/blog/`
4. Links and references updated to match new Docusaurus structure
5. Eventually: Replace MkDocs CI/CD with Docusaurus CI/CD on deployment

## Key Abstractions

**Configuration Objects:**
- Purpose: Define site metadata, navigation, theme behavior, build options
- Examples: `mkdocs.yml` (MkDocs), `docusaurus.config.ts` (Docusaurus), `v2/sidebars.ts` (Docusaurus navigation)
- Pattern: External config files define behavior; build systems consume them

**React Components (Docusaurus):**
- Purpose: Encapsulate reusable UI elements
- Examples: `v2/src/pages/index.tsx` (homepage), `v2/src/components/HomepageFeatures/index.tsx` (feature card component)
- Pattern: TypeScript React components typed with `React.ComponentType`, CSS modules for styling (`*.module.css`)

**Markdown Content:**
- Purpose: Store portable, version-controlled content
- Examples: `docs/index.md` (homepage), `docs/guides/*.md` (technical guides), `docs/portfolio/cv.md` (CV)
- Pattern: Markdown with optional YAML frontmatter for metadata (blog posts use author, date, tags)

**Theme System:**
- MkDocs: Material theme plugin system with markdown extensions (pymdownx, admonition, etc.)
- Docusaurus: `@docusaurus/preset-classic` providing layout, navigation, theme components

## Entry Points

**MkDocs Serve (Development):**
- Location: Root directory, invoked via `uv run mkdocs serve`
- Triggers: Developer running local dev server
- Responsibilities: Watch `docs/` for changes, regenerate HTML in-memory, serve to localhost:8000

**MkDocs Build (CI/CD):**
- Location: Root directory, invoked via `.github/workflows/ci.yml`
- Triggers: Push to `main` branch
- Responsibilities: Install dependencies, build static site to `./site/`, prepare artifact for GitHub Pages

**Docusaurus Dev (Development):**
- Location: `v2/` directory, invoked via `npm start`
- Triggers: Developer running `cd v2 && npm start`
- Responsibilities: Start dev server with hot-reload, watch `v2/src/` and `v2/docs/`, serve to localhost:3000

**Docusaurus Build (Production):**
- Location: `v2/` directory, invoked via `npm run build`
- Triggers: Manual execution during migration, future CI/CD
- Responsibilities: Generate optimized static site to `v2/build/`

**Homepage:**
- MkDocs: `docs/index.md` - rendered by Material theme
- Docusaurus: `v2/src/pages/index.tsx` - React homepage with header and feature cards

## Error Handling

**Strategy:** Build-time validation with fail-fast approach.

**Patterns:**
- MkDocs: Validates markdown syntax and references during build; deployment fails if build fails
- Docusaurus: TypeScript type checking (`npm run typecheck`) catches component prop errors. Docusaurus config has `onBrokenLinks: 'throw'` to fail on invalid links
- GitHub Actions: Both workflows fail the job if build command exits with non-zero status, preventing broken builds from deploying

## Cross-Cutting Concerns

**Logging:**
- MkDocs: Console output to stdout/stderr with warnings (e.g., missing markdown includes)
- Docusaurus: Dev server logs build progress and warnings to console
- GitHub Actions: Workflow logs visible in Actions tab; Python and Node.js errors logged to job output

**Validation:**
- MkDocs: Markdown extension validation, link checking via plugins
- Docusaurus: TypeScript compilation validates component and config types; broken link detection
- Content: YAML frontmatter in blog posts validated for required fields (author, date)

**Theming & Styling:**
- MkDocs: Material theme configuration in `mkdocs.yml` (color palette, features, fonts)
- Docusaurus: Theme config in `docusaurus.config.ts` (prism code themes, color mode, navbar/footer layout)
- Custom CSS: `docs/assets/css/extra.css` (MkDocs), `v2/src/css/custom.css` (Docusaurus)

**Navigation & Routing:**
- MkDocs: Navigation hierarchy defined in `mkdocs.yml` nav section
- Docusaurus: Sidebar navigation auto-generated from `v2/docs/` structure or manually defined in `v2/sidebars.ts`
- Both: URL structure determines page hierarchy and browser routing

---

*Architecture analysis: 2026-03-29*

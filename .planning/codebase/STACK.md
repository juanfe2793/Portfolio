# Technology Stack

**Analysis Date:** 2026-03-29

## Languages

**Primary:**
- Python 3.11+ - MkDocs site (root directory), package management via uv
- TypeScript 5.6.2 - Docusaurus v3 project in `v2/`
- JSX/TSX - React 19 components in `v2/src/pages/` and `v2/src/components/`
- Markdown - All content files (docs/, blog/, guides/)
- YAML - Configuration files (mkdocs.yml, docusaurus.config.ts, CI/CD workflows)

**Secondary:**
- Bash/Shell - Deployment scripts and development utilities
- Python - Migration utility script at `/Users/juanfe/code/Portfolio/generate_migration_data.py`

## Runtime

**Environment:**
- Node.js 20.0+ (required for Docusaurus) - specified in `v2/package.json` engines
- Python 3.11 (required for MkDocs) - specified in `pyproject.toml`
- Docker (optional, for containerized MkDocs development)

**Package Manager:**
- `uv` (Python package manager, modern alternative to pip) - used for MkDocs dependencies
  - Lockfile: `uv.lock` present at project root
  - Version pinning via frozen installs: `uv sync --frozen`
- `npm` (Node.js package manager) - used for Docusaurus dependencies
  - Lockfile: `v2/package-lock.json` present
  - Node version: `.nvmrc` specifies `20` in `v2/.nvmrc`

## Frameworks

**Core (MkDocs - Root):**
- MkDocs Material 9.7.2+ - Modern Material Design theme for documentation site
  - Location: Root directory configuration in `mkdocs.yml`
  - Purpose: Static site generation for current production portfolio
  - Plugins: blog, search, exclude

**Core (Docusaurus - v2/):**
- Docusaurus 3.9.2 - React-based documentation framework (migration target)
  - Location: `v2/` directory
  - Core packages:
    - `@docusaurus/core`: 3.9.2
    - `@docusaurus/preset-classic`: 3.9.2 (includes docs, blog, pages)
  - Purpose: Upcoming production site replacing MkDocs
  - Future flags: v4 compatibility enabled in config
  - Deployment target: GitHub Pages at `https://juanfe2793.github.io/Portfolio/`

**UI Frameworks:**
- React 19.0.0 - UI rendering for Docusaurus pages and components
  - Location: `v2/src/pages/`, `v2/src/components/`
  - Key packages: `react`, `react-dom`
- clsx 2.0.0 - Conditional CSS class name utilities

**Styling:**
- CSS Modules - Component-scoped styling in Docusaurus
  - Files: `v2/src/css/custom.css`, `v2/src/pages/index.module.css`, `v2/src/components/HomepageFeatures/styles.module.css`
- Prism React Renderer 2.3.0 - Code syntax highlighting

**Markdown Processing:**
- MDX 3.0.0 - Markdown with JSX support for Docusaurus
  - Package: `@mdx-js/react`
  - Enables embedding React components in markdown docs

**Testing:**
- Not currently configured. No test files or testing framework found.

**Build/Dev Tools:**
- TypeScript 5.6.2 - Type checking for Docusaurus project
  - Config: `v2/tsconfig.json` extends `@docusaurus/tsconfig`
  - Commands: `npm run typecheck` in `v2/`
- Docusaurus CLI - Development server and build tooling
  - Dev command: `npm start`
  - Build command: `npm run build`

## Key Dependencies

**Critical:**
- `mkdocs-material` 9.7.2+ (MkDocs) - Provides Material Design theme and components
- `@docusaurus/core` 3.9.2 (Docusaurus) - Core framework for documentation site generation
- `react` 19.0.0 (Docusaurus) - UI rendering engine
- `typescript` 5.6.2 (Docusaurus) - Type safety for TypeScript codebase

**Infrastructure/Utilities:**
- `mkdocs-exclude` 1.0.2 - Exclude directories from MkDocs build (e.g., utils/aws-scripts/)
- `ghp-import` 2.1.0 - Deploy to GitHub Pages
- `playwright` 1.57.0 - Browser automation (currently unused, may be for migration/testing)
- `prism-react-renderer` 2.3.0 - Code syntax highlighting in Docusaurus
- `@mdx-js/react` 3.0.0 - MDX support for embedded React in markdown

**Development:**
- `@docusaurus/module-type-aliases` 3.9.2 - Type aliases for Docusaurus modules
- `@docusaurus/tsconfig` 3.9.2 - Shared TypeScript configuration
- `@docusaurus/types` 3.9.2 - TypeScript type definitions

## Configuration

**Environment Variables:**
- `NO_MKDOCS_2_WARNING=1` - Suppresses MkDocs 2.0 compatibility warning during build
  - Set in: `Dockerfile` and CI workflows (`.github/workflows/ci.yml`, `.github/workflows/test-ci.yml`)

**Build Configuration:**
- `mkdocs.yml` - MkDocs configuration (root directory)
  - Site URL: `https://juanfe2793.github.io/JuanPipe/`
  - Theme: Material with Material Icons
  - Features: Navigation tabs, search, blog plugin, code copy button
  - Extensions: pymdownx for emoji, syntax highlighting, details, superfences
- `v2/docusaurus.config.ts` - Docusaurus TypeScript configuration
  - URL: `https://juanfe2793.github.io` with base path `/Portfolio/`
  - GitHub Pages deployment: org `juanfe2793`, project `Portfolio`
  - Broken link handling: `throw` (fail on broken links)
  - i18n: English only (default locale)
  - RSS/Atom feeds enabled for blog

**Version Management:**
- `v2/.nvmrc` - Node version specification (version: 20)
- `pyproject.toml` - Python version requirement (>=3.11)
- `uv.lock` - Python dependency lockfile (frozen installs)
- `v2/package-lock.json` - Node.js dependency lockfile

**Path Aliases:**
- `@site/` - Docusaurus path alias for accessing static and source files
  - Example: `@site/static/img/` in component imports

## Platform Requirements

**Development:**
- Python 3.11+ with `uv` package manager installed
- Node.js 20.0+ with npm
- Modern terminal/shell (bash/zsh compatible)
- Docker (optional, for containerized MkDocs development)

**Production:**
- GitHub Pages - deployment platform for both MkDocs (current) and Docusaurus (target)
- GitHub Actions - CI/CD pipeline for automated builds and deployment
- Static hosting only (no server-side runtime required)

## Deployment

**Current (MkDocs):**
- GitHub Actions workflow: `.github/workflows/ci.yml`
- Trigger: Push to `main` branch
- Build: Python 3.11 → `uv sync` → `uv run mkdocs build`
- Output: Static files in `./site` directory
- Deploy: GitHub Pages via `actions/deploy-pages@v4`
- Site URL: `https://juanfe2793.github.io/Portfolio/`

**Target (Docusaurus - in progress):**
- Build command: `npm run build` (outputs to `v2/build/`)
- Deployment configuration ready in `docusaurus.config.ts`

---

*Stack analysis: 2026-03-29*

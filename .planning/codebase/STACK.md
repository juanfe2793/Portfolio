# Technology Stack

**Analysis Date:** 2026-03-29

## Languages

**Primary:**
- Python 3.11+ - MkDocs site (root directory, production system)
- TypeScript 5.6.2 - Docusaurus v3 site (v2/ directory, migration target)
- JavaScript/JSX/TSX - React 19 components in Docusaurus

**Secondary:**
- Markdown - Content source for both MkDocs and Docusaurus

## Runtime

**Environment:**
- MkDocs: Python 3.11 (specified in `pyproject.toml`, enforced in Docker)
- Docusaurus: Node.js >= 20.0 (enforced in `v2/package.json`)
- Node version manager: `.nvmrc` specifies Node 20 for `v2/` directory

**Package Managers:**
- Python: `uv` (modern Python package manager) - manages MkDocs dependencies
  - Lockfile: `uv.lock` (present, frozen installs enforced in CI/CD)
- Node: npm - manages Docusaurus and React dependencies
  - Lockfile: `package-lock.json` (automatically maintained)

## Frameworks

**Core - MkDocs System:**
- `mkdocs-material` >= 9.7.2 - Material Design theme with advanced features
  - Supports: navigation tabs, code copying, syntax highlighting, emoji, tabs, admonitions
- `mkdocs-exclude` >= 1.0.2 - Exclude files from build

**Core - Docusaurus System:**
- `@docusaurus/core` 3.9.2 - Static site generator and framework
- `@docusaurus/preset-classic` 3.9.2 - Official preset with docs, blog, pages support
- React 19.0.0 - UI framework for Docusaurus components

**Testing:**
- Not explicitly configured in either system

**Build/Dev:**
- TypeScript 5.6.2 - Type checking for Docusaurus (tsc)
- `@docusaurus/tsconfig` 3.9.2 - Shared TypeScript configuration
- `@docusaurus/module-type-aliases` 3.9.2 - Module path aliases
- `@mdx-js/react` 3.0.0 - MDX markdown component support
- `prism-react-renderer` 2.3.0 - Code syntax highlighting
- `clsx` 2.0.0 - Conditional CSS class utilities

## Key Dependencies

**Critical:**
- `playwright` >= 1.57.0 - Headless browser automation (likely for testing/validation)
- `ghp-import` >= 2.1.0 - Deploys built site to GitHub Pages branch
- `react-dom` 19.0.0 - React DOM rendering for Docusaurus

**Infrastructure:**
- `@docusaurus/types` 3.9.2 - TypeScript type definitions for Docusaurus

## Configuration

**Environment:**
- MkDocs reads from `mkdocs.yml` (no runtime env vars required)
- Docusaurus reads from `v2/docusaurus.config.ts` (compiled at build time)
- Docker uses `NO_MKDOCS_2_WARNING=1` environment variable (suppresses MkDocs deprecation notice)

**Build Configuration:**
- MkDocs: `mkdocs.yml` - defines site metadata, theme, plugins, navigation structure
  - Theme: Material Design with custom CSS (`assets/css/extra.css`)
  - Plugins: search, blog, exclude (for `utils/aws-scripts/`)
  - Markdown extensions: 12+ (admonition, superfences, emoji, highlight, etc.)
- Docusaurus: `v2/docusaurus.config.ts` - TypeScript configuration
  - Site URL: `https://juanfe2793.github.io/Portfolio/`
  - Base URL: `/Portfolio/` (GitHub Pages subdirectory)
  - Sidebar: `v2/sidebars.ts` (auto-generated from directory structure)
  - Custom CSS: `v2/src/css/custom.css`
- TypeScript: `v2/tsconfig.json` (extends `@docusaurus/tsconfig`)

## Platform Requirements

**Development:**
- Python >= 3.11 (for MkDocs)
- Node >= 20.0 (for Docusaurus in `v2/`)
- Git (for content management)
- Docker (optional, for containerized MkDocs dev)

**Production:**
- GitHub Pages (primary deployment target)
- Static hosting (no database, API server, or runtime required)

## Deployment

**Current Production:**
- GitHub Pages via `ghp-import`
- MkDocs site deployed from root directory
- CI/CD: `.github/workflows/ci.yml` (auto-deploy on push to main)

**Build Outputs:**
- MkDocs builds to `./site` directory
- Docusaurus builds to `v2/build` directory (not yet deployed)

---

*Stack analysis: 2026-03-29*

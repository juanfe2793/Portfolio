# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and technical blog for Juan Felipe Gómez Manzanares (Staff Software Engineer). The site is **migrating from MkDocs to Docusaurus v3** — both systems coexist in the repo. MkDocs is the current production system; the Docusaurus scaffold lives in `v2/`.

## Architecture

- **Root directory**: MkDocs site (Python/uv) — currently deployed to GitHub Pages
- **`v2/`**: Docusaurus v3 project (Node.js/TypeScript/React 19) — in-progress migration target
- **`docs/`**: MkDocs content (markdown files for portfolio, blog, guides)
- **`v2/src/pages/`**: Docusaurus page components (TSX) — currently placeholder templates
- **`v2/docs/` and `v2/blog/`**: Empty, awaiting content migration
- **`migration-planning/`**: CSV files mapping MkDocs content to Docusaurus structure
- **`utils/aws-scripts/`**: AWS helper scripts (unrelated to the site itself)

## Build & Development Commands

### MkDocs (current production)
```bash
uv sync                    # Install Python dependencies
uv run mkdocs serve        # Local dev server (port 8000)
uv run mkdocs build        # Build static site to ./site
```

### Docusaurus (v2/ directory)
```bash
cd v2
npm install                # Install Node dependencies
npm start                  # Local dev server
npm run build              # Production build
npm run typecheck          # TypeScript type checking (tsc)
```

### Docker (MkDocs only)
```bash
docker build -t portfolio .
docker run -p 8000:8000 portfolio
```

## CI/CD

- **`.github/workflows/ci.yml`**: Deploys MkDocs to GitHub Pages on push to `main`
- **`.github/workflows/test-ci.yml`**: Verifies MkDocs build on PRs and pushes to `main`
- Deployment target: GitHub Pages at `https://juanfe2793.github.io/Portfolio/`

## Key Config Files

- `mkdocs.yml` — MkDocs site config (Material theme, nav structure, markdown extensions)
- `v2/docusaurus.config.ts` — Docusaurus config (navbar, theme, deployment settings)
- `v2/tsconfig.json` — Extends `@docusaurus/tsconfig`
- `pyproject.toml` — Python deps managed by uv (requires Python >=3.11)

## Licensing

Dual-licensed: MIT for code, CC BY 4.0 for content.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and technical blog for Juan Felipe Gómez Manzanares (Staff Software Engineer). Built with Docusaurus v3 (Node.js/TypeScript/React 19), deployed to GitHub Pages.

## Architecture

- **Root directory**: Docusaurus v3 project — the portfolio site
- **`docs/`**: Content pages (portfolio CV, technical guides)
- **`blog/`**: Blog posts
- **`src/pages/`**: React page components (TSX)
- **`static/`**: Static assets (images, CSS)
- **`utils/aws-scripts/`**: AWS helper scripts (unrelated to the site)
- **`migration-plan/`**: Historical migration planning documents

## Build & Development Commands

```bash
npm install                # Install Node dependencies
npm start                  # Local dev server
npm run build              # Production build
npm run typecheck          # TypeScript type checking (tsc)
```

### Docker
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## CI/CD

- **`.github/workflows/ci.yml`**: Deploys Docusaurus to GitHub Pages on push to `main`
- **`.github/workflows/test-ci.yml`**: Verifies build + type check on PRs and pushes to `main`
- Deployment target: GitHub Pages at `https://juanfe2793.github.io/Portfolio/`

## Key Config Files

- `docusaurus.config.ts` — Docusaurus config (navbar, theme, URL redirects, deployment settings)
- `tsconfig.json` — Extends `@docusaurus/tsconfig`
- `sidebars.ts` — Sidebar structure for docs

## Licensing

Dual-licensed: MIT for code, CC BY 4.0 for content.

# External Integrations

**Analysis Date:** 2026-03-29

## APIs & External Services

**GitHub:**
- Integration: GitHub Pages hosting + repository links
  - Docs: `editUrl` in `v2/docusaurus.config.ts` links to `https://github.com/juanfe2793/Portfolio`
  - Auth: OAuth (GitHub Pages authentication handled by repository ownership)

**Social Media:**
- Links embedded in MkDocs theme configuration (`mkdocs.yml` extra.social):
  - GitHub: `https://github.com/juanfe2793`
  - LinkedIn: `https://linkedin.com/in/juangomez27`
  - Email: `mailto:hello@felipegomez.me`

## Data Storage

**Databases:**
- Not applicable - Static site only

**File Storage:**
- Local filesystem only
  - MkDocs content: `docs/` directory
  - Docusaurus content: `v2/docs/` and `v2/blog/` directories (empty, pending migration)
  - Images: `static/img/` (Docusaurus) and `docs/assets/` (MkDocs)

**Caching:**
- None configured

## Authentication & Identity

**Auth Provider:**
- Custom: GitHub Pages via GitHub OAuth
  - Implementation: Repository-based (owner authentication only)

**Email:**
- Contact email in footer: `hello@felipegomez.me`
  - No transactional email service integrated

## Monitoring & Observability

**Error Tracking:**
- Not detected

**Logs:**
- Local: `mkdocs.log` (development logging)
- No centralized logging or monitoring configured

## CI/CD & Deployment

**Hosting:**
- GitHub Pages (juanfe2793.github.io subdomain with `/Portfolio/` path)

**CI Pipeline:**
- GitHub Actions: `.github/workflows/ci.yml`
  - Trigger: Push to `main` branch
  - Steps: Checkout → Setup Python 3.11 → Install uv → uv sync → mkdocs build → Upload to Pages → Deploy
  - Permissions: read contents, write pages, write id-token
- GitHub Actions: `.github/workflows/test-ci.yml`
  - Trigger: Push to `main` and pull requests to `main`
  - Steps: Checkout → Setup Python 3.11 → Install uv → uv sync → mkdocs build
  - Purpose: Verify MkDocs build succeeds before deployment

## Environment Configuration

**Required env vars:**
- `NO_MKDOCS_2_WARNING=1` - Set in CI/CD and Docker to suppress MkDocs deprecation notice

**Secrets location:**
- None required - static site with public GitHub repository
- GitHub Pages deployment uses OIDC token (no manual secrets needed)

## Webhooks & Callbacks

**Incoming:**
- Not applicable - Static site

**Outgoing:**
- GitHub Pages deployment webhook (automatic on CI/CD completion)

## DNS & Domain Configuration

**Custom Domain:**
- Not configured (using default GitHub Pages URL)
- Site serves from: `https://juanfe2793.github.io/Portfolio/`

## Search & Navigation

**Search:**
- MkDocs: Built-in search plugin enabled (no external service)
- Docusaurus: Search capability via `@docusaurus/preset-classic` (no external search service configured)

## Content Delivery

**CDN:**
- GitHub Pages serves all static assets (no separate CDN configured)

## Unused/Removed Integrations

**Analytics:**
- Not detected in current configuration

**Comments/Discussion:**
- Not configured

**Social Sharing:**
- Manual links only (no SDK integration)

---

*Integration audit: 2026-03-29*

# External Integrations

**Analysis Date:** 2026-03-29

## APIs & External Services

**No external APIs detected.** This is a static documentation site with no runtime API integrations. The portfolio/blog content is self-contained and published as static HTML/CSS/JS.

## Data Storage

**Databases:**
- Not applicable - Static site, no persistent backend storage

**File Storage:**
- Local filesystem only
  - MkDocs content: `docs/` directory
  - Docusaurus content: `v2/docs/` and `v2/blog/` directories
  - Static assets: `v2/static/` directory
  - CSS/Images: `docs/assets/css/`, `v2/src/css/`

**Caching:**
- None - Static site generation only

## Authentication & Identity

**Auth Provider:**
- Not applicable - Public portfolio site, no authentication required

## Analytics & Monitoring

**Analytics:**
- Not detected - No analytics SDK or tracking code found in codebase
- Portfolio contains content about work (no tracking/telemetry in the app itself)

**Error Tracking:**
- Not detected - No Sentry, Rollbar, or similar error tracking integration

**Logs:**
- Local only: `mkdocs.log` generated during development
- GitHub Actions logs available in `.github/workflows/`

## CI/CD & Deployment

**Hosting:**
- GitHub Pages - Public static site hosting
  - Domain: `https://juanfe2793.github.io/Portfolio/` (current MkDocs)
  - Deployment: Automatic on push to `main` branch

**CI Pipeline:**
- GitHub Actions - two workflows present:

  **1. Deploy MkDocs (`.github/workflows/ci.yml`)**
  - Trigger: Push to `main` branch
  - Permissions: contents:read, pages:write, id-token:write
  - Steps:
    - Checkout code via `actions/checkout@v4`
    - Setup Python 3.11 via `actions/setup-python@v5`
    - Install uv and dependencies via `uv sync --frozen`
    - Build site: `uv run mkdocs build`
    - Configure Pages via `actions/configure-pages@v5`
    - Upload artifact to GitHub Pages
    - Deploy via `actions/deploy-pages@v4`

  **2. Verify Build (`.github/workflows/test-ci.yml`)**
  - Trigger: Push to `main` and pull requests to `main`
  - Concurrency: Cancel in-progress runs for same workflow/ref
  - Steps:
    - Checkout code
    - Setup Python 3.11
    - Install uv and dependencies
    - Build site (no deployment)
  - Purpose: Verify build succeeds before merging PRs

## Environment Configuration

**Required Environment Variables:**
- `NO_MKDOCS_2_WARNING=1` - Suppress MkDocs 2.0 warning
  - Set in: Dockerfile and CI workflows
  - Not sensitive, for development/build only

**GitHub Secrets:**
- None detected in codebase
- GitHub Pages deployment uses OIDC token automatically provided by GitHub Actions

**Configuration Files:**
- `.github/workflows/ci.yml` - Deployment workflow
- `.github/workflows/test-ci.yml` - Build verification workflow
- `Dockerfile` - MkDocs containerization

## Social & External Links

**Hardcoded External References:**
- GitHub: `https://github.com/juanfe2793` (in mkdocs.yml and docusaurus.config.ts)
- LinkedIn: `https://linkedin.com/in/juangomez27` (in mkdocs.yml)
- Email: `mailto:hello@felipegomez.me` (contact method)
- UI Avatars API: `https://ui-avatars.com/api/?name=Juan+Felipe&background=0D9488&color=fff&size=200&rounded=true`
  - Used for profile avatar generation in `docs/index.md`

**Blog Configuration (MkDocs):**
- Location: `mkdocs.yml` plugins section
- Blog directory: `blog/`
- Post excerpt: Required for all blog posts
- URL format: `/blog/YYYY/MM/DD/post-title/`

**Blog Configuration (Docusaurus):**
- Location: `v2/docusaurus.config.ts` preset config
- Feed options: RSS and Atom feeds enabled
- Reading time calculation: Enabled (`showReadingTime: true`)
- Directory: `v2/blog/` (currently empty)

## Webhooks & Callbacks

**Incoming:**
- None - Static site, no webhook receivers

**Outgoing:**
- None - No outbound webhooks or callbacks

## Migration Considerations

**Current State:**
- MkDocs (Python) is the production system
- Docusaurus (Node.js/TypeScript) is scaffolded in `v2/` for migration

**Migration Artifacts:**
- `generate_migration_data.py` - Python script to map MkDocs content to Docusaurus
- Location: `/Users/juanfe/code/Portfolio/generate_migration_data.py`
- Purpose: Data transformation for content migration
- `migration-planning/` - CSV files with content mapping (per CLAUDE.md)

**Deploy Strategy:**
- GitHub Pages can serve from the same repository
- No API changes needed - both MkDocs and Docusaurus generate static sites
- Build artifacts go to different directories:
  - MkDocs: `./site/`
  - Docusaurus: `v2/build/`

## Docker Integration

**Containerization (MkDocs only):**
- Dockerfile location: `/Users/juanfe/code/Portfolio/Dockerfile`
- Base image: `python:3.11-slim`
- Exposed port: 8000 (MkDocs dev server)
- Process: `uv sync --frozen` → `uv run mkdocs serve --dev-addr 0.0.0.0:8000`
- Use case: Local development and testing in isolated environment
- Image build: `docker build -t portfolio .`
- Container run: `docker run -p 8000:8000 portfolio`

---

*Integration audit: 2026-03-29*

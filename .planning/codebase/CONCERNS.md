# Codebase Concerns

**Analysis Date:** 2026-03-29

## Tech Debt

**Dual Site System (MkDocs + Docusaurus):**
- Issue: Project maintains two parallel documentation systems in same repository with no clear migration completion timeline. MkDocs is production; Docusaurus v2/ is in-progress scaffold.
- Files: Root directory (MkDocs), `v2/` directory (Docusaurus)
- Impact:
  - Maintenance burden: changes must be coordinated across both systems
  - Content duplication risk: migration mapping exists but content is not migrated
  - Deployment complexity: two build pipelines, two deployment targets
  - Developer confusion: unclear which system should receive new content
- Fix approach:
  - Complete content migration from `docs/` → `v2/docs/` and `v2/blog/`
  - Switch GitHub Pages deployment to Docusaurus once complete
  - Remove MkDocs root directory files and infrastructure
  - Timeline: Establish clear migration deadline before further development

**Placeholder Docusaurus Content:**
- Issue: Docusaurus `v2/docs/intro.md` and `v2/blog/` contain template/example content from Docusaurus scaffold, not actual portfolio content
- Files: `v2/docs/intro.md`, `v2/docs/tutorial-basics/`, `v2/docs/tutorial-extras/`, `v2/blog/2019-*.md`, `v2/blog/2021-*.md`
- Impact: Live Docusaurus site (if deployed) would show irrelevant tutorial content instead of actual portfolio/CV/guides
- Fix approach: Replace with content from `docs/guides/`, `docs/portfolio/cv.md`, and `docs/blog/posts/`

**Content Inventory Mapping Incomplete:**
- Issue: `generate_migration_data.py` created mapping files in `migration-planning/` but actual content migration to Docusaurus structure is incomplete
- Files: `generate_migration_data.py`, `migration-planning/content_inventory.csv`, `migration-planning/url_mapping.csv`, `migration-planning/static_assets.csv`
- Impact: 15 content files mapped but not migrated; URL structure changes (e.g., `/guides/` → `/docs/guides/`) not reflected in Docusaurus
- Fix approach:
  - Automate content migration script to copy and transform markdown files
  - Update internal links in migrated content to reflect new URL structure
  - Verify all assets referenced in CSV are copied to `v2/static/`

**MkDocs Navigation Configuration Inconsistency:**
- Issue: `mkdocs.yml` nav configuration excludes one guide file: `guides/aws_cli_commands.md` exists in `docs/guides/` but not listed in nav
- Files: `mkdocs.yml` (line 87-102), `docs/guides/aws_cli_commands.md`
- Impact: File is built but hidden from navigation in current production site
- Fix approach: Either add to nav or remove file; clarify if intentional exclusion

**Incomplete Migration Planning:**
- Issue: `migration-planning/` contains CSV mapping but no generated Docusaurus structure. Script only generates inventory, not actual migrated files.
- Files: `migration-planning/content_inventory.csv`, `generate_migration_data.py`
- Impact: Manual migration work required; no automation to prevent link breakage during migration
- Fix approach: Extend `generate_migration_data.py` to also copy/transform files, update internal links

## Known Bugs

**Site URL Mismatch in MkDocs Config:**
- Issue: `mkdocs.yml` line 2 specifies `site_url: https://juanfe2793.github.io/JuanPipe/` but README.md and CI workflows reference `/Portfolio/`
- Files: `mkdocs.yml` (line 2), `README.md`, `.github/workflows/ci.yml`
- Symptom: Incorrect canonical URLs in sitemap/metadata, potentially broken SEO
- Trigger: Any build process that uses `site_url` from config
- Workaround: Manually correct in generated HTML

**Docusaurus Broken Link Detection Too Strict:**
- Issue: `v2/docusaurus.config.ts` line 28 sets `onBrokenLinks: 'throw'`, which will fail build if any internal links are broken during content migration
- Files: `v2/docusaurus.config.ts` (line 28)
- Symptom: Build errors if migrated content references URLs that don't exist yet in Docusaurus structure
- Trigger: Adding new doc files with cross-references before all files are migrated
- Workaround: Temporarily change to `'warn'` during migration, revert to `'throw'` after completion

**Missing Actual Portfolio Content in Docusaurus:**
- Issue: Current Docusaurus `v2/` only has example/tutorial files. Real portfolio content (`docs/portfolio/cv.md` with MkDocs grid/admonition syntax) not present
- Files: `v2/docs/intro.md`, `docs/portfolio/cv.md` (source)
- Symptom: If Docusaurus site is deployed, shows generic tutorial instead of professional portfolio
- Trigger: Docusaurus build succeeds with template content, giving false sense of completeness

## Security Considerations

**Dockerfile with Root Execution:**
- Issue: `Dockerfile` builds MkDocs container but does not specify non-root user
- Files: `Dockerfile`
- Risk: Container runs as root, violating security best practices
- Current mitigation: Container is development-only (not in production CI/CD)
- Recommendations: Add `USER` directive to run as non-root user; use `python:3.11-slim` base image with dedicated user

**GitHub Actions Workflows Using Checkout v4:**
- Issue: `.github/workflows/ci.yml` and `test-ci.yml` use `actions/checkout@v4` with default GITHUB_TOKEN
- Files: `.github/workflows/ci.yml`, `.github/workflows/test-ci.yml`
- Risk: If repo is compromised, workflows could exfiltrate secrets
- Current mitigation: `permissions` block correctly restricts to `contents: read, pages: write, id-token: write`
- Recommendations: Continue using minimal permission scopes; consider OIDC for GitHub Pages deployment

**Python Dependencies Not Vendored:**
- Issue: `uv.lock` and `v2/package-lock.json` contain exact versions but dependencies installed from public registries during CI
- Files: `uv.lock`, `v2/package-lock.json`, CI workflows
- Risk: Supply chain attack via compromised PyPI or npm package
- Current mitigation: Lockfile pinning prevents version injection; frozen installs used in CI
- Recommendations: Monitor for security advisories in MkDocs, Docusaurus, and dependencies; consider GitHub Dependabot alerts

**No Content Security Policy or Headers:**
- Issue: No custom security headers configured in MkDocs or Docusaurus deployment
- Files: `mkdocs.yml`, `v2/docusaurus.config.ts`
- Risk: GitHub Pages defaults used (likely minimal CSP)
- Impact: Potential for XSS in user-generated content (low risk for static site)
- Recommendations: Add Content-Security-Policy, X-Frame-Options, X-Content-Type-Options if custom deployment used

## Performance Bottlenecks

**Large node_modules Directory:**
- Problem: `v2/node_modules/` is 355MB, `.docusaurus/` is 264KB, significantly slowing clones/installations
- Files: `v2/node_modules/`, `v2/.docusaurus/` (generated)
- Cause: Docusaurus ecosystem includes large dependencies (PostCSS, Webpack, Babel, React 19)
- Current: Both directories properly gitignored; not committed to repo
- Improvement path:
  - Use `npm ci` in CI (already done in workflows)
  - Consider caching dependencies in GitHub Actions (not currently done)
  - Add `.github/workflows/cache` to speed up CI builds

**Docusaurus Build Output Not Cached:**
- Problem: `v2/build/` (2.1MB) and `v2/.docusaurus/` (264KB) regenerated on every build in CI
- Files: `.github/workflows/ci.yml`, `v2/docusaurus.config.ts`
- Cause: CI workflows do not cache Docusaurus build artifacts
- Impact: CI builds take longer than necessary
- Improvement: Add GitHub Actions `actions/cache@v3` to cache `v2/.docusaurus/` and `v2/build/`

**MkDocs Build on Each Commit:**
- Problem: Current CI always builds MkDocs site even for non-content changes (e.g., updating `.gitignore`)
- Files: `.github/workflows/ci.yml`
- Cause: No path filtering in workflow trigger
- Impact: Unnecessary compute; slow feedback on non-content changes
- Improvement: Add `paths:` filter to only build when `docs/`, `mkdocs.yml`, or source files change

## Fragile Areas

**Content Migration Script Lacks Validation:**
- Files: `generate_migration_data.py`
- Why fragile: Script generates CSV mapping but doesn't verify:
  - All referenced source files exist
  - Target directories will have proper structure
  - Links in markdown will work after migration
  - Asset paths are valid
- Safe modification: Add validation functions before file copying; generate warnings for complex syntax (grid, admonitions) that may need manual adjustment
- Test coverage: None; script has no tests

**Docusaurus Sidebar Autogeneration:**
- Files: `v2/sidebars.ts` (line 17 uses autogenerated)
- Why fragile: Sidebar automatically generated from `v2/docs/` directory structure. If docs are reorganized without thinking about sidebar, navigation breaks.
- Safe modification: Explicitly define sidebar structure in `sidebars.ts` instead of autogenerated, so structural changes are intentional
- Test coverage: None; no tests for sidebar structure

**Hardcoded Docusaurus Configuration URLs:**
- Files: `v2/docusaurus.config.ts` (lines 18, 21, 47, 58, 93, 106, 115, 119, 125, 137, 141)
- Why fragile: URLs, GitHub org, project name hardcoded throughout config. If repo is renamed/moved, multiple manual updates required.
- Safe modification: Extract to environment variables or constants at top of file
- Test coverage: None; config not tested

**SVG Image Import Using require():**
- Files: `v2/src/components/HomepageFeatures/index.tsx` (lines 15, 25, 35)
- Why fragile: Uses `require('@site/static/img/...')` syntax which is deprecated in modern Webpack. May break in future Docusaurus versions.
- Safe modification: Use ES6 import syntax: `import UndrawMountain from '@site/static/img/undraw_docusaurus_mountain.svg'`
- Test coverage: None; component has no tests

**Placeholder Content Mixed with Production Config:**
- Files: `v2/` directory contains both template files and production configuration
- Why fragile: Easy to accidentally commit template content to production branch
- Safe modification: Create separate template/example branch; use pre-commit hooks to prevent committing tutorial files
- Test coverage: None; no validation that only real content is in `v2/docs/` and `v2/blog/`

## Scaling Limits

**GitHub Pages Capacity:**
- Current capacity: Site builds to ~2.1MB (Docusaurus build artifact), well within GitHub Pages limits (site size ≤ 1GB)
- Limit: If portfolio content grows significantly (e.g., high-res images, videos), could approach GitHub Pages soft limits
- Scaling path: Static assets (images >1MB) should be served from external CDN (e.g., AWS S3 + CloudFront); keep GitHub Pages for HTML/CSS/JS only

**Single Production Deployment Target:**
- Current: All traffic to `https://juanfe2793.github.io/Portfolio/`
- Limit: GitHub Pages has no SLA for uptime or performance; single region (US)
- Scaling path: If portfolio becomes critical, mirror to secondary CDN (Netlify, Vercel) or use AWS CloudFront with S3 origin

## Dependencies at Risk

**playwright 1.57.0:**
- Risk: Unused dependency; included in `pyproject.toml` but not referenced anywhere in codebase
- Impact: Increases install time, adds potential security vulnerability surface
- Migration plan: Remove from `pyproject.toml` unless used for content screenshots/PDF generation; document if needed later

**No Test Framework:**
- Risk: Docusaurus components and utility scripts have no test coverage
- Impact: Refactoring is risky; bugs in components (e.g., HomepageFeatures) would not be caught
- Migration plan: Add Jest/Vitest config to `v2/`; add unit tests for React components

**Docusaurus v4 Future Flag Enabled:**
- Risk: Config in `v2/docusaurus.config.ts` (line 14) sets `future: { v4: true }` for compatibility, but Docusaurus v4 is not yet released
- Impact: Future breaking changes may be introduced now; unclear if all v4 changes are compatible with current setup
- Recommendation: Monitor Docusaurus v4 beta releases; test compatibility before major updates

**Python Version Pinning:**
- Risk: `pyproject.toml` requires Python >=3.11 but doesn't cap upper bound
- Impact: Major version upgrades (e.g., 3.12, 4.0) could break MkDocs
- Recommendation: Pin to `python = "~3.11"` to allow patch/minor updates but prevent major version jump

## Missing Critical Features

**No Environment-Specific Deployment Configuration:**
- Problem: `mkdocs.yml` and `v2/docusaurus.config.ts` have hardcoded URLs and settings
- Blocks: Cannot easily deploy preview/staging versions to alternate URLs
- Impact: Pull request previews not possible; only full production deployments
- Solution: Use environment variables for `site_url`, `baseUrl`, `organizationName`, `projectName`

**No Analytics or Monitoring:**
- Problem: No tracking configured for page views, errors, or user engagement
- Blocks: Cannot measure portfolio impact; no visibility into site health
- Impact: Unaware if portfolio site is down or not being viewed
- Solution: Add Google Analytics (simple), Sentry (error tracking), or equivalent

**No Redirects for Old URLs:**
- Problem: MkDocs → Docusaurus migration will change URLs (e.g., `/guides/` → `/docs/guides/`)
- Blocks: Old links (e.g., shared on LinkedIn, referenced in emails) will 404
- Impact: Broken external references; bad SEO due to link rot
- Solution: Configure GitHub Pages redirects or Docusaurus `routeBasePath` to maintain old URLs

**No Search Configuration:**
- Problem: Docusaurus has search enabled but not configured (using default)
- Blocks: Cannot customize search behavior, language, or exclude certain pages
- Impact: Search quality depends on Docusaurus defaults; may miss custom documentation
- Solution: Configure DocSearch (Algolia) or configure local search options

## Test Coverage Gaps

**No Tests for Docusaurus Configuration:**
- What's not tested: `v2/docusaurus.config.ts` correctness, navigation structure, URL generation
- Files: `v2/docusaurus.config.ts`, `v2/sidebars.ts`
- Risk: Misconfiguration (e.g., broken links due to bad routes) not caught until build or manual testing
- Priority: Medium - caught early in build process, but could be prevented with integration tests

**No Component Tests:**
- What's not tested: React components in `v2/src/pages/` and `v2/src/components/`
- Files: `v2/src/pages/index.tsx`, `v2/src/components/HomepageFeatures/index.tsx`
- Risk: Changes to props, conditional rendering, or CSS classes silently break UI
- Priority: Low for static portfolio, but good practice; add Jest + React Testing Library

**No Content Validation Tests:**
- What's not tested: Markdown files in `v2/docs/` and `v2/blog/` have valid frontmatter, no broken links, proper syntax
- Files: All `.md` and `.mdx` files in content directories
- Risk: Broken or malformed content not caught; migration could introduce syntax errors
- Priority: High - should be CI gate before deployment; add `remark` or similar markdown linter

**No Migration Validation Tests:**
- What's not tested: `generate_migration_data.py` correctly identifies all content, maps URLs, counts words accurately
- Files: `generate_migration_data.py`
- Risk: Script silently fails to migrate files or produces incorrect mapping; gaps in content not detected
- Priority: High - should run before migration to catch issues; add unit tests with sample markdown files

**No Accessibility Tests:**
- What's not tested: Pages meet WCAG 2.1 AA standards; semantic HTML, color contrast, keyboard navigation
- Files: All pages in `v2/`
- Risk: Portfolio site inaccessible to users with disabilities; bad optics for engineer
- Priority: Medium - automate with Pa11y or similar in CI

**No E2E Tests:**
- What's not tested: Full user flows (navigate homepage → blog → guides → back to homepage)
- Files: Entire `v2/` site
- Risk: Regression in navigation, broken links, or missing pages not caught
- Priority: Medium - should verify core paths work; use Playwright (already in deps) or Cypress

---

*Concerns audit: 2026-03-29*

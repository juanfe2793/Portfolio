# Codebase Concerns

**Analysis Date:** 2026-03-29

## Migration Blockers

**URL/Domain Mismatch:**
- Issue: MkDocs config (`mkdocs.yml`) specifies `site_url: https://juanfe2793.github.io/JuanPipe/` (note "JuanPipe"), but repository is "Portfolio" and Docusaurus config uses `/Portfolio/` baseUrl
- Files: `mkdocs.yml` (line 2), `v2/docusaurus.config.ts` (line 21), `README.md` (URL references JuanPipe)
- Impact: Broken links, incorrect canonical URLs, potential SEO issues, user confusion between old and new domains during migration
- Fix approach: Standardize on single domain. Either rename GitHub repo to "JuanPipe" or update mkdocs.yml site_url to use "/Portfolio/" consistently across both systems

**Content Not Migrated:**
- Issue: Docusaurus `v2/docs/` and `v2/blog/` contain only boilerplate tutorial content, not actual site content
- Files: `v2/docs/intro.md`, `v2/docs/tutorial-basics/`, `v2/blog/*.md` (all generic Docusaurus defaults)
- Impact: Docusaurus site is non-functional as portfolio; cannot be deployed as replacement for MkDocs. All 13 content files from `docs/` (index, guides, portfolio, blog posts) must be migrated
- Fix approach: Use migration planning CSVs (`migration-planning/content_inventory.csv`, `url_mapping.csv`) to systematically copy and convert content. Execute automated migration script or manual copy with format conversion

**Missing Content Inventory Execution:**
- Issue: Migration planning exists (`migration-planning/` contains content_inventory.csv and url_mapping.csv) but no automated migration has occurred. Placeholder `generate_migration_data.py` exists but appears unused
- Files: `migration-planning/content_inventory.csv`, `migration-planning/url_mapping.csv`, `generate_migration_data.py`
- Impact: No progress on actual migration; risk of content getting out of sync if MkDocs is updated before migration completes
- Fix approach: Create and execute migration script that uses the CSV data to copy/convert files from `docs/` to `v2/docs/` and `v2/blog/`

## Configuration & Setup Gaps

**Docusaurus README Outdated:**
- Issue: `v2/README.md` references yarn commands but project uses npm (based on package-lock.json present, .nvmrc specifies Node 20)
- Files: `v2/README.md` (all development command examples)
- Impact: Developers following README will run wrong commands, wasting time troubleshooting
- Fix approach: Update all yarn commands to npm equivalents (e.g., `yarn` → `npm install`, `yarn start` → `npm start`)

**Node Version Mismatch Risk:**
- Issue: `.nvmrc` specifies Node 20, but `package.json` requires `node >= 20.0`. CI/CD workflows have no explicit Node version pin
- Files: `v2/.nvmrc`, `v2/package.json`, `.github/workflows/ci.yml`, `.github/workflows/test-ci.yml`
- Impact: CI/CD may use unexpected Node version; local dev environment requires manual .nvmrc setup awareness
- Fix approach: Add `actions/setup-node@v4` to both workflows with `node-version-file: './v2/.nvmrc'` for consistency

**Dual Build Systems, No Clear Migration Timeline:**
- Issue: Both MkDocs (Python/uv) and Docusaurus (Node/npm) are buildable but CI/CD only deploys MkDocs
- Files: `.github/workflows/ci.yml` (deploys MkDocs), `.github/workflows/test-ci.yml` (tests MkDocs), no Docusaurus deployment workflow
- Impact: Risk of forgetting to update CI/CD when migration completes; dual systems increase maintenance burden
- Fix approach: Create explicit migration timeline. Either: (1) remove v2 directory if migration is abandoned, or (2) add feature flag to ci.yml to conditionally deploy v2 when ready

## Markdown & Content Fragility

**AWS Guide Not in Navigation:**
- Issue: `docs/guides/aws_cli_commands.md` exists but is not included in `mkdocs.yml` nav section
- Files: `mkdocs.yml` (nav: lines 92-103, missing aws_cli_commands), `docs/guides/aws_cli_commands.md` (orphaned)
- Impact: Content is built and searchable but not discoverable via navigation; MkDocs warns on every build
- Fix approach: Add `- AWS CLI: guides/aws_cli_commands.md` to the nav section in mkdocs.yml under Technical Guides

**Complex Markdown Syntax May Not Translate:**
- Issue: MkDocs uses `attr_list` extension (custom {: .class} attributes) for grid layouts in `docs/portfolio/cv.md`. Docusaurus does not have direct equivalent
- Files: `mkdocs.yml` (markdown_extensions: line 46), `docs/portfolio/cv.md` (uses admonitions and grid)
- Impact: When content is migrated to v2, custom layouts in CV will break or display incorrectly unless Docusaurus CSS modules are used or Markdown is rewritten
- Fix approach: Audit `docs/portfolio/cv.md` for attr_list usage; plan JSX/CSS module rewrites or use Docusaurus MDX features for complex layouts

**Missing Content Linkage Between Systems:**
- Issue: MkDocs and Docusaurus navbars do not cross-link. Users landing on v2 will not see MkDocs content and vice versa
- Files: `mkdocs.yml` (nav), `v2/docusaurus.config.ts` (navbar, lines 77-96)
- Impact: During dual-system period, confusing UX; no clear path to migrate user bookmarks and search engine crawlers
- Fix approach: Add prominent banner to both sites linking to the other during migration period; use redirects after migration completes

## Dependency & Maintenance Concerns

**mkdocs-exclude is Unmaintained:**
- Issue: `pyproject.toml` requires `mkdocs-exclude>=1.0.2`. Per migration audit, this is flagged as potentially unmaintained; much functionality is now native to MkDocs
- Files: `pyproject.toml` (line 9), `mkdocs.yml` (plugins: exclude, lines 83-85)
- Impact: Future MkDocs updates may break compatibility; the plugin may not receive security patches
- Fix approach: Before full migration completion, replace mkdocs-exclude usage with native MkDocs `exclude_docs` config or .gitignore patterns

**Playwright Unused:**
- Issue: `pyproject.toml` depends on `playwright>=1.57.0` but no code in codebase uses it; appears to be for optional screenshot/visual testing
- Files: `pyproject.toml` (line 10)
- Impact: Adds ~100MB to uv sync and Docker image; unused dependency increases attack surface
- Fix approach: Determine if Playwright is used. If not, remove from dependencies. If needed for CI screenshots, isolate to dev dependency or separate workflow

**Python 3.11 Minimum, No Upper Bound:**
- Issue: `pyproject.toml` requires `python >= 3.11` but no upper bound specified. If Python 3.13+ introduces breaking changes in MkDocs ecosystem, builds could fail
- Files: `pyproject.toml` (line 6)
- Impact: Fragile long-term; CI/CD could break unexpectedly when GitHub runners update Python versions
- Fix approach: Add reasonable upper bound (e.g., `python = ">=3.11, <4"`). Explicitly test against Python 3.13 in CI

**npm/Node Dependencies Growing Without Lock Discipline:**
- Issue: `v2/package-lock.json` is committed (good), but no `npm ci` in workflows; workflows use `npm install` which can update lock file during CI
- Files: `.github/workflows/ci.yml` (line 31), `.github/workflows/test-ci.yml` (line 31)
- Impact: CI builds non-deterministic; can introduce subtle bugs or security vulnerabilities
- Fix approach: Change to `npm ci --frozen-lockfile` in workflows; establish policy that package-lock.json is never updated outside PR review

## Security & Exposure

**Environment Variable for MkDocs Suppression:**
- Issue: `Dockerfile` sets `ENV NO_MKDOCS_2_WARNING=1` to suppress warning. While harmless, it suggests MkDocs 2.0 migration debt
- Files: `Dockerfile` (line 8), also set in CI workflows (lines 39, 35)
- Impact: Minor; indicates possible version compatibility issue. If upgrading MkDocs, this warning should be properly addressed
- Fix approach: Document what MkDocs 2.0 warning means and whether it can be resolved properly

**No linting or type-checking in CI:**
- Issue: `v2/package.json` defines `typecheck: "tsc"` script (line 15) but CI workflows never run it. TypeScript errors can ship to production
- Files: `.github/workflows/ci.yml`, `.github/workflows/test-ci.yml`, `v2/package.json`
- Impact: No type safety validation in CI; regressions in TypeScript code are not caught
- Fix approach: Add `npm run typecheck` to test-ci.yml after build, before deployment. Consider strict tsconfig if not already set

## Technical Debt & Code Quality

**Minimal React Component Coverage:**
- Issue: Only 159 lines of React code in `v2/src/` (44 lines in index.tsx, 71 in HomepageFeatures/index.tsx, 44 in other files). Homepage is mostly boilerplate
- Files: `v2/src/pages/index.tsx`, `v2/src/components/HomepageFeatures/index.tsx`
- Impact: When migrating actual portfolio content, substantial React component work will be needed. Current scaffolding is template-only
- Fix approach: Design actual homepage layout and portfolio showcase components early in migration. Don't wait until end

**No CSS Organization Strategy:**
- Issue: Single `v2/src/css/custom.css` file (unclear size/organization). No design system or component styles documented
- Files: `v2/src/css/custom.css`
- Impact: Risk of CSS becoming unmaintainable as site grows. No clear pattern for new developers to follow
- Fix approach: Adopt CSS modules (Docusaurus supports) or Tailwind + component scoping. Document pattern in CONVENTIONS

**Dual License Complexity Not Reflected in Migration:**
- Issue: Repo uses CC BY 4.0 for content and MIT for code, but Docusaurus config copyright notice only mentions "Juan Felipe Gomez" (line 141) without license clarity
- Files: `v2/docusaurus.config.ts` (line 141), `LICENSE`, `LICENSE-CC-BY-4.0`
- Impact: Unclear to users which content can be reused and under which terms during migration; potential IP confusion
- Fix approach: Update Docusaurus footer copyright to mention dual licensing. Use Docusaurus metadata to tag docs vs blog for proper license attribution

## Build & Deployment Pipeline

**MkDocs Builds Have Outdated Warnings:**
- Issue: `mkdocs.log` shows build completes successfully but earlier version notes "guides/aws_cli_commands.md" not in nav (harmless but sloppy)
- Files: `mkdocs.log`
- Impact: Noise in build output; easy to miss real issues
- Fix approach: Fix the nav inclusion issue noted above

**No Staging/Preview Environment:**
- Issue: CI/CD deploys directly to GitHub Pages on main push. No preview URLs for PRs
- Files: `.github/workflows/ci.yml` (no conditional/preview steps)
- Impact: PRs cannot be previewed before merge; caught content issues mean rollback instead of fix-forward
- Fix approach: Add netlify/vercel preview deployment or custom GitHub Pages preview subdomain on PR. Require passing checks before merge

**Deployment Timing Not Coordinated:**
- Issue: MkDocs and Docusaurus have no coordinated deployment. During migration, unclear which system is "live"
- Files: `.github/workflows/ci.yml`, (no Docusaurus deployment workflow)
- Impact: Risk of deploying incomplete migration by accident; manual coordination error-prone
- Fix approach: Add feature flag or environment variable to ci.yml to control which system deploys (MkDocs vs Docusaurus)

## Testing & Validation Gaps

**No Tests Defined:**
- Issue: No test files (*.test.tsx, *.spec.ts, jest/vitest config) in v2/; MkDocs has no test coverage either
- Files: No test files found
- Impact: No regression detection; broken links, typos, or layout issues go undetected until users report
- Fix approach: Set up link checker in CI (e.g., remark-validate-links for Markdown, htmlhint/linkchecker for build output). Add Playwright tests for critical pages

**Migration Validation Not Automated:**
- Issue: `url_mapping.csv` exists but no tool validates that all URLs migrate correctly or that no links break post-migration
- Files: `migration-planning/url_mapping.csv`, no validator script
- Impact: High risk of broken internal links during migration; users will encounter 404s
- Fix approach: Write script to parse url_mapping.csv and verify all old URLs redirect or have equivalents in v2 docs

## Known Risks & Mitigation

**Long Migration Window = Higher Risk:**
- Issue: Dual systems (MkDocs production + Docusaurus in progress) must coexist until all content migrates. No target completion date evident
- Impact: Maintenance burden increases; bug fixes may need to be applied to both systems
- Fix approach: Set explicit migration deadline (e.g., end of Q2 2026). Prioritize content migration over feature perfection

**Portfolio Not Fully Functional Until Migration Complete:**
- Issue: Docusaurus v2 cannot replace production until all content is migrated AND verified
- Impact: If migration is abandoned half-way, two broken systems instead of one working MkDocs
- Fix approach: Establish clear go/no-go decision point at 80% content migration. Commit resources or rollback

---

*Concerns audit: 2026-03-29*

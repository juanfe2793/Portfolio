# Roadmap: Portfolio — Docusaurus Migration Milestone

**Milestone:** v1 — Launch on felipegomez.me
**Target:** 2026-05-18 (site live) → 2026-06-30 (full brand build)
**Status:** In Progress — Phase 1 Complete

---

## Phase Overview

| Phase | Name | Status | Requirements | Est. |
|-------|------|--------|-------------|------|
| 1 | Foundation & Scaffolding | ✓ Complete | FOUND-01–03 | Done |
| 2 | Content Migration | ● Planning | CONT-01–06 | 3.5 weeks |
| 3 | Theme, Styling & Components | ○ Pending | THEME-01–06 | 1.5 weeks |
| 4 | CI/CD Pipeline | ○ Pending | CICD-01–04 | 1 week |
| 5 | Testing, QA & Launch | ○ Pending | QA-01–06 | 1.5 weeks |
| 6 | Custom Domain Setup | ○ Pending | DOMAIN-01–06 | 2 days |

---

## Phase 1: Foundation & Scaffolding ✓

**Goal:** Docusaurus running locally with all plugins configured and Docker dev environment ready.

**Status:** Complete (Issues #73 + #74 merged, Sprint 2)

**Delivered:**
- Docusaurus v3.9.2 scaffold with TypeScript config (`v2/`)
- `v2/Dockerfile` multi-stage (node:20-alpine) + `v2/docker-compose.yml` (dev + prod profiles)
- Plugins: docs, blog, sitemap, client-redirects (seeded redirect map)
- `npm run build` and `npm run typecheck` pass clean

**Key commits:** `438171f` (Docker), `12838a1` (plugins)

---

## Phase 2: Content Migration

**Goal:** All MkDocs content (CV, blog posts, guides) renders correctly in Docusaurus with no broken links or syntax errors.

**Requirements:** CONT-01, CONT-02, CONT-03, CONT-04, CONT-05, CONT-06

**Plans:** 4 plans

Plans:
- [ ] 02-01-PLAN.md — Placeholder clearance, CV migration, and static assets (CONT-01, CONT-05)
- [ ] 02-02-PLAN.md — Blog post migration with frontmatter conversion (CONT-02)
- [ ] 02-03-PLAN.md — Technical guides migration with sidebar config (CONT-03, CONT-04)
- [ ] 02-04-PLAN.md — Redirect activation and validation (CONT-06)

**Success criteria:**
- `npm run build` completes with zero errors
- Every migrated page visually matches MkDocs source
- All 11 URL redirects activated and tested
- No broken image/asset links

---

## Phase 3: Theme, Styling & Components

**Goal:** Custom visual identity with dark/light mode, proper navbar/footer, and reusable MDX components.

**Requirements:** THEME-01, THEME-02, THEME-03, THEME-04, THEME-05, THEME-06

**Success criteria:**
- Dark/light mode works across all page types
- Navbar links correct; mobile hamburger works
- SkillBadge and Timeline components importable in any MDX file
- Landing page loads in <3s on 3G (Lighthouse)

### Plans

**Plan 3.1 — Theme Configuration**
- Define color palette + typography tokens in `docusaurus.config.ts` themeConfig
- Write `src/css/custom.css` with CSS custom properties
- Configure `colorMode` with coherent light/dark palettes
- Requirements: THEME-01

**Plan 3.2 — Navbar & Footer**
- Update navbar: Docs, Blog, CV/Resume, GitHub links
- Update footer: social links, copyright, clean layout
- Test mobile responsive hamburger menu
- Requirements: THEME-02, THEME-03

**Plan 3.3 — MDX Components**
- Build `<SkillBadge />` (name, level, icon props) in `src/components/`
- Build `<Timeline />` (entries array prop) in `src/components/`
- Register both in global MDX scope via `MDXComponents`
- Requirements: THEME-04, THEME-05

**Plan 3.4 — Landing Page**
- Design and implement `src/pages/index.tsx` with hero section
- Add featured guides/blog section (static data)
- CSS modules styling, responsive on all breakpoints
- Lighthouse performance pass (Perf >=90)
- Requirements: THEME-06

---

## Phase 4: CI/CD Pipeline

**Goal:** GitHub Actions deploys Docusaurus on merge to `main`; PRs blocked on build + lint failures; old MkDocs workflow removed.

**Requirements:** CICD-01, CICD-02, CICD-03, CICD-04

**Success criteria:**
- Push to `main` triggers deploy to `juanfe2793.github.io/Portfolio/`
- PR check workflow runs build + lint + broken-link check
- Build cache reduces CI time on subsequent runs
- `.github/workflows/ci.yml` (MkDocs) archived

### Plans

**Plan 4.1 — Deploy Workflow**
- Write `.github/workflows/deploy.yml` (setup-node, npm ci, npm run build, deploy-pages)
- Add caching for `node_modules` and `.docusaurus`
- Remove/archive old MkDocs `ci.yml`
- Requirements: CICD-01, CICD-04

**Plan 4.2 — PR Quality Gates**
- Write `.github/workflows/pr-check.yml` (build + lint + broken links)
- Configure ESLint + Prettier; add config files
- Requirements: CICD-02, CICD-03

---

## Phase 5: Testing, QA & Launch

**Goal:** Docusaurus site passes full QA and launches on `main`, replacing MkDocs.

**Requirements:** QA-01, QA-02, QA-03, QA-04, QA-05, QA-06

**Success criteria:**
- Lighthouse Perf >=90, A11y >=95, SEO >=95 on 5 pages
- Zero broken links from `npm run build`
- Renders correctly on Chrome/Firefox/Safari at 375px, 768px, 1440px
- `main` branch serves Docusaurus; MkDocs artifacts removed

### Plans

**Plan 5.1 — SEO & Performance**
- Add SEO metadata to `docusaurus.config.ts` and key pages
- Validate sitemap output (`build/sitemap.xml`)
- Image compression and lazy loading optimization
- Run Lighthouse on 5 representative pages; fix issues
- Requirements: QA-01, QA-02

**Plan 5.2 — Cross-Browser & Responsive QA**
- Manual cross-browser testing checklist (Chrome, Firefox, Safari)
- Responsive testing at mobile/tablet breakpoints
- Fix console errors and hydration warnings
- Requirements: QA-03, QA-04

**Plan 5.3 — Content Review & Launch**
- Side-by-side visual comparison of all migrated pages vs MkDocs
- Remove placeholder/skeleton content
- Merge migration branch → `main`; verify live deployment
- Remove `mkdocs.yml`, `pyproject.toml`, old MkDocs Dockerfile
- Requirements: QA-05, QA-06

---

## Phase 6: Custom Domain Setup

**Goal:** `felipegomez.me` serves the portfolio over HTTPS with email uninterrupted.

**Requirements:** DOMAIN-01, DOMAIN-02, DOMAIN-03, DOMAIN-04, DOMAIN-05, DOMAIN-06

**Note:** Can run in parallel with Phase 5. DNS config (Tasks 1.2.x) can start as soon as Phase 1 config exists — which it does.

**Success criteria:**
- `https://felipegomez.me` serves site; `www.` redirects to apex
- Email `hello@felipegomez.me` works bidirectionally after DNS changes
- SSL certificate valid, HTTPS enforced
- Sitemap submitted to Google Search Console

### Plans

**Plan 6.1 — DNS & GitHub Pages Config**
- Export/backup current DNS records at Porkbun
- Add A (x4), AAAA (x4), CNAME (www) records; preserve MX/SPF/DKIM/DMARC
- Add `static/CNAME` file to repo; enable custom domain in GitHub Pages settings
- Verify domain ownership in GitHub; enforce HTTPS
- Requirements: DOMAIN-01, DOMAIN-02, DOMAIN-03

**Plan 6.2 — Docusaurus URL Update & SEO**
- Update `docusaurus.config.ts`: `url: 'https://felipegomez.me'`, `baseUrl: '/'`
- Update CI/CD workflow if it references old URL
- Verify canonical URLs in build output; submit sitemap to Search Console
- Setup uptime monitoring (UptimeRobot)
- Requirements: DOMAIN-04, DOMAIN-05, DOMAIN-06

---

## Dependency Map

```
Phase 1 (✓) → Phase 2 → Phase 3 → Phase 4 → Phase 5
                                              ↑
Phase 6 (can start anytime after Phase 1) ───┘
```

Phase 6 Plan 6.2 (URL update) should coordinate with Phase 5 Plan 5.3 (launch) to update config before go-live.

---

## Milestones

| Milestone | Target | Phases | Criteria |
|-----------|--------|--------|----------|
| M1: Content Live | 2026-04-19 | 1+2 | All guides, blog, CV render in Docusaurus |
| M2: Visual Identity | 2026-04-30 | 3 | Theme, components, landing page done |
| M3: CI/CD Live | 2026-05-07 | 4 | GitHub Actions deploys on merge |
| M4: Site Launched | 2026-05-18 | 5 | Docusaurus live on `main` |
| M5: Domain Live | 2026-05-21 | 6 | `felipegomez.me` serving with HTTPS |

---
*Created: 2026-03-30*
*Based on vault plans: plan-01-docusaurus-migration.md, plan-04-custom-domain-setup.md*

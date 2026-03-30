# Requirements: Portfolio — Docusaurus Migration

**Defined:** 2026-03-30
**Core Value:** Professional platform positioning Juan Felipe as a recognized voice in infrastructure and platform engineering

## v1 Requirements

Requirements for the migration milestone (launch on `felipegomez.me`).

### Foundation (Done)

- [x] **FOUND-01**: Docusaurus v3 scaffold with TypeScript config in `v2/`
- [x] **FOUND-02**: Docker local dev environment with hot-reload (Issues #73)
- [x] **FOUND-03**: Docusaurus plugins configured — docs, blog, sitemap, client-redirects (Issue #74)

### Content Migration

- [ ] **CONT-01**: CV/Resume page migrated to `docs/portfolio/cv.mdx` and renders correctly
- [ ] **CONT-02**: All blog posts migrated to `blog/` with correct dates, authors, tags, and truncation
- [ ] **CONT-03**: All technical guides migrated to `docs/guides/` with sidebar auto-generation
- [ ] **CONT-04**: MkDocs admonitions (`!!! note`) converted to Docusaurus syntax (`:::note`)
- [ ] **CONT-05**: All static assets copied to `static/` with no broken image/asset links
- [ ] **CONT-06**: URL redirect map fully activated (all 11 old MkDocs paths redirect correctly)

### Theme & Components

- [ ] **THEME-01**: Color palette and typography tokens defined; dark/light mode works
- [ ] **THEME-02**: Navbar links: Docs, Blog, CV/Resume, GitHub
- [ ] **THEME-03**: Footer with social links and copyright
- [ ] **THEME-04**: `<SkillBadge />` React component usable in MDX
- [ ] **THEME-05**: `<Timeline />` React component for career/education history
- [ ] **THEME-06**: Custom landing page (`src/pages/index.tsx`) with hero section and featured content

### CI/CD

- [ ] **CICD-01**: GitHub Actions workflow deploys Docusaurus on push to `main`
- [ ] **CICD-02**: PR check workflow (build + lint) must pass before merge
- [ ] **CICD-03**: Broken link checker runs in CI
- [ ] **CICD-04**: Old MkDocs workflow removed/disabled

### Quality & Launch

- [ ] **QA-01**: Lighthouse scores — Perf >=90, A11y >=95, SEO >=95 on 5 representative pages
- [ ] **QA-02**: Zero broken links in `npm run build`
- [ ] **QA-03**: Site renders correctly on Chrome, Firefox, Safari (latest)
- [ ] **QA-04**: Mobile responsive at 375px and 768px viewports
- [ ] **QA-05**: All placeholder/skeleton content removed
- [ ] **QA-06**: Docusaurus site live at `juanfe2793.github.io/Portfolio/` on `main`

### Custom Domain

- [ ] **DOMAIN-01**: `felipegomez.me` DNS configured (A, AAAA, CNAME records at Porkbun)
- [ ] **DOMAIN-02**: Email `hello@felipegomez.me` uninterrupted (MX/SPF/DKIM/DMARC preserved)
- [ ] **DOMAIN-03**: GitHub Pages custom domain configured with HTTPS enforced
- [ ] **DOMAIN-04**: Docusaurus `url` and `baseUrl` updated to `felipegomez.me` + `/`
- [ ] **DOMAIN-05**: `static/CNAME` file added; canonical URLs use `https://felipegomez.me`
- [ ] **DOMAIN-06**: Google Search Console setup with sitemap submitted

## v2 Requirements

Deferred to post-launch — content and brand growth phase.

### Blog Content Engine

- **BLOG-01**: Blog template and tooling with MDX components for technical posts
- **BLOG-02**: First 3 blog posts published on infrastructure/platform engineering topics
- **BLOG-03**: RSS feed operational; auto cross-post workflow documented
- **BLOG-04**: OG image generation for blog posts

### UI/UX Iterations

- **UX-01**: Hero section with metrics banner (GitHub stats, years of experience)
- **UX-02**: Project cards and case study pages
- **UX-03**: Professional profile section with experience timeline
- **UX-04**: Smooth scroll animations and micro-interactions
- **UX-05**: Full accessibility audit (WCAG 2.1 AA)

### Personal Brand

- **BRAND-01**: LinkedIn profile optimized with portfolio as brand hub
- **BRAND-02**: Content distribution pipeline (LinkedIn posts from blog content)
- **BRAND-03**: Analytics setup (Plausible or similar privacy-first)
- **BRAND-04**: 3 CFP submissions to regional conferences

## Out of Scope

| Feature | Reason |
|---------|--------|
| CMS / headless backend | Static site is sufficient; no dynamic content needed |
| Authentication / user accounts | Portfolio is public-only |
| Video posts | Storage/bandwidth cost; defer post-launch |
| Mobile app | Web-first strategy; native app not justified |
| Real-time features | No use case for the current site |
| Server-side rendering | GitHub Pages is static; SSG is the model |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 (done) | Complete |
| FOUND-02 | Phase 1 (done) | Complete |
| FOUND-03 | Phase 1 (done) | Complete |
| CONT-01–06 | Phase 2 | Pending |
| THEME-01–06 | Phase 3 | Pending |
| CICD-01–04 | Phase 4 | Pending |
| QA-01–06 | Phase 5 | Pending |
| DOMAIN-01–06 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 25 total (3 complete, 22 pending)
- Mapped to phases: 25
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-30*
*Last updated: 2026-03-30 after initialization*

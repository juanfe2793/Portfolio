# Portfolio — MkDocs to Docusaurus Migration

## What This Is

Personal portfolio and technical blog for Juan Felipe Gómez Manzanares (Staff Software Engineer), currently live at `juanfe2793.github.io/Portfolio/`. The site is mid-migration from MkDocs (Material theme) to Docusaurus v3 — the Docusaurus scaffold lives in `v2/` and is being progressively completed before cutting over. The target domain is `felipegomez.me`.

## Core Value

A professional platform that positions Juan Felipe as a recognized voice in infrastructure and platform engineering — discoverable, well-designed, and continuously publishing technical content.

## Requirements

### Validated

- ✓ MkDocs site deployed to GitHub Pages — existing
- ✓ Docusaurus v3 scaffold in `v2/` with TypeScript config — existing
- ✓ Docker local dev environment with hot-reload — Phase 1 (Issue #73)
- ✓ Docusaurus plugins configured (docs, blog, sitemap, client-redirects) — Phase 1 (Issue #74)

### Active

- [ ] Content migrated from MkDocs: CV, blog posts, technical guides
- [ ] Theme and custom React components (SkillBadge, Timeline, landing page)
- [ ] CI/CD pipeline updated for Docusaurus (replace MkDocs GitHub Actions)
- [ ] Site QA'd and launched on `main` (Docusaurus replaces MkDocs)
- [ ] Custom domain `felipegomez.me` configured with HTTPS
- [ ] Blog infrastructure and content creation pipeline established
- [ ] Personal brand: LinkedIn optimized, content distribution system

### Out of Scope

- Real-time features / CMS — static site generator is sufficient
- Mobile app — web-first
- OAuth / user accounts — no authentication needed
- Video posts — defer to post-launch

## Context

- **Current state**: MkDocs is production at `juanfe2793.github.io/Portfolio/`. Docusaurus scaffold in `v2/` is functional with Docker + plugin config done (Sprints 1-2 complete).
- **Branch**: `initial-docusaurus-config` is the active migration branch.
- **Content**: `docs/` has CV, blog posts (Career/Engineering), and technical guides (Bash, Carvel, Docker, Git, Helm, Kubectl, Linux, SaltStack).
- **URL mapping**: `migration-planning/url_mapping.csv` has all old→new URL mappings for redirects.
- **Target domain**: `felipegomez.me` (registered at Porkbun). Email `hello@felipegomez.me` must be preserved during DNS migration.
- **Timeline**: 14-week build (Mar 23 – Jun 30, 2026). Currently in Sprint 2 (week of Mar 30).

## Constraints

- **Tech stack**: Docusaurus v3.9.2, Node >=20, TypeScript, React 19 — locked
- **Deployment**: GitHub Pages (juanfe2793/Portfolio repo) — no infra changes
- **Email**: `hello@felipegomez.me` MX/SPF/DKIM/DMARC records must not be disrupted during domain migration
- **Content quality**: All migrated content must render without errors; Lighthouse Perf >=90, A11y >=95, SEO >=95
- **MkDocs coexistence**: MkDocs remains live until Docusaurus passes QA and is launched

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Docusaurus v3 over alternatives | Modern React/MDX, better plugin ecosystem, TypeScript-first | ✓ Good |
| Scaffold in `v2/` subdirectory | Keeps MkDocs live during migration without branching complexity | ✓ Good |
| node:20-alpine for Docker | Matches `engines: >=20` in package.json | ✓ Good |
| Redirect map seeded but disabled | Target pages don't exist until content migration; avoids build failures | ✓ Good |
| Standard granularity, Checkpoint mode | Balanced phases with user approval at gates | — Pending |
| `felipegomez.me` as custom domain | Personal brand hub; canonical URL for all content | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-30 after initialization*

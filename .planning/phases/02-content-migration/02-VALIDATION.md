---
phase: 02
slug: content-migration
status: compliant
nyquist_compliant: true
wave_0_complete: true
created: 2026-04-03
---

# Phase 02 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Shell assertions (no test runner — content migration only) |
| **Config file** | none |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run typecheck` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run typecheck`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** ~15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | Status |
|---------|------|------|-------------|-----------|-------------------|--------|
| 02-01-01 | 01 | 1 | CONT-01, CONT-05 | shell | `test ! -f docs/intro.md && test ! -d docs/tutorial-basics && test -f static/css/extra.css && echo PASS` | ✅ green |
| 02-01-02 | 01 | 1 | CONT-01 | shell | `test -f docs/portfolio/cv.mdx && grep -q ":::success" docs/portfolio/cv.mdx && ! grep -q ":fontawesome-" docs/portfolio/cv.mdx && echo PASS` | ✅ green |
| 02-01-03 | 01 | 1 | CONT-01 | build | `npm run build` | ✅ green |
| 02-02-01 | 02 | 2 | CONT-02 | shell | `test -f blog/2026-01-17-welcome.md && grep -q "authors: \[juanfe\]" blog/2026-01-17-welcome.md && grep -q "<!-- truncate -->" blog/2026-01-17-welcome.md && echo PASS` | ✅ green |
| 02-02-02 | 02 | 2 | CONT-02 | build+output | `npm run build && test -f build/blog/welcome/index.html && test -f build/blog/authors/juanfe/index.html && echo PASS` | ✅ green |
| 02-03-01 | 03 | 2 | CONT-03, CONT-04 | shell | `test -f docs/guides/_category_.json && test -f docs/guides/kubectl_commands.md && ! grep -q ":octicons-" docs/guides/index.md && echo PASS` | ✅ green |
| 02-03-02 | 03 | 2 | CONT-03 | build+output | `npm run build && test -f build/docs/guides/index.html && test -f build/docs/guides/kubectl_commands/index.html && echo PASS` | ✅ green |
| 02-04-01 | 04 | 3 | CONT-06 | shell | `grep -c "{ from:" docusaurus.config.ts && ! grep -q "// *{ from:" docusaurus.config.ts && echo ALL_UNCOMMENTED` | ✅ green |
| 02-04-02 | 04 | 3 | CONT-06 | build+output | `npm run build && test -f build/guides/kubectl_commands/index.html && test -f build/portfolio/cv/index.html && echo PASS` | ✅ green |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing shell assertions and `npm run build` cover all phase requirements. No test framework installation required.

*Existing infrastructure covers all phase requirements.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| CV page visually matches MkDocs layout | CONT-01 | Visual regression requires browser | Run `npm start`, navigate to /docs/portfolio/cv, compare with MkDocs screenshot |
| Blog truncation renders correctly on blog index | CONT-02 | Visual — excerpt must show, not full post | Run `npm start`, navigate to /blog, confirm excerpt + "Read more" |
| Redirects resolve in browser (not just HTML files) | CONT-06 | Client-side redirect JS must execute | Run `npm run serve`, navigate to /guides/kubectl_commands/, confirm redirect fires |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify commands
- [x] Sampling continuity: every task has an automated verify
- [x] Wave 0 not needed — shell assertions cover all requirements
- [x] No watch-mode flags
- [x] Feedback latency ~15s (npm run build)
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** approved 2026-04-03

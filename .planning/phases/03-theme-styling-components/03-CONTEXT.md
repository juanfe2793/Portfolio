# Phase 3: Theme, Styling & Components - Context

**Gathered:** 2026-04-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Define the portfolio's visual identity with a custom color palette, dark/light mode, fixed navbar/footer, and two reusable MDX components (SkillBadge, Timeline). The landing page structure already exists — Phase 3 applies the brand theme to it and builds the missing components.

Phase 3 does NOT add new content sections or refactor the landing page structure (that's Phase 5 QA scope).

</domain>

<decisions>
## Implementation Decisions

### Color Palette (THEME-01)
- **D-01:** Teal/dark tech palette — inspired by Grafana, HashiCorp aesthetic:
  - Light mode primary: `#14b8a6` (teal-500), background white/gray-50
  - Dark mode primary: `#2dd4bf` (teal-400), background `#111827` (gray-900)
  - Text dark mode: `#f3f4f6` (gray-100)
  - Override Infima CSS variables in `src/css/custom.css`
- **D-02:** Dark/light mode respects system preference — `respectPrefersColorScheme: true` is already set in `docusaurus.config.ts`, keep it.
- **D-03:** Prism code themes stay as github (light) / dracula (dark) — already configured, no change needed.

### Navbar (THEME-02)
- **D-04:** Fix the "CV / Resume" navbar item — currently uses `type: 'docSidebar'` (wrong, shows full sidebar). Change to `{to: '/docs/portfolio/cv', label: 'CV / Resume', position: 'left'}`.
- **D-05:** Navbar items order: Guides | Blog | CV / Resume (left) + GitHub (right). The "Docs" label should be renamed to "Guides" since that's what the docs section contains.

### Footer (THEME-03)
- **D-06:** Simplify footer to two columns: "Content" (Guides, Blog, CV) + "Connect" (LinkedIn, GitHub, Email). Remove the current three-column structure. Keep dark style and copyright line.

### SkillBadge Component (THEME-04)
- **D-07:** Pill shape with filled dot indicators for skill level. Props: `name: string`, `level: 'beginner' | 'intermediate' | 'expert'`, `category?: string`.
- **D-08:** Visual: colored pill chip + 3 dots (filled = level, empty = remaining). Example: expert = `●●●`, intermediate = `●●○`, beginner = `●○○`.
- **D-09:** Pill color driven by `category` prop with a predefined palette: `networking` = teal, `cloud` = orange, `orchestration` = blue, `observability` = green, `iac` = purple, `default` = gray.
- **D-10:** Register globally via `src/theme/MDXComponents.tsx` so it's importable in any MDX file without explicit import.
- **D-11:** File location: `src/components/SkillBadge/index.tsx` + `styles.module.css`.

### Timeline Component (THEME-05)
- **D-12:** Vertical timeline with a left-side connecting line. Each entry: date range badge, role title, company name, optional bullet list of achievements.
- **D-13:** Props: `entries: TimelineEntry[]` where `TimelineEntry = { period: string, role: string, company: string, achievements?: string[] }`.
- **D-14:** Used in the CV page (`docs/portfolio/cv.mdx`) to replace the plain markdown experience/education sections. Phase 3 builds the component and adds a usage example — full CV integration is Phase 5 content polish.
- **D-15:** File location: `src/components/Timeline/index.tsx` + `styles.module.css`. Registered globally same as SkillBadge.

### Landing Page (THEME-06)
- **D-16:** The current `src/pages/index.tsx` already has a rich structure (Hero, About, Expertise, Projects, CTA). Phase 3 applies the teal theme to it — do NOT restructure. The `HomepageFeatures` expertise section and project cards already exist and are well-built.
- **D-17:** Replace the profile picture URL `https://ui-avatars.com/api/?...background=0D9488` with updated teal color `background=14b8a6` to match new palette.
- **D-18:** Card tags in `projectCard` currently use `--ifm-color-primary-lightest/darkest` — these will automatically pick up the new teal palette once custom.css is updated. No JSX changes needed.

### Claude's Discretion
- Exact CSS transition/hover effects on cards and social links
- Whether to add a subtle gradient or keep flat backgrounds on the hero section
- Typography scale adjustments (font size, line height) beyond the Infima defaults
- Whether to add a custom font (e.g., Inter) — only if it improves readability noticeably

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Existing theme files (read before touching)
- `src/css/custom.css` — Current Infima variable overrides (replace entirely with new palette)
- `src/pages/index.tsx` — Current landing page (apply theme, do NOT restructure)
- `src/pages/index.module.css` — Landing page CSS modules (may need color token updates)
- `src/components/HomepageFeatures/index.tsx` — Expertise section (already built, read before touching)
- `src/components/HomepageFeatures/styles.module.css` — Expertise styles

### Config files to update
- `docusaurus.config.ts` — Fix navbar CV link (line ~119) + simplify footer (line ~128)

### Requirements
- `.planning/REQUIREMENTS.md` — THEME-01 through THEME-06

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/pages/index.module.css` `.cardTag` — already uses `--ifm-color-primary-lightest/darkest` tokens; will automatically update with new palette
- `src/components/HomepageFeatures/` — Expertise section complete; no changes needed, just theme adoption
- `docusaurus.config.ts` `colorMode.respectPrefersColorScheme: true` — already set, dark mode works

### Established Patterns
- CSS modules pattern: component CSS lives in `styles.module.css` alongside `index.tsx`
- Infima CSS variables: all color overrides go through `--ifm-color-primary-*` variables in `src/css/custom.css`
- Global MDX components: registered via `src/theme/MDXComponents.tsx` (file doesn't exist yet — needs to be created)

### Integration Points
- SkillBadge + Timeline need `src/theme/MDXComponents.tsx` to be importable in MDX without explicit imports
- Navbar fix: `docusaurus.config.ts` line ~119 — `type: 'docSidebar'` must change to `to: '/docs/portfolio/cv'`
- New teal palette Infima variables replace the current green values at lines 9–17 (light) and 23–30 (dark) of `custom.css`

</code_context>

<specifics>
## Specific Ideas

- Palette reference: Grafana / HashiCorp aesthetic — dark background, teal accent, clean sans-serif
- SkillBadge dot style: `●●●` (expert), `●●○` (intermediate), `●○○` (beginner) — use Unicode or SVG circles
- Timeline connecting line: thin vertical bar (2px, teal-colored), dots at each entry node

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within Phase 3 scope.

</deferred>

---

*Phase: 03-theme-styling-components*
*Context gathered: 2026-04-03*
